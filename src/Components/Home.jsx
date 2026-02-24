import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Home = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-400 via-sky-500 to-indigo-600 text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center px-6 mt-20">

                <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                    Real-Time Weather Updates
                </h2>

                <p className="text-lg max-w-xl mb-10 text-white/90">
                    Track live weather conditions, wind speed, humidity, and forecasts
                    from anywhere in the world.
                </p>

                {/* Weather Preview Card */}
                <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 w-80 shadow-2xl hover:scale-105 transition duration-500">

                    <h3 className="text-xl font-semibold mb-4">
                        📍 New York
                    </h3>

                    <div className="text-6xl mb-4">
                        🌤️
                    </div>

                    <p className="text-4xl font-bold">24°C</p>

                    <div className="flex justify-between mt-6 text-sm text-white/90">
                        <span>💨 12 km/h</span>
                        <span>💧 65%</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Home