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

export const ResultsSection = ({batchData, currentFrameIndex}) =>{
    const [emotionsData, setEmotionsData] = useState({0: data_init});
    const [valenceArousalData, setValenceArousalData] = useState({0:{"valence": 0.5, "arousal": 0.9}});
    const [data, setData] = useState(actionUnits);
   
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
                [parseInt(frameId)]: formattedEmotions
            }));

            const valence = frameData.valence;
            const arousal = frameData.arousal;
            setValenceArousalData(prevValenceArousalData => ({
                ...prevValenceArousalData,
                [parseInt(frameId)]: { valence, arousal }
            }));
            }
    }, [batchData])
    
    const getActualFrame = () => {
        const filteredIndex = Object.keys(valenceArousalData).
        map(key => parseInt(key)).
        filter(number => number <= currentFrameIndex).
        reduce((acc, curr) => {
            return curr > acc ? curr : acc;
        }, Number.NEGATIVE_INFINITY);
        return filteredIndex;
    }
    let actualFrame = getActualFrame();
    console.log("frames que tenemos en el dict ", Object.keys(valenceArousalData).map(key => parseInt(key)));
    console.log("CURRENT FRAME INDEX IS ", currentFrameIndex);
    console.log("NOW ACTUAL FRAME IS ", actualFrame);
    
    return (
        <Grid container direction="column">
            <Grid item xs={6}>
                <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
                    justifyContent="center" 
                    alignItems="stretch"
                    direction="rows">
                        <Grid item xs={12} sm={6}>
                            <EmotionSection emotionsData={emotionsData[currentFrameIndex]}></EmotionSection>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <RusselSection valenceArousalData={valenceArousalData[currentFrameIndex]}></RusselSection>
                        </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <SimpleAccordion component={<TableComponent data={data}/>}/>
            </Grid>
        </Grid>
    );
}