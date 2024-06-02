import {useEffect, useState} from 'react'
import {Grid, CircularProgress, Typography} from '@mui/material';
import ImageUploader from './ImageUploader';
import {VideoPlayer} from './VideoPlayer';

const progressColor = 'rgba(0, 0, 0, 0.7)'

export const ImageSection = ({preLoadedData, setBatchData, height, setFrameRate, imageFile, setFile, stimulusFile, setStimulusFile}) => {
    
    
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [imgUrl, setImgUrl] = useState(false);
    const [stimulusUrl, setStimulusUrl] = useState(false);

    useEffect(() => {
        if (preLoadedData) {
            setImgUrl(preLoadedData.url);
            setFile({});
            if (preLoadedData.stimulus_url){
                setStimulusUrl(preLoadedData.stimulus_url);
                setStimulusFile({});
            }
        } else {
            setImgUrl(false);
            setStimulusUrl(false);
            setFile(null);
            setStimulusFile(null);
        }
    }, [preLoadedData]);

    return (
        <Grid container style={{ background: "rgba(248, 244, 244)", borderRadius: 15, padding: 10, height: height  }} 
            justifyContent="center" 
            spacing={1} 
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
                        {stimulusFile && ( <>
                            <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                                Estimulo
                            </Typography>
                        
                            <img 
                                src={stimulusUrl} 
                                alt="Stimulus"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'contain',
                                }}
                            />
                        </>)}
                    </div>
                </Grid>
                </>
            )}
        </Grid>
    );
}