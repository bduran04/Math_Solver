import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import API from "../utils/api"


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await API.loginUser(username, password);
    //fix this if statement to make sure that success
    if (user.status === 200) {
    history.push("/")
  } else {
    //snackbar
    window.alert("username/password incorrect")
    console.log(user)
  }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
      <div>
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
      </div>
      <Button variant="contained" type="submit">Submit</Button>
      <Button variant="contained" onClick={() => {history.push('/signup')}}>Sign Up</Button>
    </form>
  );
}

export default Login;

