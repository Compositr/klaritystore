// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AccountSecurityPage = () => {
  return (
    <>
      <Metadata title="AccountSecurity" description="AccountSecurity page" />

      <h1>AccountSecurityPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/AccountSecurityPage/AccountSecurityPage.tsx</code>
      </p>
      {/*
          My default route is named `accountSecurity`, link to me with:
          `<Link to={routes.accountSecurity()}>AccountSecurity</Link>`
      */}
    </>
  )
}

export default AccountSecurityPage
