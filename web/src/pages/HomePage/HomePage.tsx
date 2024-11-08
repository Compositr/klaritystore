import { PackageOpen, Phone, ThumbsUp } from 'lucide-react'

import { Metadata } from '@redwoodjs/web'

import Hero from 'src/components/Hero/Hero'
import H1 from 'src/components/ui/typography/H1'
import H3 from 'src/components/ui/typography/H3'
import Muted from 'src/components/ui/typography/Muted'
import P from 'src/components/ui/typography/P'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Hero />
      <section className="container my-16 flex flex-col items-center justify-center">
        <H1>
          Bring some <span className="font-logo font-normal">Klarity</span> to
          Your Schedule
        </H1>
        <P>
          Shop our exclusive range of planners, journals and notepads today!
        </P>
      </section>
      <section className="container my-16">
        <H3>
          The <span className="font-logo font-normal">Klarity</span> promise
        </H3>
        <div className="mt-6 flex flex-wrap items-center justify-around gap-6 lg:justify-between lg:gap-0">
          <IconPromise
            title="Fast Shipping"
            description="Fast and free shipping across Australia"
            icon={<PackageOpen size="50" />}
          />
          <IconPromise
            title="Quality Products"
            description="Premium materials and quality you can trust"
            icon={<ThumbsUp size="50" />}
          />
          <IconPromise
            title="Kind Service"
            description="Making your shopping experience a breeze"
            icon={<Phone size="50" />}
          />
        </div>
      </section>
    </>
  )
}

export default HomePage

interface IconPromiseProps {
  title: string
  description: string
  icon: React.ReactNode
}
function IconPromise({ title, description, icon }: IconPromiseProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>{icon}</div>
      <P>{title}</P>
      <Muted>{description}</Muted>
    </div>
  )
}
