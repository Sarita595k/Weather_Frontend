import React, { useEffect, useState } from "react";

const Favorite = ({ favorites, setFavorites }) => {

    const [favoriteWeather, setFavoriteWeather] = useState([]);

    useEffect(() => {
        fetchWeatherForFavorites();
    }, [favorites]);

    const fetchWeatherForFavorites = async () => {
        try {
            const weatherDataArray = await Promise.all(
                favorites.map(async (city) => {
                    const res = await fetch(
                        `http://localhost:3000/api/weather/${city}`
                    );
                    const data = await res.json();

                    if (data.success) {
                        return {
                            name: data.data.name,
                            temp: data.data.main.temp,
                            description: data.data.weather[0].description,
                            humidity: data.data.main.humidity,
                            wind: data.data.wind.speed,
                        };
                    }
                })
            );

            setFavoriteWeather(weatherDataArray);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFavorite = async (city) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:3000/api/favorite/${city}`,
                {
                    method: "DELETE",
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

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">
                ⭐ Favorite Cities
            </h2>

            {favoriteWeather.length === 0 ? (
                <p className="text-white">No favorites added yet</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {favoriteWeather.map((city, index) => (
                        <div
                            key={index}
                            className="bg-white/90 rounded-2xl shadow-xl p-6 space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold">
                                    {city.name}
                                </h3>

                                <button
                                    onClick={() =>
                                        handleRemoveFavorite(city.name)
                                    }
                                    className="text-red-500 font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-4xl font-bold">
                                {city.temp}°C
                            </p>

                            <p className="text-gray-600 capitalize">
                                {city.description}
                            </p>

                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Humidity: {city.humidity}%</span>
                                <span>Wind: {city.wind} km/h</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorite;