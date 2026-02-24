import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-8 py-5 backdrop-blur-md bg-white/10 shadow-lg text-white">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-wide">
                🌬️ AvsarWeather
            </Link>

            {/* Nav Buttons */}
            <div className="space-x-4">
                <Link
                    to="/login"
                    className="px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition duration-300"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="px-5 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition duration-300"
                >
                    Sign Up
                </Link>
            </div>

        </nav>
    )
}

export default Navbar