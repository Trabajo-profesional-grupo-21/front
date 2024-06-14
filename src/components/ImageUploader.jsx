import React from 'react';
import { MuiFileInput } from 'mui-file-input';
import { Button, Grid } from '@mui/material'
import Notification from './Notifications';
import {useState} from 'react'
import SimpleAccordion from './AccordionComponent';

const ImageUploader = ({
  imageFile,
  setFile,
  notify,
  setNotify,
  setLoading,
  stimulusFile, 
  setStimulusFile,
  setBatchData,
  setImgUrl,
  setStimulusUrl, 
  disableUploadButton, 
  setDisableUploadButton, 
  expectedArousal, 
  expectedValence
}) => {

  console.log("DISABLE BUTTON: ",disableUploadButton )
  const [showStimulus, setShowStimulus] = useState(false);

  const handleUploadStimulus = (setShowStimulus) => {
    console.log("Cargamos estimulo imagenes");
    setShowStimulus(true);
  } 

  const handleChangeStimulus = (newStimulusFile) => {
    setStimulusFile(newStimulusFile)
    if (newStimulusFile) {
      setStimulusUrl(URL.createObjectURL(newStimulusFile));
    }
  }
  
  const handleChange = (newFile) => {
    setFile(newFile);
    setDisableUploadButton(false);
    if (newFile){
      setImgUrl(URL.createObjectURL(newFile));
    }
  };

  const uploadStimulus = async () => {
    if (stimulusFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
            const token = sessionStorage.getItem('token');
            let API_URL = `http://localhost:8000/data/stimulus?match_file_name=${imageFile.name}`;
            if (expectedArousal && expectedValence) {
              API_URL += `&arousal=${expectedArousal}&valence=${expectedValence}`;
            }
            const formData = new FormData();
            formData.append('file', stimulusFile);
            const response = await fetch(`${API_URL}`, {
              method: 'POST',
              body: formData,
              headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });

            const jsonResponse = await response.json();
            if (response.status === 201) {
              console.log("Estimulo de img subido ok")
              return 0;
            }
        } catch (error) {
            console.error('Error:', error);
        }
      };
      reader.readAsDataURL(stimulusFile);
    }
    return 0;
  };

  const handleUpload = async () => {
    if (imageFile) {
      setLoading(true);
      setDisableUploadButton(true);
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const APIURL = 'http://localhost:8000/data/image';
          const formData = new FormData();
          formData.append('file', imageFile);
          const response = await fetch(APIURL, {
            method: 'POST',
            body: formData,
            headers: {
              'accept': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const jsonResponse = await response.json();
          console.log(jsonResponse)
          if (response.status === 201) {
            const res = await uploadStimulus();
            if (res == 0){
              setBatchData(jsonResponse.data)
            }
          }
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <SimpleAccordion
    name="Carga de imágenes"
    component={
      <div>
          <Grid container 
            justifyContent="center" 
            spacing={3} 
            alignItems="center"
          >
            <Grid item xs = {12}>
              <MuiFileInput
                  value={imageFile}
                  label="Seleccionar Imagen"
                  accept="image/*"
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
                  sx={{ color: 'rgb(251, 214, 164)', maxWidth: "100%" }}
                  onChange={handleChange}
                >
                </MuiFileInput>
              </Grid>
                {showStimulus && (
                  <Grid item xs = {12}>
                      <MuiFileInput
                        value={stimulusFile}
                        label="Seleccionar estímulo"
                        accept="image/*"
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
                        sx={{ color: 'rgb(251, 214, 164)', maxWidth: "100%" }}
                        onChange={handleChangeStimulus}
                      >
                    </MuiFileInput>
                  </Grid>
                )}
          </Grid>
          {imageFile && (
            <div>
              <p style={{color: 'gray'}}>Imagen seleccionada: {imageFile.name}</p>
              <Grid container direction="rows" display="flex">
                  <Grid item xs = {6}> 
                      <Button 
                          variant="contained" 
                          onClick={handleUpload}
                          disabled={disableUploadButton}
                          style={{ backgroundColor:
                            disableUploadButton? 'rgba(98, 65, 83, 0.5)':'rgb(98, 65, 83)',
                           color: 'white', textTransform: 'none' }}>
                          Subir Imagen
                      </Button>
                      <Notification notify={notify} setNotify={setNotify}/>
                  </Grid>
                  <Grid item xs = {6}>
                      <Button  
                          variant="outlined" 
                          onClick={()=>{handleUploadStimulus(setShowStimulus)}}
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
      </div>
    }/>
  );
};

export default ImageUploader;
