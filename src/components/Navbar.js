import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import { BrowserRouter, Link, withRouter} from 'react-router-dom';
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
    ContactMail,
    LockOpen,
    PersonAdd
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

 
const Navbar= (props) => {
    const menuItems = [
        {
            listIcon:<PersonAdd/>,
            listText: "SignUp",
            onClick: () => {
                props.history.push("/signup")
            }
        },
        {
            listIcon: <LockOpen/>,
            listText: "SignIn",
            onClick : () => {
                props.history.push('/signin')
            }
        },
        {
            listIcon: <Home/>,
            listText: "Home",
            onClick : () => { 
                props.history.push("/")
        }
        },
        {
         listIcon: <AssignmentInd/>,
         listText: "Resume",
         onClick : () => {
             props.history.push("/resume")
         }
 
     },
     {
         listIcon: <Apps/>,
         listText: "Portfolio"
 
     },
     {
         listIcon: <ContactMail/>,
         listText: "Contacts",
         onClick : () => {
             props.history.push("/contacts")
         }
 
     }
    ]
 
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
                <ListItem button key={key} onClick = {lsItem.onClick}>
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

export default withRouter(Navbar);
