import { Menu, Search, ShoppingCart } from 'lucide-react'
import logoLightSrc from 'public/img/logo-light.png'

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

const links: LinksArray = [
  { label: 'Diaries', to: '/' },
  { label: 'Notepads', to: '/' },
  { label: 'Pens and Pencils', to: '/' },
]

const NavHeader = () => {
  return (
    <header className="w-full border-b border-b-border pb-2">
      <div className="container flex items-center justify-center gap-1">
        {/* Left Side Buttons */}
        <div className="flex justify-around gap-2">
          <Button variant="outline" size="icon">
            <Search />
          </Button>
        </div>
        {/* Logo */}
        <div className="flex flex-1 justify-center self-center">
          <Link to={routes.home()}>
            <img src={logoLightSrc} alt="logo" width={262 / 2} />
          </Link>
        </div>
        {/* Right Side Buttons */}
        <div className="flex justify-around gap-2">
          <Button variant="outline" size="icon">
            <ShoppingCart />
          </Button>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </div>
      </div>
      <nav className="container">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.to}>
                <Link to={link.to}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  )
}

export default NavHeader
