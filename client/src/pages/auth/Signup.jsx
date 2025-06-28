import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Signup() {
    const { setUser } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                'http://localhost:3000/api/register',
                { username, email, password, role },
                { withCredentials: true } // ✅ Important
            );

            console.log("Signup response:", response.data);

            if (response.data.success) {
                // After signup → fetch user details from /me
                const meResponse = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
                console.log("Fetched user after signup:", meResponse.data);
                setUser(meResponse.data.user);
                navigate("/");
            } else {
                setError(response.data.message || "Signup failed.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="login_container">
            <div className="login_header">
                <h1 className="login_title">Sign Up</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login_error">{error}</div>}

                    <label className="login_label">User Name</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="login_input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

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

                    <label className="login_label">Role</label>
                    <select
                        className="login_input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <p className='text-sm'>
                        Already have an account? <Link to='/login' className='text-blue-700'>Login</Link>
                    </p>

                    <button type="submit" className="login_button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
