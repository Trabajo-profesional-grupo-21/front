import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import { Chart } from "react-google-charts";
import { ScatterPlot } from './ScatterPlotInfo';
import { Box } from '@material-ui/core';

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
        <Box             
            my={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            p={2}>
        <Grid container style={{ textAlign: "center", background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
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
                <Typography>
                    Valencia {valence}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    Arousal {arousal}
                </Typography>
            </Grid>
        </Grid>
            <Box
                height={200}
                width={50}
                my={4}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                gap={4}
                p={2}
                sx={{ border: '2px solid grey' }}>
                <ScatterPlot xpos={valence} ypos={arousal}></ScatterPlot>
            </Box>
        </Box>
    )
};