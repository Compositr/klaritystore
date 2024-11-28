import heroImgSrc from 'assets/img/hero.jpeg'

import { Link, routes } from '@redwoodjs/router'

import { Button } from '../ui/Button'
import H1 from '../ui/typography/H1'

const Hero = () => {
  return (
    <div className="relative isolate h-[50vh]">
      {/* Image container */}
      <div className="absolute inset-0">
        <img
          src={heroImgSrc}
          alt="Background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 z-10 w-full p-8">
        <div className="container text-white">
          <H1>Klarity Collection</H1>
          <Button asChild className="mt-8" variant="secondary" size="lg">
            <Link
              to={routes.category({
                idString: 'diaries',
              })}
            >
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
