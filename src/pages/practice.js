"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Award, CheckCircle, XCircle } from "lucide-react"

const Practice = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [heartEarned, setHeartEarned] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("kaChingCurrentUser")
    if (!user) {
      navigate("/login")
    }
  }, [navigate])

  // Practice questions
  const questions = [
    {
      question: "What is the primary purpose of a stock market?",
      options: [
        "To provide a place for companies to raise capital",
        "To allow governments to control the economy",
        "To ensure all companies make a profit",
        "To prevent economic recessions",
      ],
      correctAnswer: 0,
      explanation:
        "The primary purpose of a stock market is to provide companies with a platform to raise capital by selling shares to investors.",
    },
    {
      question: "Which of these is NOT a type of investment account?",
      options: ["401(k)", "Roth IRA", "Traditional IRA", "Premium Savings Account"],
      correctAnswer: 3,
      explanation:
        "Premium Savings Account is not a standard investment account type. The others (401(k), Roth IRA, and Traditional IRA) are common retirement investment accounts.",
    },
    {
      question: "What does diversification help investors achieve?",
      options: [
        "Guaranteed returns",
        "Tax-free income",
        "Reduced risk through variety",
        "Higher returns in all market conditions",
      ],
      correctAnswer: 2,
      explanation:
        "Diversification helps reduce risk by spreading investments across different assets, sectors, or geographic regions, so poor performance in one area may be offset by better performance in another.",
    },
  ]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setAnswerSubmitted(true)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setAnswerSubmitted(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Show results when all questions are answered
      setShowResults(true)

      // Award a heart if score is good enough (2 or more correct)
      if (score >= 2) {
        // Add a heart to localStorage
        const currentHearts = localStorage.getItem("kaChingHearts")
        const maxHearts = 5

        if (currentHearts && Number(currentHearts) < maxHearts) {
          localStorage.setItem("kaChingHearts", String(Number(currentHearts) + 1))
          setHeartEarned(true)
        }
      }
    }
  }

  const handleReturnToCourses = () => {
    navigate("/courses")
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      {/* Header */}
      <div className="bg-[#5a7d53] text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center">
          <button
            onClick={handleReturnToCourses}
            className="flex items-center text-white hover:text-[#f0d878] transition-colors"
          >
            <ArrowLeft className="mr-1" />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold mx-auto">Practice to Earn Hearts</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
          {showResults ? (
            <div className="text-center py-8">
              <div
                className={`w-24 h-24 ${
                  score >= 2 ? "bg-[#5a7d53]" : "bg-[#e07a5f]"
                } rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}
              >
                {score >= 2 ? <Award className="w-12 h-12 text-white" /> : <XCircle className="w-12 h-12 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-[#5a7d53] mb-4">Practice Completed!</h2>
              <p className="text-xl mb-4">
                You scored {score} out of {questions.length}
              </p>

              {heartEarned && (
                <div className="bg-[#f0f9f4] p-4 rounded-lg mb-6 animate-pulse">
                  <p className="text-[#5a7d53] font-bold">Congratulations! You earned a heart!</p>
                </div>
              )}

              <button
                onClick={handleReturnToCourses}
                className="bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-[#4a6a45]"
              >
                Return to Courses
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-500">Score: {score}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#5a7d53] rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#f0f9f4] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-[#5a7d53] mb-4">{questions[currentQuestion].question}</h3>

                <div className="space-y-3 mt-6">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrect = questions[currentQuestion].correctAnswer === index

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : answerSubmitted
                              ? "border-gray-200 opacity-70"
                              : "border-gray-200 hover:border-[#5a7d53] hover:shadow-sm"
                        }`}
                        disabled={answerSubmitted}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${
                              isSelected
                                ? isCorrect
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                                : answerSubmitted && isCorrect
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                          {isSelected &&
                            (isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 ml-2" />
                            ))}
                          {!isSelected && answerSubmitted && isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {answerSubmitted && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-bold">Explanation: </span>
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </div>

              {answerSubmitted && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-[#5a7d53] text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-[#4a6a45]"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Practice
