"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, Handshake } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import { AdminLoginDialog } from "@/components/admin-login-dialog"

export function Header() {
  const pathname = usePathname()
  const { isAdmin, setShowLoginDialog } = useAdmin()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0e0a1a] text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Handshake className="h-7 w-7 text-[#9147ff]" />
          <Link href="/" className="text-2xl font-bold">
            HELPING HAND
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/waiting-list"
            className={`text-sm font-medium transition-colors hover:text-white/80 ${
              pathname === "/waiting-list" ? "text-white" : "text-white/70"
            }`}
          >
            Waiting List
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-white/80 ${
              pathname === "/dashboard" ? "text-white" : "text-white/70"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-white/80 ${
              pathname === "/about" ? "text-white" : "text-white/70"
            }`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild variant="secondary" size="sm" className="gap-1 bg-[#9147ff] hover:bg-[#7a2df0] text-white">
            <Link href="/add-tweet">
              <PlusCircle className="h-4 w-4" />
              <span>Add</span>
            </Link>
          </Button>
          {isAdmin ? (
            <Button variant="default" size="sm" className="bg-[#9147ff] hover:bg-[#7a2df0]">
              Admin Mode
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowLoginDialog(true)}
            >
              Admin Login
            </Button>
          )}
          <AdminLoginDialog />
        </div>
      </div>
    </header>
  )
}
