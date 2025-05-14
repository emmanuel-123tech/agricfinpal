"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getLenderByEmail, getLenderById, addLender } from "./lender-store"

interface LenderCredentials {
  email: string
  password: string
}

interface LenderRegistration extends LenderCredentials {
  name: string
  organization: string
  phoneNumber: string
}

export async function createLender({ name, email, password, organization, phoneNumber }: LenderRegistration) {
  // Check if lender already exists
  const existingLender = getLenderByEmail(email)

  if (existingLender) {
    throw new Error("Lender with this email already exists")
  }

  // Create new lender
  const newLender = addLender({
    name,
    email,
    password, // In a real app, this would be hashed
    organization,
    phoneNumber,
    isApproved: false, // New lenders need approval
  })

  return { success: true, lenderId: newLender.id }
}

export async function loginLender({ email, password }: LenderCredentials) {
  // Find lender by email
  const lender = getLenderByEmail(email)

  if (!lender || lender.password !== password) {
    throw new Error("Invalid email or password")
  }

  if (!lender.isApproved) {
    throw new Error("Your lender account is pending approval")
  }

  // Set session cookie
  cookies().set("lender_session", lender.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true, lenderId: lender.id }
}

export async function logoutLender() {
  cookies().delete("lender_session")
  redirect("/lender/login")
}

export async function getCurrentLender() {
  const sessionId = cookies().get("lender_session")?.value

  if (!sessionId) {
    return null
  }

  const lender = getLenderById(sessionId)

  if (!lender) {
    return null
  }

  return {
    id: lender.id,
    name: lender.name,
    email: lender.email,
    organization: lender.organization,
    phoneNumber: lender.phoneNumber,
  }
}
