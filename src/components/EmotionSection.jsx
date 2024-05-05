import React from 'react'
import { Chart } from "react-google-charts";
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


  
  export const options = {
    chart: {
      title: "Modelo de Ekman",
    },
    legend: { position: 'bottom', alignment: 'center', textStyle: { fontSize: 14 } },
    height: 400,
    width: 500,
    colors: ['#49005B'],
    backgroundColor: "rgb(170,126,169)"
  };


export const EmotionSection = ({emotionsData}) => {
    return (
        <Grid container 
            justifyContent="center" 
            alignItems="center"
            direction="column"
            spacing={1} 
        >
           <Grid item xs = {12}>
                <Typography variant="h4" style={{ textAlign: "center", fontWeight: "bold", color: "gray" }}>
                    Modelo de Ekman
                </Typography>
            </Grid> 
            <Grid item xs ={12}>
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    data={emotionsData}
                    options={options}
                />
            </Grid>
        </Grid>    
    );
}