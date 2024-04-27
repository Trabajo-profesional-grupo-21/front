import React, { useState, useEffect } from 'react';
import { VideoSection } from '../components/VideoSection';
import { CustomWebSocketProvider } from '../components/CustomWebSocketProvider';
import { ResultsSection } from '../components/ResultsSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useCustomWebSocket } from '../components/CustomWebSocketProvider';


export const Main = (props) => {
    const getSocket = useCustomWebSocket();
    const uploaderSocket = getSocket("ws://localhost:8000/video_entire");
    const playerSocket = getSocket("ws://localhost:8000/video_info");

    return (
        <CustomWebSocketProvider>
            <Box style={{ background: "rgb(170,126,169)"}} minHeight="100vh" p={2}>
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
                                <VideoSection uploaderSocket={uploaderSocket} playerSocket={playerSocket}/>
                            </Grid>
                            <Grid item justifyContent="center" alignItems="center" xs={8}>             
                                <CustomWebSocketProvider endpoint="ws://localhost:8000/video_entire">
                                    <ResultsSection socket={uploaderSocket}/>
                                </CustomWebSocketProvider>
                            </Grid>
                        </Grid>
                    </Grid>   
                </Grid>
            </Box>
        </CustomWebSocketProvider>
    );
}