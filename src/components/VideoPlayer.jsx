import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';


export const VideoPlayer = ({ videoUrl }) => {
    const url = URL.createObjectURL(videoUrl);
    return (
        <Card sx={{ maxWidth: "100%"}}>
            <CardMedia
                component="video"
                controls
                src={url}
                
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Video
                </Typography>
            </CardContent>
        </Card>
    );
}