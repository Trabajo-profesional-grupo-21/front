
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Button } from '@mui/material'

export const VideoUploader = ({file, setFile, socket}) => {

    const handleChange = (newFile) => {
        setFile(newFile)
    }
    
    const handleUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const videoData = event.target.result;
                socket.send(videoData); 
            };
            reader.readAsArrayBuffer(file);
            console.log('Archivo cargado:', file);
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
                </div>
            )}
        </>
    );
}