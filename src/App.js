import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import FinancialDictionary from './pages/FinancialDictionary';
import LessonPage from './pages/LessonPage';
import AboutUsPage from './pages/AboutUsPage';  // Add this import
import PlacementTest from './pages/PlacementTest';  // Add this import if you have it

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router basename="/ka-ching">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Routes>
          {/* Add a dedicated route for About Us page */}
          <Route path="/" element={<AboutUsPage />} />  {/* Default path, home page */}
          <Route path="/aboutus" element={<AboutUsPage />} />  {/* Dedicated About Us route */}

          {/* If user is not logged in, only show login and sign up pages */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/profile" /> : <SignUpPage onAccountCreated={handleLogin} />} />
          
          {/* If user is logged in, redirect to profile page */}
          <Route path="/profile" element={isLoggedIn ? <ProfilePage username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/placement-test" element={isLoggedIn ? <PlacementTest /> : <LoginPage />} />
          {/* Show other pages only if logged in */}
          <Route path="/dictionary" element={isLoggedIn ? <FinancialDictionary /> : <Navigate to="/login" />} />
          <Route path="/lessons" element={isLoggedIn ? <LessonPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


