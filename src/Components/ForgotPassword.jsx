import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // <-- new state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true); // <-- start loading

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/user/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                setEmail("");
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err) {
            console.log(err);
            setError("Server not responding");
        }

        setLoading(false); // <-- stop loading
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Forgot Password
                </h2>

                {message && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading} // <-- disable button while loading
                        className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"} {/* show text based on loading */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;