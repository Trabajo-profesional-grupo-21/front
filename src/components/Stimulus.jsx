import { Card, Grid, Typography, TextField, Button} from  '@mui/material';
import ReactPlayer from 'react-player';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

export const Stimulus = ({urlStimulus, stimulusPlayer, expectedArousal, 
                        expectedValence, setExpectedArousal, setExpectedValence, 
                        setNotify, disableUploadButton}) => {
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
    return(
        <Grid container 
            justifyContent="center" 
            spacing={3} 
            alignItems="center">
            <Grid item>
                <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                    Estímulo
                </Typography>
            </Grid>
            <Grid item xs = {12}>
                <Card sx={{ maxWidth: '100%' }}>
                    <ReactPlayer
                        ref={stimulusPlayer}
                        url={urlStimulus}
                        controls
                        width="100%"
                        height="100%"
                        config={{
                            file: {
                                attributes: {
                                    controlsList: "noplaybackrate nofullscreen",
                                },
                            },
                        }}
                />
                </Card>
            </Grid>
            <Grid item xs = {12}>
                <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                    Excitación y valencia promedio del Estímulo
                </Typography>

            </Grid>
            <Grid item xs = {12}>
            <TextField
                disabled={disableUploadButton}
                label="Valencia"
                variant="outlined"
                value={expectedValence}
                onChange={handleChangeValence}
                inputProps={{ inputMode: 'decimal', pattern: '-?\\d*\\.?\\d*$' }}
            />
        </Grid>
        <Grid item xs = {12}>
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
    ) 
}

