"use client"

import { DashboardHeader } from "@/components/pageComponents/dashboard/DashboardHeader"
import { TeamMetrics } from "@/components/pageComponents/dashboard/TeamMetrics"
import { SmartAlerts } from "@/components/pageComponents/dashboard/SmartAlerts"
import { SalesCharts } from "@/components/pageComponents/dashboard/SalesCharts"
import { RepresentativesTable } from "@/components/pageComponents/dashboard/RepresentativesTable"

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6 p-4 md:p-8">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TeamMetrics />
        </div>
        <div>
          <SmartAlerts />
        </div>
      </div>
      <div>
        <SalesCharts />
      </div>
      <RepresentativesTable />
    </div>
  )
}