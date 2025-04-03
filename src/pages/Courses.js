"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const Courses = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentModule, setCurrentModule] = useState(1)
  const [completedModules, setCompletedModules] = useState({})
  const pathRef = useRef(null)
  const [expandedSection, setExpandedSection] = useState(null)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

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
        setCurrentStep(progress.currentStep || 1)
        setCurrentModule(progress.currentModule || 1)
        setCompletedModules(progress.completedModules || {})
      } else {
        // Initialize progress for new users
        setCurrentStep(1)
        setCurrentModule(1)
        setCompletedModules({})
        // Save initial progress to localStorage
        localStorage.setItem(
          "courseProgress",
          JSON.stringify({
            currentStep: 1,
            currentModule: 1,
            completedModules: {},
            quizScores: {},
          }),
        )
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
          currentModule,
          completedModules,
        }),
      )
    }
  }, [currentStep, currentModule, completedModules, isLoggedIn])

  // Update the steps array to include three main sections with modules
  const steps = [
    {
      id: 1,
      title: "Introduction to Stock Market Basics",
      modules: [
        {
          id: 1,
          title: "What is the Stock Market?",
          duration: "3 mins",
        },
        {
          id: 2,
          title: "Types of Stocks",
          duration: "3 mins",
        },
      ],
    },
    {
      id: 2,
      title: "Fundamental Analysis",
      modules: [
        {
          id: 1,
          title: "Understanding Financial Statements",
        },
        {
          id: 2,
          title: "Key Financial Ratios",
        },
        {
          id: 3,
          title: "Company Valuation",
        },
      ],
    },
    {
      id: 3,
      title: "Technical Analysis",
      modules: [
        {
          id: 1,
          title: "Introduction to Technical Analysis",
        },
        {
          id: 2,
          title: "Chart Patterns and What They Signify",
        },
        {
          id: 3,
          title: "Technical Indicators",
        },
      ],
    },
  ]

  // Check if a section is completed (all modules completed)
  const isSectionCompleted = (sectionId) => {
    const section = steps.find((s) => s.id === sectionId)
    if (!section) return false

    // Check if all modules in this section are completed
    return section.modules.every((module) => completedModules[`${sectionId}.${module.id}`])
  }

  // Check if a specific module is completed
  const isModuleCompleted = (sectionId, moduleId) => {
    return !!completedModules[`${sectionId}.${moduleId}`]
  }

  // Add a new function to get quiz score if available
  const getQuizScore = (sectionId, moduleId) => {
    const savedProgress = localStorage.getItem("courseProgress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      if (progress.quizScores && progress.quizScores[`${sectionId}.${moduleId}`]) {
        return progress.quizScores[`${sectionId}.${moduleId}`]
      }
    }
    return null
  }

  const handleStepClick = (stepId, moduleId = 1) => {
    // Navigate to the course content page with step and module parameters
    navigate(`/course-content?step=${stepId}&module=${moduleId}`)
  }

  const handleSectionClick = (sectionId) => {
    // Logic to handle section click (e.g., expand section, navigate to first module)
    console.log(`Section ${sectionId} clicked`)
    setExpandedSection(sectionId)
    setCurrentStep(sectionId)
    setCurrentModuleIndex(0) // Reset module index when section is clicked
  }

  const handleModuleClick = (sectionId, moduleId) => {
    // Logic to handle module click (e.g., navigate to module content)
    console.log(`Module ${moduleId} in Section ${sectionId} clicked`)
    setCurrentStep(sectionId)
    setCurrentModule(moduleId)
    navigate(`/course-content?step=${sectionId}&module=${moduleId}`)
  }

  const toggleSectionExpand = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleSectionComplete = (sectionId) => {
    // Logic to handle section completion (e.g., mark as complete, move to next section)
    console.log(`Section ${sectionId} completed`)
    setCurrentStep(sectionId + 1)
    setCurrentModule(1)
    setExpandedSection(null) // Collapse the section after completion
    setCurrentModuleIndex(0) // Reset module index
  }

  // Get the current progress for a section (how many modules completed)
  const getSectionProgress = (sectionId) => {
    const section = steps.find((s) => s.id === sectionId)
    if (!section) return 0

    const completedCount = section.modules.filter((module) => completedModules[`${sectionId}.${module.id}`]).length

    return completedCount
  }

  if (!isLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Replace the entire render return with this updated version
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
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-[#f0d878] transition-colors transform hover:scale-105"
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
          <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">Investment Courses</h1>
          <div className="w-[100px]"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Course Sections */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {steps.map((section, index) => {
            const sectionCompleted = isSectionCompleted(section.id)
            const progressCount = getSectionProgress(section.id)
            const progressPercent = (progressCount / section.modules.length) * 100

            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#5a7d53]">
                      Section {section.id}: {section.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {section.modules.length} modules •{" "}
                      {section.id === 1 ? "Beginner" : section.id === 2 ? "Intermediate" : "Advanced"}
                    </p>

                    {/* Progress bar */}
                    {progressCount > 0 && !sectionCompleted && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#85bb65] rounded-full"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-600">
                            {progressCount}/{section.modules.length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {sectionCompleted && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Completed
                      </span>
                    )}
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className="bg-[#f0d878] hover:bg-[#e5c960] text-[#5a7d53] font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {sectionCompleted ? "Review" : progressCount > 0 ? "Continue" : "Start"}
                    </button>
                  </div>
                </div>

                {/* Show modules as a learning path when section is expanded */}
                {expandedSection === section.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                    <h3 className="text-xl font-bold text-[#5a7d53] mb-6">Learning Path</h3>

                    <div className="relative py-8">
                      {/* Vertical path line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-200 transform -translate-x-1/2 rounded-full"></div>

                      {/* Progress overlay */}
                      <div
                        className="absolute left-1/2 top-0 w-2 bg-[#85bb65] transform -translate-x-1/2 rounded-full transition-all duration-700 ease-in-out"
                        style={{
                          height: `${Math.min(100, (progressCount / section.modules.length) * 100)}%`,
                        }}
                      ></div>

                      {/* Module steps */}
                      <div className="relative">
                        {section.modules.map((module, moduleIndex) => {
                          const moduleCompleted = isModuleCompleted(section.id, module.id)
                          const isCurrentModule = currentStep === section.id && currentModule === module.id
                          const isPreviousModuleCompleted =
                            moduleIndex === 0 || isModuleCompleted(section.id, section.modules[moduleIndex - 1].id)
                          const isLocked = !moduleCompleted && !isCurrentModule && !isPreviousModuleCompleted

                          return (
                            <div key={module.id} className="relative mb-16 flex justify-center">
                              {/* Module marker */}
                              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                <button
                                  onClick={() => handleModuleClick(section.id, module.id)}
                                  disabled={isLocked}
                                  className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                                    moduleCompleted
                                      ? "bg-[#85bb65] text-white"
                                      : isCurrentModule
                                        ? "bg-[#f0d878] text-[#5a7d53] animate-pulse"
                                        : "bg-white border-2 border-gray-200 text-gray-400"
                                  } ${isLocked ? "cursor-not-allowed" : "hover:scale-110"}`}
                                >
                                  {moduleCompleted ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  ) : isLocked ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                      />
                                    </svg>
                                  ) : (
                                    <span className="text-xl font-bold">
                                      {section.id}.{module.id}
                                    </span>
                                  )}
                                </button>
                              </div>

                              {/* Module content card */}
                              <div className={`w-3/4 md:w-1/2 mt-8 ${moduleIndex % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                                <div
                                  className={`bg-white p-4 rounded-xl shadow-md border-2 transition-all duration-300 ${
                                    isLocked
                                      ? "border-gray-200 opacity-60"
                                      : isCurrentModule
                                        ? "border-[#f0d878]"
                                        : moduleCompleted
                                          ? "border-[#85bb65]"
                                          : "border-gray-200"
                                  } ${isLocked ? "cursor-not-allowed" : "hover:shadow-lg"}`}
                                >
                                  <h4 className="font-bold text-lg text-[#5a7d53]">
                                    {section.id}.{module.id}: {module.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm mt-1">
                                    {module.duration && <span className="font-medium">{module.duration}</span>}
                                  </p>
                                  <p className="text-gray-600 text-sm mt-2">
                                    {moduleCompleted ? (
                                      <span className="flex items-center text-[#85bb65]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 mr-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Completed! Quiz score: {getQuizScore(section.id, module.id) || "Passed"}
                                      </span>
                                    ) : isCurrentModule ? (
                                      "You're currently on this module."
                                    ) : isLocked ? (
                                      "Complete previous modules to unlock."
                                    ) : (
                                      "Ready to start!"
                                    )}
                                  </p>

                                  {!isLocked && (
                                    <button
                                      onClick={() => handleModuleClick(section.id, module.id)}
                                      className={`mt-3 text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                                        moduleCompleted
                                          ? "bg-[#85bb65] text-white hover:bg-[#75a758]"
                                          : "bg-[#f0d878] text-[#5a7d53] hover:bg-[#e5c960]"
                                      }`}
                                    >
                                      {moduleCompleted ? "Review" : isCurrentModule ? "Continue" : "Start"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}

                        {/* Trophy at the end - only show if all modules are completed */}
                        {sectionCompleted && (
                          <div className="relative mb-16 flex justify-center">
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f0d878] text-[#5a7d53] border-4 border-white shadow-lg animate-bounce">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="w-3/4 md:w-1/2 mt-8 mx-auto">
                              <div className="bg-white p-4 rounded-xl shadow-md border-2 border-[#f0d878] text-center">
                                <h4 className="font-bold text-lg text-[#5a7d53]">Section Completed!</h4>
                                <p className="text-gray-600 text-sm mt-2">
                                  Congratulations! You've completed all modules in this section.
                                </p>
                                {section.id < steps.length && (
                                  <button
                                    onClick={() => handleSectionComplete(section.id)}
                                    className="mt-3 bg-[#5a7d53] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#4a6a45] transition-all duration-300"
                                  >
                                    Continue to Next Section
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle button to expand/collapse section details */}
                <button
                  onClick={() => toggleSectionExpand(section.id)}
                  className="mt-2 text-[#5a7d53] font-medium flex items-center hover:underline"
                >
                  {expandedSection === section.id ? "Hide Details" : "Show Details"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-1 h-5 w-5 transform transition-transform ${expandedSection === section.id ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx="true">{`
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

export default Courses

