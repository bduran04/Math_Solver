import { Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

//create button that routes to the problems page 
const AuthRoute = (props) => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.data.isLoggedIn === false) {
        history.replace("/login");
        }
      }, []); 

    return <Route {...props} />
}

export default AuthRoute;
