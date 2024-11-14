// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AdminPage = () => {
  return (
    <>
      <Metadata title="Admin" description="Admin page" />

      <h1>AdminPage</h1>
      <p>
        Find me in <code>./web/src/pages/AdminPage/AdminPage.tsx</code>
      </p>
      {/*
          My default route is named `admin`, link to me with:
          `<Link to={routes.admin()}>Admin</Link>`
      */}
    </>
  )
}

export default AdminPage
