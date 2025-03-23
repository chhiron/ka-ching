import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlacementTest = ({ onCompleteTest }) => {
  const navigate = useNavigate();
  
  // Example questions for the placement test
  const questions = [
    {
      question: "What is a stock?",
      options: ["A company asset", "A type of bond", "A share of ownership in a company", "None of the above"],
      correctAnswer: 2,
    },
    {
      question: "What is the stock market?",
      options: ["A place to buy bonds", "A place where stocks are bought and sold", "A savings account", "None of the above"],
      correctAnswer: 1,
    },
    {
      question: "What is a dividend?",
      options: ["The price of a stock", "A portion of company earnings distributed to shareholders", "The company's profit", "None of the above"],
      correctAnswer: 1,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track which question the user is on
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null)); // Track user's answers
  const [score, setScore] = useState(0); // Track user's score

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    // If the answer for the current question is selected, move to the next question
    if (answers[currentQuestionIndex] !== null) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    onCompleteTest(calculatedScore); // Pass the score to the parent component (App.js)
  };

  // Provide course recommendations based on the score
  const getCourseRecommendation = () => {
    if (score === questions.length) {
      return "Advanced Stock Market Concepts";
    } else if (score > questions.length / 2) {
      return "Intermediate Stock Market Concepts";
    } else {
      return "Beginner Stock Market Concepts";
    }
  };

  const progressPercentage = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="placement-test">
      <h2>Placement Test</h2>
      <p>Answer the following questions to determine your starting level:</p>

      {/* Progress Bar */}
      <div style={{ width: '100%', backgroundColor: '#ddd', margin: '20px 0' }}>
        <div
          style={{
            height: '10px',
            width: `${progressPercentage}%`,
            backgroundColor: '#3498db',
          }}
        ></div>
      </div>

      {currentQuestionIndex < questions.length ? (
        <div>
          <h3>{questions[currentQuestionIndex].question}</h3>
          {questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                id={`question-${currentQuestionIndex}-option-${optionIndex}`}
                name={`question-${currentQuestionIndex}`}
                value={optionIndex}
                checked={answers[currentQuestionIndex] === optionIndex}
                onChange={() => handleAnswerChange(currentQuestionIndex, optionIndex)}
              />
              <label htmlFor={`question-${currentQuestionIndex}-option-${optionIndex}`}>{option}</label>
            </div>
          ))}
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      ) : (
        <div>
          <h3>Test Complete!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <p>Recommended Course: {getCourseRecommendation()}</p>
          <button
            onClick={() => {
              // Navigate to the recommended course based on the score
              const recommendedCourse = getCourseRecommendation();
              if (recommendedCourse === "Advanced Stock Market Concepts") {
                navigate('/advanced-course'); // Adjust the route to your course path
              } else if (recommendedCourse === "Intermediate Stock Market Concepts") {
                navigate('/intermediate-course');
              } else {
                navigate('/beginner-course');
              }
            }}
          >
            Go to Recommended Course
          </button>
        </div>
      )}
    </div>
  );
};

export default PlacementTest;

