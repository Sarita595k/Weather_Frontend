import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        const res = await fetch(
                            `${import.meta.env.VITE_BASE_URL}/api/weather/current?lat=${latitude}&lon=${longitude}`
                        );

                        const data = await res.json();

                        if (res.ok) {
                            setWeather(data);
                        } else {
                            setError(data.message || "Failed to fetch weather");
                        }
                    } catch (err) {
                        setError("Unable to fetch weather");
                    } finally {
                        setLoading(false);
                    }
                },
                () => {
                    setError("Location permission denied");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation not supported");
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-400 via-sky-500 to-indigo-600 text-white">
            <Navbar />

            <div className="flex flex-col items-center justify-center text-center px-6 mt-20">

                <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                    Real-Time Weather Updates
                </h2>

                {loading && <p className="text-lg">Loading weather...</p>}

                {error && (
                    <div className="bg-red-500 px-4 py-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {weather && (
                    <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 w-80 shadow-2xl transition duration-500">

                        <h3 className="text-xl font-semibold mb-4">
                            📍 {weather.name}
                        </h3>

                        <div className="text-6xl mb-4">
                            {weather.weather[0].main === "Clouds" && "☁️"}
                            {weather.weather[0].main === "Clear" && "☀️"}
                            {weather.weather[0].main === "Rain" && "🌧️"}
                            {weather.weather[0].main === "Snow" && "❄️"}
                        </div>

                        <p className="text-4xl font-bold">
                            {Math.round(weather.main.temp)}°C
                        </p>

                        <div className="flex justify-between mt-6 text-sm text-white/90">
                            <span>💨 {weather.wind.speed} km/h</span>
                            <span>💧 {weather.main.humidity}%</span>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Home;