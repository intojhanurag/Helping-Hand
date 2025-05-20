import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

function Dashboard(){
  return (
    <div className="container py-6 space-y-6">
      <DashboardHeader />
      
      <DashboardContent />
      
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard/>
    </Suspense>
  );
}



