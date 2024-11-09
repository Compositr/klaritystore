import logoLightSrc from 'assets/img/logo-light.png'
import { Menu, Search, ShoppingCart } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import { Button } from '../ui/Button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/NavigationMenu'

type LinksArray = Array<{
  label: string
  to: string
}>

const NavHeader = () => {
  // Placed in here so routes can be called
  const links: LinksArray = [
    { label: 'Diaries', to: routes.category({ idString: 'diaries' }) },
    { label: 'Notepads', to: routes.category({ idString: 'notepads' }) },
    {
      label: 'Pens and Pencils',
      to: routes.category({ idString: 'pens-and-pencils' }),
    },
  ]

  return (
    <header className="w-full border-b border-b-border pt-4 lg:pb-2">
      <div className="container flex items-center justify-between gap-1 pb-2">
        {/* Left Side Buttons */}
        <div className="flex justify-around gap-2">
          <Button variant="outline" size="icon">
            <Search />
          </Button>
        </div>
        {/* Logo */}
        <div className="absolute left-1/2 flex flex-1 -translate-x-1/2 transform justify-center self-center">
          <Link to={routes.home()}>
            <img src={logoLightSrc} alt="logo" width={262 / 2} />
          </Link>
        </div>
        {/* Right Side Buttons */}
        <div className="ml-auto flex justify-around gap-2">
          <Button variant="outline" size="icon">
            <ShoppingCart />
          </Button>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </div>
      </div>
      <nav className="container flex w-full justify-center">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.to}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to={link.to}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  )
}

export default NavHeader
