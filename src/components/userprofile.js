"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, User } from "lucide-react"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("kaChingCurrentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("kaChingCurrentUser")
    window.dispatchEvent(new Event("storage"))
    window.dispatchEvent(new Event("user-logout"))

    navigate("/")
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <User size={16} className="text-green-600" />
        </div>
        <span className="font-medium text-gray-700">{user.name.split(" ")[0]}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile

