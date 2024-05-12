import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import { ScatterPlot } from '../charts/ScatterPlotInfo';
import { Box } from '@material-ui/core';

const background = 'rgb(170,126,169)'
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
    console.log("valence and arousal", valenceArousalData);
    return (
        <Grid container style={{ textAlign: "center", background: background, borderRadius: 15, padding: 10 }} 
            justifyContent="center" 
            alignItems="stretch"
            direction="rows"
            spacing={1} 
        >
            <Grid item xs = {12}>
                <Typography variant="h4" style={{ fontWeight: "bold", color: "black" }}>
                    Modelo de Russel
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6">
                    Valencia {valence}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6">
                    Exitacion {arousal}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box 
                    height="auto"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ScatterPlot xpos={valence} ypos={arousal}></ScatterPlot>
                </Box>
            </Grid>
        </Grid>
    )
};