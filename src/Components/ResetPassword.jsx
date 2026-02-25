import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/user/reset-password/${token}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                setPassword("");
                setConfirmPassword("");

                // Redirect to login after 2 seconds
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err) {
            console.log(err);
            setError("Server not responding");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Reset Password
                </h2>

                {message && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        {message} Redirecting to login...
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;