"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Authentication Test Page</h1>
          <p className="mt-2 text-gray-600">
            Test the authentication system and role-based access control
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Session Status</h2>
          
          {status === "loading" ? (
            <div className="text-gray-600">Loading session...</div>
          ) : session ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Name:</span> {session.user.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {session.user.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {session.user.role}
                </div>
                <div>
                  <span className="font-medium">User ID:</span> {session.user.id}
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-gray-600">Not signed in</div>
              <div className="space-x-4">
                <Link
                  href="/auth/signin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Protected Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin"
              className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/seller"
              className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700"
            >
              Seller Dashboard
            </Link>
            <Link
              href="/account"
              className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700"
            >
              Customer Account
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Sample Login Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Admin User</h3>
              <p className="text-sm text-gray-600">Email: admin@example.com</p>
              <p className="text-sm text-gray-600">Password: admin123</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Customer User</h3>
              <p className="text-sm text-gray-600">Email: customer@example.com</p>
              <p className="text-sm text-gray-600">Password: customer123</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Seller User</h3>
              <p className="text-sm text-gray-600">Email: seller@example.com</p>
              <p className="text-sm text-gray-600">Password: seller123</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
