import React, { useEffect, useState }  from 'react'
import Grid from '@mui/material/Grid';
import { EmotionSection } from './EmotionSection';
import { RusselSection } from './RusselSection';
import { useCustomWebSocket } from './CustomWebSocketProvider'; 


export const ResultsSection = ({socket, currentFrameIndex}) =>{
    const [emotionsData, setEmotionsData] = useState([]);
    const [valenceArousalData, setValenceArousalData] = useState([]);
   
    useEffect(() => {
        if (socket) {
        socket.onmessage = (event) => {
            console.log('Mensaje EN RESULT SECCTION:', event.data);
            const messageData = JSON.parse(event.data);
            const batchData = messageData.batch;

            // Procesar emociones y valencia/arousal
            for (const frameId in batchData) {
            const frameData = batchData[frameId];
            const emotions = frameData.emotions;
            setEmotionsData(prevEmotionsData => ({
                ...prevEmotionsData,
                [frameId]: emotions
            }));

            const valence = frameData.valence;
            const arousal = frameData.arousal;
            setValenceArousalData(prevValenceArousalData => ({
                ...prevValenceArousalData,
                [frameId]: { valence, arousal }
            }));
            }
        };
        }
    }, [socket, setEmotionsData, setValenceArousalData]);

    return (
        <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
            justifyContent="center" 
            spacing={2} 
            alignItems="center"
            direction="rows"
        >
            <Grid item xs={6}>
                <EmotionSection emotionsData={emotionsData}></EmotionSection>
            </Grid>
            <Grid item xs = {6}>
                <RusselSection valenceArousalData={valenceArousalData}></RusselSection>
            </Grid>
        </Grid>
    );
}