import * as React from 'react'

import { PopoverTrigger } from '@radix-ui/react-popover'
import logoLightSrc from 'assets/img/logo-light.png'
import { Menu, Search, ShoppingCart, User } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Button } from '../ui/Button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/NavigationMenu'
import { Popover, PopoverContent } from '../ui/Popover'
import { Separator } from '../ui/Separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet'
import Large from '../ui/typography/Large'
import Small from '../ui/typography/Small'

type LinksArray = Array<{
  label: string
  to: string
}>

const NavHeader = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
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
          <Popover>
            <PopoverTrigger asChild>
              {/* lg:block breaks it */}
              <Button variant="outline" size="icon" className="hidden lg:flex">
                <User />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col items-center justify-center">
                {!isAuthenticated && (
                  <>
                    <Large>You&apos;re logged out!</Large>
                    <Small>
                      Login or sign up to get exclusive deals and personalise
                      your experience
                    </Small>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Large>Hello, {currentUser.firstName}</Large>
                  </>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {!isAuthenticated && (
                  <>
                    <Button variant="link" asChild>
                      <Link to={routes.login() + '?tab=login'}>Login</Link>
                    </Button>
                    <Button variant="link" asChild>
                      <Link to={routes.login() + '?tab=signup'}>Sign Up</Link>
                    </Button>
                  </>
                )}
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => logOut()}
                  >
                    Log Out
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
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
              <div className="flex h-full flex-col gap-4 py-8">
                {links.map((link) => (
                  <React.Fragment key={link.to}>
                    {/* TODO: Close popover on nav */}
                    <Large>
                      <Link to={link.to}>{link.label}</Link>
                    </Large>
                    <Separator className="last:hidden" />
                  </React.Fragment>
                ))}
                <div className="flex flex-1 flex-wrap items-end justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link to={routes.login() + '?tab=login'}>Login</Link>
                  </Button>
                  <Button size="lg" asChild>
                    <Link to={routes.login() + '?tab=signup'}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav className="container flex w-full justify-center">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={`mob-${link.to}`}>
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
