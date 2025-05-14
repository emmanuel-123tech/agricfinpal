// Simple in-memory lender store for demonstration purposes
// In a real application, you would use a database

interface Lender {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  organization: string
  phoneNumber: string
  isApproved: boolean
}

// In-memory lender store
const lenders: Lender[] = [
  {
    id: "1",
    name: "AgriFinance Ltd",
    email: "lender@example.com",
    password: "password123",
    organization: "AgriFinance Ltd",
    phoneNumber: "+234 800 123 4567",
    isApproved: true,
  },
]

export function getLenders() {
  return lenders
}

export function getLenderByEmail(email: string) {
  return lenders.find((lender) => lender.email === email)
}

export function getLenderById(id: string) {
  return lenders.find((lender) => lender.id === id)
}

export function addLender(lender: Omit<Lender, "id">) {
  const newLender = {
    ...lender,
    id: Date.now().toString(), // Simple ID generation
  }
  lenders.push(newLender)
  return newLender
}

export function approveLender(id: string) {
  const lender = getLenderById(id)
  if (lender) {
    lender.isApproved = true
    return true
  }
  return false
}
