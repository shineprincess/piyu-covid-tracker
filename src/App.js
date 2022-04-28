import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect } from  'react'
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import TableCountry from './TableCountry';
import sortedData, { prettyPrintStat } from './sortingUtil'
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css'
import StateWise from './StateWise';
import Modal from './Modal';
import './Modal.css'



// https://disease.sh/ -> api 
// https://disease.sh/v3/covid-19/countries

const App = () =>  {

  const [countries, setCountries] = useState([]);
  const [country , setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableDataN] = useState([])
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountires] = useState([]);
  const [casesType, setCasesType] = useState("cases")
  const [openModal,setOpenModal] = useState(false)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  },[])

  useEffect(() => {
    // https://corona.lmao.ninja/v2/countries
  //  The code inside here runs once when the component loads and not again
  // async -> send a request to server, wait for it, do something with it 
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                const countries=  data.map((country) => ({
                    name : country.country, //United state
                    value : country.countryInfo.iso2,  // USA , UK , FR
                  }
                ) );

                const sort = sortedData(data)
                setTableDataN(sort)
                setMapCountires(data)
                setCountries(countries)
              
            } )
        };
        getCountriesData()
  }, []);

  console.log(tableData)

  const onCountryChange = async (event) => {
      const countryCode = event.target.value
      // setCountry(countryCode)
      // console.log(countryCode)
      const url = countryCode ==="worldwide" 
              ? 'https://disease.sh/v3/covid-19/all'
              :  ` https://disease.sh/v3/covid-19/countries/${countryCode}`

              // https://disease.sh/v3/covid-19/countries/USA

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode)
          setCountryInfo(data)

          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          setMapZoom(4);
         
        })

        
    }

      //  https://disease.sh/v3/covid-19/countries
      // https://disease.sh/v3/covid-19/countries[COUNTRY_CODE]

  return (
            <>
                    <div className="app">
                     {/* Header */}
              
                    <div className="app__left">
                        <div className="app__header">
                    
                              <h1>COVID-19 TRACKER</h1>
                                <FormControl className="app__dropdown">
                                      <Select  
                                        variant="outlined"    
                                        onChange={onCountryChange}
                                        value={country}
                                        >
                                          <MenuItem  value="worldwide">Worldwide</MenuItem>
                                          {
                                              countries.map((country ) => (
                                                <MenuItem  value={country.value}> {country.name}</MenuItem>
                                              ) )
                                          }
                                      </Select>
                                  </FormControl>
                        </div>
                          
                      {/* Title + Select input dropdown field */}

                      {/* InfoBoxes recoveries */}
                      {/* InfoBoxes */}

                        <div className="app__stats">
                                        {/* InfoBoxes  title ="Coronavirus cases " */}
                                        <InfoBox 
                                          inRed 
                                          active ={casesType ==="cases"}
                                          onClick = { (e)=> setCasesType('cases')}
                                          title="Coronavirus cases"
                                          cases={prettyPrintStat(countryInfo.todayCases)} 
                                          total={prettyPrintStat(countryInfo.cases)}                                 
                                         />
                                        <InfoBox 
                                         active ={casesType ==="recovered"}
                                          onClick = { (e)=> setCasesType('recovered')}
                                          title="Recovered " 
                                          cases={prettyPrintStat(countryInfo.todayRecovered)} 
                                          total={prettyPrintStat(countryInfo.recovered)}
                                        />
                                        <InfoBox 
                                          isRed
                                          active ={casesType ==="deaths"}
                                          onClick = { (e)=> setCasesType('deaths')}
                                          title="Deaths" 
                                          cases={prettyPrintStat(countryInfo.todayDeaths)} 
                                          total={prettyPrintStat(countryInfo.deaths)}
                                         />
                        </div>
                 
                      {/* Map */}

                    <Map
                      casesType={casesType}
                      countries={mapCountries}
                      center ={mapCenter}
                      zoom = {mapZoom}
                    />

                  </div>

                      <Card className="app__right">
                          <CardContent>
                          <h3>Live Cases By country</h3>
                              {/* Table */}
                          <TableCountry countries={tableData}/>
                                {/* Graph */}
                            <h3 className='app__graphTitle'>Worldwide new  {casesType} </h3>
                            <LineGraph  className="app__graph" casesType={casesType}/>
                          </CardContent>
                      </Card>

                </div>

                <div className="app__states">
                        <StateWise/>
                  </div>

                
                 <div>
                    <div className="covid-button">
                        <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target="#exampleModal" 
                            onClick={()=> {
                              setOpenModal(true);
                            }}>
                          COVID Symptoms
                        </button>         
                      </div>
                   {openModal && <Modal closeModal={setOpenModal} />}
                 </div>

            </>
  );
}


export default App;