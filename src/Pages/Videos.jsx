import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, Button ,IconButton, CardContent, CircularProgress } from '@mui/material';
import Navbar from '../components/NavBar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const Videos = () => {
  const [videoData, setVideoData] = useState([]);
  const token = sessionStorage.getItem('token');
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
        localStorage.setItem("videoInfo", JSON.stringify(videoInfo));
        localStorage.setItem("filename", videoId);
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
        {loading ? (
            <Grid container justifyContent="center">
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <CircularProgress
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    color: 'rgb(170, 126, 169)', // Assuming this is the progressColor you want
                    padding: 100,
                  }}
                  size={100}
                />
              </Grid>
            </Grid>
          ) : videoData.length === 0 ? (
            <Box 
              textAlign="center" 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center"
              minHeight="50vh"
              maxHeight="80vh">

              <Typography style={{ color: "rgba(0, 0, 0, 0.59)" }} variant="h4" align="center" fontWeight='bold'>
                  No se encontraron videos cargados en la galeria
              </Typography>

              <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(170, 126, 169)',
                    color: 'black',
                    borderRadius: '20px',
                    '&:hover': {
                      backgroundColor: 'rgba(170, 126, 169, 0.8)',
                    },
                    marginTop: '20px',
                  }}
                >
                  Subir un nuevo video
                  <IconButton>
                    <VideoCallIcon sx={{ fontSize: 24 }} />
                  </IconButton>
              </Button>
            </Box>
        ) : (
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
        )}
      </Box>
    </>
  );
};

export default Videos;
