import { formatNumber } from 'chart.js/helpers';
import React, { useState } from 'react'
import { Chart } from "react-google-charts";
import {Typography, Grid} from '@mui/material'; 
import {CircularProgress} from '@mui/material';

const progressColor = 'rgba(0, 0, 0, 0.7)'
const background = 'rgb(170,126,169)'

export const options = {
    hAxis: {
        title: 'Tiempo',
        minValue: 1
      },
    vAxis: {
        minValue: 1,
        maxValue: -1
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
                data={timeLineData.sort((a, b) => {return a[0] - b[0];})}
                options={options}
                />
    );
}