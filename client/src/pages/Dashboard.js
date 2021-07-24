import { Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

//create button that routes to the problems page 
const Dashboard = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    console.log(auth.data.isLoggedIn)

    useEffect(() => {
        if (auth.data.isLoggedIn === false) {
        history.replace("/login");
        }
      }, []); 

    return (
        <div>
            Dashboard Page
             {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */}
        </div>
    )
}

export default Dashboard;