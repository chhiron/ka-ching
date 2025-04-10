"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Award, Crown, Flame, ChevronUp, ChevronDown, Circle } from "lucide-react"

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [currentUserRank, setCurrentUserRank] = useState(null)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    // Simulate fetching leaderboard data
    const fetchLeaderboardData = () => {
      setIsLoading(true)

      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data for the leaderboard
        const mockUsers = [
          { id: 1, username: "ET", xp: 1250, avatar: "👨🏻", streak: 7, online: true },
          { id: 2, username: "Ananya", xp: 980, avatar: "🤖", streak: 5, online: true },
          { id: 3, username: "Zhu En", xp: 875, avatar: "🦄", streak: 3, online: false },
          { id: 4, username: "Kenta", xp: 820, avatar: "💰", streak: 4, online: true },
          { id: 5, username: "Jasmine", xp: 790, avatar: "🍄‍🟫", streak: 6, online: false },
          { id: 6, username: "Alysa", xp: 750, avatar: "👸🏻", streak: 2, online: true },
          { id: 7, username: "Jason", xp: 720, avatar: "🧠", streak: 3, online: false },
          { id: 8, username: "Guhan", xp: 680, avatar: "👨🏻‍💻", streak: 1, online: true },
          { id: 9, username: "Kai Xuan", xp: 650, avatar: "🍋", streak: 4, online: false },
          { id: 10, username: "Michelle", xp: 620, avatar: "☺️", streak: 2, online: false },
          { id: 11, username: "Pak", xp: 590, avatar: "🍄", streak: 1, online: false },
          { id: 12, username: "Huiyu", xp: 560, avatar: "🌴", streak: 3, online: false },
          { id: 13, username: "Nicholas", xp: 530, avatar: "🤴🏻", streak: 2, online: false },
          { id: 14, username: "Jocilia", xp: 500, avatar: "👩🏻‍💻", streak: 4, online: false },
          { id: 15, username: "Callysta", xp: 470, avatar: "🪑", streak: 1, online: false },
        ]

        // Count online users
        const onlineCount = mockUsers.filter((user) => user.online).length

        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem("kaChingCurrentUser"))

        // Add current user to the leaderboard if they exist
        let leaderboard = [...mockUsers]
        if (currentUser) {
          // Get user progress from localStorage
          const progress = JSON.parse(localStorage.getItem("courseProgress")) || {}

          // Calculate XP based on completed modules and quizzes
          let userXP = 0

          // XP for completed modules
          if (progress.completedModules) {
            userXP += Object.keys(progress.completedModules).length * 50
          }

          // XP for completed quizzes
          if (progress.completedQuizzes) {
            userXP += Object.keys(progress.completedQuizzes).length * 100
          }

          // Add quiz scores as bonus XP
          if (progress.quizScores) {
            Object.values(progress.quizScores).forEach((score) => {
              userXP += Math.floor(score)
            })
          }

          // Create user entry
          const userEntry = {
            id: "current",
            username: currentUser.username || currentUser.email || "You",
            xp: userXP,
            avatar: "😎",
            streak: 1,
            isCurrentUser: true,
            online: true,
          }

          // Add to leaderboard
          leaderboard.push(userEntry)
        }

        // Sort by XP
        leaderboard.sort((a, b) => b.xp - a.xp)

        // Add rank property
        leaderboard = leaderboard.map((user, index) => ({
          ...user,
          rank: index + 1,
        }))

        // Find current user's rank
        const currentUserIndex = leaderboard.findIndex((user) => user.isCurrentUser)
        if (currentUserIndex !== -1) {
          setCurrentUserRank(leaderboard[currentUserIndex])
        }

        setLeaderboardData(leaderboard)
        setOnlineUsers(onlineCount + (currentUser ? 1 : 0)) // Add current user to online count
        setIsLoading(false)
      }, 1000)
    }

    fetchLeaderboardData()

    // Refresh leaderboard every 5 minutes
    const intervalId = setInterval(fetchLeaderboardData, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return <span className="w-5 h-5 inline-flex items-center justify-center text-xs font-bold">{rank}</span>
    }
  }

  const getXpColor = (xp) => {
    if (xp >= 1000) return "text-purple-600"
    if (xp >= 800) return "text-blue-600"
    if (xp >= 600) return "text-green-600"
    if (xp >= 400) return "text-yellow-600"
    return "text-gray-600"
  }

  // Get streak color based on streak length
  const getStreakColor = (streak) => {
    if (streak >= 7) return "text-red-600"
    if (streak >= 5) return "text-orange-500"
    if (streak >= 3) return "text-yellow-500"
    return "text-yellow-400"
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-[#5a7d53] to-[#85bb65] p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Crown className="h-6 w-6 text-[#f0d878] mr-2" />
          <h3 className="text-white font-bold text-lg">Leaderboard</h3>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Circle className="h-3 w-3 text-green-300 fill-current mr-1" />
            <span className="text-white text-xs">{onlineUsers} online</span>
          </div>
          {isExpanded ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
        </div>
      </div>

      {/* Leaderboard Content */}
      {isExpanded && (
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5a7d53]"></div>
            </div>
          ) : (
            <>
              {/* Users List - Always scrollable */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Top Investors</h4>

                <div className="max-h-80 overflow-y-auto pr-1 custom-scrollbar space-y-2">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center p-2 rounded-lg ${
                        user.isCurrentUser ? "bg-[#f0d878] bg-opacity-20 border border-[#f0d878]" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-8 flex justify-center">{getRankIcon(user.rank)}</div>
                      <div className="w-8 h-8 flex items-center justify-center text-xl relative">
                        {user.avatar}
                        {user.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border border-white"></span>
                        )}
                      </div>
                      <div className="ml-2 flex-1 truncate">
                        <span className={`font-medium ${user.isCurrentUser ? "text-[#5a7d53]" : ""}`}>
                          {user.username}
                        </span>
                      </div>
                      <div className={`font-bold ${getXpColor(user.xp)}`}>{user.xp} XP</div>
                      {user.streak > 0 && (
                        <div className={`ml-2 flex items-center ${getStreakColor(user.streak)} text-xs`}>
                          <Flame className="h-3 w-3 mr-1" fill="currentColor" />
                          {user.streak}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* XP Legend */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-2">How to Earn XP</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Complete a module</span>
                    <span className="font-bold">+50 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass a quiz</span>
                    <span className="font-bold">+100 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quiz score bonus</span>
                    <span className="font-bold">+1 XP per %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily streak</span>
                    <span className="font-bold">+10 XP per day</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Custom scrollbar styles */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5a7d53;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a6a45;
        }
      `}</style>
    </div>
  )
}

export default Leaderboard
