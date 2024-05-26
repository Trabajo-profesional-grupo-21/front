import {useEffect, useState, useRef} from 'react'
import {Grid, CircularProgress, Button} from '@mui/material';
import { VideoUploader } from './VideoUploader';
import {VideoPlayer} from './VideoPlayer';
import { Stimulus } from './Stimulus';

const progressColor = 'rgba(0, 0, 0, 0.7)'


export const VideoSection = ({setCurrentFrameIndex, setBatchData, height, frameRate, setFrameRate, videoFile, setFile}) => {
    const [loading, setLoading] = useState(false);
    const [isLastBatch, setIsLastBatch] = useState(false);
    const [total_batches, setTotalBatches] = useState(0);
    const [framesToProcess, setFramesToProcess] = useState([]);
    const [framesFetched, setFramesFetched] =  useState([]);
    const [timesToFetch, setTimeToFetch] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [stimulusFile, setStimulusFile] = useState();
    const [processedVideo, setProcessedVideo] = useState(false);
    const stimulusPlayer = useRef(null);


    useEffect(() => {
        console.log("====LIMPIANDO LA DATA=====")
        setCurrentFrameIndex(0);
        setBatchData({});
        setFramesFetched([]);
        setIsLastBatch(false);
        setProcessedVideo(false);
    }, [videoFile]);


    return (
        <Grid container style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 10, height: height  }} 
        justifyContent="center" 
        spacing={3} 
        alignItems="center"
        >
            <Grid item xs={12} sx={{
                    backgroundColor: 'rgba(170,126,169, 0.3)',
                    color: 'white',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 2
            }}>
                   <VideoUploader   videoFile={videoFile} 
                                    setVideoFile={setFile} 
                                    setFrameRate={setFrameRate}
                                    setBatchData={setBatchData}
                                    setLoading={setLoading}
                                    setFramesToProcess={setFramesToProcess}
                                    setFramesFetched={setFramesFetched}
                                    setTimeToFetch={setTimeToFetch}
                                    notify={notify}
                                    setNotify={setNotify}
                                    isLastBatch={isLastBatch}
                                    setIsLastBatch={setIsLastBatch}
                                    setTotalBatches={setTotalBatches}
                                    stimulusFile={stimulusFile}
                                    setStimulusFile={setStimulusFile}
                                    setProcessedVideo={setProcessedVideo}
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
                            <VideoPlayer
                                videoFile={videoFile}
                                setCurrentFrameIndex={setCurrentFrameIndex}
                                frameRate={frameRate}
                                total_batches={total_batches}
                                setBatchData={setBatchData}
                                setFramesToProcess={setFramesToProcess}
                                framesToProcess={framesToProcess}
                                setFramesFetched={setFramesFetched}
                                framesFetched={framesFetched}
                                timesToFetch={timesToFetch}
                                setTimeToFetch={setTimeToFetch}
                                notify={notify}
                                setNotify={setNotify}
                                isLastBatch={isLastBatch}
                                setIsLastBatch={setIsLastBatch}
                                processedVideo={processedVideo}
                                setProcessedVideo={setProcessedVideo}
                                stimulusPlayer={stimulusPlayer}
                            />
                        )}
                    </div>
                </Grid>
            )}

         { stimulusFile && (
            <Grid item xs = {12} >
                <Stimulus
                    stimulusFile={stimulusFile}
                    stimulusPlayer={stimulusPlayer}>
                </Stimulus>
            </Grid>     
        )}
            
        </Grid>
    );
}