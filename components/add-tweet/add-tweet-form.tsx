"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useTweetStore } from "@/lib/tweet-store"
import { v4 as uuidv4 } from "uuid"
import { extractTwitterUsername } from "@/lib/twitter-utils"

const categories = ["Cracked Dev", "Web3", "DevOps", "DSA", "AIML", "Open Source", "Couple", "Bakchodi"]

const formSchema = z.object({
  tweetUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine((url) => url.includes("twitter.com") || url.includes("x.com"), {
      message: "URL must be from Twitter or X",
    }),
  category: z.string({ required_error: "Please select a category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export function AddTweetForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const addTweet = useTweetStore((state) => state.addTweet)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tweetUrl: "",
      category: "",
      description: "",
    },
  })

  // Extract username from URL when it changes
  const watchTweetUrl = form.watch("tweetUrl")

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    // Extract username from the tweet URL
    const username = extractTwitterUsername(values.tweetUrl) || "unknown_user"

    // Create a new tweet object
    const newTweet = {
      id: uuidv4(),
      author: username,
      content: values.description,
      url: values.tweetUrl,
      category: values.category,
      upvotes: 0,
      timestamp: new Date().toISOString(),
    }

    // Add the tweet to the store
    addTweet(newTweet)
    

    // Show success toast
    toast({
      title: "Tweet submitted successfully",
      description: "Your tweet has been added to the waiting list",
    })

    setIsSubmitting(false)
    
      router.push("/waiting-list");
   
  }

  return (
    <div className="bg-[#1a1425] rounded-xl border border-white/10 shadow-sm p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="tweetUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Tweet URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/username/status/123456789"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setPreviewUrl(e.target.value)
                    }}
                    className="bg-[#241c33] border-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#241c33] border-white/10 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#241c33] border-white/10 text-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="focus:bg-[#9147ff]/20 focus:text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a brief description about this tweet and why it's valuable"
                    className="min-h-[120px] bg-[#241c33] border-white/10 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="px-8 bg-[#9147ff] hover:bg-[#7a2df0] text-white">
              {isSubmitting ? "Submitting..." : "Submit Tweet"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
