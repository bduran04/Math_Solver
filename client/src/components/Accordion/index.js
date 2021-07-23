import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

const Accordion = (props) => {
 const classes = useStyles();
 const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event) => {
    setExpanded((prevExpanded) => prevExpanded ? false : true) 
};
return (
    <MaterialAccordion expanded={expanded} onChange={handleChange}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography className={classes.heading}>Step: {props.step}</Typography>
      <Typography className={classes.secondaryHeading}>{props.title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {props.body}
      </Typography>
    </AccordionDetails>
  </MaterialAccordion>
)
}

export default Accordion;