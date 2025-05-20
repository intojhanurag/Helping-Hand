"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Clock,
  LayoutDashboard,
  PlusCircle,
  Code,
  Blocks,
  Server,
  BrainCircuit,
  BookOpen,
  Heart,
  Coffee,
  Sparkles,
  HelpingHand,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const categories = [
  { name: "Web Dev", icon: Code },
  { name: "Web3", icon: Blocks },
  { name: "DevOps", icon: Server },
  { name: "DSA", icon: BrainCircuit },
  { name: "AIML", icon: Sparkles },
  { name: "UPSC", icon: BookOpen },
  { name: "Couple", icon: Heart },
  { name: "Bakchodi", icon: Coffee },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <HelpingHand className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Helping Hand</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/waiting-list"}>
                  <Link href="/waiting-list">
                    <Clock />
                    <span>Waiting List</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/add-tweet"}>
                  <Link href="/add-tweet">
                    <PlusCircle />
                    <span>Add Tweet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <category.icon />
                      <span>{category.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground">© 2025 Helping Hand</p>
      </SidebarFooter>
    </Sidebar>
  )
}
