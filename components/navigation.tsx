"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { hasRole } from "@/lib/auth"

export default function Navigation() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-gray-900">
              AI Amazon
            </Link>
            <Link href="/test-auth" className="text-sm text-gray-600 hover:text-gray-900">
              Test Auth
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="text-gray-500">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {/* Role-based navigation */}
                {hasRole(session.user, ["ADMIN"]) && (
                  <Link
                    href="/admin"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Admin
                  </Link>
                )}
                
                {hasRole(session.user, ["SELLER", "ADMIN"]) && (
                  <Link
                    href="/seller"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Seller
                  </Link>
                )}
                
                {hasRole(session.user, ["CUSTOMER", "ADMIN"]) && (
                  <Link
                    href="/account"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Account
                  </Link>
                )}

                <span className="text-gray-700">
                  Welcome, {session.user.name} ({session.user.role})
                </span>
                
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
