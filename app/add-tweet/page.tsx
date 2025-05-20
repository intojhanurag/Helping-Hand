import { AddTweetForm } from "@/components/add-tweet/add-tweet-form"

export default function AddTweetPage() {
  return (
    <div className="container max-w-2xl py-6">
      <div className="bg-[#1a1425] p-6 rounded-xl border border-white/10 shadow-sm mb-6">
        <h1 className="text-3xl font-bold text-white">Add Tweet</h1>
        <p className="text-white/70">Share valuable content with the community</p>
      </div>
      <AddTweetForm />
    </div>
  )
}
