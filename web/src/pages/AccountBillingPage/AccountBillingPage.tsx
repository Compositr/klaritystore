// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AccountBillingPage = () => {
  return (
    <>
      <Metadata title="AccountBilling" description="AccountBilling page" />

      <h1>AccountBillingPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/AccountBillingPage/AccountBillingPage.tsx</code>
      </p>
      {/*
          My default route is named `accountBilling`, link to me with:
          `<Link to={routes.accountBilling()}>AccountBilling</Link>`
      */}
    </>
  )
}

export default AccountBillingPage
