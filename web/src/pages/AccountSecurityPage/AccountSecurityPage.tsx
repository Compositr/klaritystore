import { Metadata } from '@redwoodjs/web'

import ChangePasswordForm from 'src/components/ChangePasswordForm/ChangePasswordForm'
import H2 from 'src/components/ui/typography/H2'

const AccountSecurityPage = () => {
  return (
    <>
      <Metadata title="Security" description="Manage your password" />

      <H2>Security</H2>
      <div className="mt-4">
        <ChangePasswordForm />
      </div>
    </>
  )
}

export default AccountSecurityPage
