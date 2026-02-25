import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <h1 className="text-2xl font-bold tracking-wide">
                    🌤️ AvsarWeather
                </h1>

                {/* Links */}
                <div className="space-x-6 font-medium">
                    <Link to="/" className="hover:text-gray-200 transition">
                        Home
                    </Link>
                    {!token ? (
                        <>
                            <Link to="/login" className="hover:text-gray-200 transition">
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-gray-200 transition">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;