import React from 'react'
import { Chart } from "react-google-charts";
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
 
const background = 'rgb(170,126,169)'
const barColors = '#49005B'
// violeta lindo tamb #8c6890
export const options = {
    chart: {
      title: "Modelo de Ekman",
    },
    legend: { position: 'bottom', alignment: 'center', textStyle: { fontSize: 14 } },
    height:  '510',
    width: '100%',
    colors: [barColors],
    backgroundColor: background,
    vAxis: {
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
        <Grid container 
            style={{  textAlign: "center", background: background, borderRadius: 15, padding: 10 }} 
            justifyContent="center" 
            direction="column"
            spacing={1} 
        >
           <Grid item xs = {12}>
                <Typography variant="h4" style={{ textAlign: "center", fontWeight: "bold", color: "rgba(0, 0, 0, 0.90)"}}>
                    Modelo de Ekman
                </Typography>
            </Grid> 
            <Grid item xs = {12}>
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    data={emotionsData}
                    options={options}/>
            </Grid>
        </Grid>
    
    );
}