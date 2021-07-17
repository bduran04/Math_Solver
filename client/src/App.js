import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar'
import { MuiThemeProvider } from '@material-ui/core';
import "./App.css";

function App() {
  return (
    <MuiThemeProvider>
      <Router >
          <Navbar />
      </Router>
    </MuiThemeProvider>
    );
  };

export default App;