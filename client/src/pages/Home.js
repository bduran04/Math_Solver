import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import mathsteps from 'mathsteps';
import API from "../utils/api"
import { useLocation } from 'react-router-dom'

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
            <Grid container sm={6} xs={12}
                direction="column"
                alignItems="center"
                justify="center">
                <Grid item alignItems="center">
                    <div className="searchbar">
                        <SearchBar onSubmit={onSubmit} />
                    </div>
                </Grid>
            </Grid>
            <Grid container alignContent="center" direction='column' spacing={3}>
                <Grid item sm={6} xs={12}>
                    <img src={wolframImage} alt="equation plot" />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Results results={steps} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;