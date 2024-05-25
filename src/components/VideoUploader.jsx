
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Button } from '@mui/material'
import Notification from './Notifications';




export const VideoUploader = ({file, setFile, setFrameRate, setBatchData, 
                                setLoading, setFramesToProcess, setFramesFetched, 
                                setTimeToFetch, notify, setNotify,
                                isLastBatch, setIsLastBatch, setTotalBatches}) => {
    const APIURL = "http://localhost:8000/data";
    const maxAttempts = 10;
    const calculateIfIsLastBatch = (currentBatch, total_batches) => {return currentBatch === (total_batches -1)} 
    const handleChange = (newFile) => {
        setFile(newFile)
    }

    const getVideoData = async (currentTime, attempts = 0, amountTotalBatches) => {
        try {
            // const user_id = localStorage.getItem('user');
            const token = localStorage.getItem('token');
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
            let batchinfo = JSON.parse(jsonResponse.data);
            if (batchinfo) {
                setFramesFetched(prevFramesFetched => {
                    let updatedData = [...prevFramesFetched, ...Object.keys(batchinfo['batch']).map((value) => {return parseInt(value)})];
                    return updatedData;
                });
                setBatchData(batchinfo['batch']);
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
        // const videoInfo = localStorage.getItem('videoInfo');
        // if (videoInfo){
        //     let amountOfFrames = videoInfo['frames_to_process'];
        //     let fps = videoInfo['fps']
        //     setFrameRate(fps);
        //     let framesToProcess = Array.from({ length: amountOfFrames + 1 }, (value, index) => index*fps)
        //     setFramesToProcess(framesToProcess);
        //     setTotalBatches(videoInfo['total_batches']);
        //     let timesToProcess = Array.from({length: videoInfo['total_batches']}, (value, index) => 10 * index) 
        //     const firstBatchIndex = 0;
        //     const secondBatchIndex = 10;
        //     getVideoData(firstBatchIndex,0, videoInfo['total_batches']);
           
        //     timesToProcess = timesToProcess.filter(element => element !== firstBatchIndex);
        //     if (videoInfo['total_batches'] > 1) {
        //         getVideoData(secondBatchIndex,0,videoInfo['total_batches']);
        //         timesToProcess = timesToProcess.filter(element => element !== secondBatchIndex);
        //     }
        //     setTimeToFetch(timesToProcess);
        //     setTimeToFetch(timesToProcess);
        // }
        if (file) {
            setLoading(true)
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const APIURL = 'http://localhost:8000/data/video';
                    const formData = new FormData();
                    formData.append('file', file,);
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
                        setTimeToFetch(timesToProcess);
                    }
                setLoading(false)
                } catch (error) {
                    console.error('Error:', error);
                    //TODO: manage error
                    setLoading(false)
                }
            };
            reader.readAsDataURL(file);
        }

    };
    return (
        <>
            <MuiFileInput
                value={file}
                label="Seleccionar Video"
                InputProps={{
                    style: {
                        '&:focus': {
                            borderColor: 'gray',
                            boxShadow: '0 0 5px gray',
                        },
                        '&:hover': {
                            borderColor: 'rgb(98, 65, 83)',
                        }
                    }
                }}
                sx={{ color: 'rgb(251, 214, 164)' , maxWidth:"100%" }}
                onChange={handleChange}
            />
            {file && (
                <div>
                    <p style={{color: 'gray'}}>Video seleccionado: {file.name}</p>
                    <Button 
                        variant="contained" 
                        onClick={handleUpload}
                        style={{ backgroundColor: 'rgb(98, 65, 83)', color: 'white', textTransform: 'none' }}>
                        Subir
                    </Button>
                    <Notification notify={notify} setNotify={setNotify}/>
                </div>
            )}
        </>
    );
}