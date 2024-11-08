import Footer from 'src/components/Footer/Footer'
import NavHeader from 'src/components/NavHeader/NavHeader'

type StoreLayoutProps = {
  children?: React.ReactNode
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

export default StoreLayout
