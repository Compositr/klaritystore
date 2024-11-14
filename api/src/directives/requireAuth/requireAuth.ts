import { Permission } from '@prisma/client'
import gql from 'graphql-tag'

import type { ValidatorDirectiveFunc } from '@redwoodjs/graphql-server'
import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of perms.
  """
  directive @requireAuth(perms: [String]) on FIELD_DEFINITION
`

type RequireAuthValidate = ValidatorDirectiveFunc<{ perms?: Permission[] }>

const validate: RequireAuthValidate = ({ directiveArgs }) => {
  const { perms } = directiveArgs
  applicationRequireAuth({ perms })
}

const requireAuth = createValidatorDirective(schema, validate)

export default requireAuth
