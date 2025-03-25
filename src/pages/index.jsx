"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from 'lucide-react'
import TypewriterComponent from "../components/typewriter"

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
            <span className="text-[#5a7d53]">KA - </span>
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
              <div className="text-4xl mb-4 text-[#B5
