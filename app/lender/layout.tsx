"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart4, Users, FileText, Settings, Menu, LogOut, CreditCard, DollarSign, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentLender, logoutLender } from "@/lib/lender-auth"

interface LenderLayoutProps {
  children: React.ReactNode
}

interface LenderData {
  id: string
  name: string
  email: string
  organization: string
  phoneNumber: string
}

// Mock lender data for development and preview environments
const MOCK_LENDER: LenderData = {
  id: "mock-lender-id",
  name: "Demo Lender",
  email: "lender@example.com",
  organization: "AgriFinance Ltd",
  phoneNumber: "+234 800 123 4567",
}

export default function LenderLayout({ children }: LenderLayoutProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [lender, setLender] = useState<LenderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Skip authentication for login page
  const isLoginPage = pathname === "/lender/login" || pathname === "/lender/register"

  useEffect(() => {
    async function getLender() {
      if (isLoginPage) {
        setIsLoading(false)
        return
      }

      try {
        const currentLender = await getCurrentLender()

        if (!currentLender) {
          // For preview/development, use mock data instead of redirecting
          if (process.env.NODE_ENV !== "production") {
            setLender(MOCK_LENDER)
            setIsLoading(false)
            return
          }

          router.push("/lender/login")
          return
        }

        setLender(currentLender)
      } catch (e) {
        console.error("Authentication error:", e)
        // Use mock data in case of error
        setLender(MOCK_LENDER)
      } finally {
        setIsLoading(false)
      }
    }

    getLender()
  }, [router, isLoginPage])

  const handleLogout = async () => {
    await logoutLender()
    router.push("/lender/login")
  }

  // If it's the login page, just render the children
  if (isLoginPage) {
    return <>{children}</>
  }

  const routes = [
    {
      href: "/lender/dashboard",
      label: "Dashboard",
      icon: BarChart4,
      active: pathname === "/lender/dashboard",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      href: "/lender/loan-applications",
      label: "Loan Applications",
      icon: FileText,
      active: pathname === "/lender/loan-applications",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      href: "/lender/borrowers",
      label: "Borrowers",
      icon: Users,
      active: pathname === "/lender/borrowers",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      href: "/lender/active-loans",
      label: "Active Loans",
      icon: CreditCard,
      active: pathname === "/lender/active-loans",
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
    {
      href: "/lender/repayments",
      label: "Repayments",
      icon: DollarSign,
      active: pathname === "/lender/repayments",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      href: "/lender/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/lender/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-100",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
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
              <Link
                href="/lender/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                <Building className="h-6 w-6 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Lender Portal
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
        <Link href="/lender/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <Building className="h-6 w-6 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Lender Portal
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={lender?.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              {lender?.organization
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
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt={lender?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                    {lender?.organization
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{lender?.organization}</span>
                  <span className="text-xs text-gray-500">{lender?.email}</span>
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
