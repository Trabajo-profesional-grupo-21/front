
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Button } from '@mui/material'

export const VideoUploader = () => {
    const [file, setFile] = React.useState(null)
    const socket = new WebSocket('ws://localhost:8000/video_entire');

    const handleChange = (newFile) => {
        setFile(newFile)
    }
    
    socket.onopen = () => {
        console.log('Conexión establecida con el servidor WebSocket');
      };
  
      socket.onmessage = (event) => {
        console.log('Mensaje recibido:', event.data);
      };
  
      socket.onerror = (error) => {
        console.error('Error en la conexión WebSocket:', error);
      };
  
      socket.onclose = () => {
        console.log('Conexión WebSocket cerrada');
      };
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
                sx={{ color: 'rgb(251, 214, 164)' }}
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