import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import { Chart } from "react-google-charts";
import { ScatterPlot } from './ScatterPlotInfo';


export const data = [
    ["Valence", "Arousal"],
    [-5, 0],
    [0, 5],
    [0, -5],
    [5, 0],
    [0.3, 0.3],
  ];
  
  export const options = {

    hAxis: { 
            title: "Arousal", 
            minValue: -5,
            maxValue: 5, },
    vAxis: { title: "Valence", 
             minValue: -5,
             maxValue: 5 },
    backgroundColor: "rgb(170,126,169)",
  };



export const RusselSection = ({valenceArousalData}) => {
    var valence = valenceArousalData["valence"]; 
    var arousal = valenceArousalData["arousal"];
    return (
        <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
            justifyContent="space-around" 
            alignItems="center"
            direction="rows"
            spacing={1} 
        >
            <Grid item xs = {12}>
                <Typography variant="h4" style={{ fontWeight: "bold", color: "gray" }}>
                    Modelo de Russel
                </Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>
                    Valencia {valence}
                </Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>
                    Arousal {arousal}
                </Typography>
            </Grid>
            <Grid item xs = {12}>
            <ScatterPlot xpos={valence} ypos={arousal}></ScatterPlot>
            </Grid>
        </Grid>
    )
};