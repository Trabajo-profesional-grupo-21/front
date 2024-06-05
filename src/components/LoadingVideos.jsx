import { MuiFileInput } from 'mui-file-input'
import { Grid } from '@mui/material'


export const LoadingVideos = ({videoFile, setVideoFile, 
                                showStimulus, stimulusFile,
                                setStimulusFile, setClear, setUrlVideo, setUrlStimulus,
                                setDisableUploadButton}) =>{

    const handleChangeVideo = (newFile) => {
        setClear(true);
        setVideoFile(newFile);
        setDisableUploadButton(false);
        if (newFile) {
            const url = URL.createObjectURL(newFile);
            console.log("URL VIDEO ", url);
            setUrlVideo(url);
        }
    }
    const handleChangeStimulus = (newFile) => {
        setStimulusFile(newFile);
        if (newFile) {
            const url = URL.createObjectURL(newFile);
            setUrlStimulus(url); 
        }
    }

    return (
        <Grid container 
            justifyContent="center" 
            spacing={3} 
            alignItems="center"
        >
            <Grid item xs = {12}>
                <MuiFileInput
                    value={videoFile}
                    label="Seleccionar Video a Procesar"
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
                    onChange={handleChangeVideo}
                />
            </Grid>
            {showStimulus && (
               <Grid item xs = {12}> 
                    <MuiFileInput
                        value={stimulusFile}
                        label="Seleccionar Estimulo"
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
                        onChange={handleChangeStimulus}
                    />
                </Grid>
            )}
        </Grid>
    )
}