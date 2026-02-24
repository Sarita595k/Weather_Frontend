import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")

            const res = await fetch("http://localhost:4000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const result = await res.json()

            if (!result.success) {
                throw new Error(result.message)
            }

            // ✅ Store token
            localStorage.setItem("token", result.token)

            // ✅ Redirect to dashboard
            navigate("/dashboard")

        } catch (err) {
            setError(err.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

            {/* Navbar */}
            <Navbar />

            <div className="flex items-center justify-center px-4 mt-20">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login to Your Account
                    </h2>

                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login