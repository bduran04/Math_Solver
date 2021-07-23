import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import API from "../utils/api"

const Signup = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    const handleRegistration = async (event) => {
      event.preventDefault();
    };
    return (
        <form noValidate autoComplete="off" onSubmit={handleRegistration}>
            Sign Up
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
      <Button variant="contained" onClick={() => {history.push('/login')}}>Back</Button>
      </form>
    )
}

export default Signup;