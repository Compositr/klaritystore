import AdminSidebar from 'src/components/AdminSidebar/AdminSidebar'
import { Separator } from 'src/components/ui/Separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from 'src/components/ui/Sidebar'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <main className="mx-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
