"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft, ChevronRight, HelpCircle, ArrowLeft, ArrowRight, AlertTriangle, Award } from "lucide-react"
import confetti from "canvas-confetti"

const CourseContent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentModule, setCurrentModule] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const confettiRef = useRef(null)
  const [expandedSection, setExpandedSection] = useState(null)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const stepParam = params.get("step")
    const moduleParam = params.get("module")

    if (stepParam) {
      setCurrentStep(Number.parseInt(stepParam))
    }

    if (moduleParam) {
      setCurrentModule(Number.parseInt(moduleParam))
    }
  }, [location.search])

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("kaChingCurrentUser")
    if (!user) {
      navigate("/login")
    } else {
      setIsLoggedIn(true)

      // Load progress from localStorage if available
      const savedProgress = localStorage.getItem("courseProgress")
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setCompletedSteps(progress.completedSteps)
      }
    }
  }, [navigate])

  // Save progress when it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(
        "courseProgress",
        JSON.stringify({
          currentStep,
          completedSteps,
        }),
      )
    }
  }, [currentStep, completedSteps, isLoggedIn])

  // Trigger confetti effect when quiz is passed
  useEffect(() => {
    if (quizCompleted && quizScore >= 80 && confettiRef.current) {
      const rect = confettiRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#5a7d53", "#f0d878", "#85bb65", "#f8d231"],
      })
    }
  }, [quizCompleted, quizScore])

  // Content sections for each module
  const moduleContent = [
    // Section 1, Module 1
    [
      {
        title: "Investing Basics",
        content: (
          <div className="space-y-4">
            <p className="mb-3">
              Many beginners focus on what to invest in, but the first step should be identifying <strong>why</strong>{" "}
              they want to invest.
            </p>
            <p className="mb-3">
              Financial goals drive investment choices, determining the right account type, tax advantages, investment
              types, and risk allocation.
            </p>
            <p className="mb-3">Goals vary: emergency fund, retirement, home down payment, business, etc.</p>
            <p className="mb-3">
              Time horizon influences risk tolerance—longer horizons allow for more risk, while shorter ones require
              conservative strategies.
            </p>
            <p>Investment planning follows a top-down approach: define goals first, then select strategies.</p>
            <div className="mt-6 flex justify-center">
              <img
                src="investment-planning-pyramid.png"
                alt="Investment Planning Pyramid"
                className="w-120 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Source: Financial Planning on Marzfoo (https://marzfoo.sg/financial-planning/)
            </p>
          </div>
        ),
      },
      {
        title: "Stocks & the Stock Market",
        content: (
          <div className="space-y-4">
            <p className="mb-3">
              A stock represents ownership in a company, entitling shareholders to a portion of assets and earnings.
            </p>
            <p className="mb-3">
              Stocks are traded on public exchanges, enabling investors to buy and sell electronically.
            </p>
            <h4 className="font-bold text-lg text-[#5a7d53] mt-4 mb-2">Ways to earn money from stocks:</h4>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>Capital Appreciation:</strong> When stock price increases over time.
              </li>
              <div className="mt-6 flex justify-center">
                <img
                  src="capital-appreciation.png"
                  alt="capital-appreciation"
                  className="w-32 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <li>
                <strong>Dividends:</strong> Companies share profits with shareholders in cash or additional stock.
              </li>
            </ul>
            <p>
              The stock market functions like an auction house, matching buyers and sellers via online brokers. It is
              also referred to as a stock exchange.
            </p>
            <div className="mt-6 flex justify-center">
              <img
                src="dividend.png"
                alt="dividend"
                className="w-32 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">Sources: Coursera SoFi, Canva</p>
          </div>
        ),
      },
      {
        title: "What are stock exchanges?",
        content: (
          <div className="space-y-4">
            <p className="mb-3">
              This is the marketplace where financial instruments, like stocks, are traded. This is the 'auction house'.
              There are a couple of types of stock exchanges but the most important and widely used one is the
              Electronic Stock exchange.
            </p>

            <h4 className="font-bold text-lg text-[#5a7d53] mt-4 mb-2">The major US Stock exchanges</h4>
            <p className="mb-3">
              Why is this important? US Exchanges are some of the largest stock exchanges in the world and widely
              adopted.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>NYSE:</strong> New York stock exchange, the world's largest equities (a.k.a stock) exchange
              </li>
              <li>
                <strong>Nasdaq:</strong> Known for tech companies like Apple, Microsoft, and Tesla
              </li>
            </ul>

            <div className="mt-6 flex justify-center">
              <img
                src="stock-exchange.png"
                alt="stock-exchange"
                className="w-65 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            <h4 className="font-bold text-lg text-[#5a7d53] mt-4 mb-2">International Exchanges</h4>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>The Shanghai Stock Exchange (SSE):</strong> Investments like stocks, bonds, and mutual funds are
                traded
              </li>
              <li>
                <strong>London Stock Exchange (LSE):</strong> located in the United Kingdom
              </li>
              <li>
                <strong>Singapore Exchange (SGX):</strong> Singapore's stock exchange
              </li>
            </ul>

            <p>
              Every stock exchange has some rules for which companies they allow to sell in their marketplace. These are
              called "Listing Requirements".
            </p>

            <p className="text-sm text-gray-500 mt-4">Sources: Investopedia "Types of Stock Exchanges", Canva</p>
          </div>
        ),
      },
      {
        title: "Key Players in the Stock Market",
        content: (
          <div className="space-y-4">
            <p className="mb-3">Understanding who participates in the market helps you see how trades happen.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#f0f9f4] p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">👤 Retail Investors</h4>
                <p>Everyday individuals investing for personal goals 🏡</p>
              </div>
              <div className="bg-[#f0f9f4] p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">🏛️ Institutional Investors</h4>
                <p>Large firms managing billions (e.g., mutual funds, hedge funds) 💼</p>
              </div>
              <div className="bg-[#f0f9f4] p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">🔄 Market Makers</h4>
                <p>Ensure there are buyers & sellers to keep trading smooth ⚖️</p>
              </div>
              <div className="bg-[#f0f9f4] p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">📜 Regulators</h4>
                <p>SEC, FINRA – Keep markets fair and protect investors 🛡️</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <img
                src="key-players.png"
                alt="key-players"
                className="w-70 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">Source: SEC.gov, Understanding the Stock Market, Canva</p>
          </div>
        ),
      },
      {
        title: "IPOs Explained",
        content: (
          <div className="space-y-4">
            <p className="mb-3">
              A company must first go public through an Initial Public Offering (IPO) before its stock can be traded.
            </p>
            <h4 className="font-bold text-lg text-[#5a7d53] mt-4 mb-2">🚀 IPO Process Simplified:</h4>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#5a7d53]"></div>
              <div className="space-y-6 ml-10">
                <div className="relative">
                  <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#5a7d53] text-white flex items-center justify-center">
                    1
                  </div>
                  <p>A private company decides to go public to raise money.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#5a7d53] text-white flex items-center justify-center">
                    2
                  </div>
                  <p>It works with investment banks to set an initial stock price.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#5a7d53] text-white flex items-center justify-center">
                    3
                  </div>
                  <p>The stock is offered to institutional investors first.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#5a7d53] text-white flex items-center justify-center">
                    4
                  </div>
                  <p>Once trading begins, anyone can buy shares.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[#f0f9f4] rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
              <h4 className="font-bold text-lg text-[#5a7d53] mb-2">Example: Facebook's 2012 IPO</h4>
              <p>
                It started at $38 per share. Despite early struggles, it grew into Meta, now worth hundreds of billions.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <img
                src="ipo-process.png"
                alt="IPO Process"
                className="w-85 h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">Source: Investopedia, What Is an IPO?, Canva</p>
          </div>
        ),
      },
    ],
    // Section 1, Module 2 - Updated content
    [
      {
        title: "Types of Stocks: Overview",
        content: (
          <div className="space-y-4">
            <div className="bg-[#f0f9f4] p-4 rounded-lg mb-4">
              <h4 className="font-bold text-lg text-[#5a7d53] mb-2">Learning Objectives</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Distinguish between different categories of stocks and their characteristics</li>
              </ul>
            </div>

            <p className="mb-3">
              Stocks come in various types, each with unique characteristics that appeal to different investor needs and
              goals. Understanding these differences helps you build a portfolio that aligns with your investment
              strategy.
            </p>

            <div className="bg-[#f0f9f4] p-4 rounded-lg mb-4">
              <h4 className="font-bold text-lg text-[#5a7d53] mb-2">Activities</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Case studies on specific stocks to highlight differences</li>
                <li>Drag-and-drop matching exercises for stock categories</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Different types of stocks"
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Common vs. Preferred Stock",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg border-l-4 border-[#5a7d53]">
                <h4 className="font-bold text-xl text-[#5a7d53] mb-3">Common Stock</h4>
                <p className="mb-3">
                  <strong>What it is:</strong> The "default" stock type most investors are familiar with.
                </p>
                <p className="mb-3">
                  <strong>Key perks:</strong> Voting rights + growth potential.
                </p>
                <p>
                  <strong>Best for:</strong> Long-term investors betting on company success.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Ideal for investors looking for growth. The more successful the company becomes, the greater the
                  potential for stock price appreciation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg border-l-4 border-[#f0d878]">
                <h4 className="font-bold text-xl text-[#5a7d53] mb-3">Preferred Stock</h4>
                <p className="mb-3">
                  <strong>What it is:</strong> A hybrid (stock + bond-like features).
                </p>
                <p className="mb-3">
                  <strong>Key perks:</strong> Priority dividends + lower risk.
                </p>
                <p>
                  <strong>Best for:</strong> Income seekers who want stability.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  No voting rights but receives dividends before common stockholders. Better for investors who prefer
                  steady income rather than seeking long-term growth.
                </p>
              </div>
            </div>

            <div className="bg-[#f0f9f4] p-5 rounded-lg">
              <div className="flex items-start">
                <div className="bg-[#5a7d53] text-white p-2 rounded-full mr-3 flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#5a7d53] mb-1">Why it matters</h4>
                  <p>
                    Choose common stock for growth potential, preferred stock for steady income. Preferred stocks offer
                    more stability and lower risk compared to common stocks.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#f9f7f2] rounded-lg border border-gray-200">
              <h5 className="font-bold text-[#5a7d53] mb-2">Quick Check:</h5>
              <p className="mb-2">Which stock type gives shareholders voting rights?</p>
              <div className="pl-4">
                <p className="mb-1">A) Common stock ✅</p>
                <p className="mb-1">B) Preferred stock</p>
                <p className="mb-1">C) Both</p>
                <p className="mb-1">D) Neither</p>
              </div>

              <p className="mt-4 mb-2">Preferred stockholders receive dividends…</p>
              <div className="pl-4">
                <p className="mb-1">A) After common stockholders</p>
                <p className="mb-1">B) Before common stockholders ✅</p>
                <p className="mb-1">C) At the same time as common stockholders</p>
                <p className="mb-1">D) Only if the company performs well</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Stock Classifications by Market Capitalization",
        content: (
          <div className="space-y-4">
            <p className="mb-4">
              <strong>What is Market Capitalization:</strong> It shows how much a company is worth as determined by the
              total market value of all outstanding shares.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-5 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg border-t-4 border-[#5a7d53]">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">Large-Cap</h4>
                <p className="font-bold text-gray-700 mb-2">USD 10 billion +</p>
                <p className="mb-3">
                  <strong>Traits:</strong> Stable, low risk, established industries
                </p>
                <p>
                  <strong>Examples:</strong> Apple, Microsoft
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg border-t-4 border-[#85bb65]">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">Mid-Cap</h4>
                <p className="font-bold text-gray-700 mb-2">USD 2-10 billion</p>
                <p className="mb-3">
                  <strong>Traits:</strong> Balance of growth and stability
                </p>
                <p>
                  <strong>Examples:</strong> Regional banks, emerging tech
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg border-t-4 border-[#f0d878]">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-2">Small-Cap</h4>
                <p className="font-bold text-gray-700 mb-2">USD 250 million - 2 Billion</p>
                <p className="mb-3">
                  <strong>Traits:</strong> High growth potential but volatile
                </p>
                <p>
                  <strong>Examples:</strong> Niche tech startups
                </p>
              </div>
            </div>

            <p className="mb-4">
              Small-cap share prices may be volatile but provide greater growth opportunities than large caps. Large-cap
              stocks are typically from well-established companies in mature industries.
            </p>

            <div className="bg-[#f0f9f4] p-5 rounded-lg">
              <div className="flex items-start">
                <div className="bg-[#5a7d53] text-white p-2 rounded-full mr-3 flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#5a7d53] mb-1">Why it matters</h4>
                  <p>
                    Market capitalization helps investors assess risk. Large-cap stocks are typically safer, while
                    small-cap stocks offer high growth but come with more risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#f9f7f2] rounded-lg border border-gray-200">
              <h5 className="font-bold text-[#5a7d53] mb-2">Quick Check:</h5>
              <p className="mb-2">What does market capitalization measure?</p>
              <div className="pl-4">
                <p className="mb-1">A) A company's total debt</p>
                <p className="mb-1">B) The total value of its outstanding shares ✅</p>
                <p className="mb-1">C) Annual revenue</p>
                <p className="mb-1">D) The number of stocks issued</p>
              </div>

              <p className="mt-4 mb-2">Which category is generally more stable and lower risk?</p>
              <div className="pl-4">
                <p className="mb-1">A) Small-cap</p>
                <p className="mb-1">B) Large-cap ✅</p>
                <p className="mb-1">C) Mid-cap</p>
                <p className="mb-1">D) Growth stocks</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Source: SoFi's course on Coursera, Investopedia "Market Capitalization: What It Means for Investors"
            </p>
          </div>
        ),
      },
      {
        title: "Investment Styles: How Stocks are Categorized",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-5 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-3">Value Stocks</h4>
                <p className="mb-3">
                  <strong>What:</strong> Undervalued companies expected to grow over time
                </p>
                <p>
                  <strong>Best for:</strong> Patient investors, long-term investment
                </p>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-[#f0f9f4] text-[#5a7d53] px-3 py-1 rounded-full text-sm font-medium">
                    Bargain hunting
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-3">Growth Stocks</h4>
                <p className="mb-3">
                  <strong>What:</strong> Fast-growing companies that reinvest earnings (e.g., Amazon, Tesla)
                </p>
                <p>
                  <strong>Best for:</strong> Risk-tolerant investors
                </p>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-[#f0f9f4] text-[#5a7d53] px-3 py-1 rounded-full text-sm font-medium">
                    High reward potential
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                <h4 className="font-bold text-lg text-[#5a7d53] mb-3">Dividend Stocks</h4>
                <p className="mb-3">
                  <strong>What:</strong> Income generators (e.g., utility companies, consumer staples)
                </p>
                <p>
                  <strong>Best for:</strong> Income-seeking investors, retirees
                </p>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-[#f0f9f4] text-[#5a7d53] px-3 py-1 rounded-full text-sm font-medium">
                    Regular payouts
                  </span>
                </div>
              </div>
            </div>

            <p className="mb-4">
              Growth stocks don't typically pay dividends but offer high capital appreciation potential. Dividend stocks
              are usually well-established companies that pay regular dividends.
            </p>

            <div className="bg-[#f0f9f4] p-5 rounded-lg">
              <div className="flex items-start">
                <div className="bg-[#5a7d53] text-white p-2 rounded-full mr-3 flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#5a7d53] mb-1">Why it matters</h4>
                  <p>Match stocks to your goals:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Value = Long-term bargains</li>
                    <li>Growth = High-reward bets</li>
                    <li>Dividend = Reliable income</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#f9f7f2] rounded-lg border border-gray-200">
              <h5 className="font-bold text-[#5a7d53] mb-2">Quick Check:</h5>
              <p className="mb-2">Which stock type is best for investors looking for regular income?</p>
              <div className="pl-4">
                <p className="mb-1">A) Growth stock</p>
                <p className="mb-1">B) Value stock</p>
                <p className="mb-1">C) Dividend stock ✅</p>
                <p className="mb-1">D) Small-cap stock</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Investment styles comparison"
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Module 1.2 Review",
        content: (
          <div className="space-y-4">
            <div className="bg-[#f0f9f4] p-5 rounded-lg mb-6">
              <h4 className="font-bold text-xl text-[#5a7d53] mb-3">Key Takeaways</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Common vs. Preferred Stock:</strong> Common stock offers voting rights and growth potential,
                  while preferred stock provides priority dividends and more stability.
                </li>
                <li>
                  <strong>Market Capitalization:</strong> Large-cap stocks (&gt;$10B) offer stability, while small-cap
                  stocks ($250M-$2B) provide higher growth potential with more risk.
                </li>
                <li>
                  <strong>Investment Styles:</strong> Value stocks are undervalued with long-term potential, growth
                  stocks focus on capital appreciation, and dividend stocks generate regular income.
                </li>
              </ul>
            </div>

            <p className="mb-4">
              Understanding these different stock types and classifications helps you build a diversified portfolio that
              matches your investment goals, risk tolerance, and time horizon.
            </p>

            <div className="bg-[#f0d878] bg-opacity-20 p-5 rounded-lg">
              <div className="flex items-start">
                <div className="bg-[#f0d878] text-[#5a7d53] p-2 rounded-full mr-3 flex-shrink-0">
                  <span className="text-xl">📝</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#5a7d53] mb-1">Ready for the Quiz?</h4>
                  <p>
                    Test your knowledge of stock types and classifications with our comprehensive module quiz. The quiz
                    includes both recall questions to test your memory and application questions to test your
                    understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    // Section 2, Module 1
    [
      {
        title: "Introduction to Investment Vehicles",
        content: (
          <div className="space-y-4">
            <p>Content for Section 2, Module 1, Section 1</p>
            <div className="mt-6 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Investment Vehicles"
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        ),
      },
    ],
    // Section 3, Module 1
    [
      {
        title: "Building Your Portfolio",
        content: (
          <div className="space-y-4">
            <p>Content for Section 3, Module 1, Section 1</p>
            <div className="mt-6 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Portfolio Building"
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        ),
      },
    ],
  ]

  const stepsData = [
    {
      id: 1,
      title: "Introduction to Stock Market Basics",
      modules: [
        {
          id: 1,
          title: "What is the Stock Market?",
          contentSections: moduleContent[0],
          quiz: [
            {
              question: "What should be the first step in investment planning?",
              options: [
                "Choosing specific stocks to invest in",
                "Identifying your financial goals",
                "Opening a brokerage account",
                "Calculating potential returns",
              ],
              correctAnswer: 1,
            },
            {
              question: "How does a longer time horizon typically impact investment strategy?",
              options: [
                "It requires more conservative investments",
                "It allows for taking on more investment risk",
                "It eliminates the need for diversification",
                "It guarantees higher returns",
              ],
              correctAnswer: 1,
            },
            {
              question: "Which are the two primary ways to earn money from stocks?",
              options: [
                "Trading and borrowing",
                "Saving and lending",
                "Capital appreciation and dividends",
                "Consulting and analyzing",
              ],
              correctAnswer: 2,
            },
            {
              question: "Who are institutional investors?",
              options: [
                "Individual small-scale investors",
                "Large firms managing billions of dollars",
                "Company founders",
                "Individual stock traders",
              ],
              correctAnswer: 1,
            },
            {
              question: "What does an Initial Public Offering (IPO) represent?",
              options: [
                "A company's internal audit",
                "A merger between two companies",
                "A private company going public to raise money",
                "A stock market regulation process",
              ],
              correctAnswer: 2,
            },
            {
              question: "Which US stock exchange is known for tech companies?",
              options: ["NYSE", "Dow Jones", "S&P 500", "Nasdaq"],
              correctAnswer: 3,
            },
            {
              question: "What is the primary role of market makers?",
              options: [
                "To set stock prices",
                "To ensure smooth trading by matching buyers and sellers",
                "To regulate the stock market",
                "To create investment strategies",
              ],
              correctAnswer: 1,
            },
            {
              question: "How do financial goals influence investment choices?",
              options: [
                "They have no significant impact",
                "They determine account type, tax advantages, and risk allocation",
                "They only affect retirement planning",
                "They are relevant only for large investors",
              ],
              correctAnswer: 1,
            },
            {
              question: 'What are "listing requirements" in stock exchanges?',
              options: [
                "Personal qualifications for investors",
                "Rules for which companies can be traded",
                "Minimum investment amounts",
                "Trading hour regulations",
              ],
              correctAnswer: 1,
            },
            {
              question: "The primary responsibility of stock market regulators is to:",
              options: [
                "Maximize investor profits",
                "Control stock prices",
                "Keep markets fair and protect investors",
                "Manage individual investment portfolios",
              ],
              correctAnswer: 2,
            },
          ],
        },
        {
          id: 2,
          title: "Types of Stock",
          contentSections: moduleContent[1],
          quiz: [
            {
              question: "What is the main advantage of preferred stock over common stock?",
              options: [
                "Higher capital growth potential",
                "Ability to vote in company decisions",
                "Priority in receiving dividends",
                "Higher risk and volatility",
              ],
              correctAnswer: 2,
            },
            {
              question: "Which type of stock is best for investors seeking steady income?",
              options: ["Common stock", "Growth stock", "Preferred stock", "Small-cap stock"],
              correctAnswer: 2,
            },
            {
              question: "What does market capitalization measure?",
              options: [
                "The amount of debt a company has",
                "The company's total annual revenue",
                "The total market value of a company's outstanding shares",
                "The number of shares issued by a company",
              ],
              correctAnswer: 2,
            },
            {
              question: "A company with a market capitalization of $15 billion would be classified as:",
              options: ["Small-cap", "Mid-cap", "Large-cap", "Growth stock"],
              correctAnswer: 2,
            },
            {
              question: "Which of the following is true about large-cap stocks?",
              options: [
                "They are riskier than small-cap stocks",
                "They typically belong to well-established companies",
                "They always pay dividends",
                "They have higher growth potential than small-cap stocks",
              ],
              correctAnswer: 1,
            },
            {
              question: "Which market cap category is best known for stability and lower risk?",
              options: ["Small-cap", "Mid-cap", "Large-cap", "Micro-cap"],
              correctAnswer: 2,
            },
            {
              question: "Which company is most likely to be classified as large-cap?",
              options: [
                "A newly launched AI startup",
                "A local retail chain with a $500 million market cap",
                "A multinational company like Microsoft",
                "A biotech firm with a $1 billion valuation",
              ],
              correctAnswer: 2,
            },
            {
              question:
                "An investor wants to influence company decisions by voting in shareholder meetings. Which type of stock should they choose?",
              options: ["Preferred stock", "Dividend stock", "Common stock", "Small-cap stock"],
              correctAnswer: 2,
            },
            {
              question: "Which of the following investors would most benefit from preferred stock?",
              options: [
                "A young investor looking for long-term growth",
                "A retiree looking for stable, regular income",
                "A venture capitalist investing in high-risk startups",
                "A tech investor aiming for rapid capital appreciation",
              ],
              correctAnswer: 1,
            },
            {
              question:
                "As of April 2025, Apple's Market Capitalization is USD 3.34 Trillion. What category does Apple fall under?",
              options: ["Large Cap", "Small Cap", "Mid Cap", "Growth Stock"],
              correctAnswer: 0,
            },
            {
              question:
                "An investor wants high growth potential but is willing to accept more risk. Which market cap category should they consider?",
              options: ["Large-cap", "Mid-cap", "Small-cap", "Dividend stocks"],
              correctAnswer: 2,
            },
            {
              question: "A company has a market capitalization of $500 million. How is it classified?",
              options: ["Small-cap", "Large-cap", "Mid-cap", "Blue-chip"],
              correctAnswer: 0,
            },
            {
              question: "Why might an investor avoid small-cap stocks?",
              options: [
                "They have lower volatility than large-cap stocks",
                "They have higher risk and can be more volatile",
                "They offer no growth potential",
                "They are always owned by private companies",
              ],
              correctAnswer: 1,
            },
            {
              question: "Why might an investor choose common stock over preferred stock?",
              options: [
                "Common stock has lower risk",
                "Common stock offers higher dividend priority",
                "Common stock has higher growth potential",
                "Common stock provides a fixed income",
              ],
              correctAnswer: 2,
            },
            {
              question:
                "If a company is struggling financially, which group of stockholders is more likely to lose their dividends first?",
              options: [
                "Common stockholders",
                "Preferred stockholders",
                "Large-cap stockholders",
                "Mid-cap stockholders",
              ],
              correctAnswer: 0,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Fundamental Analysis",
      modules: [
        {
          id: 1,
          title: "Financial Statements",
          contentSections: moduleContent[1],
          quiz: [],
        },
      ],
    },
    {
      id: 3,
      title: "Technical Analysis",
      modules: [
        {
          id: 1,
          title: "Chart Patterns",
          contentSections: moduleContent[2],
          quiz: [],
        },
      ],
    },
  ]

  const steps = stepsData

  const handleCompleteModule = () => {
    // Only allow progression if score is 80% or above
    if (quizScore >= 80) {
      // Mark this module as completed in localStorage
      const savedProgress = localStorage.getItem("courseProgress")
      const progress = savedProgress
        ? JSON.parse(savedProgress)
        : {
            currentStep: 1,
            currentModule: 1,
            completedModules: {},
          }

      // Mark this module as completed
      progress.completedModules = {
        ...progress.completedModules,
        [`${currentStep}.${currentModule}`]: true,
      }

      // Save updated progress
      localStorage.setItem("courseProgress", JSON.stringify(progress))

      // Get the current step data
      const currentStepData = steps[currentStep - 1]

      // Check if there are more modules in the current step
      if (currentModule < currentStepData.modules.length) {
        // Move to the next module in the same step
        setCurrentModule(currentModule + 1)
        setCurrentContentIndex(0)
        setShowQuiz(false)

        // Navigate to the next module
        navigate(`/course-content?step=${currentStep}&module=${currentModule + 1}`)
      } else {
        // If we've completed all modules in this step, move to the next step
        if (currentStep < steps.length) {
          setCurrentStep(currentStep + 1)
          setCurrentModule(1)
          setCurrentContentIndex(0)
          setShowQuiz(false)

          // Navigate to the next step
          navigate(`/course-content?step=${currentStep + 1}&module=1`)
        }
      }
    } else {
      // Show tooltip with message
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 3000)
    }
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    })
  }

  const calculateScore = () => {
    const currentQuiz = steps[currentStep - 1].modules[currentModule - 1].quiz
    let correctAnswers = 0

    Object.entries(selectedAnswers).forEach(([questionIndex, answerIndex]) => {
      if (currentQuiz[Number.parseInt(questionIndex)].correctAnswer === Number.parseInt(answerIndex)) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / currentQuiz.length) * 100)
    setQuizScore(score)
    return score
  }

  // Update the handleCompleteQuiz function to mark the module as completed when the quiz is passed
  const handleCompleteQuiz = () => {
    const score = calculateScore()
    setQuizScore(score)
    setQuizCompleted(true)

    // If score is 80% or higher, mark this module as completed
    if (score >= 80) {
      // Get existing progress
      const savedProgress = localStorage.getItem("courseProgress")
      const progress = savedProgress
        ? JSON.parse(savedProgress)
        : {
            currentStep: 1,
            currentModule: 1,
            completedModules: {},
          }

      // Mark this module as completed
      progress.completedModules = {
        ...progress.completedModules,
        [`${currentStep}.${currentModule}`]: true,
      }

      // Also store the quiz score
      if (!progress.quizScores) {
        progress.quizScores = {}
      }
      progress.quizScores[`${currentStep}.${currentModule}`] = score

      // Save updated progress
      localStorage.setItem("courseProgress", JSON.stringify(progress))
    }
  }

  const resetQuiz = () => {
    setShowQuiz(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setQuizScore(0)
  }

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index)
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const goToNextQuestion = () => {
    const currentQuiz = steps[currentStep - 1].modules[currentModule - 1].quiz
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1)
    }
  }

  const goToNextContent = () => {
    const currentContent = steps[currentStep - 1].modules[currentModule - 1].contentSections
    if (currentContentIndex < currentContent.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1)
    }
  }

  const goBackToCourses = () => {
    navigate("/courses")
  }

  const toggleSectionExpand = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleSectionClick = (sectionId) => {
    setCurrentStep(sectionId)
    setCurrentModule(1)
    setExpandedSection(sectionId)
    navigate(`/course-content?step=${sectionId}&module=1`)
  }

  const handleModuleClick = (sectionId, moduleId) => {
    setCurrentStep(sectionId)
    setCurrentModule(moduleId)
    navigate(`/course-content?step=${sectionId}&module=${moduleId}`)
  }

  const handleSectionComplete = (sectionId) => {
    if (!completedSteps.includes(sectionId)) {
      setCompletedSteps([...completedSteps, sectionId])
    }

    // Move to next section if available
    if (sectionId < steps.length) {
      setCurrentStep(sectionId + 1)
      setCurrentModule(1)
      setExpandedSection(sectionId + 1)
      navigate(`/course-content?step=${sectionId + 1}&module=1`)
    }
  }

  if (!isLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const currentStepData = steps[currentStep - 1]
  const currentModuleData = currentStepData.modules[currentModule - 1]
  const currentQuiz = currentModuleData.quiz
  const currentContent = currentModuleData.contentSections || []

  return (
    <div className="min-h-screen bg-[#f9f7f2] overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#5a7d53] opacity-5 animate-pulse"></div>
        <div
          className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#f0d878] opacity-5 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-[#85bb65] opacity-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="bg-[#5a7d53] text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={goBackToCourses}
            className="flex items-center text-white hover:text-[#f0d878] transition-colors transform hover:scale-105"
          >
            <ChevronLeft className="mr-1" />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">Course Content</h1>
          <div className="w-[100px]"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-500 hover:shadow-xl">
          {/* Course Navigation Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>
              Section {currentStep}: {currentStepData.title}
            </span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>
              {currentStep}.{currentModule}: {currentModuleData.title}
            </span>
          </div>

          {showQuiz ? (
            <div className="max-w-3xl mx-auto animate-fadeInOnce">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                {" "}
                {/* Added card for quiz */}
                {quizCompleted ? (
                  <div className="text-center py-8" ref={confettiRef}>
                    <div
                      className={`w-24 h-24 ${quizScore >= 80 ? "bg-[#5a7d53]" : "bg-[#e07a5f]"} rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}
                    >
                      {quizScore >= 80 ? (
                        <Award className="w-12 h-12 text-white" />
                      ) : (
                        <AlertTriangle className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-[#5a7d53] mb-4">Quiz Completed!</h2>

                    <div className="mb-8">
                      <div className="w-48 h-48 mx-auto relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={quizScore >= 80 ? "#5a7d53" : "#e07a5f"}
                            strokeWidth="10"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * quizScore) / 100}
                            transform="rotate(-90 50 50)"
                            className="animate-scoreReveal"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold animate-fadeIn">{quizScore}%</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4 animate-fadeIn">
                        {quizScore >= 80
                          ? "Congratulations! You've mastered this module. Your score has been saved, and you won't need to retake this quiz."
                          : "You need to score at least 80% to unlock the next section. Review the material and try again."}
                      </p>

                      {/* Passing threshold indicator */}
                      <div className="mt-6 flex items-center justify-center space-x-2">
                        <div className="h-1 w-16 bg-gray-200 rounded-full"></div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                          80%
                        </div>
                        <div className="h-1 w-16 bg-gray-200 rounded-full"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Passing Threshold</p>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {quizScore < 80 && (
                        <button
                          onClick={resetQuiz}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors transform hover:scale-105"
                        >
                          Retake Quiz
                        </button>
                      )}
                      <button
                        onClick={handleCompleteModule}
                        className={`bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-colors transform hover:scale-105 relative ${quizScore >= 80 ? "hover:bg-[#4a6a45]" : "opacity-50 cursor-not-allowed"}`}
                      >
                        {quizScore >= 80 ? "Continue to Next Module" : "Continue"}
                        {showTooltip && quizScore < 80 && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-red-500 text-white text-xs rounded py-1 px-2 animate-fadeIn">
                            You need 80% to unlock the next section!
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-500"></div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-[#5a7d53]">Module Quiz</h2>
                      <span className="text-gray-500">
                        Question {currentQuestionIndex + 1} of {currentQuiz.length}
                      </span>
                    </div>

                    {/* Progress bar with animation */}
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                      <div
                        className="h-full bg-[#5a7d53] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%` }}
                      ></div>
                    </div>

                    {/* Question navigation */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentQuiz.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToQuestion(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all duration-300 transform ${
                            currentQuestionIndex === index
                              ? "bg-[#5a7d53] text-white scale-110"
                              : selectedAnswers[index] !== undefined
                                ? "bg-[#f0d878] text-[#5a7d53] hover:scale-110"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-110"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    {currentQuiz && currentQuiz.length > 0 ? (
                      <div className="bg-[#f0f9f4] p-6 rounded-lg mb-8 shadow-md">
                        <div className="flex items-start mb-6">
                          <HelpCircle className="w-6 h-6 text-[#5a7d53] mr-3 mt-1 flex-shrink-0" />
                          <h3 className="text-xl font-bold text-[#5a7d53]">
                            {currentQuiz[currentQuestionIndex]?.question || "Loading question..."}
                          </h3>
                        </div>

                        <div className="space-y-3 mt-6">
                          {currentQuiz[currentQuestionIndex]?.options.map((option, index) => {
                            const isSelected = selectedAnswers[currentQuestionIndex] === index
                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                                  isSelected
                                    ? "border-[#5a7d53] bg-[#f0f9f4] transform scale-105 shadow-md"
                                    : "border-gray-200 hover:border-[#5a7d53] hover:shadow-sm"
                                }`}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${
                                      isSelected ? "bg-[#5a7d53] text-white" : "bg-gray-200 text-gray-700"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No quiz questions available for this module yet.</p>
                        <button
                          onClick={() => setShowQuiz(false)}
                          className="mt-4 bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#4a6a45] transform hover:scale-105"
                        >
                          Return to Content
                        </button>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`flex items-center bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg transition-all duration-300 ${
                          currentQuestionIndex === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-300 transform hover:scale-105"
                        }`}
                      >
                        <ArrowLeft className="mr-1" /> Previous
                      </button>

                      {currentQuestionIndex < currentQuiz.length - 1 ? (
                        <button
                          onClick={goToNextQuestion}
                          className="flex items-center bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#4a6a45] transform hover:scale-105"
                        >
                          Next <ArrowRight className="ml-1" />
                        </button>
                      ) : (
                        <button
                          onClick={handleCompleteQuiz}
                          className="flex items-center bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#4a6a45] transform hover:scale-105"
                        >
                          Complete Quiz <ChevronRight className="ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-fadeInOnce">
              <h2 className="text-2xl font-bold text-[#5a7d53] mb-6">
                Section {currentStep}: {currentStepData.title}
              </h2>
              <h3 className="text-xl font-bold text-[#5a7d53] mb-4">
                {currentStep}.{currentModule}: {currentModuleData.title}
              </h3>

              {currentContent.length > 0 && (
                <div className="mt-6">
                  {/* Content navigation */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#5a7d53]">{currentContent[currentContentIndex].title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">
                        Section {currentContentIndex + 1} of {currentContent.length}
                      </span>
                    </div>
                  </div>

                  {/* Content card with animation */}
                  <div className="bg-white border-2 border-[#5a7d53] rounded-xl shadow-lg p-6 mb-6 transition-all duration-500 transform animate-fadeSlideInOnce">
                    {currentContent[currentContentIndex].content}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={goToPreviousContent}
                      disabled={currentContentIndex === 0}
                      className={`flex items-center bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg transition-all duration-300 ${
                        currentContentIndex === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-300 transform hover:scale-105"
                      }`}
                    >
                      <ArrowLeft className="mr-1" /> Previous
                    </button>

                    {/* Section navigation dots with hover effects */}
                    <div className="flex items-center space-x-2">
                      {currentContent.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentContentIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                            currentContentIndex === index ? "bg-[#5a7d53]" : "bg-gray-300 hover:bg-[#85bb65]"
                          }`}
                          aria-label={`Go to section ${index + 1}`}
                        />
                      ))}
                    </div>

                    {currentContentIndex < currentContent.length - 1 ? (
                      <button
                        onClick={goToNextContent}
                        className="flex items-center bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#4a6a45] transform hover:scale-105"
                      >
                        Next <ArrowRight className="ml-1" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="flex items-center bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#4a6a45] transform hover:scale-105 animate-pulse"
                      >
                        Take Quiz <ChevronRight className="ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scoreReveal {
          from { stroke-dashoffset: 283; }
          to { stroke-dashoffset: ${283 - (283 * quizScore) / 100}; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fadeInOnce {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fadeSlideInOnce {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        
        .animate-scoreReveal {
          animation: scoreReveal 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default CourseContent

