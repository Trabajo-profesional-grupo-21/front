import { useState, useEffect } from "react"
import { Card} from  '@mui/material';
import ReactPlayer from 'react-player';



export const Stimulus = ({urlStimulus, stimulusPlayer}) => {

    return(
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
    ) 
}

