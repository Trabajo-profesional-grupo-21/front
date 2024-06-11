
import {useState} from 'react'
import { Button, Grid } from '@mui/material'
import Notification from './Notifications';
import { LoadingVideos } from './LoadingVideos';
import SimpleAccordion from './AccordionComponent';

const handleUploadStimulus = (setShowStimulus) => {
    console.log("Cargamos estimulo");
    setShowStimulus(true);
} 

export const VideoUploader = ({videoFile, setVideoFile, setFrameRate, setBatchData, 
                                setLoading, setFramesToProcess, setFramesFetched, 
                                setTimeToFetch, notify, setNotify, 
                                isLastBatch, setIsLastBatch, setTotalBatches,
                                stimulusFile, setStimulusFile, setProcessedVideo, 
                                setClear, setUrlVideo, setUrlStimulus,
                                disableUploadButton, setDisableUploadButton, 
                                expectedArousal, expectedValence}) => {
                                  
    const [showStimulus, setShowStimulus] = useState(false);
    // const [disableUploadButton, setDisableUploadButton] = useState(false);
    
    const APIURL = "http://localhost:8000/data";
    const maxAttempts = 10;
    
    const calculateIfIsLastBatch = (currentBatch, total_batches) => {return currentBatch === (total_batches -1)} 
    

    const getVideoData = async (currentTime, attempts = 0, amountTotalBatches) => {
        try {
            // const user_id = localStorage.getItem('user');
            console.log("FUI A BUSCAR DATA DEL TIEMPO ", currentTime);
            const token = sessionStorage.getItem('token');
            const filename = localStorage.getItem('filename');
            const url = `${APIURL}/video/time/${filename}/${currentTime}`;
            const paramsApi = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            };
            const response = await fetch(url, paramsApi);
            const jsonResponse = await response.json();
            
            if (jsonResponse && calculateIfIsLastBatch(jsonResponse.batch, amountTotalBatches)) {
                setIsLastBatch(true);
            }
            console.log("Batch que me llega ", jsonResponse);
            let batchinfo = jsonResponse.data;
            console.log("Batch info", batchinfo);
            if (batchinfo) {
                setFramesFetched(prevFramesFetched => {
                    let updatedData = [...prevFramesFetched, ...Object.keys(batchinfo).map((value) => {return parseInt(value)})];
                    return updatedData;
                });
                setBatchData(batchinfo);
              } else {
                throw new Error('batchinfo es null, todavia no hay data');
              }
        } catch (error) {
            console.error('Error:', error);
            if (attempts < maxAttempts) {
                setTimeout(() => getVideoData(currentTime, attempts + 1), 3000); // Espera 1 segundo antes de reintentar
            }
        }
    }
    
    const handleUpload = async () => {
        if (videoFile) {
            setLoading(true);
            setClear(false);
            setDisableUploadButton(true);
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    console.log("SUBO EL VIDEO");
                    const token = sessionStorage.getItem('token');
                    const APIURL = 'http://localhost:8000/data/video';
                    const formData = new FormData();
                    formData.append('file', videoFile,);
                    const response = await fetch(APIURL, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'accept': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    const jsonResponse = await response.json();
                    if (response.status === 201) {
                        localStorage.setItem("user", jsonResponse['user_id']);
                        localStorage.setItem("filename", jsonResponse['filename']);
                        let amountOfFrames = jsonResponse['frames_to_process'];
                        let fps = jsonResponse['fps']
                        setFrameRate(fps);
                        let framesToProcess = Array.from({ length: amountOfFrames + 1 }, (value, index) => index*fps)
                        setFramesToProcess(framesToProcess);
                        setTotalBatches(jsonResponse['total_batches']);
                        let timesToProcess = Array.from({length: jsonResponse['total_batches']}, (value, index) => 10 * index) 
                        const firstBatchIndex = 0;
                        const secondBatchIndex = 10;
                        getVideoData(firstBatchIndex,0, jsonResponse['total_batches']);
                       
                        timesToProcess = timesToProcess.filter(element => element !== firstBatchIndex);
                        if (jsonResponse['total_batches'] > 1) {
                            getVideoData(secondBatchIndex,0,jsonResponse['total_batches']);
                            timesToProcess = timesToProcess.filter(element => element !== secondBatchIndex);
                        }
                        console.log("Times to fetch ", timesToProcess);
                        setTimeToFetch(timesToProcess);  
                    }
                setLoading(false);
                //Creemos que no hace falta este setProcessedVideo(true) pero en principio lo dejamos comentado
                // setProcessedVideo(true);
                console.log("pongo en true process video");
                } catch (error) {
                    console.error('Error:', error);
                    //TODO: manage error
                    setLoading(false)
                }

                
            };
            reader.readAsDataURL(videoFile);
        }

        if (stimulusFile && videoFile) {
            const stimulusReader = new FileReader();
            stimulusReader.onload = async () => {
                try {
                    console.log("SUBO EL ESTIMULO");
                    const token = sessionStorage.getItem('token');
                    let APIURL = `http://localhost:8000/data/stimulus?match_file_name=${videoFile.name}`;
                    if (expectedArousal && expectedValence) {
                        APIURL += `&arousal=${expectedArousal}&valence=${expectedValence}`
                    }
                    console.log("api url ", APIURL);
                                
                    const formData = new FormData();
                    formData.append('file', stimulusFile);
                    const response = await fetch(APIURL, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'accept': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.status === 201) {
                        console.log("Estimulo cargado");
                    }
                } catch (error) {
                    console.log("Error ", error);
                }
            };
            stimulusReader.readAsDataURL(videoFile);
        }
    };
    return (
        <SimpleAccordion
        name="Carga de videos"
        component={
            <div>
            <LoadingVideos 
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                stimulusFile={stimulusFile}
                setStimulusFile={setStimulusFile}
                showStimulus={showStimulus}
                setClear={setClear}
                setUrlVideo={setUrlVideo}
                setUrlStimulus={setUrlStimulus}
                setDisableUploadButton={setDisableUploadButton}
            >
            </LoadingVideos>
            {videoFile && (
                <div>
                    <p style={{color: 'gray'}}>Video seleccionado: {videoFile.name}</p>
                    <Grid container direction="rows" display="flex">
                        <Grid item xs = {6}> 
                            <Button 
                                variant="contained" 
                                onClick={handleUpload}
                                disabled={disableUploadButton}
                                style={{ backgroundColor:
                                     disableUploadButton? 'rgba(98, 65, 83, 0.5)':'rgb(98, 65, 83)',
                                    color: 'white', textTransform: 'none' }}>
                                Subir Video
                            </Button>
                            <Notification notify={notify} setNotify={setNotify}/>
                        </Grid>
                        <Grid item xs = {6}>
                            <Button  
                                variant="outlined" 
                                onClick={()=>{handleUploadStimulus(setShowStimulus)}}
                                disabled={disableUploadButton}
                                style={{
                                    textTransform: 'none',
                                    justifyContent: "center",
                                    color: 'rgb(98, 65, 83)',
                                    borderColor: 'rgb(98, 65, 83)',
                                }}>
                                Cargar estímulo
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>}/>
    );
}