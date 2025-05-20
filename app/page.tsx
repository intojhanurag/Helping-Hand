import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-hero-pattern bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find the Perfect <span className="text-[#9147ff]">Mentor</span>
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Connect with mentors in your field and discover valuable content from the Twitter community.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="px-8 bg-[#9147ff] hover:bg-[#7a2df0] text-white">
                  <Link href="/waiting-list">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8"
                >
                  <Link href="/dashboard">Explore Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#0e0a1a] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Categories</h2>
              <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find mentors and content in your field of interest
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
            {[
              { name: "Web Dev", icon: "💻" },
              { name: "Web3", icon: "🔗" },
              { name: "DevOps", icon: "🚀" },
              { name: "DSA", icon: "🧮" },
              { name: "AIML", icon: "🤖" },
              { name: "UPSC", icon: "📚" },
              { name: "Couple", icon: "❤️" },
              { name: "Bakchodi", icon: "😂" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/dashboard?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex flex-col items-center space-y-2 rounded-lg border border-white/10 bg-[#1a1425] p-4 shadow-sm transition-colors hover:bg-[#241c33]"
              >
                <div className="text-3xl">{category.icon}</div>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a1425] text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community and start discovering valuable content today
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="px-8 bg-[#9147ff] hover:bg-[#7a2df0] text-white">
                <Link href="/add-tweet">
                  Add Your First Tweet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8"
              >
                <Link href="/waiting-list">Browse Waiting List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
