import { create } from "zustand"
import type { Tweet } from "./types"

interface TweetState {
  waitingList: Tweet[]
  dashboard: Tweet[]
  fetchTweets: () => void
  addTweet: (tweet: Tweet) => void
  moveToDashboard: (id: string) => void
  updateTweet: (updatedTweet: Tweet, inDashboard: boolean) => void
  removeTweet: (id: string, inDashboard: boolean) => void
}

export const useTweetStore = create<TweetState>((set, get) => ({
  waitingList: [],
  dashboard: [],

  fetchTweets: async () => {
    const [waitingRes, dashboardRes] = await Promise.all([
      fetch("https://helping-hand-2.onrender.com/tweets/waiting"),
      fetch("https://helping-hand-2.onrender.com/tweets/dashboard"),
    ])
    const waitingList = await waitingRes.json()
    const dashboard = await dashboardRes.json()
    set({ waitingList, dashboard })
  },

  addTweet: async (tweet) => {
    const res = await fetch("https://helping-hand-2.onrender.com/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tweet),
    })
    const newTweet = await res.json()
    set((state) => ({
      waitingList: [newTweet, ...state.waitingList],
    }))
  },

  moveToDashboard: async (id) => {
    const tweetToMove = get().waitingList.find((t) => t.id === id)
    if (!tweetToMove) return

    const updated = { ...tweetToMove, upvotes: 10 } // or any logic you use

    const res = await fetch(`https://helping-hand-2.onrender.com/tweets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })

    const newTweet = await res.json()

    set((state) => ({
      waitingList: state.waitingList.filter((tweet) => tweet.id !== id),
      dashboard: [newTweet, ...state.dashboard],
    }))
  },

  updateTweet: async (updatedTweet, inDashboard) => {
    const res = await fetch(`https://helping-hand-2.onrender.com/tweets/${updatedTweet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTweet),
    })
    const newTweet = await res.json()

    set((state) => {
      const listKey = inDashboard ? "dashboard" : "waitingList"
      return {
        [listKey]: state[listKey].map((tweet) =>
          tweet.id === newTweet.id ? newTweet : tweet,
        ),
      }
    })
  },

  removeTweet: async (id, inDashboard) => {
    await fetch(`https://helping-hand-2.onrender.com/tweets/${id}`, {
      method: "DELETE",
    })

    set((state) => {
      const listKey = inDashboard ? "dashboard" : "waitingList"
      return {
        [listKey]: state[listKey].filter((tweet) => tweet.id !== id),
      }
    })
  },
}))
