import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { changePassword } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const me: QueryResolvers['me'] = () => {
  return db.user.findUnique({
    where: { idString: context.currentUser.idString },
  })
}

export const updateMe: MutationResolvers['updateMe'] = ({ input }) => {
  return db.user.update({
    data: input,
    where: { idString: context.currentUser.idString },
  })
}

export const changeMyPassword: MutationResolvers['changeMyPassword'] = ({
  input,
}) => {
  return changePassword({ ...input })
}
