import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import mathsteps from 'mathsteps';
import API from "../utils/api"
import { useLocation } from 'react-router-dom'
import { Box, Paper, Typography } from '@material-ui/core';
import AddBtn from '../components/AddBtn';
import AuthContext from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            display: "flex",
            width: 200,
            marginLeft: 'auto',
            margin: theme.spacing(1),
            padding: theme.spacing(2)
        },
    }
}
));

const Home = () => {
    const classes = useStyles();

    const [equation, setEquation] = useState('');
    const [steps, setSteps] = useState([]);
    const [wolframImage, setWolframImage] = useState(null);
    const [wolframSolution, setWolframSolution] = useState(null);

    const isLoggedIn = AuthContext._currentValue.data.isLoggedIn

    const onSubmit = async (equation) => {
        const wolframResponse = await API.wolframInfo(equation)
        if (wolframResponse.answer.success) {
            // loop over each pod
            // check if pod title is Plot. This means an image is stored in the subpod
            wolframResponse.answer.pods.forEach((pod) => {
                if (pod.title === 'Plot') {
                    setWolframImage(pod.subpods[0].img.src);
                }
                if (pod.title === 'Solution') {
                    setWolframSolution(pod.subpods[0].img.src);
                }
            });
            setSteps(mathsteps.solveEquation(equation))
        }
    }

    return (
        <div style={{ paddingTop: 48 }}>
            <Grid container justifyContent="center"
                direction="row"
                alignItems="center"
                spacing={2}
                alignContent="center">
                <Grid item >
                    <div className="searchbar">
                        <SearchBar equation={equation} setEquation={setEquation} onSubmit={onSubmit} />
                    </div>
                </Grid>
                <Grid item >
                    {isLoggedIn ?
                        <AddBtn equation={equation} /> :
                        <> </>
                    }
                </Grid>
            </Grid>
            <Grid container
                direction='column' 
                alignItems="center"
                spacing={2}
                alignContent="center">
               {wolframSolution && <Grid item sm={3} xs={12}>
                    <Box m={3} p={3} boxShadow={1}>
                        <Typography >
                            Solution
                        </Typography>
                        <Grid item display="flex">
                            <img src={wolframSolution} alt="solution" />
                        </Grid>
                    </Box>
                </Grid>}
                {wolframImage && <Grid item sm={6} xs={12}>
                    <Box m={3} p={3} boxShadow={1}>
                        <Typography >
                            Plot
                        </Typography>
                        <Grid item display="flex">
                            <img src={wolframImage} alt="equation plot" />
                        </Grid>
                    </Box>
                </Grid>}
            </Grid>
            <Grid container sm={12} xs={12}>
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