import { Button } from '../ui/Button'
import { H1 } from '../ui/typography/H1'

const Hero = () => {
  return (
    <div className="relative isolate h-[50vh]">
      {/* Image container */}
      <div className="absolute inset-0">
        <img
          // TODO: Replace this image with a real image
          src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1440"
          alt="Background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 z-10 w-full p-8">
        <div className="container text-white">
          <H1>Klarity Collection</H1>
          <Button className="mt-8" variant="secondary" size="lg">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
