import React from 'react';

const ProfilePage = ({ username, onLogout }) => {
  return (
    <div className="profile-container">
      <h1>Welcome, {username}!</h1>
      <p>This is your profile page.</p>
      <button onClick={onLogout} className="logout">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
