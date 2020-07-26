import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import { BrowserRouter, Link} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    ListItem,
    IconButton,
    ListItemIcon,
    ListItemText,
    Divider,
    List,
    Typography,
    Box
} from "@material-ui/core";
import {
    ArrowBack,
    AssignmentInd,
    Home,
    Apps,
    ContactMail
} from "@material-ui/icons";

//CSS StyLES
const useStyles = makeStyles({
    menuSliderContainer:{
        width: 250,
        background:"#511",
        height: "100%"
    },
    listItem:{
        color: "tan"
    }
   });

   const menuItems = [
       {
           listIcon: <Home/>,
           listText: "Home",
           listPath: "/"
       },
       {
        listIcon: <AssignmentInd/>,
        listText: "Resume",
        listPath: "/resume"

    },
    {
        listIcon: <Apps/>,
        listText: "Portfolio"

    },
    {
        listIcon: <ContactMail/>,
        listText: "Contacts",
        listPath: "/contacts"

    }
   ]

const Navbar= () => {
    const [state, setState] = useState({
        right:false
    })

    const toggleSlider = ((slider, open) => () => {
        setState({...state, [slider]: open});
    });
    const classes = useStyles();

    const slideList = slider => (
        <Box 
        className={classes.menuSliderContainer} 
        component="div"
        onClick={toggleSlider(slider, false)}
        >
            <Divider/>
            <List>
                {menuItems.map((lsItem, key)=>(
                    <BrowserRouter>
                <ListItem button key={key} component={Link} to={lsItem.listPath}>
                    <ListItemIcon className={classes.listItem}>{lsItem.listIcon}</ListItemIcon>
                    <ListItemText className={classes.listItem} primary={lsItem.listText}/>
                </ListItem>
                </BrowserRouter>
                ))}   
            </List>
            </Box>

    )
    return (
        
        <Box component="nav">
            <AppBar position = "static" style={{ background: "#222"}} >
                <Toolbar>
                <IconButton onClick={toggleSlider("right", true)}>
                    <ArrowBack style={{ color: "tomato"}} />
                </IconButton>
                <Typography variant="h5" style= {{ color: "tan"}}>Clean Watts</Typography>
                <MobileRightMenuSlider 
                anchor="right"
                open={state.right}
                onClose={toggleSlider("right", false)}
                >
                    {slideList("right")}
                </MobileRightMenuSlider>
                </Toolbar>
            </AppBar>

        </Box>
        

    )

} 

export default Navbar