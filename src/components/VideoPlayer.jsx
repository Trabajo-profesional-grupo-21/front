import React, {useState} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import ReactPlayer from 'react-player';


/* 

const videoRef = useRef(null);
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
    const [videoDuration, setVideoDuration] = useState(null);
    const [frameRates, setFramesRate] = useState(0);
    const [totalFrames, setTotalFrames] = useState(0);
    const socket = useCustomWebSocket();

    const getCurrentIndex = () => {
        if (!videoRef.current) return -1;
        const currentTime = videoRef.current.currentTime;
        console.log("frame rate", frameRates);
        const currentFrame = Math.floor(currentTime * frameRates);
        return currentFrame;
    };


    const handleTimeUpdate = () => {
        const currentFrame = getCurrentIndex();
        console.log("Frame actual: ", currentFrame);
    };

    const handleMetadataLoaded = () => {
        console.log("Metadatos del video cargados");
        if (videoRef.current) {
            const duration = videoRef.current.duration;
            console.log("Duración del video:", duration);
            setVideoDuration(duration);
        }
    };

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

    useEffect(() => {
        if (currentVideoUrl) {
            if (videoRef.current) {
                videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
            }
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
            }
        };
    }, [currentVideoUrl]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [currentVideoUrl]);*/

export const VideoPlayer = ({ videoUrl }) => {
    const socket = useCustomWebSocket();
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

    const url = URL.createObjectURL(videoUrl);
    const handleProgress = (state) => {
        currentFrame = currentFrame + 1
        console.log(state)
        console.log('current frame: ', currentFrame)
    }
    var currentFrame = 0;
    const interval = 1000 /* ms */ / 25 /* fps */
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
