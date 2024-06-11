import React, { useEffect, useState } from 'react';
import { VideoSection } from '../components/VideoSection';
import {ResultsSection} from '../components/ResultsSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Navbar from '../components/NavBar';


export const Main = (props) => {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [batchData, setBatchData] = useState({});
    const [frameRate, setFrameRate] = useState(0);
    const [videoFile, setFile] = useState(null);
    const [total_batches, setTotalBatches] = useState(0);
    const [isLastBatch, setIsLastBatch] = useState(false);
    const [framesFetched, setFramesFetched] =  useState([]);
    const [framesToProcess, setFramesToProcess] = useState([]);
    const [processedVideo, setProcessedVideo] = useState(false);
    const [clear, setClear] = useState(false);
    const [urlVideo, setUrlVideo] = useState();
    const [urlStimulus, setUrlStimulus] = useState();
    const [receivedAllBatches, setReceivedAllBatches] = useState(false);
    const [expectedArousal, setExpectedArousal] = useState(null);
    const [expectedValence, setExpectedValence] = useState(null);
    const [disableUploadButton, setDisableUploadButton] = useState(false);
    useEffect(() => {
        let videoInfo = localStorage.getItem('videoInfo')
        if (videoInfo) {
            console.log("======================> Hay algo en local storage!!!!")
            // process o save data
            let filename = localStorage.getItem('filename')
            setDisableUploadButton(true)
            console.log("File name ", filename);
            localStorage.removeItem('videoInfo');
            localStorage.removeItem('filename');
            let parsedVideoInfo = JSON.parse(videoInfo)
            console.log("URL ", parsedVideoInfo.url);
            setUrlVideo(parsedVideoInfo.url);
            setUrlStimulus(parsedVideoInfo.stimulus_url)
            setExpectedArousal(parsedVideoInfo.stimulus_arousal);
            setExpectedValence(parsedVideoInfo.stimulus_valence);
            let combined = {};
            Object.values(parsedVideoInfo.data).forEach(innerDict => {
                    combined = { ...combined, ...innerDict };
            });
            console.log("RESULTADOOOOOOOOOOOOOO", combined)
            console.log("data del video ", Object.values(parsedVideoInfo.data));
            setBatchData(combined);
            setProcessedVideo(true);
            setFrameRate(parsedVideoInfo.fps);
            let frames = Object.keys(combined).map(key => parseInt(key))
            setFramesToProcess(frames);
            setFramesFetched(frames);
            setTotalBatches(parsedVideoInfo.total_batches);
        }
    })

    useEffect(() => {
        if (clear) {
            setCurrentFrameIndex(0);
            setBatchData({});
            setFramesFetched([]);
            setIsLastBatch(false);
            setProcessedVideo(false);
            setUrlStimulus(null);
            setReceivedAllBatches(false);
            setDisableUploadButton(false);
        }
    }, [clear]);

    let resultsSectionHeight = 0;
    return (
            <Box style={{ background: "rgba(248, 244, 244)"}} minHeight="100vh" p={2}>
                <Navbar />
                <Box p={2} sx={{ paddingTop: '64px' }}>
                    <Grid container
                    style={{ background: "rgba(248, 244, 244)"}}
                    spacing={1}
                    alignItems="flex-start"
                    justifyContent="flex-end">
                        <Grid item xs = {12}>
                            <Typography style={{ color: "rgba(0, 0, 0, 0.59)" }} variant="h4" align="center" fontWeight='bold'>
                                Detección de emociones
                            </Typography>
                        </Grid>
                        <Grid item xs = {12}>
                            <Grid container direction="row"
                                style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 15, height: '100%' }}
                                justifyContent="space-around"
                                spacing={2}
                                alignItems="stretch" 
                                >
                                <Grid item xs={3} justifyContent="flex-end" >
                                    <VideoSection  setCurrentFrameIndex={setCurrentFrameIndex}
                                                    setBatchData={setBatchData}
                                                    height={resultsSectionHeight}
                                                    frameRate={frameRate}
                                                    setFrameRate={setFrameRate}
                                                    setFile={setFile}
                                                    videoFile={videoFile}
                                                    total_batches={total_batches}
                                                    setTotalBatches={setTotalBatches}
                                                    isLastBatch={isLastBatch}
                                                    setIsLastBatch={setIsLastBatch}
                                                    framesFetched={framesFetched}
                                                    setFramesFetched={setFramesFetched}
                                                    processedVideo={processedVideo}
                                                    setProcessedVideo={setProcessedVideo}
                                                    setClear={setClear}
                                                    urlVideo={urlVideo}
                                                    urlStimulus={urlStimulus}
                                                    setUrlVideo={setUrlVideo}
                                                    setUrlStimulus={setUrlStimulus}
                                                    framesToProcess={framesToProcess}
                                                    setFramesToProcess={setFramesToProcess}
                                                    setReceivedAllBatches={setReceivedAllBatches}
                                                    expectedArousal={expectedArousal}
                                                    expectedValence={expectedValence}
                                                    setExpectedArousal={setExpectedArousal}
                                                    setExpectedValence={setExpectedValence}
                                                    disableUploadButton={disableUploadButton}
                                                    setDisableUploadButton={setDisableUploadButton}
                                    />
                                </Grid>
                                <Grid item justifyContent="center" alignItems="center" xs={9}>             
                                        <ResultsSection currentFrameIndex={currentFrameIndex}
                                                        batchData={batchData}
                                                        frameRate={frameRate}
                                                        videoFile={videoFile}
                                                        clear={clear}
                                                        receivedAllBatches={receivedAllBatches}
                                                        expectedArousal={expectedArousal}
                                                        expectedValence={expectedValence}
                                                        showTimeLine={true}
                                                        showScatterPlot={false}
                                        />
                                </Grid>
                            </Grid>
                        </Grid>   
                    </Grid>
                </Box>
            </Box>
    );
}