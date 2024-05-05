import React, { useState, useEffect } from 'react';
import { VideoSection } from '../components/VideoSection';
import { ResultsSection } from '../components/ResultsSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export const Main = (props) => {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

    const createSocket = (endpoint) => {
        const newSocket = new WebSocket(endpoint);

        newSocket.onopen = () => {
          console.log('Conexión establecida con el servidor WebSocket cuyo endpoint es ', endpoint);
        };
    
        newSocket.onerror = (error) => {
          console.error('Error en la conexión WebSocket para el endpoint:', error, endpoint);
        };
    
        newSocket.onclose = () => {
          console.log('Conexión WebSocket cerrada para el endpoint:', endpoint);
        };
    
        return newSocket;
      };

    // Función para crear sockets para los endpoints especificados
    const createSockets = () => {
      const uploaderSocket = createSocket("ws://localhost:8000/video_entire");
      const playerSocket = createSocket("ws://localhost:8000/video_info");
      return { uploaderSocket, playerSocket };
    };
  
    // Llama a la función createSockets para obtener los sockets
    const { uploaderSocket, playerSocket } = createSockets();

    return (
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
                                <VideoSection uploaderSocket={uploaderSocket} playerSocket={playerSocket} setCurrentFrameIndex={setCurrentFrameIndex}/>
                            </Grid>
                            <Grid item justifyContent="center" alignItems="center" xs={8}>             
                                    <ResultsSection socket={uploaderSocket} currentFrameIndex={currentFrameIndex}/>
                            </Grid>
                        </Grid>
                    </Grid>   
                </Grid>
            </Box>
    );
}