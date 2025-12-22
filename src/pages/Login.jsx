import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (isLogin) {
            // Use AuthContext's login function
            const result = await login(username, password);
            if (result.success) {
                navigate('/'); // Redirect to dashboard on success
            } else {
                setMessage({ text: result.message || 'Login failed', type: 'error' });
            }
        } else {
            // Registration logic
            const endpoint = '/api/register';
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

                if (text === "Registered") {
                    setMessage({ text: "Registration successful! Please login.", type: 'success' });
                    setIsLogin(true);
                } else {
                    setMessage({ text: text, type: 'error' });
                }
            } catch (error) {
                setMessage({ text: "Connection error. Is backend running?", type: 'error' });
            }
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

            {/* Toggle Button */}
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

export default Login;