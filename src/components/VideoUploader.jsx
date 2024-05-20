
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Button } from '@mui/material'
import Notification from './Notifications';

export const VideoUploader = ({
    file, setFile, 
    setFrameRate, 
    setBatchData, setLoading, 
    setFramesToProcess, setFramesFetched,
    notify, setNotify}) => {
    const APIURL = "http://localhost:8000";
    const maxAttempts = 10;

    const handleChange = (newFile) => {
        setFile(newFile)
    }

    const getVideoData = async (currentTime, attempts = 0) => {
        console.log("BUSCO INFO DEL VIDEO AL BACK");
        try {
            const user_id = localStorage.getItem('user');
            const url = `${APIURL}/batch_data_time/${user_id}/${currentTime}`;
            const paramsApi = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch(url, paramsApi);
            const jsonResponse = await response.json();
            let batchinfo = JSON.parse(jsonResponse.data);
            if (batchinfo) {
                console.log(batchinfo);
                setFramesFetched(prevFramesFetched => {
                    let updatedData = [...prevFramesFetched, ...Object.keys(batchinfo['batch']).map((value) => {return parseInt(value)})];
                    return updatedData;
                });
                setBatchData(batchinfo['batch']);
                console.log("setBatchData", batchinfo['batch']);
              } else {
                throw new Error('batchinfo es null, todavia no hay data');
              }
        } catch (error) {
            console.error('Error:', error);
            if (attempts < maxAttempts) {
                setTimeout(() => getVideoData(currentTime, attempts + 1), 1000); // Espera 1 segundo antes de reintentar
            } else {
                console.log("YA HICE LOS 10 INTENTOS :(");
            }
        }
    }
    
    const handleUpload = async () => {
        if (file) {
            setLoading(true)
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const APIURL = 'http://localhost:8000/upload/';
                    const formData = new FormData();
                    formData.append('file', file, reader.result);
                    const response = await fetch(APIURL, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'accept': 'application/json',
                        },
                    });
    
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
    
                    if (response.status === 200) {
                        localStorage.setItem("user", jsonResponse['user_id']);
                        let amountOfFrames = jsonResponse['frames_to_process'];
                        let fps = jsonResponse['fps']
                        setFrameRate(fps);
                        let framesToProcess = Array.from({ length: amountOfFrames + 1 }, (v, k) => k)
                        .map((value, index) => {
                            console.log("frame to process", value*fps)
                                return value*fps
                        }) 
                        setFramesToProcess(framesToProcess);
                        // Buscamos el primero y el segundo. 
                        getVideoData(0,0);
                        console.log("Buscado data seg 0");
                        if (jsonResponse['total_batches'] > 1) {
                            getVideoData(10,0);
                            console.log("Buscado data seg 10");
                        }
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