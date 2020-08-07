import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { green } from "@material-ui/core/colors";
import axios from "axios";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class InputData extends Component {
  constructor(props) {
    super(props);

    this.onChangeKwh = this.onChangeKwh.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      kwh: "",
    };
  }

  onChangeKwh(e) {
    this.setState({
      kwh: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const System = {
      kwh: this.state.kwh,
    };
    //calculations
    const buildSystem = {
      size: 0,
      area: 0,
    };

    const dailyConsumption = Math.ceil(this.state.kwh / 30);
    buildSystem.size = Math.ceil(dailyConsumption / 4.3);
    buildSystem.area = 8 * buildSystem.size;
    console.log(buildSystem);

    axios
      .post("http://localhost:5000/systems/add", buildSystem)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    const { classes } = this.props;

    if (!localStorage.getItem("token")) {
      window.location = "/signin";
      return null;
    }

    return (
      <Container component="main" maxWidth="xs" onSubmit={this.onSubmit}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Build Your System
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={this.onChangeKwh}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="KWh"
              label="Monthly Consumption in KWh"
              name="KWh"
              autoComplete="KWh"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create System
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

export default withStyles(useStyles)(InputData);
