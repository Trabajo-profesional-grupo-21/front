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

export const TimeLineInfo = ({timeLineData, receivedAllBatches}) => {
    const avgValence = () => {
        let sum = timeLineData.reduce((acc, value, index) => {
            if (index === 0) {
                return acc
            }
            return acc + value[2]
        }, 0)
    
        return sum / (timeLineData.length-1) /* Borra la lista que tiene la info de los titulos */
    }
    
    const avgArousal = () => {
        let sum = timeLineData.reduce((acc, value, index) => {
            if (index === 0) {
                return acc
            }
            return acc + value[1]
        }, 0)
    
        return sum / (timeLineData.length-1) /* Borra la lista que tiene la info de los titulos */
    }
    return (
        <Grid container
            style={{ textAlign: "center", background: background, borderRadius: 15, padding: 20 }} 
            justifyContent="center" 
            direction="row">
            <Grid item xs = {12} sx={{ marginBottom: 7 }}>
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={timeLineData.sort((a, b) => {return a[0] - b[0];})}
                options={options}
                />
            </Grid>
            <Grid item xs = {12} sx={{ marginBottom: 3 }}>
            <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.70)" }}>
                    Valores promedio
            </Typography>
            </Grid>
            <Grid item xs = {12} sx={{ marginBottom: 3 }}>
            <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.50)" }}>
                    Exitación {!receivedAllBatches ? (
                    <CircularProgress
                        style={{
                            display: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: progressColor,
                        }}
                        size={15}
                    />
            ) : ( avgArousal() ) }
            </Typography>
            </Grid>
            <Grid item xs = {12} sx={{ marginBottom: 3 }}>
            <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.50)" }}>
                    Valencia {!receivedAllBatches ? (
                    <CircularProgress
                        style={{
                            display: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: progressColor,
                        }}
                        size={15}
                    />
            ) : ( avgValence() ) }
            </Typography>
            </Grid>
        </Grid>
    );
}