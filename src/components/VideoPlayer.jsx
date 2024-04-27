import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { useCustomWebSocket } from './CustomWebSocketProvider'; 



export const VideoPlayer = ({ videoFile, socket }) => {
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const [frameRates, setFramesRate] = useState(0);
    const [totalFrames, setTotalFrames] = useState(0);
    useEffect(() => {
        if (socket) {
            if (socket.readyState === WebSocket.OPEN) {
                if (videoFile) {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const videoData = event.target.result;
                        socket.send(videoData);
                    };
                    reader.readAsArrayBuffer(videoFile);
                    console.log('Archivo cargado:', videoFile);
                }
            } else {
                socket.onopen = () => {
                    console.log('Conexión WebSocket establecida, enviando datos...');
                    if (videoFile) {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            const videoData = event.target.result;
                            socket.send(videoData); 
                        };
                        reader.readAsArrayBuffer(videoFile);
                        console.log('Archivo cargado:', videoFile);
                    }
                };
            }

            socket.onmessage = (event) => {
                
                console.log('Respuesta recibida de info del video:', event.data);
                const messageData = JSON.parse(event.data);
                setFramesRate(messageData.fps);
                setTotalFrames(messageData.frame_count);

            };
        }
    }, [socket]);

    useEffect(() => {
        if (videoFile) {
            const url = URL.createObjectURL(videoFile);
            setCurrentVideoUrl(url);
        }
    }, [videoFile]);

    const url = URL.createObjectURL(videoFile);
    const handleProgress = (state) => {
        const currentTime = state.playedSeconds;
        if (!currentTime) return -1
        console.log("current time", currentTime);
        console.log("frame rate", frameRates);
        const currentFrame = Math.floor(currentTime * frameRates);
        console.log("current FRAME: ", currentFrame);
        return currentFrame;
    }
    const interval = 1000 /* ms */ / frameRates /* fps */
    return (
        <Card sx={{ maxWidth: "100%"}}>
            <ReactPlayer
        url={url}
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
