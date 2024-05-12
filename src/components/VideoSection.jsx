import React from 'react'
import {Grid, CircularProgress} from '@mui/material';
import { VideoUploader } from './VideoUploader';
import {VideoPlayer} from './VideoPlayer';

const progressColor = 'rgba(0, 0, 0, 0.7)'

export const VideoSection = ({setCurrentFrameIndex, setBatchData, height }) => {
    const [videoFile, setFile] = React.useState(null);
    const [frameRate, setFrameRate] = React.useState(0);
    const [loading, setLoading] = React.useState(false)
    console.log("altura ", height);
    return (
        <Grid container style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 10, height: height  }} 
        justifyContent="center" 
        spacing={1} 
        alignItems="center"
        >
            <Grid item xs={12} sx={{
                    backgroundColor: 'rgba(170,126,169, 0.3)',
                    color: 'white',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 2
            }}>
                   <VideoUploader   file={videoFile} 
                                    setFile={setFile} 
                                    setFrameRate={setFrameRate}
                                    setBatchData={setBatchData}
                                    setLoading={setLoading}
                                    />
            </Grid>
            {loading ? (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <CircularProgress
                        style={{
                            display: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                            color: progressColor,
                            padding: 100,
                        }}
                        size={100}
                    />
                </Grid>
            ) : (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <div>
                        {videoFile && (
                            <VideoPlayer videoFile={videoFile} setCurrentFrameIndex={setCurrentFrameIndex}
                                frameRate={frameRate}
                                setBatchData={setBatchData} />
                        )}
                    </div>
                </Grid>
            )}

        </Grid>
    );
}