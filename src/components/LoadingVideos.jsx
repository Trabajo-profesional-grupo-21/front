import { MuiFileInput } from 'mui-file-input'
import { Grid } from '@mui/material'


export const LoadingVideos = ({videoFile, setVideoFile, setShowStimulus,
                                showStimulus, stimulusFile,
                                setStimulusFile, setClear, setUrlVideo, setUrlStimulus,
                                setDisableUploadButton}) =>{

    const handleChangeVideo = (newFile) => {
        setClear(true);
        setVideoFile(newFile);
        setDisableUploadButton(false);
        let url = null
        if (newFile) {
            url = URL.createObjectURL(newFile);
        }
        setUrlVideo(url);
        setStimulusFile(null);
        setUrlStimulus(null);
        setShowStimulus(false);
    }
    const handleChangeStimulus = (newFile) => {
        setStimulusFile(newFile);
        let url = null
        if (newFile) {
            url = URL.createObjectURL(newFile); 
        }
        setUrlStimulus(url);
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