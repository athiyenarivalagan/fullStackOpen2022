const WeatherData = ({ weatherData }) => {
    console.log(weatherData);
    return (
        <>
            {weatherData.main ? (
                <div>
                    <p>temperature: {weatherData.main.temp} Celcius</p>
                    <img
                     src={` http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                     alt={`weather icon for ${weatherData.name}`}
                  />
                    <p>wind: {weatherData.wind.speed} m/s</p>
                </div>
            ) : null}
        </>
    )
}

export default WeatherData