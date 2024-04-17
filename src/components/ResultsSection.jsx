import React from 'react'
import Grid from '@mui/material/Grid';
import { EmotionSection } from './EmotionSection';
import { RusselSection } from './RusselSection';


export const ResultsSection = () =>{

    return (
        <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
            justifyContent="center" 
            spacing={2} 
            alignItems="center"
            direction="rows"
        >
            <Grid item xs={6}>
                <EmotionSection></EmotionSection>
            </Grid>
            <Grid item xs = {6}>
                <RusselSection></RusselSection>
            </Grid>
        </Grid>
    );
}