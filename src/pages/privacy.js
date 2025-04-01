"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const Privacy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f9f7f2] relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#85bb65] opacity-20 z-0"></div>
      <div className="absolute top-[10%] right-[5%] w-[200px] h-[200px] rounded-full bg-[#f8d231] opacity-20 z-0"></div>
      <div className="absolute bottom-[5%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#e07a5f] opacity-20 z-0"></div>

      {/* Back button */}
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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#5a7d53] mb-6">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">Last Updated: March 28, 2025</p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">1. Introduction</h2>
            <p>
              At Ka-Ching, we value your privacy and are committed to safeguarding your personal data. This Privacy Policy outlines how we collect, use, protect, and disclose your information when you use our services, including our website and mobile applications (collectively referred to as "the Service").
            </p>
            <p>
              By using our Service, you consent to the collection and use of information in accordance with this Privacy Policy.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-bold text-[#5a7d53] mt-6 mb-3">2.1 Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your name, email address, and other contact details when you register for an account</li>
              <li>Profile information, such as username, password, and any other information you provide during registration or communication</li>
              <li>Information you provide when contacting our customer support team</li>
              <li>Details shared in response to surveys, promotions, or feedback requests</li>
            </ul>

            <h3 className="text-lg font-bold text-[#5a7d53] mt-6 mb-3">2.2 Usage Information</h3>
            <p>We may automatically collect information about your device, interactions with the Service, and usage patterns. This information includes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address, device type, browser type, and operating system version</li>
              <li>Interaction data, including pages visited, links clicked, and actions performed within the Service</li>
              <li>Time spent on each page, referring/exit URLs, and other usage statistics</li>
            </ul>

            <h3 className="text-lg font-bold text-[#5a7d53] mt-6 mb-3">2.3 Third-Party Services</h3>
            <p>We may use third-party services to analyze how our Service is used and to improve our offerings. These third-party providers may collect information used to identify you, such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Google Analytics for tracking usage patterns</li>
              <li>Firebase services for crash analytics and app performance monitoring</li>
              <li>Third-party advertising networks for personalized marketing</li>
            </ul>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To provide, maintain, and enhance the features and functionality of the Service</li>
              <li>To process your transactions and provide customer support</li>
              <li>To send you important updates, security alerts, and promotional content</li>
              <li>To analyze usage patterns and improve our services based on user feedback</li>
              <li>To personalize your experience by delivering relevant content and advertisements</li>
            </ul>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">4. Sharing Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>With trusted third-party service providers who perform tasks on our behalf (e.g., payment processors, customer support services, analytics providers)</li>
              <li>With our affiliates or partners for business purposes, such as marketing and promotions</li>
              <li>If required by law, we may disclose information to regulatory authorities or government bodies</li>
              <li>In the event of a merger, acquisition, or sale of our assets, your data may be transferred to the acquiring entity</li>
            </ul>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">5. Data Security</h2>
            <p>We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of data transmission or storage is completely secure, and we cannot guarantee absolute security of your information.</p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The right to access or request a copy of your personal data</li>
              <li>The right to correct or update any inaccurate or incomplete data</li>
              <li>The right to request deletion of your data (subject to certain legal exceptions)</li>
              <li>The right to restrict or object to our processing of your data in certain circumstances</li>
              <li>The right to request data portability</li>
            </ul>
            <p>If you wish to exercise any of these rights, please contact us at the email address provided below.</p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">7. Data Retention</h2>
            <p>We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Upon request, we will delete your data from our systems once it is no longer required for business purposes.</p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we are protecting your personal data.</p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">9. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, or if you would like to exercise any of your rights regarding your personal information, please contact us at:</p>
            <p>
              <a href="mailto:ask.kaching@gmail.com" className="text-[#5a7d53] hover:underline">
                ask.kaching@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
