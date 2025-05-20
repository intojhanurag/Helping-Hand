import { Suspense } from "react"
import { WaitingListHeader } from "@/components/waiting-list/waiting-list-header"
import { WaitingListContent } from "@/components/waiting-list/waiting-list-content"
import { WaitingListSkeleton } from "@/components/waiting-list/waiting-list-skeleton"

function WaitingListPageContent() {
  return (
    <div className="container py-6 space-y-6">
      <WaitingListHeader />
      <WaitingListContent />
    </div>
  );
}

export default function WaitingListPage() {
  return (
    <Suspense fallback={<WaitingListSkeleton />}>
      <WaitingListPageContent />
    </Suspense>
  );
}
