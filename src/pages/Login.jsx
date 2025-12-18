import React, { useState } from 'react';

const AuthForm = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        const endpoint = isLogin ? '/api/login' : '/api/register';
        
        // Backend expects x-www-form-urlencoded (@RequestParam), NOT JSON
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        try {
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            });

            const text = await response.text();

            if (isLogin) {
                if (text === "Login success") {
                    if (onLoginSuccess) onLoginSuccess(username);
                } else {
                    setMessage({ text: text, type: 'error' });
                }
            } else {
                // Registration logic
                if (text === "Registered") {
                    setMessage({ text: "Registration successful! Please login.", type: 'success' });
                    setIsLogin(true); // Switch to login view automatically
                } else {
                    setMessage({ text: text, type: 'error' });
                }
            }
        } catch (error) {
            setMessage({ text: "Connection error. Is backend running?", type: 'error' });
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none' }}>
                    {isLogin ? 'Sign In' : 'Register'}
                </button>
            </form>

            {/* Status Messages */}
            {message.text && (
                <p style={{ color: message.type === 'error' ? 'red' : 'green', marginTop: '10px' }}>
                    {message.text}
                </p>
            )}

            {/* Toggle Button / "Missing" Register Logic */}
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.9em' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button 
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage({ text: '', type: '' });
                    }}
                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isLogin ? 'Register here' : 'Login here'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;