import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, IconButton, CardContent } from '@mui/material';
import Navbar from '../components/NavBar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const Videos = () => {
  const [videoData, setVideoData] = useState([]);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/data/videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch video data');
      }
      const data = await response.json();
      setVideoData(data.files);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const handleVideoClick = async (videoId) => {
    try {
        const response = await fetch(`${API_URL}/data/video/${videoId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch video information');
        }
        const videoInfo = await response.json();
        localStorage.setItem("videoInfo", videoInfo);
        localStorage.setItem("filename", videoInfo['filename']);
        navigate('/');
    } catch (error) {
        console.error('Error fetching video information:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box mt={10} textAlign="center">
        <Typography variant="h4" gutterBottom>Mis Videos</Typography>
      </Box>
      <Box mt={5}>
        <Grid container spacing={2} justifyContent="center">
          {videoData.map((video, index) => (
            <Grid key={index} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleVideoClick(video.name)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnail}
                    alt={video.name}
                  />
                  <IconButton sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <PlayCircleOutlineIcon fontSize="large" color="black" />
                  </IconButton>
                </CardActionArea>
                <CardContent>
                  <Typography variant="body1" textAlign="center">
                    {video.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Videos;
