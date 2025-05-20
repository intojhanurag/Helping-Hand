"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdmin } from "@/lib/admin-context"
import { useToast } from "@/hooks/use-toast"

export function AdminLoginDialog() {
  const { showLoginDialog, setShowLoginDialog, login } = useAdmin()
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = () => {
    setIsLoading(true)

    // Simulate a delay for better UX
    setTimeout(() => {
      const success = login(password)

      if (success) {
        toast({
          title: "Login successful",
          description: "You now have admin privileges",
        })
        setShowLoginDialog(false)
      } else {
        toast({
          title: "Login failed",
          description: "Incorrect password",
          variant: "destructive",
        })
      }

      setPassword("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent className="sm:max-w-md bg-[#1a1425] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin()
                }
              }}
              className="bg-[#241c33] border-white/10 text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowLoginDialog(false)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button onClick={handleLogin} disabled={isLoading} className="bg-[#9147ff] hover:bg-[#7a2df0] text-white">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
