"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { addUser, getUserByEmail, getUserById } from "./auth-store"

interface UserCredentials {
  email: string
  password: string
}

interface UserRegistration extends UserCredentials {
  name: string
}

export async function createUser({ name, email, password }: UserRegistration) {
  // Check if user already exists
  const existingUser = getUserByEmail(email)

  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Create new user
  const newUser = addUser({
    name,
    email,
    password, // In a real app, this would be hashed
  })

  return { success: true, userId: newUser.id }
}

export async function loginUser({ email, password }: UserCredentials) {
  // Find user by email
  const user = getUserByEmail(email)

  // For development/preview environments, allow any login
  if (process.env.NODE_ENV !== "production" && !user) {
    const mockUser = addUser({
      name: "Demo User",
      email,
      password,
    })

    cookies().set("session", mockUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, userId: mockUser.id }
  }

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password")
  }

  // Set session cookie
  cookies().set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true, userId: user.id }
}

export async function logoutUser() {
  cookies().delete("session")
  redirect("/login")
}

export async function getCurrentUser() {
  const sessionId = cookies().get("session")?.value

  if (!sessionId) {
    return null
  }

  const user = getUserById(sessionId)

  if (!user) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}
