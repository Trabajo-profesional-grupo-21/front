import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { useCustomWebSocket } from './CustomWebSocketProvider'; 

export const VideoPlayer = ({ videoFile, setCurrentFrameIndex, frameRate, total_batches, setBatchData }) => {
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
            const isLastBatch = (currentBatch) => {return currentBatch == total_batches -1} 
            if (jsonResponse && isLastBatch(jsonResponse.batch)) {
                setIsLastBatch(true);
            }
            setBatchData(jsonResponse.batch)    
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

    const handleProgress = (state) => {
        const currentTime = state.playedSeconds;
        if (!currentTime) return -1
        const currentFrame = Math.floor(currentTime * frameRate);
        console.log("current FRAME: ", currentFrame);
        setCurrentFrameIndex(currentFrame);
        console.log("time actual ", currentTime);
        const floorCurrentTime = Math.floor(currentTime)
        if (floorCurrentTime > lastCall && floorCurrentTime % 5 === 0 && !isLastBatch) { 
            setTimeout(() => {
                getVideoData(floorCurrentTime);
            }, 5000);
            setLastCall(floorCurrentTime)
        }
        return currentFrame;
    }
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
