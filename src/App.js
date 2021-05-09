import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import {useState,useEffect} from 'react'

function App() {
  const [countries,setCountries] = useState([])
  const[country,setCountry] = useState('worldwide')
  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ))
      setCountries(countries)
    })

  },[])


  const countryChange = (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)

  }

  return (
    <div className="app"> {/* Code BEM naming Convention */}
      <div className="app_header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined"
            value={country}
            onChange={countryChange}>
              <MenuItem  value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              {/* Loop Through all Countries */}
            
            

          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
        
      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}
      </div>

      


      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
