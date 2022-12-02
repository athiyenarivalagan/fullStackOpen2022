const Filter = ({ filterCountries, handleFilterChange }) => {
    
    return (
        <div>
            find countries <input
             value={filterCountries}
             onChange={handleFilterChange} /> 
        </div>
    )
}

export default Filter