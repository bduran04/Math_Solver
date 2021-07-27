import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar'
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthContext from "./contexts/AuthContext";
import AuthRoute from "./components/AuthRoute";
import Problems from "./pages/Problems";


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // setIsLoggedIn(true);
  return (
    <AuthContext.Provider value={{ data: { isLoggedIn }, setIsLoggedIn }}>
      <Router >
        <Switch>
          <AuthRoute exact path="/dashboard">
            <Navbar />
            <Dashboard />
          </AuthRoute>
          <AuthRoute exact path="/problems">
            <Navbar />
            <Problems />
          </AuthRoute>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;