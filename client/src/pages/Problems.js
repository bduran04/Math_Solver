//this will have the query params stuff in the path 
//create a forEach problem 
import { makeStyles  } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import queryString from 'query-string'

import API from "../utils/api"

//create button that routes to the problems page 
const Problems = () => {

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
    const qs = queryString.parse(window.location.search);
    console.log(qs.studyGuideIndex)

    return (
        <div>
            <h1 justifycontent="center">
                Saved Equations 
            </h1>
            {userData.user && userData.user.studyGuides[qs.studyGuideIndex].problems.map(problem => 
            <div key={problem}>{problem}</div>)}
        {/* <Button variant="contained" onClick={() => {history.push('/?equation=${equation}')}}>Back</Button> */ }
        </div>
    )
}

export default Problems;