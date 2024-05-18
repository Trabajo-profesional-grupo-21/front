import React, {useState, useEffect} from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player';

export const VideoPlayer = ({ videoFile, setCurrentFrameIndex, frameRate, total_batches, setBatchData,  framesToProcess, framesFetched, setFramesFetched}) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLastBatch, setIsLastBatch] = useState(false);
    const [lastCall, setLastCall] =  useState(0);
    const APIURL = "http://localhost:8000";
    const maxAttempts = 10;
    
    const getVideoData = async (currentTime, attempts = 0) => {
        console.log("BUSCO INFO DEL VIDEO AL BACK");
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
            console.log(jsonResponse);
            const isLastBatch = (currentBatch) => {return currentBatch === total_batches -1} 
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
                throw new Error('batchinfo es null, todavia no hay data');
            }     
        } catch (error) {
            console.error('Error:', error);
            if (attempts < maxAttempts) {
                setTimeout(() => getVideoData(currentTime, attempts + 1), 1000); // Espera 1 segundo antes de reintentar
            }
        }
    }
    
    useEffect(() => {
        if (videoFile) {
            const url = URL.createObjectURL(videoFile);
            setVideoUrl(url);
        }
    }, [videoFile]);

    const getActualFrame = (currentFrame) => {
        let filteredIndex = framesToProcess.
        map(key => parseInt(key)).
        filter(number => number <= currentFrame).
        reduce((acc, curr) => {
            return curr > acc ? curr : acc;
        }, Number.NEGATIVE_INFINITY);
        return filteredIndex;
    }

    const handleProgress = (state) => {
        const currentTime = state.playedSeconds;
        if (!currentTime) return -1
        const currentFrame = Math.floor(currentTime * frameRate);
        console.log("current FRAME: ", currentFrame);
        let actualFrame = getActualFrame(currentFrame);
        console.log("actual frame", actualFrame);
        // lo que tengo que mostra, lo tengo.
        // si lo tengo joya, la logica sigue como esta 
        if (framesFetched.includes(actualFrame)){
            setCurrentFrameIndex(actualFrame);
            console.log("time actual ", currentTime);
            const floorCurrentTime = Math.floor(currentTime);
            if (floorCurrentTime % 10 === 0 && floorCurrentTime !== lastCall && !isLastBatch) { 
                setTimeout(() => {
                    getVideoData(floorCurrentTime + 10);
                }, 5000);
                setLastCall(floorCurrentTime)
            }
        } else {
            
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
    return (
        <Card sx={{ maxWidth: "100%"}}>
            <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        progressInterval={interval}
      />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Video
                </Typography>
            </CardContent>
        </Card>
    );
};
