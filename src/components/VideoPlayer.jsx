import React, {useState, useEffect} from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player';

export const VideoPlayer = ({ videoFile, setCurrentFrameIndex, frameRate, total_batches, setBatchData,  framesToProcess}) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLastBatch, setIsLastBatch] = useState(false);
    const [lastCall, setLastCall] =  useState(0);
    const APIURL = "http://localhost:8000";
    
    const getVideoData = async (currentTime) => {
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
            setBatchData(batchinfo['batch']);     
        } catch (error) {
            console.error('Error:', error);
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
        setCurrentFrameIndex(actualFrame);
        console.log("time actual ", currentTime);
        const floorCurrentTime = Math.floor(currentTime)
       
        if (floorCurrentTime % 10 === 0 && floorCurrentTime !== lastCall && !isLastBatch) { 
            setTimeout(() => {
                getVideoData(floorCurrentTime + 10);
            }, 5000);
            setLastCall(floorCurrentTime)
        }
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
