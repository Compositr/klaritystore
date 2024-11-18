import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import H2 from 'src/components/ui/typography/H2'

const AccountPage = () => {
  const { currentUser } = useAuth()

  if (!currentUser) return null

  return (
    <>
      <Metadata title="Profile" description="Manage your profile" />
      <H2>Profile</H2>
      <div className="mt-4">
        <ProfileForm />
      </div>
    </>
  )
}

export default AccountPage
