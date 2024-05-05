import React from 'react'
import Grid from '@mui/material/Grid';
import { VideoUploader } from './VideoUploader';
import {VideoPlayer} from './VideoPlayer';

export const VideoSection = ({setCurrentFrameIndex, setBatchData}) => {
    const [videoFile, setFile] = React.useState(null)
    const [frameRate, setFrameRate] = React.useState(0)
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
                   <VideoUploader   file={videoFile} 
                                    setFile={setFile} 
                                    setFrameRate={setFrameRate}
                                    setBatchData={setBatchData}
                                    />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <div>
                    {videoFile && (
                            <VideoPlayer videoFile={videoFile} setCurrentFrameIndex={setCurrentFrameIndex} 
                                        frameRate={frameRate}
                                        setBatchData={setBatchData} />
                    )}
                </div>
            </Grid>
        </Grid>
    );
}