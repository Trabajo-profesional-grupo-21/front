import React from 'react'
import { Chart } from "react-google-charts";
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Box } from '@material-ui/core';
 
export const options = {
    chart: {
      title: "Modelo de Ekman",
    },
    legend: { position: 'bottom', alignment: 'center', textStyle: { fontSize: 14 } },
    height: 400,
    width: 500,
    colors: ['#49005B'],
    backgroundColor: "rgb(170,126,169)",
    vAxis: {
        title: 'No of Memes',
        viewWindowMode: 'explicit',
        viewWindow: {
            max: 1,
            min: 0,
            interval: 1,
        },
    }
};


export const EmotionSection = ({emotionsData}) => {
    return (
        <Box 
            my={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            p={2}>
        <Grid container 
            style={{  textAlign: "center", background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
            justifyContent="center" 
            alignItems="stretch"
            direction="column"
            spacing={1} 
        >
           <Grid item xs = {12}>
                <Typography variant="h4" style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>
                    Modelo de Ekman
                </Typography>
            </Grid> 
        </Grid>
        <Chart
            chartType="ColumnChart"
            width="100%"
            data={emotionsData}
            options={options}/>
        </Box>
    );
}