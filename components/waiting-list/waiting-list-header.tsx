import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CategoryFilter } from "@/components/shared/category-filter"
import { PlusCircle } from "lucide-react"

export function WaitingListHeader() {
  return (
    <div className="flex flex-col gap-4 bg-[#1a1425] p-6 rounded-xl border border-white/10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Waiting List</h1>
          <p className="text-white/70">Tweets waiting for admin approval</p>
        </div>
        <Button asChild className="gap-2 bg-[#9147ff] hover:bg-[#7a2df0] text-white mt-4 md:mt-0">
          <Link href="/add-tweet">
            <PlusCircle className="h-4 w-4" />
            Add Tweet
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto pb-2">
        <CategoryFilter />
      </div>
    </div>
  )
}
