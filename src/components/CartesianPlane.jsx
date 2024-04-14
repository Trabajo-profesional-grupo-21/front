import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import './X.css'
import './Y.css'
import './Plane.css'

const Y = () => {
    return <div className="y"></div>;
};

  const X = () => {
    return <div className="x"></div>;
    
};

export const CartesianPlane = () => {
    return (
        <div className="plane">
            <Y/>
            <X/>
        </div>
    );
};