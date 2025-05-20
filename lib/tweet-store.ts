import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Tweet } from "./types"
import { mockTweets } from "./mock-data"

interface TweetState {
  waitingList: Tweet[]
  dashboard: Tweet[]
  addTweet: (tweet: Tweet) => void
  moveToDashboard: (id: string) => void
  updateTweet: (updatedTweet: Tweet, inDashboard: boolean) => void
  removeTweet: (id: string, inDashboard: boolean) => void
}

export const useTweetStore = create<TweetState>()(
  persist(
    (set) => ({
      waitingList: mockTweets.filter((tweet) => tweet.upvotes < 10),
      dashboard: mockTweets.filter((tweet) => tweet.upvotes >= 10),

      addTweet: (tweet) =>
        set((state) => ({
          waitingList: [tweet, ...state.waitingList],
        })),

      moveToDashboard: (id) =>
        set((state) => {
          const tweetToMove = state.waitingList.find((tweet) => tweet.id === id)
          if (!tweetToMove) return state

          return {
            waitingList: state.waitingList.filter((tweet) => tweet.id !== id),
            dashboard: [tweetToMove, ...state.dashboard],
          }
        }),

      updateTweet: (updatedTweet, inDashboard) =>
        set((state) => {
          if (inDashboard) {
            return {
              dashboard: state.dashboard.map((tweet) => (tweet.id === updatedTweet.id ? updatedTweet : tweet)),
            }
          } else {
            return {
              waitingList: state.waitingList.map((tweet) => (tweet.id === updatedTweet.id ? updatedTweet : tweet)),
            }
          }
        }),

      removeTweet: (id, inDashboard) =>
        set((state) => {
          if (inDashboard) {
            return {
              dashboard: state.dashboard.filter((tweet) => tweet.id !== id),
            }
          } else {
            return {
              waitingList: state.waitingList.filter((tweet) => tweet.id !== id),
            }
          }
        }),
    }),
    {
      name: "tweet-storage",
    },
  ),
)
