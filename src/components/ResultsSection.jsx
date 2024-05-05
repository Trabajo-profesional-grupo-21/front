import React, { useEffect, useState }  from 'react'
import Grid from '@mui/material/Grid';
import { EmotionSection } from './EmotionSection';
import { RusselSection } from './RusselSection';

const data_init = [
    ["Emociones", "Emociones"],
    ["HAPPY", 0.03],
    ["SADNESS", 0.23],
    ["FEAR", 0.4],
    ["ANGRY", 0.6],
    ["DISGUST", 0.03],
    ["SURPRISE", 0.3],
    ["NEUTRAL", 0.1],
  ];

export const ResultsSection = ({currentFrameIndex, batchData}) =>{
    const [emotionsData, setEmotionsData] = useState({0: data_init});
    const [valenceArousalData, setValenceArousalData] = useState({0:{"valence": 0.5, "arousal": 0.9}});
    console.log(" batch data",  batchData);
    useEffect(() => {

        for (const frameId in batchData) {
            const frameData = batchData[frameId];
            const emotions = frameData.emotions;

            const formattedEmotions = Object.entries(emotions).map(([emotion, value]) => {
                return [emotion.toUpperCase(), parseFloat(value)];
            });

            formattedEmotions.unshift(["Emociones", "Porcentaje"]);
            setEmotionsData(prevEmotionsData => ({
                ...prevEmotionsData,
                [frameId]: formattedEmotions
            }));

            const valence = frameData.valence;
            const arousal = frameData.arousal;
            setValenceArousalData(prevValenceArousalData => ({
                ...prevValenceArousalData,
                [frameId]: { valence, arousal }
            }));
            }
    }, [batchData])
  
    return (
        <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
            justifyContent="center" 
            spacing={2} 
            alignItems="center"
            direction="rows"
        >
            <Grid item xs={6}>
                <EmotionSection emotionsData={emotionsData[currentFrameIndex]}></EmotionSection>
            </Grid>
            <Grid item xs = {6}>
                <RusselSection valenceArousalData={valenceArousalData[currentFrameIndex]}></RusselSection>
            </Grid>
        </Grid>
    );
}