import {useState} from 'react'
import {Grid, CircularProgress} from '@mui/material';
import { VideoUploader } from './VideoUploader';
import {VideoPlayer} from './VideoPlayer';

const progressColor = 'rgba(0, 0, 0, 0.7)'

export const VideoSection = ({setCurrentFrameIndex, setBatchData, height, frameRate, setFrameRate}) => {
    const [videoFile, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLastBatch, setIsLastBatch] = useState(false);
    const [total_batches, setTotalBatches] = useState(0);
    const [framesToProcess, setFramesToProcess] = useState([]);
    const [framesFetched, setFramesFetched] =  useState([]);
    const [timesToFetch, setTimeToFetch] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

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
                                    setFramesToProcess={setFramesToProcess}
                                    setFramesFetched={setFramesFetched}
                                    setTimeToFetch={setTimeToFetch}
                                    notify={notify}
                                    setNotify={setNotify}
                                    isLastBatch={isLastBatch}
                                    setIsLastBatch={setIsLastBatch}
                                    setTotalBatches={setTotalBatches}
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
                                framesToProcess={framesToProcess}
                                setFramesFetched={setFramesFetched}
                                framesFetched={framesFetched}
                                timesToFetch={timesToFetch}
                                setTimeToFetch={setTimeToFetch}
                                notify={notify}
                                setNotify={setNotify}
                                isLastBatch={isLastBatch}
                                setIsLastBatch={setIsLastBatch}
                            />
                        )}
                    </div>
                </Grid>
            )}

        </Grid>
    );
}