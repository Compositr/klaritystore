import * as React from 'react'

import { PopoverTrigger } from '@radix-ui/react-popover'
import logoLightSrc from 'assets/img/logo-light.png'
import { LogOut, Menu, Search, Store, User } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import CartButton from '../CartButton/CartButton'
import NavLinksCell from '../NavLinksCell'
import { Button } from '../ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu'
import { NavigationMenu, NavigationMenuList } from '../ui/NavigationMenu'
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

const NavHeader = () => {
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
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
          <Popover
            open={popoverOpen}
            onOpenChange={(o) => setPopoverOpen(!isAuthenticated && o)}
          >
            <DropdownMenu
              open={dropdownOpen}
              onOpenChange={(o) => setDropdownOpen(isAuthenticated && o)}
            >
              <PopoverTrigger asChild>
                <DropdownMenuTrigger asChild>
                  {/* lg:block breaks it */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden lg:flex"
                  >
                    <User />
                  </Button>
                </DropdownMenuTrigger>
              </PopoverTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Hello, {currentUser?.firstName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={routes.account()}>
                    <User /> Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {hasRole('Employee') && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={routes.admin()}>
                        <Store /> Admin
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => logOut()}>
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <PopoverContent>
              <div className="flex flex-col items-center justify-center">
                <Large>You&apos;re logged out!</Large>
                <Small>
                  Login or sign up to get exclusive deals and personalise your
                  experience
                </Small>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <Button variant="link" asChild>
                  <Link to={routes.login() + '?tab=login'}>Login</Link>
                </Button>
                <Button variant="link" asChild>
                  <Link to={routes.login() + '?tab=signup'}>Sign Up</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <CartButton />
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
                <NavLinksCell mobile />
                <div className="flex flex-1 flex-wrap items-end justify-center gap-4">
                  {!isAuthenticated && (
                    <>
                      <Button size="lg" asChild>
                        <Link to={routes.login() + '?tab=login'}>Login</Link>
                      </Button>
                      <Button size="lg" asChild>
                        <Link to={routes.login() + '?tab=signup'}>Sign Up</Link>
                      </Button>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <div className="flex w-full flex-col items-center">
                        <Separator className="mb-6" />
                        <div className="grid grid-cols-2 gap-2">
                          <Button asChild size="lg">
                            <Link to={routes.account()}>
                              <User /> Account
                            </Link>
                          </Button>
                          <Button
                            size="lg"
                            variant="destructive"
                            onClick={() => logOut()}
                          >
                            <LogOut />
                            <span>Log Out</span>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav className="container flex w-full justify-center">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavLinksCell />
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  )
}

export default NavHeader
