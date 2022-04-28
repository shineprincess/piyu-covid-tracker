import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import {Line} from "react-chartjs-2"
import numeral from 'numeral'

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

 const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    // data[casesType].forEach((date)
        for (let date in data.cases) {
            if(lastDataPoint) {
            let  newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData
};


const LineGraph = ({ casesType = "cases" , ...props }) => {
    const [data , setData] = useState({})


    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    // difference between last date - current date
    // https://corona.lmao.ninja/v2/historical/all?lastdays=120"
   
    useEffect(()=>{
        const fetchData= async () => {
         await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            let chartData = buildChartData(data,casesType)
            setData(chartData)
            // console.log(chartData)
        });
    };
    
    fetchData();
    },[casesType]);


    return (
        <div className={props.className}>
            {data.length > 0  && (
                <Line 
                    options={options}
                    data={{
                        datasets : [
                            {
                                    label: 'Daily New Cases',
                                    backgroundColor:"rgba(204,16,52,0.5)",
                                    borderColor:"#CC1034",
                                    data : data,
                            },
                        ],
                    }}
                />
            ) }
         
        </div>
    )
}

export default LineGraph

// {cases: {…}, deaths: {…}, recovered: {…}}
// cases: {8/8/21: 203222679, 8/9/21: 203876512, 8/10/21: 204525161, 8/11/21: 205253686, 8/12/21: 205964473, …}
// deaths: {8/8/21: 4294262, 8/9/21: 4302901, 8/10/21: 4314458, 8/11/21: 4324881, 8/12/21: 4335556, …}
// recovered: {8/8/21: 0, 8/9/21: 0, 8/10/21: 0, 8/11/21: 0, 8/12/21: 0, …}




// data[casesType].forEach((date) => {
//     if(lastDataPoint) {
//         const newDataPoint = {
//             x: date,
//             y: data[casesType][date] - lastDataPoint
//         }
//         chartData.push(newDataPoint)
//     }
//     lastDataPoint = data[casesType][date];
// });
// return chartData