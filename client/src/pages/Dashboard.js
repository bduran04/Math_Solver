import { makeStyles  } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import API from "../utils/api"

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

//create button that routes to the problems page 
const Dashboard = () => {
    const classes = useStyles();

    const [userData, setUserData] = useState([]);

    useEffect(async () => {
        try {
            const user = await API.currentUser()
            setUserData(user)
        } catch (err) {
            console.log(err)
        }
    }, []);

    return (
        console.log(userData),
        <div>
            <h1 justifycontent="center">
                Dashboard Page
            </h1>
        {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */ }
        </div>
    )
}

export default Dashboard;