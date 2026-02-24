import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup Data:", formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
            <Navbar />
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <span className="text-purple-600 font-medium cursor-pointer">
                        <Link to="/login">Login</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup