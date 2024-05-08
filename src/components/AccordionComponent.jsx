import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const accordionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change the background color as needed
};

const typographyStyle = {
color: 'rgba(40, 10, 10)',
fontWeight: 'bold',
fontSize: '1.2rem',
// Add more typography styles as needed
};
  

export default function SimpleAccordion({component}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={accordionStyle}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} style={typographyStyle}>Action units</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {component}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
