import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { green } from '@material-ui/core/colors';
import axios from 'axios';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});




class InputData extends Component {
constructor(props){
  super(props);


  this.onChangeKwh = this.onChangeKwh.bind(this);
  this.onChangeArea = this.onChangeArea.bind(this);
  this.onSubmit = this.onSubmit.bind(this);


  this.state = {
    kwh: "",
    area: ""
  }
}  
  

onChangeKwh (e) {
  this.setState({
    kwh: e.target.value
  })
}
onChangeArea (e) {
  this.setState({
    area: e.target.value
  })
}

onSubmit(e) {
  e.preventDefault();

  const System = {
    kwh: this.state.kwh,
    area: this.state.area
  }
  axios.post('http://localhost:5000/systems/add', System)
  .then(res => {
    console.log(res);
})
  .catch(error => {
    console.log(error.response)
  })};

render(){
  const {classes} = this.props

  
  return (
    <Container component="main" maxWidth="xs" onSubmit={this.onSubmit}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Build Your System
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="KWh"
            label="Monthly Consumption"
            name="KWh"
            autoComplete="KWh"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="area"
            label="Area available for the System"
            name="area"
            autoComplete="area"
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
            <Grid item xs>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Already have an account? Sign In"}
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  )};
}

export default withStyles(useStyles)(InputData)