import { formatLocalTime } from "@/utils/fetchWeatherData";
import Gemini from "@/components/Gemini"; // Adjust the import path as needed

const WeatherInfo = async ({ weatherData }:{weatherData:any}) => {
  return (
    <div className="min-h-screen bg-white text-black p-6">
      
      {/* Header: Location & Local Time */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">
          📍 {weatherData.location.name}, {weatherData.location.region}
        </h2>
        <p className="text-gray-500">
          🕒 {formatLocalTime(weatherData.location.localtime)}
        </p>
      </div>

      {/* Weather Section */}

      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
      <div className="max-w-3xl mx-auto flex flex-row gap-6">
        
        {/* Current Weather Card */}
        <div className="bg-gray-100 shadow-lg rounded-xl p-6 text-center">
          <img
            src={weatherData.currentWeather.condition.icon}
            alt="Weather Icon"
            className="mx-auto w-16 h-16"
          />
          <h3 className="text-xl font-bold">
            {weatherData.currentWeather.condition.text}
          </h3>
          <p className="text-2xl font-semibold text-blue-600">
            {weatherData.currentWeather.temp_c}°C 
            (Feels like {weatherData.currentWeather.feelslike_c}°C)
          </p>
          <div className="mt-2 text-gray-600">
            <p>💨 Wind: {weatherData.currentWeather.wind_kph} km/h ({weatherData.currentWeather.wind_dir})</p>
            <p>💧 Humidity: {weatherData.currentWeather.humidity}%</p>
            <p>🔆 UV Index: {weatherData.currentWeather.uv}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {weatherData.forecastedWeather.map((day:any, index:any) => (
            <div key={index} className="bg-gray-100 shadow-md rounded-lg p-4 flex items-center">
              <img src={day.day.condition.icon} alt="Weather Icon" className="w-12 h-12" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-blue-600">
                  {formatLocalTime(day.date)}
                </h4>
                </div>
                <p className="text-sm">{day.day.condition.text}</p>
                <p className="text-gray-600">
                  🌡️ {day.day.mintemp_c}°C - {day.day.maxtemp_c}°C
                </p>
                <p className="text-gray-600">💨 Wind: {day.day.maxwind_kph} km/h</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Recommendations */}
      <div className="max-w-3xl mx-auto mt-8 bg-gray-100 shadow-lg rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">🔥 Recommended Workout</h3>
        <p className="text-lg text-blue-600 font-bold">🏃 Outdoor Jogging</p>
        <p className="text-gray-600">
          If too cold, try 🏋️ Indoor HIIT or 🧘 Yoga
        </p>
      </div>

      {/* Add Gemini component here */}
      <Gemini weatherCondition={weatherData.currentWeather.condition.text} />
      
      {/* You can remove your old static recommendations section */}
      
      {/* Call-to-Action Button (if you want to keep it) */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700">
          Plan My Workout →
        </button>
      </div>
      
    </div>
  );
};

export default WeatherInfo;