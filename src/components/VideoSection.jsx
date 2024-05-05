import React from 'react'
import Grid from '@mui/material/Grid';
import { useCustomWebSocket } from './CustomWebSocketProvider'; 
import { VideoUploader } from './VideoUploader';
import {VideoPlayer} from './VideoPlayer';

export const VideoSection = ({uploaderSocket, playerSocket, setCurrentFrameIndex}) => {
    const [videoFile, setFile] = React.useState(null)
    const { getSocket } = useCustomWebSocket();
    return (
        <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 10 }} 
        justifyContent="center" 
        spacing={2} 
        alignItems="center"
        >
            <Grid item xs={12} sx={{
                    backgroundColor: 'rgb(251, 214, 164)',
                    color: 'white',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 2
            }}>
                   <VideoUploader file={videoFile} setFile={setFile} socket={uploaderSocket} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <div>
                    {videoFile && (
                            <VideoPlayer videoFile={videoFile} socket={playerSocket} setCurrentFrameIndex={setCurrentFrameIndex} />
                    )}
                </div>
            </Grid>
        </Grid>
    );
}