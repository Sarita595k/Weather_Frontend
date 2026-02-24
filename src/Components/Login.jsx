import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.status === 429) {
                setError(data.message);
                return;
            }

            if (res.ok && data.success) {
                // Save token
                localStorage.setItem("token", data.token);

                // Go to dashboard
                navigate("/dashboard");
            } else {
                setError(data.message || "Login failed");
            }

        } catch (error) {
            console.log("Error:", error);
            setError("Server not running");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700">
            <Navbar />

            <div className="flex items-center justify-center px-4 mt-20">
                <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8">

                    <h2 className="text-3xl font-bold text-center mb-6">
                        Login
                    </h2>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm transition-all duration-300">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-indigo-600">
                            Sign Up
                        </Link>
                    </p>

                </div>
            </div>
        </div >
    )
}

export default Login