import { Suspense } from "react"
import { WaitingListHeader } from "@/components/waiting-list/waiting-list-header"
import { WaitingListContent } from "@/components/waiting-list/waiting-list-content"
import { WaitingListSkeleton } from "@/components/waiting-list/waiting-list-skeleton"

export default function WaitingListPage() {
  return (
    <div className="container py-6 space-y-6">
      <WaitingListHeader />
      <Suspense fallback={<WaitingListSkeleton />}>
        <WaitingListContent />
      </Suspense>
    </div>
  )
}
