import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

const gridItemStyle = {
  padding: 10,
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(50, 0, 45, 0.3)', // Transparent background color
};

export const TableComponent = ({data}) => {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={6} sm={3} md={2} lg={1.5} key={index}>
          <Paper style={gridItemStyle}>
            {/* Render your data inside the grid item */}
            <div>{item.actionUnit}</div>
            <div>{item.actionUnitValue}</div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};