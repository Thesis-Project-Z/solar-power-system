import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
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
  Box,
} from "@material-ui/core";
import {
  DehazeRounded,
  AssignmentInd,
  Home,
  Apps,
  Settings,
  LockOpen,
  PersonAdd,
  MeetingRoom,
} from "@material-ui/icons";
import AuthService from "../services/auth.service";

//CSS StyLES
const useStyles = makeStyles({
  menuSliderContainer: {
    width: 250,
    background: "#1FA91A",
    height: "100%",
  },
  listItem: {
    color: "#ffffff",
  },
});

const Navbar = (props) => {
  var menuItems = [];

  let login = localStorage.getItem("token");
  if (login) {
    menuItems = [
      {
        listIcon: <Home />,
        listText: "Home",
        onClick: () => {
          props.history.push("/");
        },
      },
      {
        listIcon: <AssignmentInd />,
        listText: "Create your System",
        onClick: () => {
          props.history.push("/input");
        },
      },
      {
        listIcon: <Apps />,
        listText: "Portfolio",
      },
      {
        listIcon: <Settings />,
        listText: "ResultPage",
        onClick: () => {
          props.history.push("/results");
        },
      },
    ];
  } else
    menuItems = [
      {
        listIcon: <PersonAdd />,
        listText: "SignUp",
        onClick: () => {
          props.history.push("/signup");
        },
      },
      {
        listIcon: <LockOpen />,
        listText: "SignIn",
        onClick: () => {
          props.history.push("/signin");
        },
      },
      {
        listIcon: <Home />,
        listText: "Home",
        onClick: () => {
          props.history.push("/");
        },
      },
    ];

  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };
  const classes = useStyles();

  const slideList = (slider) => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={toggleSlider(slider, false)}
    >
      <Divider />
      <List>
        {menuItems.map((lsItem, key) => (
          <BrowserRouter>
            <ListItem button key={key} onClick={lsItem.onClick}>
              <ListItemIcon className={classes.listItem}>
                {lsItem.listIcon}
              </ListItemIcon>
              <ListItemText
                className={classes.listItem}
                primary={lsItem.listText}
              />
            </ListItem>
          </BrowserRouter>
        ))}
      </List>
    </Box>
  );

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <Box component="nav">
      <AppBar position="static" style={{ background: "#1FA91A" }}>
        <Toolbar>
          <IconButton onClick={toggleSlider("right", true)}>
            <DehazeRounded style={{ color: "#fff747" }} />
          </IconButton>
          <Typography variant="h5" style={{ color: "#ffffff" }}>
            Clean Watts
          </Typography>
          <MobileRightMenuSlider
            open={state.right}
            onClose={toggleSlider("right", false)}
          >
            {slideList("right")}
          </MobileRightMenuSlider>
          {localStorage.getItem("token") && (
            <IconButton>
              <MeetingRoom onClick={handleLogout} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withRouter(Navbar);
