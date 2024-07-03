import {useEffect, useState} from 'react'
import {Grid, CircularProgress, Typography, TextField} from '@mui/material';
import ImageUploader from './ImageUploader';


const progressColor = 'rgba(0, 0, 0, 0.7)'

export const ImageSection = ({preLoadedData, setBatchData, height, 
                            setFrameRate, imageFile, setFile, stimulusFile,
                            expectedArousal, expectedValence, setExpectedArousal, setExpectedValence, 
                            setStimulusFile}) => {
    
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [imgUrl, setImgUrl] = useState(false);
    const [stimulusUrl, setStimulusUrl] = useState(false);
    const [disableUploadButton, setDisableUploadButton] = useState(false);

    useEffect(() => {
        if (preLoadedData) {
            setImgUrl(preLoadedData.url);
            setFile({});
            if (preLoadedData.stimulus_url){
                setStimulusUrl(preLoadedData.stimulus_url);
                setStimulusFile({});
                setExpectedArousal(preLoadedData.stimulus_arousal);
                setExpectedValence(preLoadedData.stimulus_valence);
                setDisableUploadButton(true);
            }
        } else {
            setImgUrl(false);
            setStimulusUrl(false);
            setFile(null);
            setStimulusFile(null);
            setDisableUploadButton(false);
            setExpectedArousal(null);
            setExpectedValence(null);
        }
    }, [preLoadedData]);


    const handleChangeArousal = (event) => {
        const newValue = event.target.value;
        // Solo permitir números, un punto decimal, y manejar el caso de un punto decimal al principio.
        if (/^-?\d*\.?\d*$/.test(newValue)) {
            const floatValue = parseFloat(newValue);
            // Permitir cadena vacía para borrar el input
            if (newValue === '') {
                setExpectedArousal(null);
                return
            } else if (newValue === '-' || (floatValue >= -1 && floatValue <= 1)) {
                setExpectedArousal(newValue);
                return
            }
            setNotify({
                isOpen: true,
                message: 'El valor de la exitación debe estar entre -1.0 y 1.0',
                type: 'error'
            });
        }
    };

    const handleChangeValence = (event) => {
        const newValue = event.target.value;
        // Solo permitir números, un punto decimal, y manejar el caso de un punto decimal al principio.
        if (/^-?\d*\.?\d*$/.test(newValue)) {
            const floatValue = parseFloat(newValue);
            // Permitir cadena vacía para borrar el input
            if (newValue === '') {
                setExpectedValence(null);
                return
            } else if (newValue === '-' || (floatValue >= -1 && floatValue <= 1)) {
                setExpectedValence(newValue);
                return
            }
            setNotify({
                isOpen: true,
                message: 'El valor de la valencia debe estar entre -1.0 y 1.0',
                type: 'error'
            });
        }
    };

    return (
        <Grid container style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 10, height: height  }} 
            justifyContent="center" 
            spacing={3} 
            alignItems="center"
        >   
                {preLoadedData ? null : (
                    <Grid item xs={12} sx={{
                            backgroundColor: 'rgba(170,126,169, 0.3)',
                            color: 'white',
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: 2
                    }}>
                        <ImageUploader   
                            imageFile={imageFile} 
                            setFile={setFile} 
                            notify={notify}
                            setNotify={setNotify}
                            setFrameRate={setFrameRate}
                            setLoading={setLoading}
                            stimulusFile={stimulusFile}
                            setStimulusFile={setStimulusFile}
                            setBatchData={setBatchData}
                            setImgUrl={setImgUrl}
                            setStimulusUrl={setStimulusUrl}
                            setDisableUploadButton={setDisableUploadButton}
                            disableUploadButton={disableUploadButton}
                            expectedValence={expectedValence}
                            expectedArousal={expectedArousal}
                        />


                    </Grid>
                )}
            {loading ? (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <CircularProgress
                        style={{
                            display: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                            color: progressColor,
                            padding: 100,
                        }}
                        size={100}
                    />
                </Grid>
            ) : (
                <>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <div>
                        {imageFile && (<>
                            <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                            Imagen a procesar
                            </Typography>
                            <img 
                                src={imgUrl} 
                                alt="Uploaded"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'contain',
                                }}
                            />
                        </>)}
                    </div>
                    <div>
                        {stimulusFile && (
                            <Grid container 
                                justifyContent="center" 
                                spacing={3} 
                                alignItems="center">
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                                        Estímulo
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <img 
                                        src={stimulusUrl} 
                                        alt="Stimulus"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '400px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs = {12} sx={{ textAlign: 'center' }}>
                                    <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                                        Excitación y valencia promedio del estímulo
                                    </Typography>

                                </Grid>
                                <Grid item xs = {12} sx={{ textAlign: 'center' }}>
                                    <TextField
                                            disabled={disableUploadButton}
                                            label="Valencia"
                                            variant="outlined"
                                            value={expectedValence}
                                            onChange={handleChangeValence}
                                            inputProps={{ inputMode: 'decimal', pattern: '-?\\d*\\.?\\d*$' }}
                                    />
                                </Grid>
                                <Grid item xs = {12} sx={{ textAlign: 'center' }}>
                                    <TextField
                                        disabled={disableUploadButton}
                                        label="Excitación"
                                        variant="outlined"
                                        value={expectedArousal}
                                        onChange={handleChangeArousal}
                                        inputProps={{ inputMode: 'decimal', pattern: '^-?\\d*\\.?\\d*$' }}
                                    />
                                </Grid>
                        </Grid>
                        )}
                    </div>
                </Grid>
                </>
            )}
        </Grid>
    );
}