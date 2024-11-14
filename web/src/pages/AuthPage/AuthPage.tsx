import { useEffect } from 'react'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import LoginForm from 'src/components/LoginForm/LoginForm'
import SignupForm from 'src/components/SignupForm/SignupForm'
import { Button } from 'src/components/ui/Button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'src/components/ui/Tabs'
import H3 from 'src/components/ui/typography/H3'

const AuthPage = () => {
  const { isAuthenticated } = useAuth()
  const { searchParams } = useLocation()
  const defaultTab = searchParams.get('tab') || 'login'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])
  return (
    <>
      <Metadata
        title="Log In or Signup"
        description="Log in to your existing account or sign up for a new account"
      />

      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <H3>Log In or Sign Up</H3>
        <Tabs defaultValue={defaultTab} className="w-[50vw] md:w-[33vw]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="w-[50vw] md:w-[33vw]">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="w-[50vw] md:w-[33vw]">
            <SignupForm />
          </TabsContent>
        </Tabs>
        <Button asChild variant="link">
          <Link to={routes.home()}>Back to Home</Link>
        </Button>
      </div>
    </>
  )
}

export default AuthPage
