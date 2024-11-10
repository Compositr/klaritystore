import { Link, routes } from '@redwoodjs/router'

import { Button } from '../ui/Button'
import H3 from '../ui/typography/H3'
import P from '../ui/typography/P'

const NotFound = () => {
  return (
    <div className="h-full w-full">
      <div className="container my-8">
        <div className="flex flex-col items-center justify-center border p-8">
          <H3>Page Not Found</H3>
          <P>
            Something&apos;s not quite right... Click the button below to return
            to the homepage.
          </P>
          <Button asChild className="mt-8">
            <Link to={routes.home()}>Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
