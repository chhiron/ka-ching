// src/components/ProgressTracker.js
import React, { useState, useEffect } from 'react';

// Simulate a saved streak from localStorage
const getStoredStreak = () => {
  const savedStreak = localStorage.getItem('streak');
  return savedStreak ? parseInt(savedStreak) : 0;
};

const ProgressTracker = () => {
  const [streak, setStreak] = useState(getStoredStreak());
  const [lastLogin, setLastLogin] = useState(localStorage.getItem('lastLogin') || null);

  const handleLessonComplete = () => {
    const today = new Date().toLocaleDateString();

    if (lastLogin === today) {
      return; // Don't increment the streak if the user logged in today
    }

    // Update streak logic: If it's a new day, increment streak
    if (lastLogin !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('streak', newStreak);
      localStorage.setItem('lastLogin', today);
      setLastLogin(today);
    }
  };

  useEffect(() => {
    // Set the current streak when the component mounts
    setStreak(getStoredStreak());
  }, []);

  return (
    <div>
      <h3>Your Progress</h3>
      <p>Current Streak: {streak} days</p>
      <button onClick={handleLessonComplete}>Complete Lesson</button>
    </div>
  );
};

export default ProgressTracker;
