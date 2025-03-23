import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validUsername = 'kaching'; // Hardcoded for example
  const validPassword = '123'; // Hardcoded for example

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === validUsername && password === validPassword) {
      onLogin(username);
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
