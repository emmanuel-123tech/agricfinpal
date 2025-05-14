// Simple in-memory user store for demonstration purposes
// In a real application, you would use a database

interface User {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
}

// In-memory user store
const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
  },
]

export function getUsers() {
  return users
}

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email)
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id)
}

export function addUser(user: Omit<User, "id">) {
  const newUser = {
    ...user,
    id: Date.now().toString(), // Simple ID generation
  }
  users.push(newUser)
  return newUser
}
