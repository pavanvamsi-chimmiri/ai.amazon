import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/auth/signin")
  }
  
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  
  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized")
  }
  
  return user
}

export async function requireAdmin() {
  return requireRole(["ADMIN"])
}

export async function requireSeller() {
  return requireRole(["SELLER", "ADMIN"])
}

export async function requireCustomer() {
  return requireRole(["CUSTOMER", "ADMIN"])
}

export function hasRole(user: { role: string } | null | undefined, roles: string[]) {
  return user && roles.includes(user.role)
}

export function isAdmin(user: { role: string } | null | undefined) {
  return hasRole(user, ["ADMIN"])
}

export function isSeller(user: { role: string } | null | undefined) {
  return hasRole(user, ["SELLER", "ADMIN"])
}

export function isCustomer(user: { role: string } | null | undefined) {
  return hasRole(user, ["CUSTOMER", "ADMIN"])
}
