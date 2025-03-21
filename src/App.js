import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import FinancialDictionary from './pages/FinancialDictionary';
import LessonPage from './pages/LessonPage';

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
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/profile" /> : <SignUpPage onAccountCreated={handleLogin} />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/dictionary" element={isLoggedIn ? <FinancialDictionary /> : <Navigate to="/login" />} />
          <Route path="/lessons" element={isLoggedIn ? <LessonPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
