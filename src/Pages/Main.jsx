import React, { useState, useEffect, useRef  } from 'react';
import { VideoSection } from '../components/VideoSection';
import {ResultsSection} from '../components/ResultsSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export const Main = (props) => {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [batchData, setBatchData] = useState({});
    let resultsSectionHeight = 0;

    return (
            <Box style={{ background: "rgba(248, 244, 244)"}} minHeight="100vh" p={2}>
                <Grid container
                style={{ background: "rgba(248, 244, 244)"}}
                spacing={1}
                alignItems="flex-start"
                justifyContent="flex-end">
                    <Grid item xs = {12}>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.59)" }} variant="h4" align="center" fontWeight='bold'>
                            Detección de emociones
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        <Grid container direction="row"
                            style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 15, height: '100%' }}
                            justifyContent="space-around"
                            spacing={2}
                            alignItems="stretch" 
                            >
                            <Grid item xs={3} justifyContent="flex-end" >
                                <VideoSection  setCurrentFrameIndex={setCurrentFrameIndex}
                                                setBatchData={setBatchData}
                                                height={resultsSectionHeight}
                                />
                            </Grid>
                            <Grid item justifyContent="center" alignItems="center" xs={9}>             
                                    <ResultsSection currentFrameIndex={currentFrameIndex}
                                                    batchData={batchData}
                                    />
                            </Grid>
                            
                        </Grid>
                    </Grid>   
                </Grid>
            </Box>
    );
}