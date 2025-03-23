import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

// Define the course content structure
const courseContent = [
  {
    step: "Step 1: Introduction to Stock Market Basics",
    modules: [
      {
        title: "Module 1: What is the Stock Market?",
        completed: false,
      },
      {
        title: "Module 2: Types of Stocks",
        completed: false,
      },
    ],
  },
  {
    step: "Step 2: Fundamental Analysis",
    modules: [
      {
        title: "Module 3: Understanding Financial Statements",
        completed: false,
      },
      {
        title: "Module 4: Key Financial Ratios",
        completed: false,
      },
    ],
  },
];

function LessonPage() {
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem('progress')) || courseContent
  );

  const handleModuleCompletion = (stepIndex, moduleIndex) => {
    // Update progress in the state
    const newProgress = [...progress];
    newProgress[stepIndex].modules[moduleIndex].completed = true;
    
    // Save progress to localStorage
    localStorage.setItem('progress', JSON.stringify(newProgress));

    // Update the state
    setProgress(newProgress);
  };

  const isStepUnlocked = (stepIndex) => {
    if (stepIndex === 0) return true; // First step is always unlocked
    // Check if the previous step is completed
    return progress[stepIndex - 1].modules.every(module => module.completed);
  };

  return (
    <div>
      <h1>Lessons</h1>
      {courseContent.map((step, stepIndex) => (
        <div key={stepIndex}>
          <h2>{step.step}</h2>
          {isStepUnlocked(stepIndex) ? (
            step.modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <h3>{module.title}</h3>
                <button
                  onClick={() => handleModuleCompletion(stepIndex, moduleIndex)}
                  disabled={module.completed}
                >
                  {module.completed ? "Completed" : "Complete Module"}
                </button>
              </div>
            ))
          ) : (
            <p>Step locked. Complete previous steps first.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default LessonPage;
