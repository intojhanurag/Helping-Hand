"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ThumbsUp, ExternalLink, ArrowRight, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Tweet } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useTweetStore } from "@/lib/tweet-store"
import { motion } from "framer-motion"
import { EmbeddedTweet } from "@/components/shared/embedded-tweet"
import { extractTwitterUsername, extractTweetId } from "@/lib/twitter-utils"
import { useAdmin } from "@/lib/admin-context"

interface TweetCardProps {
  tweet: Tweet
  isWaitingList: boolean
}

export function TweetCard({ tweet, isWaitingList }: TweetCardProps) {
  const { toast } = useToast()
  const { isAdmin } = useAdmin()
  const updateTweet = useTweetStore((state) => state.updateTweet)
  const moveToDashboard = useTweetStore((state) => state.moveToDashboard)
  const removeTweet = useTweetStore((state) => state.removeTweet)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const tweetId = extractTweetId(tweet.url)
  const username = extractTwitterUsername(tweet.url) || tweet.author

  // Check local storage on component mount
  useEffect(() => {
    const likedTweets = JSON.parse(localStorage.getItem("likedTweets") || "[]")
    setHasUpvoted(likedTweets.includes(tweet.id))
  }, [tweet.id])

 const handleUpvote = async () => {
  const likedTweets = JSON.parse(localStorage.getItem("likedTweets") || "[]");
  const action = hasUpvoted ? "remove" : "add";

  // Update local state optimistically
  const updatedLikedTweets = hasUpvoted
    ? likedTweets.filter((id: string) => id !== tweet.id)
    : [...likedTweets, tweet.id];

  localStorage.setItem("likedTweets", JSON.stringify(updatedLikedTweets));
  setHasUpvoted(!hasUpvoted);

  toast({
    description: hasUpvoted ? "Upvote removed" : "Tweet upvoted",
  });

  // ✅ Send only the action to the backend
  const res=await fetch(`https://helping-hand-2.onrender.com/${tweet.id}/upvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
  });

  if(res.ok){
    updateTweet(
    {
      ...tweet,
      upvotes: hasUpvoted ? tweet.upvotes - 1 : tweet.upvotes + 1,
    },
    !isWaitingList
  );
  }
};

  const handleMove = () => {
    moveToDashboard(tweet.id)
    toast({
      title: "Tweet moved",
      description: "The tweet has been moved to the dashboard",
    })
  }

  const handleRemove = () => {
    removeTweet(tweet.id, !isWaitingList)
    toast({
      title: "Tweet removed",
      description: `The tweet has been removed from the ${isWaitingList ? "waiting list" : "dashboard"}`,
    })
  }

  // Format the date
  
  const formattedDate = new Date(tweet.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  // Generate profile picture URL based on username
  const profilePicUrl = `https://unavatar.io/twitter/${username}`

  return (
    <Card className="overflow-hidden border-white/10 bg-[#1a1425] transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 bg-[#241c33] p-4">
        <Avatar>
          <AvatarImage src={profilePicUrl || "/placeholder.svg"} alt={tweet.author} />
          <AvatarFallback>{tweet.author.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-medium text-white">{tweet.author}</p>
          <p className="text-xs text-white/50">{formattedDate}</p>
        </div>
        <Badge
          variant="outline"
          className="ml-auto w-fit bg-[#9147ff]/20 text-[#9147ff] border-[#9147ff]/30 hover:bg-[#9147ff]/30"
        >
          {tweet.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 text-white/90">
        {isExpanded && tweetId ? (
          <EmbeddedTweet tweetId={tweetId} />
        ) : (
          <p className="line-clamp-4 text-sm">{tweet.content}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/10 bg-[#241c33] p-4">
        <div className="flex gap-2">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant={hasUpvoted ? "default" : "outline"}
              size="sm"
              className={
                hasUpvoted
                  ? "bg-[#9147ff] text-white hover:bg-[#7a2df0]"
                  : "border-white/20 text-white hover:bg-white/10"
              }
              onClick={handleUpvote}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              {tweet.upvotes}
            </Button>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide Tweet" : "Show Tweet"}
          </Button>

          {isAdmin && isWaitingList && (
            <Button
              variant="default"
              size="sm"
              className="bg-[#9147ff] hover:bg-[#7a2df0] text-white"
              onClick={handleMove}
            >
              <ArrowRight className="mr-1 h-4 w-4" />
              Move
            </Button>
          )}

          {isAdmin && (
            <Button
              variant="destructive"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleRemove}
            >
              <Trash2 className="mr-1 h-4 w-4" />
            
            </Button>
          )}

          <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
            {tweet.url ? (
                <Link href={tweet.url}><ExternalLink/></Link>
              ) : (
                <span>No link available</span>
              )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
