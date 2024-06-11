import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { TextField, Button, Grid, Box, Typography} from '@mui/material';
import Notification from '../components/Notifications';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false); // Estado para rastrear si el usuario ha interactuado con el campo de correo electrónico
  const [notification, setNotification] = useState({ isOpen: false, type: '', message: '' });
  const navigate = useNavigate();

  const validateEmailFormat = (email) => {
    // Expresión regular para verificar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmailFormat(email)) {
        throw new Error('El formato del correo electrónico es inválido');
      }
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      const data = await register(email, password);
      navigate('/login');
    } catch (error) {
      setNotification({ isOpen: true, type: 'error', message: error.message || 'An error occurred during registration' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, isOpen: false });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'white',
    }}>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          background: 'rgb(170,126,169)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          color: 'black',
          marginBottom: '20px',
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid>
            <Typography  variant="h3" align="center">
                    Crea tu cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true); // Establecer que el usuario ha interactuado con el campo de correo electrónico
              }}
              required
              error={emailTouched && !validateEmailFormat(email)} // Mostrar error solo si el usuario ha interactuado con el campo de correo electrónico
              helperText={emailTouched && !validateEmailFormat(email) ? 'El formato del correo electrónico es inválido' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirmar contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={password !== confirmPassword}
              helperText={password !== confirmPassword ? 'Las contraseñas no coinciden' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!validateEmailFormat(email) || password !== confirmPassword}
              sx={{
                background: 'rgba(121, 52, 119)',
                color: 'black',
                borderRadius: '5px',
              }}
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div style={{ color: 'black', textAlign: 'center' }}>¿Ya tienes una cuenta? <Link to="/login">Login</Link></div>
      <Notification notify={notification} setNotify={setNotification} handleClose={handleCloseNotification} />
    </div>
  );
};

export default Register;
