"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Heart, Clock, Play, Video, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Hearts = forwardRef(({ onHeartLost, onHeartGained }, ref) => {
  const navigate = useNavigate()
  const [hearts, setHearts] = useState(5)
  const [maxHearts, setMaxHearts] = useState(5)
  const [nextHeartTime, setNextHeartTime] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [showReplenishModal, setShowReplenishModal] = useState(false)
  const [showAdModal, setShowAdModal] = useState(false)
  const [adCompleted, setAdCompleted] = useState(false)
  const [adTimer, setAdTimer] = useState(5) // 5 second ad timer

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    loseHeart: () => loseHeart(),
    addHeart: () => addHeart(),
  }))

  // Load hearts from localStorage on component mount
  useEffect(() => {
    const savedHearts = localStorage.getItem("kaChingHearts")
    const savedNextHeartTime = localStorage.getItem("kaChingNextHeartTime")

    if (savedHearts) {
      setHearts(Number.parseInt(savedHearts))
    }

    if (savedNextHeartTime) {
      const nextTime = Number.parseInt(savedNextHeartTime)
      setNextHeartTime(nextTime)

      // If the next heart time has passed, add a heart
      if (nextTime && nextTime < Date.now()) {
        addHeart()
        setNextHeartTime(null)
        localStorage.removeItem("kaChingNextHeartTime")
      }
    }
  }, [])

  // Save hearts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kaChingHearts", hearts.toString())

    if (nextHeartTime) {
      localStorage.setItem("kaChingNextHeartTime", nextHeartTime.toString())
    }
  }, [hearts, nextHeartTime])

  // Timer for heart regeneration
  useEffect(() => {
    if (!nextHeartTime) return

    const interval = setInterval(() => {
      const now = Date.now()
      if (nextHeartTime <= now) {
        // Add a heart when the time is up
        addHeart()
        setNextHeartTime(null)
        clearInterval(interval)
      } else {
        // Update the time remaining
        const remaining = Math.ceil((nextHeartTime - now) / 1000)
        setTimeRemaining(remaining)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [nextHeartTime])

  // Ad timer countdown
  useEffect(() => {
    if (!showAdModal || adCompleted) return

    const timer = setInterval(() => {
      setAdTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setAdCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showAdModal, adCompleted])

  // Format the time remaining into hours, minutes, seconds
  const formatTimeRemaining = () => {
    if (!timeRemaining) return ""

    const hours = Math.floor(timeRemaining / 3600)
    const minutes = Math.floor((timeRemaining % 3600) / 60)
    const seconds = timeRemaining % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  // Lose a heart
  const loseHeart = () => {
    if (hearts > 0) {
      const newHearts = hearts - 1
      setHearts(newHearts)

      // If this is the first heart lost, start the regeneration timer
      if (newHearts === maxHearts - 1 && !nextHeartTime) {
        startHeartRegeneration()
      }

      if (onHeartLost) onHeartLost()

      // Show replenish modal if hearts are low
      if (newHearts <= 1) {
        setShowReplenishModal(true)
      }

      return true
    }

    // No hearts left, show replenish modal
    setShowReplenishModal(true)
    return false
  }

  // Add a heart
  const addHeart = () => {
    if (hearts < maxHearts) {
      const newHearts = hearts + 1
      setHearts(newHearts)

      // If we're still not at max hearts, start the regeneration timer for the next heart
      if (newHearts < maxHearts) {
        startHeartRegeneration()
      }

      if (onHeartGained) onHeartGained()
      return true
    }
    return false
  }

  // Start the heart regeneration timer
  const startHeartRegeneration = () => {
    // Set the next heart time to 4 hours from now
    const nextTime = Date.now() + 4 * 60 * 60 * 1000 // 4 hours
    setNextHeartTime(nextTime)
  }

  // Watch an ad to get a heart
  const watchAd = () => {
    setShowReplenishModal(false)
    setShowAdModal(true)
    setAdTimer(5)
    setAdCompleted(false)
  }

  // Close ad and add heart
  const closeAd = () => {
    if (adCompleted) {
      addHeart()
    }
    setShowAdModal(false)
  }

  // Practice to earn a heart
  const practice = () => {
    // Close the modal first
    setShowReplenishModal(false)

    // Use navigate to go to the practice page
    navigate("/practice")
  }

  return (
    <div className="relative">
      {/* Hearts display */}
      <div
        className="flex items-center bg-white rounded-full px-3 py-1 shadow-md cursor-pointer"
        onClick={() => setShowReplenishModal(true)}
      >
        <div className="flex space-x-1">
          {[...Array(maxHearts)].map((_, i) => (
            <Heart key={i} className={`h-5 w-5 ${i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"}`} />
          ))}
        </div>

        {nextHeartTime && timeRemaining && (
          <div className="ml-2 flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatTimeRemaining()}</span>
          </div>
        )}
      </div>

      {/* Replenish modal */}
      {showReplenishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#5a7d53] mb-4">Running Low on Hearts!</h3>

            <div className="flex justify-center mb-4">
              {[...Array(maxHearts)].map((_, i) => (
                <Heart
                  key={i}
                  className={`h-8 w-8 mx-1 ${i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"}`}
                />
              ))}
            </div>

            <p className="text-gray-600 mb-6 text-center">
              You have {hearts} {hearts === 1 ? "heart" : "hearts"} left. Get more hearts to continue learning!
            </p>

            <div className="space-y-3">
              <button
                onClick={watchAd}
                className="w-full flex items-center justify-center bg-[#5a7d53] hover:bg-[#4a6a45] text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Video className="h-5 w-5 mr-2" />
                Watch Ad for 1 Heart
              </button>

              <button
                onClick={practice}
                className="w-full flex items-center justify-center bg-[#f0d878] hover:bg-[#e5c960] text-[#5a7d53] py-3 px-4 rounded-lg transition-colors"
              >
                <Play className="h-5 w-5 mr-2" />
                Practice to Earn 1 Heart
              </button>

              {nextHeartTime && timeRemaining && (
                <div className="text-center text-sm text-gray-600 mt-4">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Next heart in {formatTimeRemaining()}
                </div>
              )}

              <button
                onClick={() => setShowReplenishModal(false)}
                className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Ad Modal */}
      {showAdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-hidden max-w-2xl w-full mx-4 relative">
            {/* Ad video content */}
            <div className="relative">
              <div className="aspect-video bg-black flex items-center justify-center">
                <img
                  src={require("./advertisement.png")}
                  alt="Ka-Ching Advertisement"
                  className="w-full h-auto"
                />
                {!adCompleted && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Skip in {adTimer}s
                  </div>
                )}
              </div>

              {adCompleted && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-[#5a7d53] mb-2">Ad Completed!</h3>
                    <p className="text-gray-600 mb-4">Thanks for watching. You've earned a heart!</p>
                    <button
                      onClick={closeAd}
                      className="bg-[#5a7d53] text-white px-6 py-2 rounded-lg hover:bg-[#4a6a45] transition-colors"
                    >
                      Claim Heart
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Ad info bar */}
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-[#5a7d53]">Want unlimited hearts?</h4>
                <p className="text-sm text-gray-600">Subscribe to Ka-Ching's Premium Plan today</p>
              </div>

              {adCompleted ? (
                <button
                  onClick={closeAd}
                  className="bg-[#5a7d53] text-white p-2 rounded-full hover:bg-[#4a6a45] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                <div className="text-sm text-gray-500">Ad: {adTimer}s remaining</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

// Add display name for the forwardRef component
Hearts.displayName = "Hearts"

export default Hearts
