import H3 from '../ui/typography/H3'
import P from '../ui/typography/P'
import Small from '../ui/typography/Small'

type Links = Array<{
  name: string
  links: Array<{ label: string; to: string }>
}>
const links: Links = [
  // TODO: Add links
  {
    name: 'About Us',
    links: [{ label: 'Contact', to: '/contact' }],
  },
]

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t border-border bg-neutral-800 text-white dark:bg-background dark:text-primary">
      <div className="container flex flex-col py-8 md:grid md:grid-cols-4">
        {/* Left */}
        <div>
          <H3>Klarity</H3>
          <P>
            At Klarity, we believe in bringing beauty and organisation to
            everyday life. From carefully curated stationery and planners to
            artisanal notebooks and desk accessories, each item in our
            collection is chosen to help you create moments of calm and clarity
            in your daily routine. Whether you&apos;re a planning enthusiast, a
            stationery lover, or someone seeking to add a touch of elegance to
            your workspace, we offer thoughtfully selected products that combine
            style with functionality.
          </P>
        </div>
        {/* Right with links */}
        <div className="flex justify-end gap-4 md:col-span-3">
          {links.map((linkCategory) => (
            <div key={linkCategory.name}>
              <P>{linkCategory.name}</P>
            </div>
          ))}
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container py-8">
          <Small>Copyright &copy; {year}</Small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
