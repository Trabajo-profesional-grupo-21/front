import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, IconButton, Button, CardContent, CircularProgress } from '@mui/material';
import Navbar from '../components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const API_URL = 'http://localhost:8000';

const Images = () => {
  const [imageData, setimageData] = useState([]);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/data/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch image data');
      }
      const data = await response.json();
      setimageData(data.files);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  const handleimageClick = async (imageId) => {
    try {
        const response = await fetch(`${API_URL}/data/image/${imageId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch image information');
        }
        const imageInfo = await response.json();
        console.log(imageInfo)
        navigate('/new-image', { state: { imgInfo: imageInfo } });
    } catch (error) {
        console.error('Error fetching image information:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box mt={10} textAlign="center">
        <Typography variant="h4" gutterBottom>Mis imágenes</Typography>
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
          ) : imageData.length === 0 ? (
          <Box 
            textAlign="center" 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
            minHeight="50vh"
            maxHeight="80vh">

            <Typography style={{ color: "rgba(0, 0, 0, 0.59)" }} variant="h4" align="center" fontWeight='bold'>
                No se encontraron imagenes cargadas en la galeria
            </Typography>

            <Button
                component={Link}
                to="/new-image"
                variant="contained"
                sx={{
                  backgroundColor: 'rgb(170, 126, 169)',
                  color: 'black',
                  borderRadius: '20px',
                  '&:hover': {
                    backgroundColor: 'rgba(170, 126, 169, 0.8)',
                  },
                  marginTop: '20px', // Mueve el botón hacia abajo
                }}
              >
                Subir una nueva imagen
                <IconButton>
                  <AddAPhotoIcon sx={{ fontSize: 24 }} /> {/* Ajusta el tamaño del icono según sea necesario */}
                </IconButton>
            </Button>
          </Box>
      ) : (
          <Grid container spacing={2} justifyContent="center">
            {imageData.map((image, index) => (
              <Grid key={index} item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleimageClick(image.name)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image.thumbnail}
                      alt={image.name}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography variant="body1" textAlign="center">
                      {image.name}
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

export default Images;
