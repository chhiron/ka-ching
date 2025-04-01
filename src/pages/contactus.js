"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Send, Mail, MapPin, Phone } from "lucide-react"

const ContactPage = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  useEffect(() => {
    // Set loaded state after a small delay for initial animations
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)

    // Open email client with pre-filled data
    window.location.href = `mailto:ask.kaching@gmail.com?subject=${subject}&body=${body}`

    // Show success message after a short delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setSubmitSuccess(false)
      }, 3000)
    }, 1000)
  }

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqItems = [
    {
      question: "How do I get started with Ka-Ching?",
      answer:
        "Sign up for an account, take our placement test, and we'll recommend personalized learning paths based on your investment knowledge and goals.",
    },
    {
      question: "Is Ka-Ching suitable for complete beginners?",
      answer:
        "Ka-Ching is designed to make investing accessible for everyone, including complete beginners with no prior knowledge.",
    },
    {
      question: "How much does Ka-Ching cost?",
      answer:
        "Ka-Ching offers a free tier with basic features. Premium plans start at $9.99/month with additional learning resources and personalized guidance.",
    },
    {
      question: "Can I track my real investments with Ka-Ching?",
      answer:
        "Yes! Ka-Ching allows you to connect your investment accounts or manually track your portfolio to monitor performance and apply what you've learned.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9f7f2] relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#85bb65] opacity-20 z-0"></div>
      <div className="absolute top-[10%] right-[5%] w-[200px] h-[200px] rounded-full bg-[#f8d231] opacity-20 z-0"></div>
      <div className="absolute bottom-[5%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#e07a5f] opacity-20 z-0"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[#b7b5a8] opacity-20 z-0"></div>

      {/* Back button - Fixed position and improved hover */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
          aria-label="Go back to homepage"
        >
          <ArrowLeft size={22} className="text-[#5a7d53]" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5a7d53] mb-4">Get in Touch</h1>
          <div className="w-24 h-1 bg-[#f8d231] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about investing or need help with our platform? We're here to assist you on your investment
            journey.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Contact Information */}
            <div
              className={`w-full md:w-2/5 bg-gradient-to-br from-[#5a7d53] to-[#3d5438] text-white p-8 md:p-12 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-10"
              }`}
            >
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#f8d231] flex items-center justify-center mr-3">
                    <span className="text-[#5a7d53] font-bold">^_^</span>
                  </div>
                  <h2 className="text-2xl font-bold">Ka-Ching</h2>
                </div>
                <p className="text-gray-200 mt-4">
                  Your educational investment platform designed to make investing fun, easy, and accessible for
                  everyone.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-white/20 p-2 rounded-full">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a
                      href="mailto:ask.kaching@gmail.com"
                      className="text-gray-200 hover:text-[#f8d231] transition-colors"
                    >
                      ask.kaching@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-white/20 p-2 rounded-full">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-gray-200">
                      National University of Singapore
                      <br />
                      Singapore
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-white/20 p-2 rounded-full">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Support Hours</h3>
                    <p className="text-gray-200">
                      Monday - Friday
                      <br />
                      9:00 AM - 6:00 PM SGT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`w-full md:w-3/5 p-8 md:p-12 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-10"
              }`}
            >
              <h2 className="text-2xl font-bold text-[#5a7d53] mb-6">Send Us a Message</h2>

              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center animate-fadeIn">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.6-11.2l-4 4a1 1 0 001.4 1.4L11 7.4l3.6 3.6a1 1 0 001.4-1.4l-4-4a1 1 0 00-1.4 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Thank you for reaching out! We’ll get back to you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d53]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#5a7d53] text-white py-3 rounded-md hover:bg-[#4b6a3e] transition duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
