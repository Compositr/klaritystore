import { Metadata } from '@redwoodjs/web'

import OrdersCell from 'src/components/OrdersCell'
import H3 from 'src/components/ui/typography/H3'

const AdminOrdersPage = () => {
  return (
    <>
      <Metadata title="Manage Orders" />

      <div className="mb-4">
        <H3>Manage Orders</H3>
      </div>
      <OrdersCell />
    </>
  )
}

export default AdminOrdersPage
