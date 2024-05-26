import React, { useEffect, useState }  from 'react'
import Grid from '@mui/material/Grid';
import { EmotionSection } from '../charts/EmotionSection';
import { RusselSection } from './RusselSection';
import {TableComponent} from './TableComponent';
import { TimeLineInfo } from '../charts/TimeLineInfo';
import SimpleAccordion from './AccordionComponent';
import { Box } from '@material-ui/core';
//"rgb(170,126,169)" violeta lindo

const backgroundForResults = 'rgb(170,126,169)'

const emotionsDictionary = {
    'HAPPY': 'FELIZ',
    'HAPPINESS': 'FELIZ',
    'SAD': 'TRISTEZA',
    'SADNESS': 'TRISTEZA',
    'FEAR': 'MIEDO',
    'ANGRY': 'ENOJADO',
    'DISGUST': 'ASCO',
    'SURPRISE': 'SORPRESA',
    'NEUTRAL': 'NEUTRAL'
};

const unitActionDictionary = {
    'AU1': 'Levantamiento de cejas interno',
    'AU2': 'Elevador de cejas exterior',
    'AU4': 'Bajar la ceja',
    'AU5': 'Elevador de parpado superior',
    'AU6': 'Levantador de mejillas',
    'AU7': 'Tensor de la tapa',
    'AU9': 'Arrugador de nariz',
    'AU10': 'Levantamiento del labio superior',
    'AU12': 'Tirador de la esquina del labio',
    'AU14': 'Dimplificador',
    'AU15': 'Depresor del rincón del labio',
    'AU17': 'Elevador de la barbilla',
    'AU20': 'Estirador de labios',
    'AU23': 'Tensores de labios',
    'AU25': 'Parte de los labios',
    'AU26': 'La caída de la mandíbula',
    'AU28': 'Los labios chupan',
    'AU45': 'Parpadeo'
}

const data_init = [
    ["Emociones", "Emociones"],
    ["FELIZ", 0.03],
    ["TRISTEZA", 0.23],
    ["MIEDO", 0.4],
    ["ENOJADO", 0.6],
    ["ASCO", 0.03],
    ["SOPRESA", 0.3],
    ["NEUTRAL", 0.1],
  ];

const actionUnits = [
    { AUName: 'Levantamiento de cejas interno \n (AU1)', Intensity: 0.0 },
    { AUName: 'Elevador de cejas exterior (AU2)', Intensity: 0.0 },
    { AUName: 'Bajar la ceja (AU4)', Intensity: 0.0 },
    { AUName: 'Elevador de parpado superior (AU5)', Intensity: 0.0 },
    { AUName: 'Levantador de mejillas (AU6)', Intensity: 0.0 },
    { AUName: 'Tensor de la tapa (AU7)', Intensity: 0.0 },
    { AUName: 'Arrugador de nariz (AU9)', Intensity: 0.0 },
    { AUName: 'Levantamiento del labio superior (AU10)', Intensity: 0.0 },
    { AUName: 'Tirador de la esquina del labio (AU12)', Intensity: 0.0 },
    { AUName: 'Dimplificador (AU14)', Intensity: 0.0 },
    { AUName: 'Depresor del rincón del labio (AU15)', Intensity: 0.0 },
    { AUName: 'Elevador de la barbilla (AU17)', Intensity: 0.0 },
    { AUName: 'Estirador de labios (AU20)', Intensity: 0.0 },
    { AUName: 'Tensores de labios (AU23)', Intensity: 0.0 },
    { AUName: 'Parte de los labios (AU25)', Intensity: 0.0 },
    { AUName: 'La caída de la mandíbula (AU26)', Intensity: 0.0 },
    { AUName: 'Parpadeo (AU45)', Intensity: 0.0 }
]
const timeLineVA = [
    [{ type: 'number', label: 'Tiempo' }, { type: 'number', label: 'Excitación' }, { type: 'number', label: 'Valencia' }],
];

