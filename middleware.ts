import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup" || path === "/"

  // Get the session cookie
  const sessionCookie = request.cookies.get("session")?.value

  // Check if user is authenticated
  const isAuthenticated = sessionCookie ? true : false

  // Skip authentication check during development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login if trying to access protected route without authentication
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && isPublicPath && path !== "/") {
    // Redirect to dashboard if already authenticated and trying to access login/signup
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
