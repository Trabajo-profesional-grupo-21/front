import React, { useEffect, useState }  from 'react'
import Grid from '@mui/material/Grid';
import { EmotionSection } from './EmotionSection';
import { RusselSection } from './RusselSection';
import {TableComponent} from './TableComponent';
import SimpleAccordion from './AccordionComponent';

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

const actionUnits = [
    { actionUnit: 'A1', actionUnitValue: 0.0 },
    { actionUnit: 'A2', actionUnitValue: 0.0 },
    { actionUnit: 'A3', actionUnitValue: 0.0 },
    { actionUnit: 'A4', actionUnitValue: 0.0 },
    { actionUnit: 'A5', actionUnitValue: 0.0 },
    { actionUnit: 'A6', actionUnitValue: 0.0 },
    { actionUnit: 'A7', actionUnitValue: 0.0 },
    { actionUnit: 'A8', actionUnitValue: 0.0 },
    { actionUnit: 'A9', actionUnitValue: 0.0 },
    { actionUnit: 'A10', actionUnitValue: 0.0 },
    { actionUnit: 'A11', actionUnitValue: 0.0 },
    { actionUnit: 'A12', actionUnitValue: 0.0 },
    { actionUnit: 'A13', actionUnitValue: 0.0 },
    { actionUnit: 'A14', actionUnitValue: 0.0 },
    { actionUnit: 'A15', actionUnitValue: 0.0 },
    { actionUnit: 'A16', actionUnitValue: 0.0 },
    { actionUnit: 'A17', actionUnitValue: 0.0 },
    { actionUnit: 'A18', actionUnitValue: 0.0 },
    { actionUnit: 'A19', actionUnitValue: 0.0 },
    { actionUnit: 'A20', actionUnitValue: 0.0 },
    { actionUnit: 'A21', actionUnitValue: 0.0 },
    { actionUnit: 'A22', actionUnitValue: 0.0 },
    { actionUnit: 'A23', actionUnitValue: 0.0 },
    { actionUnit: 'A24', actionUnitValue: 0.0 },
]

export const ResultsSection = ({socket, currentFrameIndex}) =>{
    const [emotionsData, setEmotionsData] = useState({0: data_init});
    const [valenceArousalData, setValenceArousalData] = useState({0:{"valence": 0.5, "arousal": 0.9}});
    const [data, setData] = useState(actionUnits);
   
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
        };
        }
    }, [socket, setEmotionsData, setValenceArousalData]);
    return (
        <Grid container direction="column">
            <Grid item xs={6}>
                <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
                    justifyContent="center" 
                    spacing={2} 
                    alignItems="center"
                    direction="rows">
                    <Grid item xs={6}>
                        <EmotionSection emotionsData={emotionsData[currentFrameIndex]}></EmotionSection>
                    </Grid>
                    <Grid item xs = {6}>
                        <RusselSection valenceArousalData={valenceArousalData[currentFrameIndex]}></RusselSection>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <SimpleAccordion component={<TableComponent data={data}/>}>
                   
                </SimpleAccordion>
            </Grid>
        </Grid>
    );
}