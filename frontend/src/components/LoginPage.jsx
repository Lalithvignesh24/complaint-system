import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // Store the token in localStorage (use 'token' for consistency)
            localStorage.setItem('token', data.token);
            // Redirect to the admin dashboard
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed!');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LoginPage;