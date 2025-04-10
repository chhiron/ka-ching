"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Award,
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
  DollarSign,
  PieChart,
  Shield,
} from "lucide-react"

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

  // Check if user is logged in and has premium account
  useEffect(() => {
    const user = localStorage.getItem("kaChingCurrentUser")
    if (user) {
      setIsLoggedIn(true)
      // In a real app, you would check if the user has a premium account
      // For demo purposes, we'll randomly set some users as premium
      const userObj = JSON.parse(user)
      // This is just for demo - in a real app, you'd check the user's subscription status
      setIsPremium(userObj.email?.includes("premium") || Math.random() > 0.5)
    }
  }, [])

  // Mock data for questions
  const questions = [
    {
      id: 1,
      user: {
        name: "Michael Chen",
        avatar: "👨‍💼",
        isPremium: true,
      },
      title: "What are the key differences between ETFs and index funds for long-term investing?",
      content:
        "I'm looking to build a long-term portfolio and I'm trying to decide between ETFs and index funds. What are the main differences in terms of tax efficiency, expense ratios, and trading flexibility?",
      category: "etfs",
      timestamp: "2 hours ago",
      votes: 42,
      status: "answered",
      answers: [
        {
          id: 101,
          expert: {
            name: "Sarah Johnson, CFA",
            avatar: "👩‍💼",
            title: "Senior Portfolio Manager",
            experience: "15+ years",
            specialization: "ETFs & Index Investing",
            verified: true,
          },
          content:
            "Great question, Michael. The main differences between ETFs and index funds are:\n\n1. **Trading flexibility**: ETFs trade throughout the day like stocks, while index funds trade once at the end of the day.\n\n2. **Minimum investment**: ETFs can be purchased for the price of a single share, while index funds often have minimum investments of $1,000-$3,000.\n\n3. **Tax efficiency**: ETFs are typically more tax-efficient due to their creation/redemption process, which minimizes capital gains distributions.\n\n4. **Expense ratios**: Both can have low expense ratios, but ETFs often edge out index funds slightly.\n\n5. **Automatic investments**: Index funds make it easier to set up automatic investments and dividend reinvestment.\n\nFor long-term investing, both are excellent choices. If you're making regular contributions and don't need intraday trading, index funds might be simpler. If tax efficiency and lower investment minimums are priorities, ETFs might be better.",
          timestamp: "1 hour ago",
          votes: 28,
          comments: [
            {
              id: 1001,
              user: "Alex T.",
              content: "Would you recommend Vanguard or Fidelity for someone just starting with ETFs?",
              timestamp: "45 minutes ago",
            },
            {
              id: 1002,
              expert: {
                name: "Sarah Johnson, CFA",
                isExpert: true,
              },
              content:
                "Both are excellent choices with low fees. Vanguard is known for their ETF innovation, while Fidelity offers some zero-fee index funds. I'd compare the specific ETFs you're interested in rather than just the provider.",
              timestamp: "30 minutes ago",
            },
          ],
        },
      ],
      tags: ["ETFs", "Index Funds", "Investing Basics", "Portfolio Management"],
    },
    {
      id: 2,
      user: {
        name: "Jennifer Wu",
        avatar: "👩‍🦰",
        isPremium: true,
      },
      title: "How should I evaluate the sustainability of a company's dividend yield?",
      content:
        "I'm attracted to stocks with high dividend yields, but I know that sometimes a high yield can be a warning sign. What metrics and factors should I look at to determine if a dividend is sustainable in the long term?",
      category: "stocks",
      timestamp: "5 hours ago",
      votes: 37,
      status: "answered",
      answers: [
        {
          id: 201,
          expert: {
            name: "David Patel, MBA",
            avatar: "👨‍🦱",
            title: "Dividend Investment Strategist",
            experience: "12+ years",
            specialization: "Income Investing",
            verified: true,
          },
          content:
            "Jennifer, you're right to be cautious about high yields. Here are the key metrics to evaluate dividend sustainability:\n\n1. **Payout Ratio**: The percentage of earnings paid as dividends. For most industries, a payout ratio below 60% is sustainable, though utilities and REITs can sustain higher ratios.\n\n2. **Dividend Coverage Ratio**: Earnings per share divided by dividends per share. A ratio above 2 is generally safe.\n\n3. **Free Cash Flow**: Dividends should be comfortably covered by free cash flow, not just accounting earnings.\n\n4. **Dividend Growth History**: Companies with consistent dividend increases (especially Dividend Aristocrats with 25+ years of increases) typically have sustainable policies.\n\n5. **Debt Levels**: High debt can threaten dividend sustainability during downturns. Look at Debt-to-EBITDA ratios.\n\n6. **Industry Trends**: Consider whether the company's industry is growing, stable, or declining.\n\nA sudden spike in yield is often due to a falling share price, which could signal problems. Always investigate why a yield is unusually high compared to industry peers.",
          timestamp: "3 hours ago",
          votes: 31,
          comments: [],
        },
      ],
      tags: ["Dividends", "Stock Analysis", "Income Investing", "Yield"],
    },
    {
      id: 3,
      user: {
        name: "Robert Kim",
        avatar: "🧔",
        isPremium: true,
      },
      title: "What's the optimal allocation between growth and value ETFs in the current market?",
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
            name: "Marcus Williams, PhD",
            avatar: "👨🏾‍💼",
            title: "Chief Investment Strategist",
            experience: "20+ years",
            specialization: "Asset Allocation",
            verified: true,
          },
          content:
            "Robert, this is a timely question. The growth vs. value decision should be based on several factors:\n\n1. **Economic Cycle Position**: We appear to be in a late-cycle environment with rising rates, which has historically favored value over growth.\n\n2. **Valuation Spreads**: The valuation gap between growth and value has narrowed but remains above historical averages, suggesting value may still have room to outperform.\n\n3. **Interest Rate Environment**: Rising rates typically pressure growth stock valuations more than value stocks.\n\n4. **Time Horizon**: Longer investment horizons can accommodate more growth exposure despite short-term volatility.\n\n5. **Sector Exposures**: Consider the sector tilts that come with growth vs. value (tech in growth; financials and energy in value).\n\nFor most investors, I recommend maintaining exposure to both styles but perhaps tilting 60/40 in favor of value in the current environment. This provides downside protection while maintaining exposure to potential innovation-driven returns.\n\nConsider ETFs like VOOV/VOOG or IVE/IVW to implement this strategy efficiently.",
          timestamp: "20 hours ago",
          votes: 24,
          comments: [],
        },
      ],
      tags: ["ETFs", "Asset Allocation", "Growth Investing", "Value Investing"],
    },
    {
      id: 4,
      user: {
        name: "Sophia Rodriguez",
        avatar: "👩",
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
      tags: ["ETFs", "Factor Investing", "Market Cycles", "Smart Beta"],
    },
    {
      id: 5,
      user: {
        name: "Thomas Lee",
        avatar: "👨‍🦲",
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
            name: "Elena Vasquez, CFA",
            avatar: "👩‍🦱",
            title: "Value Investment Analyst",
            experience: "18+ years",
            specialization: "Equity Valuation",
            verified: true,
          },
          content:
            "Thomas, great question. While P/E is useful, it has limitations in today's market. Here are more comprehensive metrics for identifying undervalued stocks:\n\n1. **EV/EBITDA**: Enterprise Value to EBITDA provides a capital structure-neutral valuation that's harder to manipulate than P/E.\n\n2. **Price to Free Cash Flow**: Often more reliable than earnings-based metrics as it's harder to manipulate cash flow.\n\n3. **PEG Ratio**: P/E divided by growth rate contextualizes valuation with growth expectations.\n\n4. **Return on Invested Capital (ROIC)**: Identifies companies efficiently allocating capital to generate returns above their cost of capital.\n\n5. **Discounted Cash Flow (DCF)**: Though complex, DCF remains the gold standard for intrinsic value estimation.\n\n6. **Price to Book with ROE Filter**: Combining P/B with high ROE can identify quality companies at reasonable prices.\n\n7. **Relative EV/Sales**: Useful for comparing companies in the same industry, especially for unprofitable growth companies.\n\nIn today's market, I particularly recommend focusing on free cash flow yield and ROIC. Companies with strong cash generation and efficient capital allocation tend to outperform regardless of market conditions.\n\nAlways compare these metrics to industry averages and the company's own historical values for context.",
          timestamp: "2 days ago",
          votes: 38,
          comments: [],
        },
      ],
      tags: ["Stock Analysis", "Valuation", "Value Investing", "Fundamental Analysis"],
    },
    {
      id: 6,
      user: {
        name: "James Wilson",
        avatar: "👨‍🦰",
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
            "James, thematic ETFs can be exciting but require careful consideration. Here's my framework for evaluating them:\n\n1. **Position Sizing**: Thematic ETFs are best used as satellite positions (5-15% of portfolio) rather than core holdings due to their concentration risk.\n\n2. **Evaluation Criteria**:\n   - **Expense Ratio**: Many thematic ETFs charge 0.5-0.75%, significantly higher than broad market ETFs.\n   - **Underlying Holdings**: Check for concentration in a few names and overlap with your existing holdings.\n   - **Methodology**: Understand how stocks are selected and weighted.\n   - **AUM and Liquidity**: Smaller thematic ETFs risk closure if they don't gather sufficient assets.\n\n3. **Time Horizon**: Thematic investing requires patience—5+ year horizons are appropriate as technologies move through adoption cycles.\n\n4. **Diversification Within Themes**: Consider whether the ETF provides true diversification across the theme or is concentrated in a few large players.\n\n5. **Fundamental Backdrop**: Assess whether the theme has sustainable growth drivers or is just capturing temporary hype.\n\nFor most investors, I recommend building your core portfolio with low-cost broad market ETFs (70-80% of assets) and then adding select thematic ETFs for exposure to specific long-term trends you believe in.\n\nRemember that many disruptive technologies take longer to mature than initially expected, so patience is essential.",
          timestamp: "3 days ago",
          votes: 27,
          comments: [],
        },
      ],
      tags: ["ETFs", "Thematic Investing", "Technology", "Portfolio Construction"],
    },
    {
      id: 7,
      user: {
        name: "Emma Davis",
        avatar: "👱‍♀️",
        isPremium: true,
      },
      title: "What's the most tax-efficient way to rebalance a taxable investment portfolio?",
      content:
        "I need to rebalance my portfolio that's held in a taxable account, but I'm concerned about triggering capital gains taxes. What strategies can I use to rebalance while minimizing the tax impact?",
      category: "portfolio",
      timestamp: "5 days ago",
      votes: 39,
      status: "answered",
      answers: [
        {
          id: 701,
          expert: {
            name: "Jonathan Taylor, CPA, CFP",
            avatar: "👨‍💼",
            title: "Tax-Efficient Investing Specialist",
            experience: "22+ years",
            specialization: "Tax Planning",
            verified: true,
          },
          content:
            "Emma, tax-efficient rebalancing is indeed important for taxable accounts. Here are strategies to minimize tax impact:\n\n1. **Direct New Contributions**: The simplest approach is to direct new investments to underweight assets rather than selling overweight ones.\n\n2. **Tax-Loss Harvesting**: Identify positions with unrealized losses and sell them to offset gains from selling overweight positions.\n\n3. **Asset Location**: Hold tax-inefficient assets in tax-advantaged accounts and use those for more frequent rebalancing.\n\n4. **Charitable Giving**: Donate appreciated securities to charity instead of selling them (if you're charitably inclined).\n\n5. **Specific Lot Identification**: When selling, specify lots with the highest cost basis to minimize gains.\n\n6. **Threshold Rebalancing**: Only rebalance when allocations drift beyond predetermined thresholds (e.g., 5% from targets) rather than on a fixed schedule.\n\n7. **Tax-Aware Withdrawal Strategy**: If you're withdrawing from the portfolio, take from overweight assets first.\n\n8. **ETF Rebalancing**: Consider using ETFs that can rebalance internally without distributing capital gains.\n\nFor most investors, I recommend a combination of directing new contributions and threshold rebalancing as the primary strategies, with tax-loss harvesting as opportunities arise.\n\nRemember that investment considerations should generally take precedence over tax considerations—don't avoid necessary rebalancing entirely just to avoid taxes.",
          timestamp: "4 days ago",
          votes: 33,
          comments: [],
        },
      ],
      tags: ["Tax Planning", "Portfolio Management", "Rebalancing", "Capital Gains"],
    },
    {
      id: 8,
      user: {
        name: "Daniel Park",
        avatar: "👨‍🦱",
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

  // Mock data for featured insights
  const featuredInsights = [
    {
      id: 1,
      title: "The Case for Equal-Weight ETFs in the Current Market",
      expert: "Dr. Lisa Chen",
      role: "Head of ETF Research",
      preview:
        "Equal-weight ETFs have shown resilience during recent market rotations. Our analysis shows they may offer better risk-adjusted returns in the coming year...",
      readTime: "5 min read",
      category: "ETFs",
      icon: <PieChart className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 2,
      title: "Navigating Inflation: Sector Rotation Strategies for 2023",
      expert: "Marcus Williams, PhD",
      role: "Chief Investment Strategist",
      preview:
        "With persistent inflation pressures, certain sectors historically outperform. Our sector rotation framework identifies three key areas poised for outperformance...",
      readTime: "7 min read",
      category: "Strategy",
      icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 3,
      title: "Dividend Aristocrats: Quality Over Yield in Uncertain Times",
      expert: "Elena Vasquez, CFA",
      role: "Value Investment Analyst",
      preview:
        "Our analysis of Dividend Aristocrats shows they've outperformed high-yield stocks by 4.2% annually during economic slowdowns while offering better downside protection...",
      readTime: "6 min read",
      category: "Stocks",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
  ]

  // Filter questions based on active tab, category, and search query
  const filteredQuestions = questions.filter((question) => {
    // Filter by tab
    if (activeTab === "open" && question.status !== "open") return false
    if (activeTab === "answered" && question.status !== "answered") return false
    if (activeTab === "bookmarked" && !bookmarkedQuestions.includes(question.id)) return false

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

    if (!isPremium) {
      navigate("/pricing")
      return
    }

    // In a real app, you would show a form to ask a question
    alert("This would open a form to ask your question to our financial experts.")
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "etfs":
        return <PieChart className="h-4 w-4" />
      case "stocks":
        return <TrendingUp className="h-4 w-4" />
      case "portfolio":
        return <BarChart2 className="h-4 w-4" />
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
      case "portfolio":
        return "Portfolio"
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
                  className={`px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isPremium ? "bg-[#5a7d53] hover:bg-[#4a6a45]" : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  Ask a Question
                </button>
              </div>

              {!isPremium && isLoggedIn && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800 font-medium">Premium Feature</p>
                    <p className="text-amber-700 text-sm mt-1">
                      Asking questions to our financial experts is a premium feature.{" "}
                      <button
                        onClick={() => navigate("/pricing")}
                        className="text-[#5a7d53] font-medium hover:underline"
                      >
                        Upgrade your account
                      </button>{" "}
                      to get personalized answers from certified professionals.
                    </p>
                  </div>
                </div>
              )}

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
                <button
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "bookmarked"
                      ? "text-[#5a7d53] border-b-2 border-[#5a7d53]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("bookmarked")}
                >
                  Bookmarked
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
                      : activeTab === "bookmarked"
                        ? "You haven't bookmarked any questions yet."
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

          {/* Right Column - Featured Content */}
          <div className="lg:w-1/3 space-y-6">
            {/* Expert Insights */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#5a7d53] to-[#85bb65] p-4">
                <h3 className="text-white font-bold text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Featured Expert Insights
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {featuredInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">{insight.icon}</div>
                      <div>
                        <h4 className="font-bold text-[#5a7d53]">{insight.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span className="font-medium">{insight.expert}</span>
                          <span className="mx-1">•</span>
                          <span>{insight.role}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{insight.preview}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500">{insight.readTime}</span>
                          <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-full">
                            {insight.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-center text-[#5a7d53] font-medium hover:underline">
                  View All Expert Insights
                </button>
              </div>
            </div>

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
                  "How should investors position their portfolios for rising interest rates?"
                </h4>
                <div className="flex items-center mt-2">
                  <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-lg">👨‍💼</div>
                  <div className="ml-2">
                    <div className="text-sm font-medium">Asked by James W.</div>
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
                      <div className="text-xs text-gray-500">Chief Economist</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    "In a rising rate environment, consider shortening duration in your bond portfolio, increasing
                    allocation to floating rate securities, and focusing on sectors that historically outperform during
                    rate hikes such as financials and value stocks..."
                  </p>
                  <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">Read full answer</button>
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
                    <div className="text-2xl font-bold text-[#5a7d53]">4.2h</div>
                    <div className="text-sm text-gray-600">Avg. Response Time</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#5a7d53]">42</div>
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
    </div>
  )
}

export default Community
