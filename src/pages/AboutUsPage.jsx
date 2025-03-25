"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import TypewriterComponent from "./components/typewriter"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const aboutSectionRef = useRef(null)
  const teamMembersRef = useRef(null)
  const challengeCardsRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    setMounted(true)

    // Set loaded state after a small delay for initial animations
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Animation for paragraphs on scroll
    const animateParagraphs = () => {
      const paragraphs = document.querySelectorAll(".about-us p")

      paragraphs.forEach((paragraph) => {
        const paragraphPosition = paragraph.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2

        if (paragraphPosition < screenPosition) {
          paragraph.classList.add("animate")
        }
      })
    }

    // Animation for team members on scroll with staggered effect
    const animateTeamMembers = () => {
      const teamMembers = document.querySelectorAll(".team-member")

      teamMembers.forEach((member, index) => {
        const memberPosition = member.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3

        if (memberPosition < screenPosition) {
          setTimeout(() => {
            member.classList.add("animate")
          }, index * 150) // Staggered animation
        }
      })
    }

    // Animation for challenge cards with staggered effect
    const animateChallengeCards = () => {
      const cards = document.querySelectorAll(".challenge-card")

      cards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2

        if (cardPosition < screenPosition) {
          setTimeout(() => {
            card.classList.add("animate")
          }, index * 150) // Staggered animation
        }
      })
    }

    // Animation for tagline
    const animateTagline = () => {
      const tagline = document.querySelector(".tagline")
      if (tagline) {
        const taglinePosition = tagline.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2

        if (taglinePosition < screenPosition) {
          tagline.classList.add("animate")
        }
      }
    }

    // Add background elements
    const addBackgroundElements = () => {
      const aboutUs = document.querySelector(".about-us")

      if (aboutUs) {
        const bgElement1 = document.createElement("div")
        bgElement1.classList.add("bg-element", "bg-element-1")

        const bgElement2 = document.createElement("div")
        bgElement2.classList.add("bg-element", "bg-element-2")

        aboutUs.appendChild(bgElement1)
        aboutUs.appendChild(bgElement2)
      }
    }

    // Add section dividers
    const addSectionDividers = () => {
      const headers = document.querySelectorAll(".about-header")

      headers.forEach((header, index) => {
        if (index > 0) {
          const divider = document.createElement("div")
          divider.classList.add("section-divider")
          header.parentNode?.insertBefore(divider, header)
        }
      })
    }

    // Add highlight spans to specific words
    const addHighlights = () => {
      const paragraphs = document.querySelectorAll(".about-us p")
      const highlightWords = ["investing", "adventure", "fun", "accessible", "interactive", "journey", "grow", "thrive"]

      paragraphs.forEach((paragraph) => {
        highlightWords.forEach((word) => {
          const regex = new RegExp(`\\b${word}\\b`, "gi")
          paragraph.innerHTML = paragraph.innerHTML.replace(regex, (match) => `<span class="highlight">${match}</span>`)
        })
      })
    }

    // Add highlight spans to headline words
    const addHeadlineHighlights = () => {
      const headlines = document.querySelectorAll(".headline, .tagline h2")
      const highlightWords = ["REMOTE", "HYBRID", "ON-SITE", "DAILY", "SMOOTHER", "ALL IN ONE"]

      headlines.forEach((headline) => {
        highlightWords.forEach((word) => {
          const regex = new RegExp(`\\b${word}\\b`, "gi")
          headline.innerHTML = headline.innerHTML.replace(regex, (match) => `<span class="highlight">${match}</span>`)
        })
      })
    }

    // Interactive team member effects
    const addTeamInteractions = () => {
      const teamMembers = document.querySelectorAll(".team-member")

      teamMembers.forEach((member) => {
        // Random rotation on hover
        member.addEventListener("mouseenter", () => {
          const randomRotation = Math.random() * 3 - 1.5 // Between -1.5 and 1.5 degrees
          const element = member
          element.style.transform = `translateY(-15px) scale(1.03) rotate(${randomRotation}deg)`
        })

        member.addEventListener("mouseleave", () => {
          const element = member
          element.style.transform = ""
        })
      })
    }

    // Header scroll effect
    const handleScroll = () => {
      const header = document.querySelector("header")
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      }

      // Run all animations on scroll
      animateParagraphs()
      animateTeamMembers()
      animateChallengeCards()
      animateTagline()
    }

    // Initialize everything
    addBackgroundElements()
    addSectionDividers()
    addHighlights()
    addHeadlineHighlights()
    addTeamInteractions()

    // Run once on load
    animateParagraphs()
    animateTeamMembers()
    animateChallengeCards()
    animateTagline()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f0]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#e6e6d8] shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <div className="w-10 h-10 rounded-full bg-[#f0d878] flex items-center justify-center">
                <span className="text-[#5a7d53] font-bold">^_^</span>
              </div>
            </div>
            <Link href="/" className="font-silkscreen text-xl font-bold text-[#5a7d53]">
              KA-CHING
            </Link>
          </div>

          <div className="hidden md:flex space-x-1">
            <NavLink href="/" label="Home" active={true} />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/courses" label="Courses" />
            <NavLink href="/blog" label="Blog" />
          </div>

          <div>
            <Link
              href="/login"
              className="bg-[#5a7d53] hover:bg-transparent hover:text-[#5a7d53] text-white font-sarala font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 border-2 border-[#5a7d53]"
            >
              Login
            </Link>
          </div>

          <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
            <span className="w-7 h-0.5 bg-[#333333] transition-all duration-300"></span>
            <span className="w-7 h-0.5 bg-[#333333] transition-all duration-300"></span>
            <span className="w-7 h-0.5 bg-[#333333] transition-all duration-300"></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 md:pr-12">
          <h1 className="font-silkscreen text-4xl md:text-6xl font-bold leading-tight mb-4">
            <span className="text-[#5a7d53]">KA</span>
            <span className="text-[#f0d878] drop-shadow-md">CHING</span>
          </h1>
          <h2 className="font-sarala text-xl md:text-2xl text-[#5a7d53] font-bold mb-4">
            Your All-In-One
            <div className="h-16 md:h-20">
              <TypewriterComponent
                phrases={[
                  "Investment Solution.",
                  "Learning Platform.",
                  "Financial Guide.",
                  "Wealth Builder.",
                  "Investment Companion.",
                ]}
              />
            </div>
          </h2>
          <p
            className="font-sarala text-lg text-gray-600 mb-8 transform translate-y-8 opacity-0 transition-all duration-700 ease-out"
            style={{ transform: isLoaded ? "translateY(0)" : "translateY(20px)", opacity: isLoaded ? 1 : 0 }}
          >
            Make investing feel like an adventure! Our platform offers interactive lessons, placement tests, and
            resources to guide you through your investment journey.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-[#06D6A0] hover:bg-transparent hover:text-[#06D6A0] text-white font-sarala font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-[#06D6A0] relative overflow-hidden"
          >
            <span className="relative z-10">GET STARTED</span>
            <ChevronRight className="ml-2 h-5 w-5 relative z-10" />
            <span
              className="absolute top-0 left-[-100%] w-full h-full bg-white/20 transition-all duration-700 ease-in-out"
              style={{ transform: "skewX(-15deg)" }}
              onMouseEnter={(e) => {
                const target = e.target
                target.style.left = "100%"
              }}
            ></span>
          </Link>
        </div>
        <div className="w-full md:w-1/2 mb-10 md:mb-0 mt-10 md:mt-0">
          <div className="relative" style={{ animation: "float 6s ease-in-out infinite" }}>
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Investment Illustration"
              width={600}
              height={500}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Headline Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-silkscreen text-3xl md:text-4xl text-center font-bold text-[#333333] mb-16 leading-tight headline">
            BEGINNERS JUGGLING STOCKS, BONDS, AND CRYPTO FACE <span className="text-[#B5A642]">DAILY</span> CHALLENGES:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" ref={challengeCardsRef}>
            <div className="challenge-card bg-[#f9f9f0] p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8">
              <div className="text-4xl mb-4 text-[#B5A642]">📊</div>
              <h3 className="font-silkscreen text-lg font-bold">COMPLEXITY</h3>
            </div>
            <div className="challenge-card bg-[#f9f9f0] p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8">
              <div className="text-4xl mb-4 text-[#B5A642]">💸</div>
              <h3 className="font-silkscreen text-lg font-bold">RISK FEAR</h3>
            </div>
            <div className="challenge-card bg-[#f9f9f0] p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8">
              <div className="text-4xl mb-4 text-[#B5A642]">🔍</div>
              <h3 className="font-silkscreen text-lg font-bold">INFORMATION</h3>
            </div>
            <div className="challenge-card bg-[#f9f9f0] p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8">
              <div className="text-4xl mb-4 text-[#B5A642]">⏱️</div>
              <h3 className="font-silkscreen text-lg font-bold">TIME</h3>
            </div>
          </div>

          <div
            className="tagline text-center opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
            ref={taglineRef}
          >
            <h2 className="font-silkscreen text-2xl md:text-3xl font-bold text-[#333333] max-w-3xl mx-auto">
              IMAGINE IF INVESTING COULD BE <span className="text-[#B5A642]">SMOOTHER</span> -{" "}
              <span className="text-[#B5A642]">ALL IN ONE</span> PLATFORM.
            </h2>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <div
        className={`about-us container mx-auto px-4 py-16 md:py-24 ${isLoaded ? "loaded" : ""}`}
        ref={aboutSectionRef}
      >
        <div className="about-header text-center mb-12">
          <div className="accent-line mx-auto"></div>
          <h1 className="font-silkscreen text-3xl md:text-4xl font-bold text-[#5a7d53]">WHO WE ARE</h1>
        </div>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-6 opacity-0 transform translate-y-5">
          Welcome to Ka-Ching, where we make investing feel like an adventure!
        </p>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-6 opacity-0 transform translate-y-5">
          We're a passionate team of four NUS students, united by one mission: to demystify investing and make it
          simple, fun, and accessible for everyone. Our platform offers interactive lessons, placement tests, and
          resources to guide you through your investment journey.
        </p>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-12 opacity-0 transform translate-y-5">
          Get started by signing up or logging in!
        </p>

        <div className="about-header text-center mb-12">
          <div className="accent-line mx-auto"></div>
          <h1 className="font-silkscreen text-3xl md:text-4xl font-bold text-[#5a7d53]">
            OUR <span className="highlight">MISSION</span>
          </h1>
        </div>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-6 opacity-0 transform translate-y-5">
          At Ka-Ching, we're all about making investing fun, easy, and accessible for everyone!
        </p>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-6 opacity-0 transform translate-y-5">
          Our mission is to break down the intimidating world of stocks and finance and turn it into an exciting journey
          where you get to learn, grow, and thrive. No more confusing jargon—just simple, interactive lessons that help
          you master the art of investing at your own pace.
        </p>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-12 opacity-0 transform translate-y-5">
          We believe that anyone can be a savvy investor, and we're here to show you how. Whether you're just starting
          out or you're ready to take your knowledge to the next level, Ka-Ching is your go-to place for all things
          investment. Let's make your money work for you, the fun way!
        </p>

        <div className="about-header text-center mb-12">
          <div className="accent-line mx-auto"></div>
          <h1 className="font-silkscreen text-3xl md:text-4xl font-bold text-[#5a7d53]">
            MEET THE <span className="highlight">TEAM</span>
          </h1>
        </div>
        <p className="sarala-regular text-lg text-center max-w-3xl mx-auto mb-12 opacity-0 transform translate-y-5">
          Ka-Ching is not just a group of individuals — we're a collaborative force with a shared goal.
        </p>

        <div className="team grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" ref={teamMembersRef}>
          <div className="team-member bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8 border-2 border-transparent hover:border-[#f0d878]">
            <div className="member-image w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-3 border-[#5a7d53] p-1">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Ananya Agarwal"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <h3 className="font-sarala font-bold text-xl mb-1">Ananya Agarwal</h3>
            <p className="font-sarala text-gray-600 mb-4">Lead Strategist</p>
            <a
              href="https://www.linkedin.com/in/ananya-agarwal-nus"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link inline-block"
            >
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="LinkedIn"
                width={40}
                height={40}
                className="linkedin-logo transition-all duration-300 hover:scale-110"
              />
            </a>
          </div>

          <div className="team-member bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8 border-2 border-transparent hover:border-[#f0d878]">
            <div className="member-image w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-3 border-[#5a7d53] p-1">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Boo Zhu En"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <h3 className="font-sarala font-bold text-xl mb-1">Boo Zhu En</h3>
            <p className="font-sarala text-gray-600 mb-4">Marketing Officer</p>
            <a
              href="https://www.linkedin.com/in/boo-zhu-en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link inline-block"
            >
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="LinkedIn"
                width={40}
                height={40}
                className="linkedin-logo transition-all duration-300 hover:scale-110"
              />
            </a>
          </div>

          <div className="team-member bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8 border-2 border-transparent hover:border-[#f0d878]">
            <div className="member-image w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-3 border-[#5a7d53] p-1">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Daphne Wong"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <h3 className="font-sarala font-bold text-xl mb-1">Daphne Wong</h3>
            <p className="font-sarala text-gray-600 mb-4">Lead Developer</p>
            <a
              href="https://www.linkedin.com/in/daphne-wong-0474361a8"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link inline-block"
            >
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="LinkedIn"
                width={40}
                height={40}
                className="linkedin-logo transition-all duration-300 hover:scale-110"
              />
            </a>
          </div>

          <div className="team-member bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-500 opacity-0 translate-y-8 border-2 border-transparent hover:border-[#f0d878]">
            <div className="member-image w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-3 border-[#5a7d53] p-1">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Kenta Takayama"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <h3 className="font-sarala font-bold text-xl mb-1">Kenta Takayama</h3>
            <p className="font-sarala text-gray-600 mb-4">Business Development Manager</p>
            <a
              href="https://www.linkedin.com/in/kenta-takayama-099231320"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link inline-block"
            >
              <Image
                src="linkedin-logo.png"
                alt="LinkedIn"
                width={40}
                height={40}
                className="linkedin-logo transition-all duration-300 hover:scale-110"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="accent-line mx-auto"></div>
          <h2 className="font-silkscreen text-3xl md:text-4xl font-bold text-[#5a7d53] mb-4">MEET KA-CHING!</h2>
          <p className="font-sarala text-lg text-gray-600 max-w-3xl mx-auto">
            Your personal assistant to help improve your relationship with investing, whether you're a complete beginner
            or looking to level up.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="tab-btn active px-6 py-3 rounded-full border-2 border-[#5a7d53] text-[#5a7d53] font-sarala font-bold hover:bg-[#5a7d53] hover:text-white transition-all duration-300">
              Learn
            </button>
            <button className="tab-btn px-6 py-3 rounded-full border-2 border-[#5a7d53] text-[#5a7d53] font-sarala font-bold hover:bg-[#5a7d53] hover:text-white transition-all duration-300">
              Practice
            </button>
            <button className="tab-btn px-6 py-3 rounded-full border-2 border-[#5a7d53] text-[#5a7d53] font-sarala font-bold hover:bg-[#5a7d53] hover:text-white transition-all duration-300">
              Track
            </button>
            <button className="tab-btn px-6 py-3 rounded-full border-2 border-[#5a7d53] text-[#5a7d53] font-sarala font-bold hover:bg-[#5a7d53] hover:text-white transition-all duration-300">
              Community
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="tab-pane active p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-sarala text-2xl font-bold text-[#5a7d53] mb-4">Interactive Learning Paths</h3>
                  <p className="font-sarala text-lg text-gray-600 mb-6">
                    Our step-by-step courses break down complex investing concepts into bite-sized, engaging lessons
                    that anyone can understand.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#06D6A0] mr-2">✓</span>
                      <span>Personalized learning paths based on your goals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#06D6A0] mr-2">✓</span>
                      <span>Visual explanations of complex concepts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#06D6A0] mr-2">✓</span>
                      <span>Quizzes to reinforce your knowledge</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Interactive Learning"
                    width={500}
                    height={400}
                    className="rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#f9f9f0] to-[#f0f9f4] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-silkscreen text-3xl md:text-4xl font-bold text-[#5a7d53] mb-6">
            START YOUR INVESTMENT JOURNEY TODAY
          </h2>
          <p className="font-sarala text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are mastering investing the fun way!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/signup"
              className="bg-[#06D6A0] hover:bg-transparent hover:text-[#06D6A0] text-white font-sarala font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-[#06D6A0]"
            >
              GET STARTED FOR FREE
            </Link>
            <Link
              href="/demo"
              className="bg-transparent text-[#5a7d53] hover:bg-[#5a7d53] hover:text-white font-sarala font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-[#5a7d53]"
            >
              WATCH DEMO
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <span
                className="block text-4xl md:text-5xl font-silkscreen font-bold text-[#5a7d53] mb-2 count-up"
                data-target="10000"
              >
                0
              </span>
              <span className="font-sarala text-gray-600">Active Users</span>
            </div>
            <div className="text-center">
              <span
                className="block text-4xl md:text-5xl font-silkscreen font-bold text-[#5a7d53] mb-2 count-up"
                data-target="50"
              >
                0
              </span>
              <span className="font-sarala text-gray-600">Lessons</span>
            </div>
            <div className="text-center">
              <span
                className="block text-4xl md:text-5xl font-silkscreen font-bold text-[#5a7d53] mb-2 count-up"
                data-target="95"
              >
                0
              </span>
              <span className="font-sarala text-gray-600">Satisfaction Rate</span>
              <span className="text-3xl font-silkscreen text-[#5a7d53]">%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5a7d53] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f0d878] flex items-center justify-center mr-2">
                  <span className="text-[#5a7d53] font-bold">^_^</span>
                </div>
                <span className="font-silkscreen text-xl">KA-CHING</span>
              </div>
              <p className="font-sarala max-w-xs">Making investing fun, easy, and accessible for everyone.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-silkscreen text-lg mb-4 text-[#f0d878]">Navigation</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="hover:text-[#f0d878] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#f0d878] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="hover:text-[#f0d878] transition-colors">
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-[#f0d878] transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-silkscreen text-lg mb-4 text-[#f0d878]">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="hover:text-[#f0d878] transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-[#f0d878] transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-silkscreen text-lg mb-4 text-[#f0d878]">Contact</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:info@ka-ching.com" className="hover:text-[#f0d878] transition-colors">
                      info@ka-ching.com
                    </a>
                  </li>
                  <li>
                    <span>NUS, Singapore</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} Ka-Ching. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, label, active = false }) {
  return (
    <Link
      href={href}
      className={`font-sarala font-bold px-4 py-2 rounded-md transition-all duration-300 ${
        active ? "text-[#5a7d53] bg-[#f0f9f4]" : "text-gray-600 hover:text-[#5a7d53] hover:bg-[#f0f9f4]"
      }`}
    >
      {label}
    </Link>
  )
}

