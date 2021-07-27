import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import { Grid } from '@material-ui/core';
import API from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const history = useHistory();
  const classes = useStyles();

  const auth = useContext(AuthContext);

  const logout = async () => {
    //not logged in 
    //hit the logout route
    try{
     await API.logoutUser();
     auth.setIsLoggedIn(false);
     history.replace('/')
    } catch(err) {
      window.alert("Logout unsuccessful")
      throw (err);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justifyContent="space-between" 
            container
            spacing={10}
          >
            <Grid item>
            <Button 
            className={classes.title} 
            color="inherit" 
            onClick={() => { history.replace('/') }}>
              Math Solver
            </Button>
            </Grid>
            <Grid item>
            {!auth.data.isLoggedIn ?
              <Button edge="end" color="inherit" onClick={() => { history.push('/login') }}>Login</Button> :
              <> 
              <Button color="inherit" onClick={() => { history.push('/dashboard') }}> Dashboard</Button>
              <Button color="inherit" onClick={logout}>Logout</Button> 
              </>}
             </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
