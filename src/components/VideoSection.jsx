import React from 'react'
import Grid from '@mui/material/Grid';
import { VideoUploader } from './VideoUploader';
import {VideoPlayer} from './VideoPlayer';
import { CustomWebSocketProvider } from '../components/CustomWebSocketProvider';

export const VideoSection = () => {
    const [videoFile, setFile] = React.useState(null)
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
                <CustomWebSocketProvider endpoint="ws://localhost:8000/video_entire">
                   <VideoUploader file={videoFile} setFile={setFile} />
                </CustomWebSocketProvider>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <div>
                    {videoFile && (
                         <CustomWebSocketProvider endpoint="ws://localhost:8000/video_info">
                            <VideoPlayer videoFile={videoFile} />
                         </CustomWebSocketProvider>   
                    )}
                </div>
            </Grid>
        </Grid>
    );
}