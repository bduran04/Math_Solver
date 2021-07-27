import { Button, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';

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
    const history = useHistory();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        retrieveUserData()
    }, []);

    async function retrieveUserData() {
        try {
            const user = await API.currentUser()
            setUserData(user)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */}
            {userData.user && <Box m={3} p={3} >
                Welcome, {userData.user.username}
            </Box>}
            {userData.user &&
                <Grid container
                    spacing={2}>
                        <Grid item xs={12} sm={6}>
                    {userData.user.studyGuides.map((studyGuide, index) =>
                        <div key={studyGuide}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        Study Guide: {studyGuide.name} | Problems: {studyGuide.problems.length}
                                    </Typography>
                                    <Button
                                        justify-content="flex-end"
                                        color="primary"
                                        variant="contained"
                                        onClick={() => { history.push(`/problems?studyGuideIndex=${index}`) }}>
                                        Problems</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    </Grid>
                </Grid>}
        </div>
    )
}

export default Dashboard;