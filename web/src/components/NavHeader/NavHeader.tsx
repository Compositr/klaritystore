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
import { Separator } from '../ui/Separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet'
import Large from '../ui/typography/Large'

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
    <header className="w-full border-b border-b-border pb-2 pt-4">
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>MENU</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 pt-8">
                {links.map((link) => (
                  <>
                    <Large>
                      <Link to={link.to}>{link.label}</Link>
                    </Large>
                    <Separator className="last:hidden" />
                  </>
                ))}
              </div>
            </SheetContent>
          </Sheet>
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
