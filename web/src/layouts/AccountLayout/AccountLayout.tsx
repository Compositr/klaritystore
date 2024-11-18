import { LucideIcon, User, ShieldEllipsis, CreditCard } from 'lucide-react'

import { Link, Redirect, routes, useMatch } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Button } from 'src/components/ui/Button'
import { cn } from 'src/lib/utils'

type AccountPageLinks = Array<{
  icon: LucideIcon
  label: string
  to: string
}>

type AccountLayoutProps = {
  children?: React.ReactNode
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const links: AccountPageLinks = [
    {
      icon: User,
      label: 'Profile',
      to: routes.account(),
    },
    {
      icon: ShieldEllipsis,
      label: 'Password and Security',
      to: routes.accountSecurity(),
    },
    {
      icon: CreditCard,
      label: 'Billing',
      to: routes.accountBilling(),
    },
  ]

  const { currentUser } = useAuth()

  if (!currentUser) return <Redirect to={routes.login()} />

  return (
    <>
      <div className="container my-4">
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {currentUser.firstName} {currentUser.lastName}
          </span>
          <span className="truncate text-xs">{currentUser.email}</span>
        </div>
      </div>
      <div className="container grid h-full grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="flex h-full flex-col gap-1">
          {links.map((link) => (
            <AccountPageLink key={link.label} {...link} />
          ))}
        </div>
        {/* Main Content */}
        <div className="col-span-3 h-full">{children}</div>
      </div>
    </>
  )
}

function AccountPageLink(link: AccountPageLinks[number]) {
  const matcher = useMatch(link.to)

  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full',
        matcher.match && 'bg-accent text-accent-foreground'
      )}
      asChild
    >
      <Link to={link.to}>
        <link.icon />
        <span>{link.label}</span>
      </Link>
    </Button>
  )
}

export default AccountLayout
