import { Permission } from '@prisma/client'

import type { Decoded } from '@redwoodjs/api'
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
      permissions: true,
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
 * If an Array of permissions is provided, checks if the currentUser has every permission rather than any one in the Array.
 *
 * Users with the 'Administrator' permission bypass all checks.
 */
type PermissionsRequired = Permission | Permission[] | undefined

/**
 * Checks if the currentUser is authenticated (and has the given permissions)
 *
 * @param perms: {@link PermissionsRequired} - Checks if the currentUser has these permissions
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and has the given permissions,
 * or when no permissions are provided to check against. Otherwise returns false.
 */
export const hasPermission = (perms: PermissionsRequired): boolean => {
  if (!isAuthenticated()) return false

  const currentUserPerms = context.currentUser?.permissions
  const isAdmin = currentUserPerms.includes('Administrator')

  if (!currentUserPerms?.length) return false

  if (typeof perms === 'string') {
    if (currentUserPerms.includes(perms) || isAdmin) {
      return true
    }
  }

  if (Array.isArray(perms)) {
    // Check if all permissions are present
    if (perms.every((perm) => currentUserPerms.includes(perm)) || isAdmin) {
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
 * @param perms: {@link PermissionsRequired} - When checking permissions, these are the required perms
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 * @throws {@link ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({
  perms,
}: { perms?: PermissionsRequired } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (perms && !hasPermission(perms)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
