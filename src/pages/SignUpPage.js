import React, { useState } from 'react';

const SignUpPage = ({ onAccountCreated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [users, setUsers] = useState([
    { username: 'user', password: 'password' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.some((user) => user.username === username)) {
      setErrorMessage('Username already exists.');
    } else {
      setUsers([...users, { username, password }]);
      onAccountCreated(username); // Log the user in immediately after account creation
    }
  };

  return (
    <div className="container">
      <h2>Create an Account</h2>
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpPage;
