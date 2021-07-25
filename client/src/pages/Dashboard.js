import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

import API from "../utils/api"

//create button that routes to the problems page 
const Dashboard = () => {

const [userData, setUserData] = useState([]);

useEffect(() => {
    API.currentUser()
    .then(res=>{
        console.log(res)
        
    })
    .catch(err=>{
        console.log(err);
    })
  }, []);


    return (
        <div>
            <h1 justifyContent="center">
            Dashboard Page
            </h1>

             {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */}
        </div>
    )
}

export default Dashboard;