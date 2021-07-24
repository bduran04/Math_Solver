import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { Grid, Box, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import API from "../utils/api"
import AuthContext from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      display: "flex",
      width: 200,
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}
));

const Login = () => {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();
  const auth = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await API.loginUser(username, password);
    if (user.status === 200) {
      // login set the  value to true
      auth.setIsLoggedIn(true)
      history.push("/dashboard")
    } else {
      //snackbar
      window.alert("username/password incorrect")
      console.log(user)
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleLogin} >
      <Grid container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={6}>
          <Box className={classes.root} m={3} p={3} boxShadow={3}>
            <Typography align="center" color='primary'>
              User Login
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
              startIcon={<PersonAddIcon />}
              onClick={() => { history.push('/signup') }}>
              Sign Up
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color='primary'
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;

