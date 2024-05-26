import { useState, useEffect } from "react"
import { Card} from  '@mui/material';
import ReactPlayer from 'react-player';



export const Stimulus = ({stimulusFile,}) => {
    const [url, setVideoUrl] = useState();
   
    useEffect(() => {
       
        if (stimulusFile) {
            const url = URL.createObjectURL(stimulusFile);
            setVideoUrl(url);
        }
    }, [stimulusFile]);

    return(
       
            <Card sx={{ maxWidth: "100%"}}>
                        <ReactPlayer
                            url={url}
                            controls={true}
                            width="100%"
                            height="100%"
                        />
            </Card>
    ) 
}

