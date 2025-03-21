import React, { useState } from 'react';

const QuizComponent = ({ question, options, correctAnswer }) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleAnswerClick = (answer) => {
    setUserAnswer(answer);
    if (answer === correctAnswer) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  return (
    <div>
      <h2>{question}</h2>
      <div>
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerClick(option)}>
            {option}
          </button>
        ))}
      </div>
      {userAnswer && <p>{feedback}</p>}
    </div>
  );
};

export default QuizComponent;
