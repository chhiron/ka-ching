"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Check, X, ArrowLeft, Sparkles, Shield, Zap } from "lucide-react"

const Pricing = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const navigate = useNavigate()

  // Define standardized feature texts
  const featureTexts = {
    moduleAccess: {
      free: "Full Module Access",
      paid: "Full Module Access",
    },
    ads: {
      free: "No Ads",
      paid: "No Ads",
    },

    hearts: {
      free: "Unlimited Hearts",
      paid: "Unlimited Hearts",
    },

    community: {
      free: "Community Access with Experts",
      paid: "Unlimited Access to Expert Community",
      mid: "Read-only Access to Expert Community "
    },

  }

  // All features in order
  const allFeatures = ["moduleAccess", "ads", "hearts",  "community"]

  // Features for each plan
  const plans = [
    {
      id: "free",
      name: "Free",
      subtext: <span>&nbsp;</span>,
      price: `$0`,
      period: "1 month access",
      icon: <Sparkles className="h-6 w-6" />,
      color: "#5a7d53",
      secondaryColor: "#f0f9f4",
      features: {
        moduleAccess: { text: featureTexts.moduleAccess.free, included: true },
        ads: { text: featureTexts.ads.free, included: false },

        hearts: { text: featureTexts.hearts.free, included: false },

        
        community: { text: featureTexts.community.free, included: false },
       
      },
    },
    {
      id: "monthly",
      name: "Plus",
      subtext: <span>&nbsp;</span>,
      price: `S$4.99`,
      period: "per month",
      popular: true,
      icon: <Zap className="h-6 w-6" />,
      color: "#1e3a8a",
      secondaryColor: "#dbeafe",
      features: {
        moduleAccess: { text: featureTexts.moduleAccess.paid, included: true },
        ads: { text: featureTexts.ads.paid, included: true },

        hearts: { text: featureTexts.hearts.paid, included: true },
        
        community: { text: featureTexts.community.mid, included: true },
       
      },
    },
    {
      id: "annual",
      name: "Max",
      subtext: <span>&nbsp;</span>,
      price: `S$9.99`,
      period: "per month",
      bestValue: true,
      icon: <Shield className="h-6 w-6" />,
      color: "#06D6A0",
      secondaryColor: "#ecfdf5",
      features: {
        moduleAccess: { text: featureTexts.moduleAccess.paid, included: true },
        ads: { text: featureTexts.ads.paid, included: true },
        hearts: { text: featureTexts.hearts.paid, included: true },
        
        community: { text: featureTexts.community.paid, included: true },
       
      },
    },
  ]

  useEffect(() => {
    // Set loaded state after a small delay for animations
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Animation for pricing cards
    const animatePricingCards = () => {
      const cards = document.querySelectorAll(".pricing-card")

      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("animate")
        }, index * 150) // Staggered animation
      })
    }

    animatePricingCards()
  }, [])

  return (
    <div className="min-h-screen bg-[#f9f9f0] pt-20 pb-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#5a7d53] hover:text-[#06D6A0] transition-colors font-sarala font-bold"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="font-silkscreen text-4xl md:text-5xl font-bold text-[#5a7d53] mb-4">
          Choose Your <span className="text-[#f0d878]">Plan</span>
        </h1>
        <p className="font-sarala text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to accelerate your investment learning journey
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card relative rounded-3xl overflow-hidden shadow-lg opacity-0 transform translate-y-8 transition-all duration-700 ${
                hoveredCard === index ? "scale-105 z-10" : "scale-100 z-0"
              } ${isLoaded ? "opacity-100 translate-y-0" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Background with Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${plan.secondaryColor}, white)`,
                  opacity: 0.8,
                }}
              ></div>

              {/* Decorative Elements */}
              <div
                className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full"
                style={{ backgroundColor: plan.color, opacity: 0.1 }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 rounded-full"
                style={{ backgroundColor: plan.color, opacity: 0.1 }}
              ></div>

              {/* Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#f0d878] text-[#5a7d53] font-sarala font-bold py-1 px-4 rounded-bl-lg z-10">
                  Popular
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute top-0 right-0 bg-[#06D6A0] text-white font-sarala font-bold py-1 px-4 rounded-bl-lg z-10">
                  Best Value
                </div>
              )}

              <div className="relative p-8 h-full flex flex-col">
                {/* Card Header */}
                <div className="mb-8 text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: hoveredCard === index ? plan.color : plan.secondaryColor,
                      color: hoveredCard === index ? "white" : plan.color,
                    }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="font-silkscreen text-2xl font-bold mb-1" style={{ color: plan.color }}>
                    {plan.name}
                  </h3>
                  {plan.subtext && <p className="font-sarala text-sm text-gray-500 mb-2">{plan.subtext}</p>}
                  <div className="flex items-center justify-center mb-2">
                    <span className="font-sarala text-4xl font-bold" style={{ color: plan.color }}>
                      {plan.price} {/* Display price here */}
                    </span>
                  </div>
                  <p className="font-sarala text-sm text-gray-500">{plan.period}</p>
                  <p className="font-sarala text-sm mt-2 text-gray-600">{plan.description}</p>
                </div>

                {/* Feature List */}
                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {allFeatures.map((featureKey, featureIndex) => {
                      const feature = plan.features[featureKey]
                      return (
                        <li
                          key={featureIndex}
                          className={`flex items-center min-h-[32px] transition-all duration-300 ${
                            hoveredCard === index ? "transform translate-x-2" : ""
                          }`}
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <span
                            className={`mr-3 rounded-full p-1 flex-shrink-0 ${
                              feature.included ? "text-[#06D6A0] bg-[#ecfdf5]" : "text-gray-400 bg-gray-100"
                            }`}
                          >
                            {feature.included ? <Check size={16} /> : <X size={16} />}
                          </span>
                          <span className="font-sarala text-gray-700">{feature.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Card Footer */}
                <div
                  className={`h-2 w-full rounded-full mt-4 transition-all duration-500 ${
                    hoveredCard === index ? "opacity-100" : "opacity-50"
                  }`}
                  style={{ backgroundColor: plan.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 mt-24">
        <h2 className="font-silkscreen text-3xl font-bold text-[#5a7d53] text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          {[
            {
              question: "Can I switch between plans?",
              answer:
                "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
            },
            {
              question: "Is there a refund policy?",
              answer:
                "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 14 days of your purchase.",
            },
            {
              question: "What are Hearts?",
              answer:
                "Hearts are our in-app currency that allow you to attempt quizzes and practice exercises. Free users get a limited number that refresh daily, while paid users get unlimited hearts.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <details className="group">
                <summary className="flex justify-between items-center font-sarala font-medium cursor-pointer list-none p-6">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="font-sarala text-gray-600 px-6 pb-6 pt-0">{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 text-center mt-24">
        <div className="bg-gradient-to-r from-[#5a7d53] to-[#1e3a8a] rounded-2xl p-12 max-w-4xl mx-auto shadow-lg">
          <h2 className="font-silkscreen text-3xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="font-sarala text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are mastering investing the fun way with Ka-Ching!
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#f0d878] hover:bg-white text-[#5a7d53] font-sarala font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pricing
