import { type LucideIcon } from 'lucide-react'

import { Link } from '@redwoodjs/router'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/Sidebar'

type SidebarNavItems = Array<{
  title: string
  url: string
  icon: LucideIcon
}>

interface AdminSidebarNavProps {
  items: SidebarNavItems
}

const AdminSidebarSecondaryNav = ({
  items,
  ...props
}: AdminSidebarNavProps &
  React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default AdminSidebarSecondaryNav
