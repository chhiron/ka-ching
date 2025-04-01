"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const TermsOfService = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#5a7d53] mb-6">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">Last Updated: March 28, 2025</p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Ka-Ching! These Terms of Service ("Terms") govern your access to and use of the Ka-Ching website, mobile application, and associated services (collectively referred to as "the Service"). By accessing or using the Service, you agree to be bound by these Terms and any additional terms that may apply.
            </p>
            <p>
              Please read these Terms carefully before using the Service. If you do not agree with these Terms, you must not use the Service.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">2. Using Our Service</h2>
            <p>
              Ka-Ching offers educational content and tools related to investing, financial literacy, and personal finance management. Our Service is designed for informational and educational purposes only. It should not be construed as professional financial advice, and you should consult a qualified financial advisor for any financial decisions.
            </p>

            <h3 className="text-lg font-bold text-[#5a7d53] mt-6 mb-3">2.1 Account Registration</h3>
            <p>
              To access certain features of the Service, you may need to register for an account. During the registration process, you agree to provide accurate, current, and complete information, and you commit to updating such information as necessary to maintain its accuracy.
            </p>

            <h3 className="text-lg font-bold text-[#5a7d53] mt-6 mb-3">2.2 Account Security</h3>
            <p>
              You are solely responsible for safeguarding your account credentials, including your password. You agree to notify Ka-Ching immediately of any unauthorized use of your account or any other breach of security. Ka-Ching will not be liable for any loss or damage arising from your failure to comply with these security obligations.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">3. Content and Intellectual Property</h2>
            <p>
              All content on the Service, including text, graphics, logos, images, and software, is the property of Ka-Ching or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or use any content without obtaining prior written permission from Ka-Ching or the respective owner of the intellectual property.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">4. User Conduct</h2>
            <p>
              You agree not to engage in any conduct that may violate the following:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Using the Service for any illegal purpose or in violation of any applicable laws or regulations</li>
              <li>Interfering with or disrupting the Service, servers, or networks connected to the Service</li>
              <li>Attempting to gain unauthorized access to any part of the Service, including its servers or user data</li>
              <li>Using the Service to send unsolicited communications, including spam or marketing messages</li>
              <li>Impersonating any individual, entity, or organization, or falsely representing your affiliation with them</li>
            </ul>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">5. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. KA-CHING DOES NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, AND DISCLAIMS ALL LIABILITY FOR ANY ERRORS, OMISSIONS, OR INTERUPTIONS IN THE SERVICE.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL KA-CHING, ITS DIRECTORS, EMPLOYEES, PARTNERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING FROM OR RELATED TO YOUR USE OR INABILITY TO USE THE SERVICE.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">7. Changes to Terms</h2>
            <p>
              Ka-Ching reserves the right to modify, update, or change these Terms at any time, at our sole discretion. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly. By continuing to access or use the Service after any changes to the Terms, you agree to be bound by the updated Terms.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">8. Termination</h2>
            <p>
              Ka-Ching may suspend or terminate your access to the Service, without notice, if we believe you have violated these Terms. Upon termination, all rights and licenses granted to you under these Terms will immediately cease.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">9. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the jurisdiction where Ka-Ching operates, without regard to its conflict of law principles. Any disputes arising out of or related to these Terms will be resolved through binding arbitration or in a court of competent jurisdiction in that jurisdiction.
            </p>

            <h2 className="text-xl font-bold text-[#5a7d53] mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms or need further clarification, please reach out to us at:
            </p>
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

export default TermsOfService
