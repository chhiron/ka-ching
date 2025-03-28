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

              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#f8d231] hover:text-[#5a7d53] transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#f8d231] hover:text-[#5a7d53] transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#f8d231] hover:text-[#5a7d53] transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
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
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Your message has been sent successfully! We'll get back to you soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5a7d53] focus:border-[#5a7d53] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5a7d53] focus:border-[#5a7d53] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5a7d53] focus:border-[#5a7d53] transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5a7d53] focus:border-[#5a7d53] transition-colors"
                      placeholder="Tell us how we can assist you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center bg-[#5a7d53] hover:bg-[#4a6a45] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-[#5a7d53] mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-4 font-medium flex items-center justify-between text-gray-700 hover:text-[#5a7d53] transition-colors focus:outline-none focus:bg-gray-50"
                      >
                        <span>{item.question}</span>
                        <span
                          className="text-xl transition-transform duration-200"
                          style={{ transform: openFAQ === index ? "rotate(45deg)" : "rotate(0)" }}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`px-4 pb-4 text-gray-600 transition-all duration-300 ${
                          openFAQ === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map or Image Section */}
        <div
          className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Ka-Ching Office Location"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#5a7d53] mb-2">Visit Our Campus</h3>
              <p className="text-gray-600">
                We're located at the National University of Singapore. Feel free to drop by during our support hours!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ContactPage


