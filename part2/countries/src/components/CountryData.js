import WeatherData from './WeatherData'

const CountryData = ({ countries, weatherData }) => {
    
    return (
        countries.map(country => (
            <div key={country.name.official}>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
                <h3>languages</h3>
                <ul>
                    {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                    )}
                </ul>
                <img
                 src={country.flags.png}
                 alt={`${country.name.common} flag`}
                 width="150"
                  />
                <h2>Weather in {country.capital}</h2>
                <WeatherData weatherData={weatherData} />
            </div>
            )
        )
    )
}

export default CountryData