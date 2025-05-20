"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All Categories", icon: "🔍" },
  { name: "Cracked Dev", icon: "💻" },
  { name: "Web3", icon: "🔗" },
  { name: "DevOps", icon: "🚀" },
  { name: "DSA", icon: "🧮" },
  { name: "AIML", icon: "🤖" },
  { name: "Open Source", icon: "📚" },
  { name: "Couple", icon: "❤️" },
  { name: "Bakchodi", icon: "😂" },
]

export function CategoryFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || ""

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === "All Categories") {
      params.delete("category")
    } else {
      params.set("category", value.toLowerCase().replace(/\s+/g, "-"))
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => handleCategoryChange(category.name)}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            category.name === "All Categories" && !currentCategory
              ? "bg-[#9147ff] text-white"
              : currentCategory === category.name.toLowerCase().replace(/\s+/g, "-")
                ? "bg-[#9147ff] text-white"
                : "bg-[#241c33] text-white/80 hover:bg-[#9147ff]/30 hover:text-white",
          )}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}
