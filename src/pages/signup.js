"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

const Signup = () => {
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: "", message: "" })

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
    setFormMessage({ type: "", message: "" })

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setFormMessage({
        type: "error",
        message: "All fields are required",
      })
      setIsSubmitting(false)
      return
    }

    if (formData.password.length < 6) {
      setFormMessage({
        type: "error",
        message: "Password must be at least 6 characters",
      })
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormMessage({
        type: "error",
        message: "Please enter a valid email address",
      })
      setIsSubmitting(false)
      return
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("kaChingUsers") || "[]")
    const userExists = existingUsers.some((user) => user.email === formData.email)

    if (userExists) {
      setFormMessage({
        type: "error",
        message: "An account with this email already exists",
      })
      setIsSubmitting(false)
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password, // In a real app, you would hash this password
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    localStorage.setItem("kaChingUsers", JSON.stringify([...existingUsers, newUser]))

    // Set the current user in localStorage to log them in
    localStorage.setItem("kaChingCurrentUser", JSON.stringify(newUser))

    // Show success message
    setFormMessage({
      type: "success",
      message: "Account created successfully! Redirecting to courses...",
    })

    // Redirect to courses page after a delay
    setTimeout(() => {
      navigate("/courses")
    }, 1500)
  }

  return (
    <AuthLayout>
      {/* Back Button at the Top-Left of the Page */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
          aria-label="Go back to homepage"
        >
          <ArrowLeft size={20} className="text-[#5a7d53]" />
        </button>
      </div>

      {/* Centered Card */}
      <div className="flex justify-center items-center h-full mt-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-4 tracking-tight">JOIN KA-CHING</h1>
            <p className="text-lg text-gray-600">Start your investment learning journey</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src="coin.png" alt="Ka-Ching coin" className="w-20 h-20 animate-spin-slow" />
            </div>
          </div>

          {/* Form message */}
          {formMessage.message && (
            <div
              className={`mb-4 p-3 rounded-md flex items-center ${
                formMessage.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {formMessage.type === "error" ? (
                <AlertCircle className="mr-2 h-5 w-5" />
              ) : (
                <CheckCircle className="mr-2 h-5 w-5" />
              )}
              <span>{formMessage.message}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your full name"
                required
              />
            </div>

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
                  placeholder="Create a password"
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
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx="true">{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </AuthLayout>
  )
}

export default Signup

