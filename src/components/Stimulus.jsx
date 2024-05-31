import { Card, Box, Typography} from  '@mui/material';
import ReactPlayer from 'react-player';



export const Stimulus = ({urlStimulus, stimulusPlayer}) => {

    return(
        <Box>
            <Box sx={{
                width: '100%',
                borderRadius: '16px', // Set the desired border radius
                overflow: 'hidden', // Ensure that content fits within the border radius
            }}>
                <Typography  variant="h5" style={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.59)" }}>
                    Estimulo
                </Typography>
            </Box>
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
    </Box>
    ) 
}

