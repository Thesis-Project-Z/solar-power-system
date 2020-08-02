import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Container,Typography, Input } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import Home from "./components/Index";
import InputData from "./components/Input";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Results from "./components/Results";



const useStyles = makeStyles((theme) => ({
 drawerPaper: { width: 'inherit'},
 link: {
   textDecoration:'none',
   color: theme.palette.text.primary
 }
}))

function App() {
  
  const classes = useStyles();
  
  return (
    
    <Router>
      <Navbar/>
    <CssBaseline/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/signin" component={SignIn}/>
    <Route path="/" component={Home} />
    <Route path="/input" component={InputData} />
    <Route path="/results" component={Results} />
    </Router>
    
  );
}

export default App;
