import { Metadata } from '@redwoodjs/web'

import StatCard from 'src/components/StatCard/StatCard'
import TestChart from 'src/components/TestChart/TestChart'
import H3 from 'src/components/ui/typography/H3'

const AdminPage = () => {
  return (
    <>
      <Metadata
        title="Admin"
        description="Administration and management interface"
      />
      <H3>Management Interface</H3>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3">
          <StatCard title="Sales" description="Past 30d totals" />
          <div className="aspect-video rounded-xl bg-muted">stat card</div>
          <div className="aspect-video rounded-xl bg-muted">stat card</div>
        </div>

        <TestChart />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  )
}

export default AdminPage
