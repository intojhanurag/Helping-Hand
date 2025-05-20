import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { Header } from "@/components/header"
import { AdminProvider } from "@/lib/admin-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Helping Hand",
  description: "Connect with mentors in your field",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0e0a1a]`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AdminProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </AdminProvider>
          <Analytics/>
        </ThemeProvider>

        {/* Twitter widgets script */}
        <Script id="twitter-widgets" strategy="lazyOnload" src="https://platform.twitter.com/widgets.js" />
      </body>
    </html>
  )
}
