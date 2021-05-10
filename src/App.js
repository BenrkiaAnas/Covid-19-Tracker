import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import { useState, useEffect } from 'react'
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './utile';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])


  useEffect(async () => {
    await fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  })

  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ))
        const sortedData = sortData(data)
        setCountries(countries)
        setTableData(sortedData)
      })

  }, [])


  const countryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
       
      })

    
    console.log(countryInfo)

  }

  return (
    <div className="app"> {/* Code BEM naming Convention */}

      <div className="app_left">

        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined"
              value={country}
              onChange={countryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          {/* InfoBoxes */}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          {/* InfoBoxes */}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>






        {/* Map */}
        <Map />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <Table countries={tableData}>

          </Table>
          <h3>Worldwide New Cases</h3>
          {/* Graph */}
        </CardContent>

      </Card>

    </div>

  );
}

export default App;
