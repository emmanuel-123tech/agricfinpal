"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart4, Brain, CreditCard, LayoutDashboard, Menu, Settings, User, Leaf, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getCurrentUser, logoutUser } from "@/lib/auth"

interface SidebarProps {
  children: React.ReactNode
}

interface UserData {
  id: string
  name: string
  email: string
}

// Mock user data for development and preview environments
const MOCK_USER: UserData = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@example.com",
}

export default function DashboardLayout({ children }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
          // For preview/development, use mock data instead of redirecting
          if (process.env.NODE_ENV !== "production") {
            setUser(MOCK_USER)
            setIsLoading(false)
            return
          }

          router.push("/login")
          return
        }

        setUser(currentUser)
      } catch (e) {
        console.error("Authentication error:", e)
        // Use mock data in case of error
        setUser(MOCK_USER)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await logoutUser()
    router.push("/login")
  }

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      href: "/dashboard/ai",
      label: "AI Farming Guide",
      icon: Brain,
      active: pathname === "/dashboard/ai",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      href: "/dashboard/performance",
      label: "Performance",
      icon: BarChart4,
      active: pathname === "/dashboard/performance",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      href: "/dashboard/credit",
      label: "Credit Score",
      icon: CreditCard,
      active: pathname === "/dashboard/credit",
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
      active: pathname === "/dashboard/profile",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-100",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  AgricFinPal
                </span>
              </Link>
            </div>
            <nav className="grid gap-2 p-4 text-lg font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    route.active
                      ? `${route.bgColor} ${route.color}`
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <route.icon className={`h-5 w-5 ${route.active ? route.color : "text-gray-400"}`} />
                  {route.label}
                </Link>
              ))}
              <div className="mt-6 border-t pt-6">
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 text-gray-400" />
                  Logout
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            AgricFinPal
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-white md:block">
          <div className="flex h-full flex-col">
            <div className="flex flex-col gap-2 p-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    route.active
                      ? `${route.bgColor} ${route.color} shadow-sm`
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-md ${route.active ? route.bgColor : "bg-gray-100"}`}
                  >
                    <route.icon className={`h-5 w-5 ${route.active ? route.color : "text-gray-400"}`} />
                  </div>
                  <span>{route.label}</span>
                  {route.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-current"></div>}
                </Link>
              ))}
            </div>
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                <Avatar className="h-9 w-9 border border-gray-200">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
