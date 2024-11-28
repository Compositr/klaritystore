import { Boxes, Home, ShoppingBag, Store, Tags } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import AdminSidebarNav from '../AdminSidebarNav/AdminSidebarNav'
import AdminSidebarSecondaryNav from '../AdminSidebarSecondaryNav/AdminSidebarSecondaryNav'
import AdminSidebarUser from '../AdminSidebarUser/AdminSidebarUser'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/Sidebar'

const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={routes.admin()}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Store className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Klarity Store</span>
                  <span className="truncate text-xs">Management Interface</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarNav
          items={[
            {
              icon: Tags,
              title: 'Products',
              url: routes.adminProducts(),
              items: [
                {
                  title: 'New Product',
                  url: routes.adminNewProduct(),
                },
              ],
            },
            {
              icon: ShoppingBag,
              title: 'Orders',
              url: routes.adminOrders(),
            },
            {
              icon: Boxes,
              title: 'Categories',
              url: routes.adminCategories(),
            },
          ]}
        />
        <AdminSidebarSecondaryNav
          className="mt-auto"
          items={[
            {
              icon: Home,
              title: 'Storefront',
              url: routes.home(),
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <AdminSidebarUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar
