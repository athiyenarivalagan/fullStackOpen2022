const Countries = ({ countries, setShowCountries }) => {
    
    return (
        countries.map(country => (
            <div key={country.name.official}>
                {country.name.common} 
                <button onClick={() => setShowCountries([country])}>show</button>
            </div>
            ))
        )
    }
        
        
export default Countries