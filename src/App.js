import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Container,Typography, Input } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import Home from "./components/Index";
import Resume from "./components/Input";
import Contacts from "./components/Contacts";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";



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
    <Route path="/input" component={Input} />
    <Route path="/contacts" component={Contacts} />
    </Router>
    
  );
}

export default App;
