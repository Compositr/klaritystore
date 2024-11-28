import { MoveRight, TrendingDown, TrendingUp } from 'lucide-react'

import { Metadata } from '@redwoodjs/web'

import CurrencyFormat from 'src/components/CurrencyFormat/CurrencyFormat'
import StatCard from 'src/components/StatCard/StatCard'
import H3 from 'src/components/ui/typography/H3'
import Muted from 'src/components/ui/typography/Muted'
import { Component as VisitorChart } from 'src/components/VisitorChart/VisitorChart'

const AdminPage = () => {
  return (
    <>
      <Metadata
        title="Admin"
        description="Administration and management interface"
      />
      <H3>Management Interface</H3>
      <Muted>NB: This data is not real...</Muted>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard
            title="Sales"
            description="Past 30d totals"
            descriptionEnd={
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp /> 12.5%
              </div>
            }
          >
            <CurrencyFormat value={10302.32} />
          </StatCard>
          <StatCard
            title="Orders"
            description="Past 30d totals"
            descriptionEnd={
              <div className="flex items-center gap-2 text-red-500">
                <TrendingDown /> -2.3%
              </div>
            }
          >
            {(1023).toLocaleString()}
          </StatCard>
          <StatCard
            title="Page Views"
            description="Past 30d totals"
            descriptionEnd={
              <div className="flex items-center gap-2 text-gray-500">
                <MoveRight /> ~0%
              </div>
            }
          >
            {(166127).toLocaleString()}
          </StatCard>
        </div>

        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <VisitorChart />
        </div>
      </div>
    </>
  )
}

export default AdminPage
