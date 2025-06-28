import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                'http://localhost:3000/api/login',
                { email, password },
                { withCredentials: true } // ✅ Important for cookies
            );

            console.log("Login response:", response.data);

            if (response.data.success) {
                // After login → fetch user details
                const meResponse = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
                console.log("Fetched user after login:", meResponse.data);
                setUser(meResponse.data.user);
                navigate("/");
            } else {
                setError(response.data.message || "Login failed.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="login_container">
            <div className="login_header">
                <h1 className="login_title">Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login_error">{error}</div>}

                    <label className="login_label">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="login_input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="login_label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="login_input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className='text-sm'>
                        Don't have an account? <Link to='/signup' className='text-blue-700'>Register</Link>
                    </p>

                    <button type="submit" className="login_button">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
