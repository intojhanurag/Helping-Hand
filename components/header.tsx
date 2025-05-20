"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Handshake, Menu } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import { AdminLoginDialog } from "@/components/admin-login-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const { isAdmin, setShowLoginDialog } = useAdmin()
  const [open, setOpen] = useState(false) // 🔹 control mobile menu

  // 🔸 function to close menu on click
  const handleMenuClick = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0e0a1a] text-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Handshake className="h-7 w-7 text-[#9147ff]" />
          <Link href="/" className="text-2xl font-semibold tracking-tight font-serif">
            Helping Hands
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { href: "/waiting-list", label: "Waiting List" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/about", label: "About" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-white/80 ${
                pathname === href ? "text-white" : "text-white/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="gap-1 bg-[#9147ff] hover:bg-[#7a2df0] text-white"
          >
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

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0e0a1a] text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-4">
                <Link href="/waiting-list" onClick={handleMenuClick}>
                  Waiting List
                </Link>
                <Link href="/dashboard" onClick={handleMenuClick}>
                  Dashboard
                </Link>
                <Link href="/about" onClick={handleMenuClick}>
                  About
                </Link>
                <Link href="/add-tweet" className="flex items-center gap-2" onClick={handleMenuClick}>
                  <PlusCircle className="h-4 w-4" />
                  Add
                </Link>
                {isAdmin ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#9147ff] hover:bg-[#7a2df0]"
                    onClick={handleMenuClick}
                  >
                    Admin Mode
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => {
                      setShowLoginDialog(true)
                      setOpen(false) // 🔸 also close menu
                    }}
                  >
                    Admin Login
                  </Button>
                )}
                <AdminLoginDialog />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
