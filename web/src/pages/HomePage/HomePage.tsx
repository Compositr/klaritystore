import { Metadata } from '@redwoodjs/web'

import Hero from 'src/components/Hero/Hero'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Hero />
    </>
  )
}

export default HomePage
