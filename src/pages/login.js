"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { AuthProviders } from "../components/AuthProviders"
import { ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

const LoginPage = () => {
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      setIsSubmitting(false)
      return
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("kaChingUsers") || "[]")

    // Find user with matching email and password
    const user = users.find((u) => u.email === formData.email && u.password === formData.password)

    if (!user) {
      setError("Invalid email or password")
      setIsSubmitting(false)
      return
    }

    // Store logged in user info (without password)
    const { password, ...userInfo } = user
    localStorage.setItem("kaChingCurrentUser", JSON.stringify(userInfo))

    // Redirect to dashboard or home
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  return (
    <AuthLayout>
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
          aria-label="Go back to homepage"
        >
          <ArrowLeft size={20} className="text-[#5a7d53]" />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-4 tracking-tight">WELCOME BACK</h1>
          <p className="text-lg text-gray-600">Sign in to your investment learning platform</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <img src="coin.png" alt="Ka-Ching coin" className="w-10 h-10" />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>


        <div className="mt-8 text-center text-gray-600 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <p>
            New to Ka-Ching?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>{" "}
            to start your investment journey.
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage

