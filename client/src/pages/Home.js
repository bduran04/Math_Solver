import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import mathsteps from 'mathsteps';
import API from "../utils/api"
import { useLocation } from 'react-router-dom'
import { Box, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            display: "flex",
            width: 200,
            margin: theme.spacing(1),
        },
    }
}
));

const Home = () => {
    const classes = useStyles();

    const [steps, setSteps] = useState([]);
    const [wolframImage, setWolframImage] = useState('');


    const onSubmit = async (equation) => {
        const wolframResponse = await API.wolframInfo(equation)
        if (wolframResponse.answer.success) {
            // loop over each pod
            // check if pod title is Plot. This means an image is stored in the subpod
            wolframResponse.answer.pods.forEach((pod) => {
                if (pod.title === 'Plot') {
                    setWolframImage(pod.subpods[0].img.src);
                }
            });
            setSteps(mathsteps.solveEquation(equation))
        }
        //make a call to wolfram alpha data. this is where wolfram API
    }

    return (
        <div style={{ paddingTop: 48 }}>
            <Grid container justifyContent="center"
                direction="column"
                alignItems="center">
                <Grid item alignContent="center" >
                    <div className="searchbar">
                        <SearchBar onSubmit={onSubmit} />
                    </div>
                </Grid>
            </Grid>
            <Grid container direction='column' spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Box m={3} p={3} boxShadow={1}>
                        <Typography >
                            Plot
                        </Typography>
                        <Grid item display="flex" justifyContent="center">
                        <img src={wolframImage} alt="equation plot" />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Box m={3} p={3} boxShadow={1}>
                        <Typography>
                            Step-by-Step Solution
                        </Typography>
                        <Results results={steps} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;