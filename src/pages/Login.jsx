import React, { useState } from 'react';

export default function Login({ onLogin, onRegister, message, loading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-page card">
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => onLogin(username, password)} disabled={loading}>Login</button>
      <button onClick={() => onRegister(username, password)} disabled={loading}>Register</button>
      {message && <div className="feedback error">{message}</div>}
      {loading && <div className="loader">Processing...</div>}
    </div>
  );
}
