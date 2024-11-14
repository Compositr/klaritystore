import AdminSidebar from 'src/components/AdminSidebar/AdminSidebar'
import { SidebarInset, SidebarProvider } from 'src/components/ui/Sidebar'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
