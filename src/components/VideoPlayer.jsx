import React, {useState, useEffect, useRef} from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import Notification from './Notifications';

export const VideoPlayer = ({
    videoFile, setCurrentFrameIndex, 
    frameRate, total_batches,
    setBatchData, framesToProcess, 
    framesFetched, setFramesFetched,
    timesToFetch,setTimeToFetch,
    notify, setNotify, 
    isLastBatch, setIsLastBatch}) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [lastCall, setLastCall] =  useState(0);
    const [missingActualFrame, setMissingActualFrame] = useState(-1);
    const [pause, setPause] = useState(false);
    const playerRef = useRef(null);

    const APIURL = "http://localhost:8000";
    const maxAttempts = 10;
    
    const getVideoData = async (currentTime, attempts = 0) => {
        try {
            const user_id = localStorage.getItem('user');
            const url = `${APIURL}/batch_data_time/${user_id}/${currentTime}`;
            const paramsApi = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch(url, paramsApi);
            const jsonResponse = await response.json();
            const isLastBatch = (currentBatch) => {return currentBatch === (total_batches -1)} 
           
            if (jsonResponse && isLastBatch(jsonResponse.batch)) {
                setIsLastBatch(true);
            }
            let batchinfo = JSON.parse(jsonResponse.data);
            if (batchinfo) {
                setFramesFetched(prevFramesFetched => {
                    let updatedData = [...prevFramesFetched, ...Object.keys(batchinfo['batch']).map((value) => { return parseInt(value)})];
                    return updatedData;
                  });
                setBatchData(batchinfo['batch']);
            } else {
                throw new Error('batchinfo es null, todavia no hay data para el tiempo ', currentTime);
            }     
        } catch (error) {
            console.error('Error:', error);
            if (attempts < maxAttempts) {
                setTimeout(() => getVideoData(currentTime, attempts + 1), 3000); // Espera 1 segundo antes de reintentar
            } else {
            }
        }
    }
    
    useEffect(() => {
        if (videoFile) {
            const url = URL.createObjectURL(videoFile);
            setVideoUrl(url);
        }
    }, [videoFile]);

    useEffect(() => {
        if (missingActualFrame != -1 && framesFetched.includes(missingActualFrame)) {
            setPause(false);
            setMissingActualFrame(-1);
            playerRef.current.getInternalPlayer().play();
            setNotify({
                isOpen: true,
                message: 'Ya esta disponible!',
                type: 'success'
            });
        }
    }, [framesFetched])

    const getActualFrame = (currentFrame) => {
        let filteredIndex = framesToProcess.
        map(key => parseInt(key)).
        filter(number => number <= currentFrame).
        reduce((acc, curr) => {
            return curr > acc ? curr : acc;
        }, Number.NEGATIVE_INFINITY);
        return filteredIndex;
    }

    const handlePlay = () => {
        setPause(false)
    }
    const handleProgress = (state) => {
        const currentTime = state.playedSeconds;
        if (!currentTime) return -1
        const currentFrame = Math.floor(currentTime * frameRate);
        let actualFrame = getActualFrame(currentFrame);
        if (framesFetched.includes(actualFrame)){
            setCurrentFrameIndex(actualFrame);
            const floorCurrentTime = Math.floor(currentTime);
            if (floorCurrentTime % 10 === 0 && floorCurrentTime !== lastCall && !isLastBatch) { 
                setTimeout(() => {
                    getVideoData(floorCurrentTime + 10);
                }, 5000);
                setLastCall(floorCurrentTime);
            }
        } else {
            // pausamos 
           
            let timeToFetch = Math.floor(currentTime/10)*10;
            if(timesToFetch.includes(timeToFetch)){
                // lo voy a buscar 
                // sacarlo de la lista 
                timesToFetch = timesToFetch.filter(element => element !== timeToFetch);
                setTimeToFetch(timesToFetch);
                setTimeout(() => {
                    getVideoData(timeToFetch);
                }, 5000);
                setLastCall(timeToFetch);
            }
           
            let notificationMsg = 'Todavia estamos procesando el video'
            if (timesToFetch.length === 0) {
                notificationMsg = 'Por favor, presiona el boton "subir" antes de reproducir el video'
            }
            setNotify({
                isOpen: true,
                message: notificationMsg,
                type: 'error'
            });
            setPause(true);
            setMissingActualFrame(actualFrame);
        }
        // si no lo tengo, me pauso, me "bloqueo botonsito" y verifico xq no lo tengo 
        // lo pedi y todavia no me llego. 
            // espero, cuando me llegua me despauso y me desbloqueo botonsito. 
            // y aviso a usario 
        // no lo pedi (me adelante) 
            // lo pido, espero.
            // pido los anteriores que todavia no pedi 
            // ej: pedi [0,10,20, 30] quiero 60 pido 60 peor tambien pido 40 y 50 

       // cada 10 seg pido el proximo 
        
        return currentFrame;
    }
    
    // lo hacemos porque ANTES procesabamos todos los frames.
    const interval = 1000 /* ms */ / frameRate /* fps */

    useEffect(() => {
        // Pausa o reproduce el video basado en el estado de pausa
        if (playerRef.current) {
          if (pause) {
            playerRef.current.getInternalPlayer().pause();
          }
        }
      }, [pause]);

    return (
        <Box>
        <Card sx={{ maxWidth: "100%"}}>
            <ReactPlayer
        url={videoUrl}
        ref={playerRef}
        controls={true}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        progressInterval={interval}
        onPlay={handlePlay}
      />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Video
                </Typography>
            </CardContent>
        </Card>
            <Notification notify={notify} setNotify={setNotify}/>
        </Box>
    );
};
