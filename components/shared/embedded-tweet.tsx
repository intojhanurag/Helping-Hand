"use client"

import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface EmbeddedTweetProps {
  tweetId: string
}

export function EmbeddedTweet({ tweetId }: EmbeddedTweetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run if we have the Twitter widgets script
    if (typeof window !== "undefined" && window.twttr) {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
        window.twttr.widgets
          .createTweet(tweetId, containerRef.current, {
            theme: "dark",
            dnt: true,
            cards: "hidden",
          })
          .then(() => {
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Error embedding tweet:", error)
            setIsLoading(false)
          })
      }
    } else {
      // Load the Twitter widgets script if it's not already loaded
      const script = document.createElement("script")
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true
      script.onload = () => {
        if (containerRef.current && window.twttr) {
          containerRef.current.innerHTML = ""
          window.twttr.widgets
            .createTweet(tweetId, containerRef.current, {
              theme: "dark",
              dnt: true,
              cards: "hidden",
            })
            .then(() => {
              setIsLoading(false)
            })
            .catch((error) => {
              console.error("Error embedding tweet:", error)
              setIsLoading(false)
            })
        }
      }
      document.body.appendChild(script)
    }

    return () => {
      // Clean up if needed
    }
  }, [tweetId])

  return (
    <div className="tweet-embed-container">
      {isLoading && (
        <div className="space-y-3 py-4">
          <Skeleton className="h-4 w-3/4 bg-white/10" />
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-2/3 bg-white/10" />
        </div>
      )}
      <div ref={containerRef} className="tweet-embed" />
    </div>
  )
}
