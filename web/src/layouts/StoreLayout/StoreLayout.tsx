import NavHeader from 'src/components/NavHeader/NavHeader'

type StoreLayoutProps = {
  children?: React.ReactNode
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  return (
    <>
      <NavHeader />
      {children}
    </>
  )
}

export default StoreLayout
