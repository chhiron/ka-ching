import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <div className="navbar-container">
      {/* Logo section */}
      <div className="logo">
        <a href="https://chhiron.github.io/ka-ching/"  rel="noopener noreferrer">
          <img src="logo.png" alt="Logo"  style={{ width: '180px', height: 'auto', objectFit: 'contain' }}/>
        </a>
      </div>

      {/* Navbar Links */}
      <nav>
        <ul>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          {!isLoggedIn ? (
            <>
              {/* Only show Login and Sign Up if not logged in */}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              {/* Show profile and lessons after login */}
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/lessons">Lessons</Link>
              </li>
              <li>
                <Link to="/dictionary">Financial Dictionary</Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
