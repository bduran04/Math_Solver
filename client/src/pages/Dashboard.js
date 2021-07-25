import { Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

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

    useEffect(() => {
        loadUserData()
    }, []);

    function loadUserData() {
        API.currentUser()
            .then(res =>
                setUserData(res)
            )
            .catch(err => console.log(err));
    };
    
    return (
        <div>
            <h1 justifyContent="center">
                Dashboard Page
            </h1>
            <Card className={classes.root}>
                <CardContent>
            {userData.map(user => {
                return (
                    <Typography
                      id={user._id}
                      username={user.username}
                      title={user.studyGuides[0].name}
                    />
            
            )})}
                </CardContent>
            </Card>

            {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */}
        </div>
    )
}

export default Dashboard;