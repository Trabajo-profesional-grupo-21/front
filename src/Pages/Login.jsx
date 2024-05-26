import React, { useState } from 'react';
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { TextField, Button, Grid, Box, Typography} from '@mui/material';
import Notification from '../components/Notifications';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ isOpen: false, type: '', message: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      sessionStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (error) {
      setNotification({ isOpen: true, type: 'error', message: error.message || 'An error occurred during login' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, isOpen: false }); // Cierra la notificación cuando se hace clic en ella
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // Cambio a dirección de columna
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'white',  // Fondo blanco
    }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          background: 'rgb(170,126,169)',  // Rectángulo violeta
          padding: '40px',  // Aumenta el espacio alrededor del formulario
          borderRadius: '20px',  // Bordes más redondeados
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          color: 'black',  // Texto negro
          width: "50%"
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h3" align="center">
                    Deteccion de Emociones
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center">
                    Login
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <img  src={logo} alt="Flowers in Chania"/> 
 
            </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'rgba(121, 52, 119)',  // Botón blanco
                color: 'black',  // Texto violeta
                borderRadius: '5px',
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div style={{ color: 'black', textAlign: 'center', marginTop: '20px' }}>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></div>
      <Notification notify={notification} setNotify={setNotification} handleClose={handleCloseNotification} />
    </div>
  );
};

export default Login;
