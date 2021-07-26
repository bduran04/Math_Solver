import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import { Grid } from '@material-ui/core';

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

  const isLoggedIn = AuthContext._currentValue.data.isLoggedIn

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
            <Button className={classes.title} color="inherit" onClick={() => { history.push('/') }}>
              Math Solver
            </Button>
            </Grid>
            <Grid item>
            {!isLoggedIn ?
              <Button edge="end" color="inherit" onClick={() => { history.push('/login') }}>Login</Button> :
              <Button color="inherit" onClick={() => { history.push('/logout') }}>Logout</Button>
            }
            {isLoggedIn ?
              <Button color="inherit" onClick={() => { history.push('/dashboard') }}> Dashboard</Button> :
              <> </>
            }
             </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
