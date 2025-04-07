import { useEffect, useState } from "react";
import formatUnixTimestamp from "@/utils/formatUnixTimestamp";
import PremiumGemini from "../PremiumGemini";
import FreeGemini from "../FreeGemini";
import { useSession } from "next-auth/react";
import WorkoutTracker from "./WorkoutTracker";
import { useWeatherTheme } from "@/utils/useWeatherTheme";



const WeatherInfo = ({ weatherData }: { weatherData: any }) => {
  const currentTheme = useWeatherTheme(weatherData? weatherData : null);

  const session = useSession();
  const subscriptionStatus = session?.data?.user?.subscriptionStatus;

  return (
    <div
      className={`min-h-screen p-6 text-black transition-colors duration-500 ${currentTheme.background} rounded-lg`}
    >
      {/* Header: Location & Local Time */}
      <div className="mb-6 text-center">
        <h2 className={`text-2xl font-semibold ${currentTheme.header}`}>
          📍 Halifax, Nova Scotia
        </h2>
        <p className="text-gray-500">
          🕒 {formatUnixTimestamp(weatherData.currentWeather.dateTime)}
        </p>
      </div>

      {/* Weather Section */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Current Weather Card */}
        <div
          className={`flex-1 rounded-xl p-6 text-center ${currentTheme.card} ${currentTheme.shadow}`}
        >
          <img
            src={weatherData.currentWeather.icon}
            alt="Weather Icon"
            className="mx-auto size-20"
          />
          <h3 className={`text-xl font-bold ${currentTheme.header}`}>
            {weatherData.currentWeather.condition}
          </h3>
          <p className={`text-2xl font-semibold ${currentTheme.accent}`}>
            {weatherData.currentWeather.temp}°C (Feels like{" "}
            {weatherData.currentWeather.feelsLike}°C)
          </p>
          <div className="mt-2 text-gray-600">
            <p>💨 Wind: {weatherData.currentWeather.windSpeed} km/h</p>
            <p>💧 Humidity: {weatherData.currentWeather.humidity}%</p>
            <p>🔆 UV Index: {weatherData.currentWeather.uvi}</p>
          </div>
        </div>

        <div className="gap-4">
          {weatherData.forecastedWeather.map((day: any, index: any) => (
            <div
              key={index}
              className={`flex flex-1 rounded-lg p-4 ${currentTheme.card} ${currentTheme.shadow} mb-2`}
            >
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="h-12 w-12"
              />
              <div className="ml-4">
                <h4 className={`text-lg font-semibold ${currentTheme.accent}`}>
                  {formatUnixTimestamp(day.dt)}
                </h4>
              </div>

              <div className="ml-4 flex flex-col flex-wrap gap-2">
                <p className="text-nowrap text-gray-600">
                  🌡️ {day.temp.min}°C - {day.temp.max}°C
                </p>
                <p className="text-nowrap text-gray-600">
                  💨 Wind: {(day.wind_speed * 3.6).toFixed(2)} km/h
                </p>
                <p className="text-sm">
                  Conditions:{" "}
                  {day.weather[0].description.charAt(0).toUpperCase() +
                    day.weather[0].description.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Recommendations */}
      <div className="mt-8 flex flex-col items-start justify-center gap-6 md:flex-row">
        <div
          className={`max-w-3xl flex-1 rounded-xl p-6 text-center ${currentTheme.card} ${currentTheme.shadow}`}
        >
          <h3 className={`mb-2 text-xl font-semibold ${currentTheme.header}`}>
            🔥 AI Generated Workout
          </h3>

          {subscriptionStatus === "Premium" ? (
            <PremiumGemini weatherData={weatherData} />
          ) : (
            <FreeGemini weatherData={weatherData} />
          )}
        </div>

        <div className="flex-2">
          <WorkoutTracker weatherData={weatherData} currentTheme={currentTheme} />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
