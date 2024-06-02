import React, { useEffect, useState } from 'react';
import { ResultsSection } from '../components/ResultsSection';
import { ImageSection } from '../components/ImageSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Navbar from '../components/NavBar';
import { useLocation } from 'react-router-dom';

export const NewImage = () => {    
    const [imageFile, setImageFile] = useState(null);
    const [stimulusFile, setStimulusFile] = useState(null);
    const [batchData, setBatchData] = useState({});
    const [preLoadedData, setPreLoadedData] = useState(null);
    const currentFrameIndex = 0;

    // Se llama a la pagina con un estado desde `Mis Imagenes`
    const location = useLocation();
    const imgInfo = location.state?.imgInfo;

    useEffect(() => {
        if (imgInfo) {
            setBatchData(imgInfo.data);
            setPreLoadedData(imgInfo);
        } else {
            setBatchData(null);
            setPreLoadedData(null);
        }
    }, [imgInfo]);
    return (
        <>
            <Navbar />
            <Box style={{ background: "rgba(248, 244, 244)", minHeight: "100vh" }} p={2} sx={{ paddingTop: '64px' }}>
                <Box p={2}>
                    <Grid container style={{ background: "rgba(248, 244, 244)" }} spacing={1} alignItems="flex-start" justifyContent="flex-end">
                        <Grid item xs={12}>
                            <Typography style={{ color: "rgba(0, 0, 0, 0.59)" }} variant="h4" align="center" fontWeight='bold'>
                                Detección de emociones
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 15, height: '100%' }} justifyContent="space-around" spacing={2} alignItems="stretch">
                                <Grid item xs={3} justifyContent="flex-end">
                                    <ImageSection 
                                        preLoadedData={preLoadedData}
                                        setFile={setImageFile}
                                        imageFile={imageFile}
                                        setStimulusFile={setStimulusFile}
                                        stimulusFile={stimulusFile}
                                        setBatchData={setBatchData}
                                    />
                                </Grid>
                                <Grid item justifyContent="center" alignItems="center" xs={9}>
                                    <ResultsSection currentFrameIndex={currentFrameIndex}
                                        batchData={batchData}
                                        imageFile={imageFile}
                                        showTimeline={false}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
