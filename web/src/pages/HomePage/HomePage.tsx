import { Metadata } from '@redwoodjs/web'

import Hero from 'src/components/Hero/Hero'
import { H1 } from 'src/components/ui/typography/H1'
import P from 'src/components/ui/typography/P'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Hero />
      <div className="container my-16 flex flex-col items-center justify-center">
        <H1>
          Bring some <span className="font-logo font-normal">Klarity</span> to
          Your Schedule
        </H1>
        <P>
          Shop our exclusive range of planners, journals and notepads today!
        </P>
      </div>
    </>
  )
}

export default HomePage
