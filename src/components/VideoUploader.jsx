
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Button } from '@mui/material'



export const VideoUploader = ({file, setFile, setFrameRate}) => {
    const handleChange = (newFile) => {
        setFile(newFile)
    }
    
    const handleUpload = async () => {
        console.log("entreee");
        if (file) {
            console.log("fileee ", file);
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
                        setFrameRate(jsonResponse['fps'])
                    }
                } catch (error) {
                    console.error('Error:', error);
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
                </div>
            )}
        </>
    );
}