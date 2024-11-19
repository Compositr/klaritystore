import { Role } from '@prisma/client'

import type { Decoded } from '@redwoodjs/api'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from './db'

/**
 * The name of the cookie that dbAuth sets
 *
 * %port% will be replaced with the port the api server is running on.
 * If you have multiple RW apps running on the same host, you'll need to
 * make sure they all use unique cookie names
 */
export const cookieName = 'session_%port%'

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique ID of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model
 * name or unique field name, for example:
 *
 *   return await db.profile.findUnique({ where: { email: session.id } })
 *                   ───┬───                       ──┬──
 *      model accessor ─┘      unique id field name ─┘
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the `select` object below once you've decided they are safe to be
 * seen if someone were to open the Web Inspector in their browser.
 */
export const getCurrentUser = async (session: Decoded) => {
  if (!session || typeof session.idString !== 'string') {
    throw new Error('Invalid session')
  }

  return await db.user.findUnique({
    where: { idString: session.idString },
    select: {
      idString: true,
      email: true,
      firstName: true,
      lastName: true,
      roles: true,
    },
  })
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * If an Array of roles is provided, checks if the currentUser has any one role in the Array
 *
 * Users with the 'Administrator' role bypass all checks.
 */
type RolesRequired = Role | Role[] | undefined

/**
 * Checks if the currentUser is authenticated (and has the given roles)
 *
 * @param roles: {@link RolesRequired} - Checks if the currentUser has these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and has the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles: RolesRequired): boolean => {
  if (!isAuthenticated()) return false

  const currentUserRoles = context.currentUser?.roles
  const isAdmin = currentUserRoles.includes('Administrator')
  if (isAdmin) return true

  if (!currentUserRoles?.length) return false

  if (typeof roles === 'string') {
    if (currentUserRoles.includes(roles)) {
      return true
    }
  }

  if (Array.isArray(roles)) {
    // Check if all permissions are present
    if (roles.some((role) => currentUserRoles.includes(role))) {
      return true
    }
  }

  // else permissions not found, return false
  return false
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param perms: {@link RolesRequired} - When checking roles, these are the required roles
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 * @throws {@link ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles }: { roles?: RolesRequired } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

export const changePassword = async ({ currentPassword, newPassword }) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError(
      'You must be logged in to change your password.'
    )
  }

  const fullUser = await db.user.findUnique({
    where: { idString: context.currentUser.idString },
  })

  if (!fullUser) {
    throw new AuthenticationError('User not found')
  }

  const [oldHash] = hashPassword(currentPassword, {
    salt: fullUser.salt,
  })

  if (oldHash !== fullUser.hashedPassword) {
    throw new ForbiddenError('Invalid password')
  }

  const [hash, salt] = hashPassword(newPassword)
  await db.user.update({
    where: { idString: context.currentUser.idString },
    data: {
      hashedPassword: hash,
      salt,
    },
  })

  return true
}
