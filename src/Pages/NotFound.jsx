// NotFound.js
import React from 'react';
import NotFoundImage from '../images/NotFound.png';
import Navbar from '../components/NavBar';

const NotFound = () => {
  return (
    <>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '250px' }}>
            <img src={NotFoundImage} alt="404 Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    </>
  );
};

export default NotFound;
