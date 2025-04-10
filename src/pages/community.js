"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  MessageSquare,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Filter,
  Search,
  ThumbsUp,
  Bookmark,
  BookmarkPlus,
  ChevronDown,
  AlertCircle,
  Zap,
  BarChart2,
  PieChart,
  Shield,
  X,
  Send,
} from "lucide-react"
import Leaderboard from "../components/Leaderboard"

const Community = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showAskQuestionModal, setShowAskQuestionModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "general",
    tags: [],
  })
  const [newTag, setNewTag] = useState("")

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("kaChingCurrentUser")
    if (user) {
      setIsLoggedIn(true)
      // In a real app, you would check if the user has a premium account
      // For demo purposes, we'll randomly set some users as premium
      const userObj = JSON.parse(user)
      // This is just for demo - in a real app, you'd check the user's subscription status
      setIsPremium(userObj.email?.includes("premium") || Math.random() > 0.5)
    } else {
      // Redirect to login if not logged in
      navigate("/login")
    }
  }, [navigate])

  // If not logged in, show loading or redirect
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f9f7f2] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-[#5a7d53] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#5a7d53] mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the Expert Community.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-[#5a7d53] text-white font-bold rounded-lg hover:bg-[#4a6a45] transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    )
  }

  // Mock data for questions
  const questions = [
    {
      id: 1,
      user: {
        name: "Kenta",
        avatar: "💰",
        isPremium: true,
      },
      title: "What’s the main difference between ETFs and stocks?",
      content:
        "Hello, I’m new to investing and confused. ETFs are listed like stocks, but are they basically the same thing?",
      timestamp: "2 hours ago",
      votes: 42,
      status: "answered",
      answers: [
        {
          id: 101,
          expert: {
            name: "Sarah Koh, CFA",
            avatar: "👩‍💼",
            title: "Senior Portfolio Manager",
            experience: "15+ years",
            specialization: "ETFs & Index Investing",
            verified: true,
          },
          content:
            "Great question, Kenta! While both trade on exchanges, ETFs are baskets of assets — like stocks, bonds, or commodities — whereas individual stocks represent ownership in a single company. ETFs offer built-in diversification, while stocks don’t.",
          timestamp: "1 hour ago",
          votes: 28,
          comments: [
            {
              id: 1001,
              user: "Ananya",
              content: "If I hold a stock and it pays dividends, do ETFs do the same?",
              timestamp: "45 minutes ago",
            },
            {
              id: 1002,
              expert: {
                name: "Sarah Koh, CFA",
                isExpert: true,
              },
              content:
                "Yes, many ETFs do pay dividends! If the assets within the ETF (like dividend-paying stocks) distribute dividends, those are usually passed on to ETF holders. Just check if the ETF is an accumulating (reinvests dividends) or distributing (pays them out) type.",
              timestamp: "30 minutes ago",
            },
          ],
        },
      ],
      tags: ["ETFs", "Stocks", "Investing Basics", "Portfolio Management"],
    },
    {
      id: 2,
      user: {
        name: "Zhu En",
        avatar: "🦄",
        isPremium: true,
      },
      title: "What does it mean when a stock is 'overvalued' or 'undervalued'?",
      content:
        "I often hear analysts say a stock is overvalued or undervalued. What exactly does that mean, and how do they determine this?",
      category: "stocks",
      timestamp: "5 hours ago",
      votes: 37,
      status: "answered",
      answers: [
        {
          id: 201,
          expert: {
            name: "David Lee, MBA",
            avatar: "👨‍🦱",
            title: "Dividend Investment Strategist",
            experience: "12+ years",
            specialization: "Income Investing",
            verified: true,
          },
          content:
            "Hi Zhu En. A stock is considered overvalued when it's trading above its estimated worth based on fundamentals, and undervalued when it's below that value. Analysts assess this using metrics like the P/E ratio (price vs. earnings), the PEG ratio (which factors in growth), discounted cash flow (DCF) models, and book value comparisons. These tools aren’t exact, but they help investors gauge whether a stock’s price fairly reflects its underlying performance.",
          comments: [],
        },
      ],
      tags: ["Stock Valuation", "Stock Analysis"],
    },
    {
      id: 3,
      user: {
        name: "Jason",
        avatar: "🧠",
        isPremium: true,
      },
      title: "What is the significance of the Sharpe Ratio in evaluating ETFs?",
      content:
        "With the recent market volatility, I'm reconsidering my portfolio allocation. Should I be shifting more toward value ETFs or maintaining exposure to growth? What factors should guide this decision?",
      category: "etfs",
      timestamp: "1 day ago",
      votes: 29,
      status: "answered",
      answers: [
        {
          id: 301,
          expert: {
            name: "Goh Zhen Kai, PhD",
            avatar: "👨🏾‍💼",
            title: "Chief Investment Strategist",
            experience: "20+ years",
            specialization: "Asset Allocation",
            verified: true,
          },
          content:
            "Jason, this is a timely question. The Sharpe Ratio is a key measure used to assess an ETF's risk-adjusted returns, indicating how much excess return an ETF generates per unit of risk (volatility). A higher Sharpe ratio generally means the ETF is providing more return for each unit of risk, while a lower ratio suggests the opposite. For instance, a Sharpe ratio above 1 is considered good, showing that the ETF is delivering a decent return relative to its risk. Conversely, a ratio below 1 often indicates subpar performance. When comparing ETFs, aim for a higher Sharpe ratio compared to similar funds, but also consider market conditions, as volatility can affect the ratio. While useful, the Sharpe ratio should be used alongside other metrics like drawdowns and volatility to get a fuller understanding of an ETF’s risk-adjusted performance.",
          votes: 24,
          comments: [],
        },
      ],
      tags: ["ETFs", "Risk-Adjusted Return", "Portfolio Management"],
    },
    {
      id: 4,
      user: {
        name: "Pak",
        avatar: "🍄",
        isPremium: true,
      },
      title: "How do factor ETFs perform during different market cycles?",
      content:
        "I'm interested in adding factor ETFs (momentum, quality, low volatility) to my portfolio. How do these different factors typically perform during bull markets, bear markets, and recoveries?",
      category: "etfs",
      timestamp: "2 days ago",
      votes: 23,
      status: "open",
      answers: [],
      tags: ["ETFs", "Factor Investing", "Market Cycles", "Smart Beta", "Market Trends"],
    },
    {
      id: 5,
      user: {
        name: "Ananya",
        avatar: "🤖",
        isPremium: true,
      },
      title: "What metrics best indicate a stock is undervalued in today's market?",
      content:
        "Beyond the traditional P/E ratio, what valuation metrics are most relevant in today's market environment for identifying truly undervalued stocks with growth potential?",
      category: "stocks",
      timestamp: "3 days ago",
      votes: 45,
      status: "answered",
      answers: [
        {
          id: 501,
          expert: {
            name: "Elaine Teo, CFA",
            avatar: "👩‍🦱",
            title: "Value Investment Analyst",
            experience: "18+ years",
            specialization: "Equity Valuation",
            verified: true,
          },
          content:
            "Great question, Ananya. While the P/E ratio is a common starting point, it's important to use a broader set of metrics to identify undervalued stocks in today’s market. Key indicators include EV/EBITDA, which provides a valuation neutral to capital structure, and Price to Free Cash Flow, as it focuses on the company's ability to generate actual cash, reducing the risk of manipulation. The PEG Ratio helps adjust the P/E by factoring in growth expectations, while Return on Invested Capital (ROIC) highlights companies efficiently allocating capital. Discounted Cash Flow (DCF) remains the gold standard for estimating intrinsic value, though it requires more effort. Additionally, Price to Book with ROE Filter can identify quality stocks at reasonable prices, and Relative EV/Sales is useful for comparing unprofitable companies in the same sector. In today’s volatile market, I recommend focusing on free cash flow yield and ROIC, as companies with strong cash generation and efficient capital allocation are more likely to thrive. Always compare these metrics to industry averages and historical performance for proper context.",
          timestamp: "2 days ago",
          votes: 38,
          comments: [],
        },
      ],
      tags: ["Stock Valuation", "Equity Valuation", "Investment Metrics", "Fundamental Analysis"],
    },
    {
      id: 6,
      user: {
        name: "Zhu En",
        avatar: "🦄",
        isPremium: true,
      },
      title: "How should retail investors approach thematic ETFs focused on emerging technologies?",
      content:
        "I'm seeing many thematic ETFs focused on AI, robotics, clean energy, etc. How should a long-term investor evaluate these compared to broader market ETFs? Are they suitable as core holdings or better as satellite positions?",
      category: "etfs",
      timestamp: "4 days ago",
      votes: 31,
      status: "answered",
      answers: [
        {
          id: 601,
          expert: {
            name: "Raj Patel, CFA",
            avatar: "👨🏽‍💼",
            title: "ETF Strategist",
            experience: "10+ years",
            specialization: "Thematic Investing",
            verified: true,
          },
          content:
            "Zhu En, thematic ETFs, such as those focused on AI or clean energy, can be exciting but should be approached with caution. Given their concentration risk, they are best used as satellite positions (5-15% of your portfolio) rather than core holdings. When evaluating these ETFs, focus on factors like expense ratio, which can be higher than broad market ETFs, and underlying holdings, ensuring they don’t overlap too much with your current positions. Pay attention to the methodology of stock selection, and assess AUM and liquidity, as smaller funds may be at risk of closure. Thematic investing requires a longer time horizon (5+ years) as these technologies develop. Lastly, evaluate the fundamental growth drivers behind the theme to ensure it’s not just a passing trend. A solid strategy is to build your core portfolio with low-cost broad market ETFs (70-80% of your assets) and add thematic ETFs to target specific long-term trends. Patience is key as disruptive technologies often take longer to mature than anticipated.",
          timestamp: "3 days ago",
          votes: 27,
          comments: [],
        },
      ],
      tags: ["ETFs", "Thematic Investing", "Investment Strategy", "Portfolio Construction"],
    },
    {
      id: 7,
      user: {
        name: "Daphne",
        avatar: "👱‍♀️",
        isPremium: true,
      },
      title: "What is the significance of volume in stock price movements?",
      content:
        "How important is trading volume when analyzing stock price movements? Can volume indicate potential trend changes or reversals?",
      category: "stocks",
      timestamp: "5 days ago",
      votes: 39,
      status: "answered",
      answers: [
        {
          id: 701,
          expert: {
            name: "Jonathan Wong, CPA, CFP",
            avatar: "👨‍💼",
            title: "Tax-Efficient Investing Specialist",
            experience: "22+ years",
            specialization: "Tax Planning",
            verified: true,
          },
          content:
            "Hi Daphne, volume is crucial in technical analysis because it provides insight into the strength of a price movement. A price increase with high volume suggests that the trend is strong and likely to continue. Conversely, a price increase with low volume may indicate that the trend lacks conviction and could reverse. Similarly, declining price with high volume can signal a selling climax, suggesting a potential reversal to the upside. Volume also helps confirm breakout patterns. A breakout through a key level of resistance with increasing volume indicates that the move is likely to be sustainable, whereas a breakout on low volume may suggest a false signal.",
          timestamp: "4 days ago",
          votes: 33,
          comments: [],
        },
      ],
      tags: ["Stocks", "Market Analysis", "Technical Analysis", "Price Movements"],
    },
    {
      id: 8,
      user: {
        name: "ET",
        avatar: "👨🏻",
        isPremium: true,
      },
      title: "How do I evaluate the liquidity risk of corporate bond ETFs?",
      content:
        "I'm concerned about liquidity mismatches in corporate bond ETFs, especially for high-yield bonds. What metrics or factors should I consider to assess this risk before investing?",
      category: "etfs",
      timestamp: "1 week ago",
      votes: 27,
      status: "open",
      answers: [],
      tags: ["ETFs", "Fixed Income", "Liquidity Risk", "Corporate Bonds", "High Yield"],
    },
  ]

  // Filter questions based on active tab, category, and search query
  const filteredQuestions = questions.filter((question) => {
    // Filter by tab
    if (activeTab === "open" && question.status !== "open") return false
    if (activeTab === "answered" && question.status !== "answered") return false

    // Filter by category
    if (activeCategory !== "all" && question.category !== activeCategory) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        question.title.toLowerCase().includes(query) ||
        question.content.toLowerCase().includes(query) ||
        question.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Sort questions based on sort option
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "latest") {
      // Simple sort by timestamp (in a real app, you'd use actual dates)
      return a.timestamp > b.timestamp ? -1 : 1
    } else if (sortBy === "votes") {
      return b.votes - a.votes
    } else if (sortBy === "trending") {
      // For demo purposes, we'll use a combination of recency and votes
      const aScore = a.votes * (a.timestamp.includes("hour") ? 2 : a.timestamp.includes("day") ? 1 : 0.5)
      const bScore = b.votes * (b.timestamp.includes("hour") ? 2 : b.timestamp.includes("day") ? 1 : 0.5)
      return bScore - aScore
    }
    return 0
  })

  const handleQuestionClick = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  const handleBookmark = (e, questionId) => {
    e.stopPropagation()
    setBookmarkedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const handleUpvote = (e, questionId) => {
    e.stopPropagation()
    // In a real app, you would send this to your backend
    console.log(`Upvoted question ${questionId}`)
  }

  const handleAskQuestion = () => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    setShowAskQuestionModal(true)
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    if (newTag.trim() && !newQuestion.tags.includes(newTag.trim())) {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setNewQuestion({
      ...newQuestion,
      tags: newQuestion.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSubmitQuestion = (e) => {
    e.preventDefault()

    // In a real app, you would send this to your backend
    console.log("Submitting question:", newQuestion)

    // For demo purposes, we'll just close the modal and show an alert
    alert("Your question has been submitted and will be reviewed by our experts!")

    // Reset form and close modal
    setNewQuestion({
      title: "",
      content: "",
      category: "general",
      tags: [],
    })
    setShowAskQuestionModal(false)
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "etfs":
        return <PieChart className="h-4 w-4" />
      case "stocks":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getCategoryName = (category) => {
    switch (category) {
      case "etfs":
        return "ETFs"
      case "stocks":
        return "Stocks"
      default:
        return "General"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "open":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "featured":
        return <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusName = (status) => {
    switch (status) {
      case "answered":
        return "Answered"
      case "open":
        return "Open"
      case "featured":
        return "Featured"
      default:
        return "Pending"
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      {/* Header */}
      <div className="bg-[#5a7d53] text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-[#f0d878] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">Expert Community</h1>
          <div className="w-[100px]"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Q&A */}
          <div className="lg:w-2/3">
            {/* Community Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#5a7d53] flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Financial Expert Q&A
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Get answers to your investment questions from certified financial experts
                  </p>
                </div>
                <button
                  onClick={handleAskQuestion}
                  className="px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 bg-[#5a7d53] hover:bg-[#4a6a45]"
                >
                  Ask a Question
                </button>
              </div>

              {/* Search and Filters */}
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search questions..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5a7d53] focus:border-[#5a7d53] bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    >
                      <span className="flex items-center">
                        <Filter className="h-4 w-4 mr-2 text-gray-500" />
                        {activeCategory === "all" ? "All Topics" : getCategoryName(activeCategory)}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {showCategoryDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <ul>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setActiveCategory("all")
                              setShowCategoryDropdown(false)
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                            All Topics
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setActiveCategory("etfs")
                              setShowCategoryDropdown(false)
                            }}
                          >
                            <PieChart className="h-4 w-4 mr-2 text-purple-500" />
                            ETFs
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setActiveCategory("stocks")
                              setShowCategoryDropdown(false)
                            }}
                          >
                            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                            Stocks
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setActiveCategory("portfolio")
                              setShowCategoryDropdown(false)
                            }}
                          >
                            <BarChart2 className="h-4 w-4 mr-2 text-green-500" />
                            Portfolio
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                        {sortBy === "latest" ? "Latest" : sortBy === "votes" ? "Top Voted" : "Trending"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {showSortDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <ul>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setSortBy("latest")
                              setShowSortDropdown(false)
                            }}
                          >
                            <Clock className="h-4 w-4 mr-2 text-blue-500" />
                            Latest
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setSortBy("votes")
                              setShowSortDropdown(false)
                            }}
                          >
                            <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                            Top Voted
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => {
                              setSortBy("trending")
                              setShowSortDropdown(false)
                            }}
                          >
                            <Zap className="h-4 w-4 mr-2 text-amber-500" />
                            Trending
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "all"
                      ? "text-[#5a7d53] border-b-2 border-[#5a7d53]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Questions
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "open"
                      ? "text-[#5a7d53] border-b-2 border-[#5a7d53]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("open")}
                >
                  Open
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "answered"
                      ? "text-[#5a7d53] border-b-2 border-[#5a7d53]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("answered")}
                >
                  Answered
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {sortedQuestions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No questions found</h3>
                  <p className="text-gray-500">
                    {searchQuery
                      ? "No questions match your search criteria. Try a different search term."
                      : "No questions in this category yet."}
                  </p>
                </div>
              ) : (
                sortedQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Question Header */}
                    <div className="p-6 cursor-pointer" onClick={() => handleQuestionClick(question.id)}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                            {question.user.avatar}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">{question.user.name}</span>
                              {question.user.isPremium && (
                                <span className="ml-2 px-2 py-0.5 bg-[#f0d878] bg-opacity-20 text-[#5a7d53] text-xs font-medium rounded-full flex items-center">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Premium
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{question.timestamp}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                              question.category === "etfs"
                                ? "bg-purple-100 text-purple-800"
                                : question.category === "stocks"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {getCategoryIcon(question.category)}
                            <span className="ml-1">{getCategoryName(question.category)}</span>
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                              question.status === "answered"
                                ? "bg-green-100 text-green-800"
                                : question.status === "open"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {getStatusIcon(question.status)}
                            <span className="ml-1">{getStatusName(question.status)}</span>
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#5a7d53] mt-4">{question.title}</h3>
                      <p className="text-gray-700 mt-2 line-clamp-2">{question.content}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {question.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Question Footer */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-4">
                          <button
                            className="flex items-center text-gray-500 hover:text-[#5a7d53]"
                            onClick={(e) => handleUpvote(e, question.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{question.votes}</span>
                          </button>
                          <div className="flex items-center text-gray-500">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{question.answers?.length || 0}</span>
                          </div>
                        </div>
                        <button
                          className={`text-gray-500 hover:text-[#5a7d53]`}
                          onClick={(e) => handleBookmark(e, question.id)}
                        >
                          {bookmarkedQuestions.includes(question.id) ? (
                            <Bookmark className="h-5 w-5" fill="currentColor" />
                          ) : (
                            <BookmarkPlus className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Question with Answers */}
                    {expandedQuestion === question.id && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50">
                        {question.answers && question.answers.length > 0 ? (
                          <div className="space-y-6">
                            {question.answers.map((answer) => (
                              <div key={answer.id} className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-start space-x-4">
                                  <div className="bg-[#f0d878] bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                    {answer.expert.avatar}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-bold text-gray-900">{answer.expert.name}</span>
                                      {answer.expert.verified && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Verified Expert
                                        </span>
                                      )}
                                    </div>
                                    {answer.expert.title && (
                                      <div className="text-sm text-gray-600 mt-1">
                                        {answer.expert.title}
                                        {answer.expert.experience && (
                                          <span className="ml-2 text-gray-500">• {answer.expert.experience}</span>
                                        )}
                                      </div>
                                    )}
                                    {answer.expert.specialization && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        Specializes in: {answer.expert.specialization}
                                      </div>
                                    )}
                                    <div className="mt-4 text-gray-700 whitespace-pre-line">{answer.content}</div>
                                    <div className="flex justify-between items-center mt-4">
                                      <div className="flex items-center space-x-4">
                                        <button className="flex items-center text-gray-500 hover:text-[#5a7d53]">
                                          <ThumbsUp className="h-4 w-4 mr-1" />
                                          <span>{answer.votes}</span>
                                        </button>
                                        <span className="text-sm text-gray-500">{answer.timestamp}</span>
                                      </div>
                                    </div>

                                    {/* Comments */}
                                    {answer.comments && answer.comments.length > 0 && (
                                      <div className="mt-4 pt-4 border-t border-gray-100">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
                                        <div className="space-y-3">
                                          {answer.comments.map((comment) => (
                                            <div key={comment.id} className="bg-gray-50 rounded p-3">
                                              <div className="flex justify-between">
                                                <div className="font-medium text-sm">
                                                  {comment.expert ? (
                                                    <span className="flex items-center">
                                                      {comment.expert.name}
                                                      <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                        Expert
                                                      </span>
                                                    </span>
                                                  ) : (
                                                    comment.user
                                                  )}
                                                </div>
                                                <div className="text-xs text-gray-500">{comment.timestamp}</div>
                                              </div>
                                              <div className="text-sm text-gray-700 mt-1">{comment.content}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Waiting for an expert answer</h3>
                            <p className="text-gray-500">Our financial experts typically respond within 24 hours.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:w-1/3 space-y-6">
            {/* Leaderboard */}
            <Leaderboard />

            {/* Ask of the Week */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#f0d878] to-[#e5c960] p-4">
                <h3 className="text-[#5a7d53] font-bold text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2" fill="currentColor" />
                  Ask of the Week
                </h3>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800">
                  "How does the risk of geopolitical events, like trade wars or conflicts, affect global financial markets?"
                </h4>
                <div className="flex items-center mt-2">
                  <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-lg">👱‍♀️</div>
                  <div className="ml-2">
                    <div className="text-sm font-medium">Asked by Daphne</div>
                    <div className="text-xs text-gray-500">Premium Member</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-lg">
                      👨‍🏫
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium">Dr. Michael Chen</div>
                      <div className="text-xs text-gray-500">Chief Portfolio Manager</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Geopolitical events can trigger market volatility by disrupting trade flows, impacting supply chains, and influencing investor sentiment. In response, investors can diversify across geographies and asset classes, hedge with safe-haven assets like gold, and stay informed on potential developments to adjust their portfolios as needed."
                  </p>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-[#5a7d53]" />
                  Community Stats
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#5a7d53]">93%</div>
                    <div className="text-sm text-gray-600">Questions Answered</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#5a7d53]">2.2h</div>
                    <div className="text-sm text-gray-600">Avg. Response Time</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#5a7d53]">23</div>
                    <div className="text-sm text-gray-600">Verified Experts</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#5a7d53]">1.2k+</div>
                    <div className="text-sm text-gray-600">Premium Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Modal */}
      {showAskQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#5a7d53]">Ask a Question</h2>
                <button onClick={() => setShowAskQuestionModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitQuestion}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Question Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      placeholder="E.g., How do I evaluate ETF expense ratios?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5a7d53] focus:border-[#5a7d53]"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Question Details
                    </label>
                    <textarea
                      id="content"
                      placeholder="Provide details about your question..."
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5a7d53] focus:border-[#5a7d53]"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5a7d53] focus:border-[#5a7d53]"
                      value={newQuestion.category}
                      onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    >
                      <option value="general">General</option>
                      <option value="etfs">ETFs</option>
                      <option value="stocks">Stocks</option>
  
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newQuestion.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add a tag (e.g., Investing, Retirement)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-[#5a7d53] focus:border-[#5a7d53]"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-r-lg border border-gray-300 border-l-0 hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#5a7d53] text-white font-bold rounded-lg hover:bg-[#4a6a45] transition-colors flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Question
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community
