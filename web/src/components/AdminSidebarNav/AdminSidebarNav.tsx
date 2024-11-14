import { ChevronRight, type LucideIcon } from 'lucide-react'

import { Link, useMatch } from '@redwoodjs/router'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/Sidebar'

type SidebarNavItems = Array<{
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}>

interface AdminSidebarNavProps {
  items: SidebarNavItems
}

const AdminSidebarNav = ({ items }: AdminSidebarNavProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Inventory</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <ActiveSidebarMenuButtonLink
                url={item.url}
                title={item.title}
                Icon={item.icon}
                asChild
                tooltip={item.title}
              />
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const ActiveSidebarMenuButtonLink = ({ url, title, Icon, ...props }) => {
  const routerMatcher = useMatch(url)

  return (
    <SidebarMenuButton asChild {...props} isActive={routerMatcher.match}>
      <Link to={url}>
        <Icon />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  )
}

export default AdminSidebarNav
