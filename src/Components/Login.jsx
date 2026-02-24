import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
    };

    return (
        < div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 px-4" >
            <Navbar />
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have an account? <span className="text-indigo-600 font-medium cursor-pointer">
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </p>
            </div>
        </div >
    );
}

export default Login