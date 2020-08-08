import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CardActionArea from "@material-ui/core/CardActionArea";
import { withStyles } from '@material-ui/core/styles';

// import { STATES } from 'mongoose';
const axios = require("axios");

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30'
  },

})


class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);

    this.state = {
      size: 0,
      area: 0,
    };
  }

  componentDidMount = () => {
    this.getSystem();
  };

  getSystem = () => {
    console.log("inside get data");
    axios
      .get("http://localhost:5000/systems")
      .then((response) => {
        const system = response.data;
        this.setState({ size: system.size, area: system.area });
        console.log(response.data);
        console.log("Data has been received!!");
      })
      .catch((err) => {
        alert("Error retrieving data!!!", err);
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();

    const system = {
      size: this.state.size,
      area: this.state.area,
    };
  };

  onChangeSize(e) {
    this.setState({
      size: e.target.value,
    });
  }
  onChangeArea(e) {
    this.setState({
      size: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    if (!localStorage.getItem("token")) {
      window.location = "/signin";
      return null;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <DoneOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5"></Typography>
          <form className={classes.form} noValidate>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://sc02.alicdn.com/kf/H5c9a3316d8aa4d718673050efcb28873W.jpg"
                  title="system components "
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    System Specifications
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Size: {this.state.size} KWh
                    <br />
                    Area: {this.state.area} m²
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/input"

            >
              Recalculate
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/"

            >
              Back to HomePage
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}
export default withStyles(useStyles)(ResultPage);
