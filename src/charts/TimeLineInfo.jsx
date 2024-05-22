import { formatNumber } from 'chart.js/helpers';
import React from 'react'
import { Chart } from "react-google-charts";

 
const background = 'rgb(170,126,169)'
export const options = {
    chart: {
      title: "Exitacion y valencia en el tiempo",
    },
    hAxis: {
        title: 'Tiempo',
      },
    legend: { position: 'bottom', alignment: 'center', textStyle: { fontSize: 14 }, formatNumber },
    height:  '100%',
    width: '100%',
    backgroundColor: background,
};


export const TimeLineInfo = ({timeLineData}) => {
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