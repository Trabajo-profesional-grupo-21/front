import React from 'react'
import { Chart } from "react-google-charts";

 
const background = 'rgb(170,126,169)'
export const options = {
    chart: {
      title: "Exitacion y valencia en el tiempo",
    },
    legend: { position: 'bottom', alignment: 'center', textStyle: { fontSize: 14 } },
    height:  '100%',
    width: '100%',
    backgroundColor: background,
};


export const TimeLineInfo = ({timeLineData}) => {
    console.log("TimeLine", timeLineData);
    return (
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={timeLineData}
                options={options}
                />
    );
}