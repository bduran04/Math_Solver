import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";

//create button that routes to the problems page 
const Dashboard = () => {
    
    return (
        <div>
            Dashboard Page
             {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */}
        </div>
    )
}

export default Dashboard;