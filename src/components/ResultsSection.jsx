import React, { useEffect, useState, forwardRef  }  from 'react'
import Grid from '@mui/material/Grid';
import { EmotionSection } from './EmotionSection';
import { RusselSection } from './RusselSection';
import {TableComponent} from './TableComponent';
import { TimeLineInfo } from './TimeLineInfo';
import SimpleAccordion from './AccordionComponent';
import { Box } from '@material-ui/core';
    //"rgb(170,126,169)" violeta lindo

const backgroundForResults = 'rgb(170,126,169)'
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
    { AUName: 'AU1', Intensity: 0.0 },
    { AUName: 'AU2', Intensity: 0.0 },
    { AUName: 'AU4', Intensity: 0.0 },
    { AUName: 'AU5', Intensity: 0.0 },
    { AUName: 'AU6', Intensity: 0.0 },
    { AUName: 'AU7', Intensity: 0.0 },
    { AUName: 'AU9', Intensity: 0.0 },
    { AUName: 'AU10', Intensity: 0.0 },
    { AUName: 'AU12', Intensity: 0.0 },
    { AUName: 'AU14', Intensity: 0.0 },
    { AUName: 'AU15', Intensity: 0.0 },
    { AUName: 'AU17', Intensity: 0.0 },
    { AUName: 'AU20', Intensity: 0.0 },
    { AUName: 'AU23', Intensity: 0.0 },
    { AUName: 'AU25', Intensity: 0.0 },
    { AUName: 'AU26', Intensity: 0.0 },
    { AUName: 'AU45', Intensity: 0.0 }
]
const timeLineVA = [
    ["Tiempo", "arousal", "valence"],
    ["0.5", 1000, 400],
    ["1.4", 1170, 460],
    ["5.4", 660, 1120],
    ["7.8", 1030, 540],
  ];

export const ResultsSection = ({batchData, currentFrameIndex }) =>{
    const [emotionsData, setEmotionsData] = useState({0: data_init});
    const [valenceArousalData, setValenceArousalData] = useState({0:{"valence": 0.5, "arousal": 0.9}});
    const [unitAcctionsData, setUnitActions] = useState({0:actionUnits});
    const [timeLineVAData, setTimeLineVAData] = useState({0:timeLineVA});
    useEffect(() => {
        console.log(batchData);
        for (const frameId in batchData) {
            const frameData = batchData[frameId];
            const emotions = frameData.emotions;
            const unitActionsInfo = frameData.ActionUnit;

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

            unitActionsInfo.sort((a, b) => b.Intensity - a.Intensity);
            unitActionsInfo.forEach(unit => {
                unit.Intensity = unit.Intensity.toFixed(2);
            });
            setUnitActions(prevUnitActions => ({
                ...prevUnitActions, 
                [parseInt(frameId)]: unitActionsInfo
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
    console.log("Emociones", emotionsData);
    console.log("babababa", timeLineVAData[actualFrame]);
    return (
        <Grid container direction="column">
            <Grid item xs={6}>
                <Grid container style={{ background: backgroundForResults, borderRadius: 15, padding: 10 }} 
                    justifyContent="center" 
                    alignItems="stretch"
                    direction="rows">
                        <Grid item xs={12} sm={6}>
                            <EmotionSection emotionsData={emotionsData[actualFrame]}></EmotionSection>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Box alignItems="center">
                           <RusselSection valenceArousalData={valenceArousalData[actualFrame]}></RusselSection>
                           </Box>
                        </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <SimpleAccordion 
                    component={<TableComponent data={unitAcctionsData[actualFrame]}/>} 
                    name="Action Units"/>
            </Grid>
            <Grid item xs={6}>
                <SimpleAccordion 
                    component={<TimeLineInfo timeLineData={timeLineVAData[actualFrame]}/>} 
                    name="Time Line Modelo Russell"/>
            </Grid>
        </Grid>
    );
}
