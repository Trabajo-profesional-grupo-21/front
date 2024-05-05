
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Button } from '@mui/material'



export const VideoUploader = ({file, setFile, socket}) => {
    const handleChange = (newFile) => {
        setFile(newFile)
    }
    
    const handleUpload = () => {
        if (file && socket.readyState === WebSocket.OPEN) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const videoData = event.target.result;
                socket.send(videoData); 
            };
            reader.readAsArrayBuffer(file);
            console.log('Archivo cargado:', file);
        } else {
            console.log('El archivo no está listo o el socket aún no está conectado.');
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