import React from 'react'
import './Table.css';


const TableCountry =  ({  countries }) => {
    return (
        <div className="table">
        <tr className='table_country'>
            <td>Flag</td>
            <td >Country</td>
            <td>Cases</td>
        </tr>
            {
                countries.map((country ) => {
                    return(
                        <>
                            <tr>
                            <td className="first-td hide"><img className="flag-table" src= {(country.countryInfo.flag)} /></td>
                                <td>{country.country}</td>
                                <td><strong>{country.cases}</strong></td>
                                {/* <td>{country.recovered}</td>
                                <td>{country.deaths}</td> */}
                            </tr>
                        </>
                    )
                })
            }
        </div>
    )
}

export default TableCountry
