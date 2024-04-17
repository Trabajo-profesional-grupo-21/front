import * as React from 'react';
import { VideoSection } from '../components/VideoSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ResultsSection } from '../components/ResultsSection';

export const Main = (props) => {

    return (
        <Grid container style={{ background: "rgb(170,126,169)" }} spacing={3}>
            <Grid item xs = {12}>
                <Typography style={{ color: "rgba(0, 0, 0, 0.59)" }} variant="h4" align="center" fontWeight='bold'>
                    Detección de emociones
                </Typography>
            </Grid>
            <Grid item xs = {12}>
                <Grid container direction="row"
                    style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 15, height: '100%' }}
                    justifyContent="space-around"
                    spacing={2}
                    alignItems="center"
                    >
                    <Grid item xs={4}>
                        <VideoSection />
                    </Grid>
                    <Grid item justifyContent="center" alignItems="center" xs={8}>
                        <ResultsSection/>
                    </Grid>
                </Grid>
            </Grid>   
        </Grid>
    );
}