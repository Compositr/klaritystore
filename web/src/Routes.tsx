// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import AccountLayout from './layouts/AccountLayout/AccountLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import StoreLayout from './layouts/StoreLayout/StoreLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={AuthPage} name="login" prerender />

      <Set wrap={StoreLayout}>
        <Route path="/" page={HomePage} name="home" prerender />
        <Route path="/category/{idString}" page={CategoryPage} name="category" />
        <Route path="/product/{idInt:Int}" page={ProductPage} name="product" />

        <PrivateSet wrap={AccountLayout} unauthenticated="login">
          <Route path="/account" redirect="account" />
          <Route path="/account/profile" page={AccountProfilePage} name="account" />
          <Route path="/account/security" page={AccountSecurityPage} name="accountSecurity" />
          <Route path="/account/billing" page={AccountBillingPage} name="accountBilling" />
        </PrivateSet>
      </Set>

      <PrivateSet unauthenticated="home" wrap={AdminLayout} roles={'Employee'}>
        <Route path="/admin" page={AdminPage} name="admin" />
        <Route path="/admin/products" page={AdminProductsPage} name="adminProducts" />
        <Route path="/admin/products/new" page={AdminNewProductPage} name="adminNewProduct" />
      </PrivateSet>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
