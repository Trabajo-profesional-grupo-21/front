import { formatNumber } from 'chart.js/helpers';
import React, { useState } from 'react'
import { Chart } from "react-google-charts";
import {Typography, Grid} from '@mui/material'; 
import {CircularProgress} from '@mui/material';
import {ScatterPlotMultiple} from '../charts/ScatterPlotMultiple';

const progressColor = 'rgba(0, 0, 0, 0.7)';
const background = 'rgb(170,126,169)';

export const Summary = ({timeLineData, receivedAllBatches}) => {
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
            alignContent="center"
            direction="row">
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
            <Grid item xs = {12} sx={{ marginBottom: 3 }} alignContent="center">
                <ScatterPlotMultiple/>
            </Grid>
        </Grid>
    )
}