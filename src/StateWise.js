import React, { useEffect, useState } from 'react'
// import GiteIcon from '@mui/icons-material/Gite';
import './StateWise.css'

const StateWise = () => {

    // https://data.covid19india.org/data.json
    const[stateData, setStateData] = useState([])
    
    const getStateData = async  () => {
        const resp = await fetch('https://data.covid19india.org/data.json');
        const actualData = await resp.json()
        console.log(actualData.statewise.state)
        setStateData(actualData.statewise)
    }

    useEffect (() => {
        getStateData()
    },[])




    return (
        <>
            <div className='state-wise-container'>

                <div className='state-heading'>
                    <h1>Cases In States Of India</h1>
                 </div>

                <div className="responsive-table">
                    <table >
                        <thead className="thead-dark">
                            <tr>
                                <th>State</th>
                                <th>Confirmed</th>
                                <th>Recovered</th>
                                <th>Deaths</th>
                                <th>Active</th>
                                {/* <th>Last Updated Time</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                stateData.map((curElem,index) => {
                                    return(
                                        <tr key={index}>
                                            <th>{curElem.state}</th>
                                            <td>{curElem.confirmed}</td>
                                            <td>{curElem.recovered}</td>
                                            <td>{curElem.deaths}</td>
                                            <td>{curElem.active}</td>
                                            {/* <td>{curElem.lastupdatedtime}</td> */}
                                       </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default StateWise

