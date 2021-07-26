import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import mathsteps from 'mathsteps';
import Accordion from '../Accordion';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

const Results = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.results.map((result, index) =>
                <Accordion
                    key={`${result}-${index}`}
                    step={index + 1}
                    title={result.changeType}
                    body={`${result.oldEquation.ascii()} --> ${result.newEquation.ascii()}`} />
            )}</div>)
}

export default Results;