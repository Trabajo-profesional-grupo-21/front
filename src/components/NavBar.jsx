import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuClick = (path) => {
    localStorage.removeItem('videoInfo');
    localStorage.removeItem('filename');
    navigate(path);
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="fixed" sx={{ background: 'white', color: 'black', width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            color="inherit"
            aria-controls="new-analysis-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            Nuevo análisis
          </Button>
          <Menu
            id="new-analysis-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ onClick: handleMenuClose }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleMenuClick('/new-video')}>Video</MenuItem>
            <MenuItem onClick={() => handleMenuClick('/new-image')}>Imagen</MenuItem>
          </Menu>
          <Button color="inherit" component={Link} to="/videos">Mis videos</Button>
          <Button color="inherit" component={Link} to="/images">Mis imágenes</Button>
        </Box>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
