import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryData from './components/CountryData'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState('')
  const [showCountries, setShowCountries] = useState([])
  const [weatherData, setWeatherData] = useState([])


  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    if (showCountries.length === 1) {
    const capital = showCountries[0].capital
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
      })
    }
  }, [showCountries])

  const handleFilterChange = event => {
    setFilterCountries(event.target.value)
    // filter logic
    const filteredCountries = 
        filterCountries === '' ?
        [] :
      (countries.filter(country =>
        (country.name.common).toLowerCase().includes(filterCountries.toLowerCase())))

    setShowCountries(filteredCountries)
  }


  return (
    <>
      <Filter
       filterCountries={filterCountries}
       handleFilterChange={handleFilterChange}
       />
      {showCountries.length > 10 ?
       <p>Too many matches, specify another filter</p> :
       (
        showCountries.length === 1 ?
          <CountryData
           countries={showCountries} 
           weatherData={weatherData}
            /> :
          <Countries
           countries={showCountries}
           setShowCountries={setShowCountries}
            />
        )
      }      
    </>
  )
}

export default App;