export const ResultsSection = ({batchData, currentFrameIndex, frameRate, videoFile}) =>{
    const [emotionsData, setEmotionsData] = useState({0: data_init});
    const [valenceArousalData, setValenceArousalData] = useState({0:{"valence": 0.5, "arousal": 0.9}});
    const [unitAcctionsData, setUnitActions] = useState({0:actionUnits});
    const [timeLineVAData, setTimeLineVAData] = useState(timeLineVA);

    useEffect(() => {
        console.log("clearing data!!")
        setEmotionsData({0: data_init});
        setValenceArousalData({0:{"valence": 0.5, "arousal": 0.9}});
        setUnitActions({0:actionUnits});
        setTimeLineVAData(timeLineVA);
        console.log("CurrentFrameIndex ", currentFrameIndex);
    }, [videoFile])
    
    useEffect(() => {
        for (const frameId in batchData) {
            const frameData = batchData[frameId];
            const emotions = frameData.emotions;
            const unitActionsInfo = frameData.ActionUnit;

            const formattedEmotions = Object.entries(emotions).map(([emotion, value]) => {
                
                const translatedEmotion = emotionsDictionary[emotion];
                const emotionName = translatedEmotion ? translatedEmotion : emotion.toUpperCase();
                return [emotionName, parseFloat(value)];
            });

            formattedEmotions.unshift(["Emociones", "Porcentaje"]);
            setEmotionsData(prevEmotionsData => ({
                ...prevEmotionsData,
                [parseInt(frameId)]: formattedEmotions
            }));

            const valence = parseFloat(frameData.valence).toFixed(3);
            const arousal = parseFloat(frameData.arousal).toFixed(3);
            setValenceArousalData(prevValenceArousalData => ({
                ...prevValenceArousalData,
                [parseInt(frameId)]: { valence, arousal }
            }));

            unitActionsInfo.sort((a, b) => b.Intensity - a.Intensity);
            unitActionsInfo.forEach(unit => {
                unit.AUName = unitActionDictionary[unit.AUName] + "\n" + "(" + unit.AUName + ")"
                unit.Intensity = unit.Intensity.toFixed(2);
            });
            setUnitActions(prevUnitActions => ({
                ...prevUnitActions, 
                [parseInt(frameId)]: unitActionsInfo
            }));
            let currentTime = 1/frameRate * frameId
            setTimeLineVAData(prevValenceArousalTimeData => {
                let updatedData = [...prevValenceArousalTimeData];
                updatedData.push([currentTime, arousal, valence]);
                return updatedData;
            });

            }
    }, [batchData])

    let currentTime = (1/frameRate) * currentFrameIndex

    const timeLineData = () => {
        return timeLineVAData.filter((element, index) => {
            return index === 0 || element[0] <= currentTime
        })
    }
    console.log(" Current frame index ", currentFrameIndex);
    console.log("valen and arousal", valenceArousalData);
    return (
        <Grid container direction="column">
            <Grid item xs={6}>
                <Grid container style={{ background: backgroundForResults, borderRadius: 15, padding: 10 }} 
                    justifyContent="center" 
                    alignItems="stretch"
                    direction="rows">
                        <Grid item xs={12} sm={6}>
                            <EmotionSection emotionsData={emotionsData[currentFrameIndex || 0]}></EmotionSection>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Box alignItems="center">
                           <RusselSection valenceArousalData={valenceArousalData[currentFrameIndex || 0]}></RusselSection>
                           </Box>
                        </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <SimpleAccordion 
                    component={<TableComponent data={unitAcctionsData[currentFrameIndex || 0]}/>} 
                    name="Unidades de acción"/>
            </Grid>
            <Grid item xs={6}>
                <SimpleAccordion 
                    component={<TimeLineInfo timeLineData={timeLineData()}/>} 
                    name="Exitación y valencia en el tiempo (modelo Russell)"/>
            </Grid>
        </Grid>
    );
}
