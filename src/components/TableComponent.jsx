import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@mui/material';

const gridItemStyle = {
  padding: 10,
  textAlign: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column', 
  justifyContent: 'space-between',
  height: '80%',
  backgroundColor: 'rgba(50, 0, 45, 0.3)',
};


export const TableComponent = ({data}) => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={6} sm={3} md={2} lg={1.5} key={index} style={{fontSize: '80%'}}>
          <Paper style={gridItemStyle}>
            <div>{item.AUName}</div>
            <div>{item.Intensity}</div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};