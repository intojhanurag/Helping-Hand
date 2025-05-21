"use client"
import { useSearchParams } from "next/navigation"
import { TweetCard } from "@/components/shared/tweet-card"
import { useTweetStore } from "@/lib/tweet-store"
import { motion } from "framer-motion"
import { useEffect } from "react"

export function WaitingListContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
 

  // Filter tweets by category
  useEffect(() => {
  useTweetStore.getState().fetchTweets()
}, [])
 const waitingList = useTweetStore((state) => state.waitingList)
  const filteredTweets = waitingList
    .filter(
      (tweet) => {
        const normalizedCategory = tweet.category.toLowerCase().replace(/\s+/g, "-")
        return !categoryParam || normalizedCategory === categoryParam.toLowerCase()

      }
      // !categoryParam || tweet.category.toLowerCase() === categoryParam.toLowerCase()
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredTweets.length > 0 ? (
        filteredTweets.map((tweet) => (
          <motion.div key={tweet.id} variants={item}>
            <TweetCard tweet={tweet} isWaitingList={true} />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-white">
          <h3 className="text-xl font-medium">No tweets found</h3>
          <p className="text-white/70">
            {categoryParam ? `No tweets found in the ${categoryParam} category` : "No tweets in the waiting list"}
          </p>
        </div>
      )}
    </motion.div>
  )
}
