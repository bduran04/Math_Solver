import React from 'react';

const AuthContext = React.createContext({ data: {isLoggedIn: false}, setIsLoggedIn: () => false });



export default AuthContext;

// import AuthContext, { useAuthContext } from './....' ;
