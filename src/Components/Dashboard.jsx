import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Favorite from "./Favorite";

const Dashboard = () => {
    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({
        name: "London",
        temp: 22,
        description: "Partly Cloudy",
        humidity: 60,
        wind: 12,
        temp_min: 0,
        temp_max: 0,
        sunrise: "00:00",
        sunset: "00:00"

    });
    const [favorites, setFavorites] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const formatTime = (unixTime, timezoneOffset) => {
        const date = new Date((unixTime + timezoneOffset) * 1000);

        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        });
    }
    const handleSearch = async (selectedCity) => {
        const searchCity = selectedCity || city;

        if (!searchCity) return alert("Please enter a city");

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/weather/${searchCity}`
            );

            const data = await res.json();

            if (data.success) {
                const weatherData = data.data;

                setWeather({
                    name: weatherData.name,
                    temp: weatherData.main.temp,
                    description: weatherData.weather[0].description,
                    condition: weatherData.weather[0].main,
                    humidity: weatherData.main.humidity,
                    wind: weatherData.wind.speed,
                    icon: weatherData.weather.icon,
                    temp_min: weatherData.main.temp_min,
                    temp_max: weatherData.main.temp_max,
                    sunrise: formatTime(
                        weatherData.sys.sunrise,
                        weatherData.timezone
                    ),
                    sunset: formatTime(
                        weatherData.sys.sunset,
                        weatherData.timezone
                    )
                });

                setCity("");
            } else {
                alert("City not found");
            }

        } catch (error) {
            console.log(error);
            alert("Error fetching weather");
        }
    };


    const handleAddFavorite = async () => {
        try {
            const token = localStorage.getItem("token");

            const alreadyAdded = favorites.includes(
                weather.name.toLowerCase()
            );

            if (alreadyAdded) {
                alert("City already added to favorites!");
                return;
            }

            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/favorite`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        city: weather.name,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                setFavorites(data.favorites);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/favorite/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                setFavorites(data.favorites);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getBackground = () => {
        switch (weather.condition) {
            case "Clouds":
                return "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700";
            case "Clear":
                return "bg-gradient-to-br from-yellow-300 via-orange-400 to-yellow-500";
            case "Snow":
                return "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300";
            case "Rain":
                return "bg-gradient-to-br from-blue-400 via-indigo-500 to-gray-700";
            default:
                return "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600";
        }
    };
    return (
        <div className={`min-h-screen ${getBackground()} transition-all duration-700`}>
            {/* <div className={`bg-[url(${bg.jpg})] bg-cover bg-center h-screen`}> */}
            <div className="flex justify-between items-center px-6 py-4">
                <h1 className="text-2xl font-bold text-white">
                    🌤 Weather Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            <div className="p-6 max-w-6xl mx-auto space-y-8">

                {/* Search Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex w-full md:w-auto gap-2">
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full md:w-64 px-4 py-2 rounded-xl outline-none bg-white/90 focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Weather Card */}
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p className="text-gray-600">📍 {weather.name}</p>
                        <h2 className="text-6xl font-bold text-gray-800">
                            {weather.temp}°C
                        </h2>
                        <p className="text-lg text-gray-600">
                            {weather.description}
                        </p>

                        <button onClick={handleAddFavorite} className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-500 transition">
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
                        <div className="bg-indigo-100 rounded-2xl p-6 text-center shadow">
                            <p className="text-2xl font-semibold text-gray-800">
                                {weather.temp_min}°C
                            </p>
                            <p className="text-gray-600 text-sm capitalize">min temp</p>
                        </div>
                        <div className="bg-indigo-100 rounded-2xl p-6 text-center shadow">
                            <p className="text-2xl font-semibold text-gray-800">
                                {weather.temp_max}°C
                            </p>
                            <p className="text-gray-600 text-sm capitalize">max temp</p>
                        </div>

                        <div className="bg-indigo-100 rounded-2xl p-6 text-center shadow">
                            <p className="text-2xl font-semibold text-gray-800">
                                {weather.sunrise}
                            </p>
                            <p className="text-gray-600 text-sm">Sunrise</p>
                        </div>
                        <div className="bg-indigo-100 rounded-2xl p-6 text-center shadow">
                            <p className="text-2xl font-semibold text-gray-800">
                                {weather.sunset}
                            </p>
                            <p className="text-gray-600 text-sm capitalize">sunset</p>
                        </div>
                    </div>
                </div>
                <Favorite
                    favorites={favorites}
                    setFavorites={setFavorites}
                    onSelectCity={(city) => handleSearch(city)}
                />
            </div>
        </div>
    );
};

export default Dashboard;