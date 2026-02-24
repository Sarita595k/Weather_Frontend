import React, { useState } from "react";

const Dashboard = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({
        name: "London",
        temp: 22,
        description: "Partly Cloudy",
        humidity: 60,
        wind: 12,
    });

    const handleSearch = () => {
        console.log("Searching for", city);
        // Later connect to your backend API
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        🌤 Weather Dashboard
                    </h1>

                    <div className="flex w-full md:w-auto gap-2">
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full md:w-64 px-4 py-2 rounded-xl outline-none border-none bg-white/90 focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Main Weather Card */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p className="text-gray-600">📍 {weather.name}</p>
                        <h2 className="text-6xl font-bold text-gray-800">
                            {weather.temp}°C
                        </h2>
                        <p className="text-lg text-gray-600">
                            {weather.description}
                        </p>

                        <button className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-500 transition">
                            ⭐ Add to Favorites
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-100 rounded-2xl p-6 text-center shadow">
                            <p className="text-2xl font-semibold text-gray-800">
                                {weather.humidity}%
                            </p>
                            <p className="text-gray-600 text-sm">Humidity</p>
                        </div>

                        <div className="bg-indigo-100 rounded-2xl p-6 text-center shadow">
                            <p className="text-2xl font-semibold text-gray-800">
                                {weather.wind} km/h
                            </p>
                            <p className="text-gray-600 text-sm">Wind Speed</p>
                        </div>
                    </div>
                </div>

                {/* Favorites Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        ⭐ Favorite Cities
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {["New York", "Tokyo", "Paris"].map((fav, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow hover:scale-105 transition-transform cursor-pointer"
                            >
                                <p className="font-semibold text-gray-800">{fav}</p>
                                <p className="text-sm text-gray-600">
                                    Click to view weather
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard