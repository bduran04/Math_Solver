import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { Grid, Box, Typography } from '@material-ui/core';

import API from "../utils/api"

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            display: "flex",
            width: 200,
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(2),
    },
}
));

const Signup = () => {
    const classes = useStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    const handleRegistration = async (event) => {
        event.preventDefault();
        const user = await API.createUser(username, password);
        if (user.status === 200) {
            window.alert("registration successful");
            history.push("/");
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleRegistration}>
            <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={6}>
                    <Box className={classes.root}
                        m={3}
                        p={3}
                        boxShadow={3}>
                        <Typography align="center" color='primary'>
                            Sign Up
                        </Typography>
                        <TextField
                            id="outlined-name"
                            label="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            variant="outlined"
                        />
                          <Button
                            className={classes.button}
                            variant="outlined"
                            color='primary'
                            onClick={() => { history.push('/login') }}>
                            Back
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color='primary'
                            type="submit">
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default Signup;