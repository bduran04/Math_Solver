import { Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

import API from "../utils/api"

//create button that routes to the problems page 
const Dashboard = () => {
  
const currentUser = API.currentUser()
console.log(currentUser)

    return (
        <div>
            <h1 textAlign="center">
            Dashboard Page
            </h1>
             {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */}
        </div>
    )
}

export default Dashboard;