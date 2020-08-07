import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { green } from '@material-ui/core/colors';
// import { STATES } from 'mongoose';
import axios from 'axios';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  }
})

class SignUp extends Component {
constructor(props){
  super(props);
  

  this.onChangeName = this.onChangeName.bind(this);
  this.onChangeEmail = this.onChangeEmail.bind(this);
  this.onChangePassword = this.onChangePassword.bind(this);
  this.onSubmit = this.onSubmit.bind(this);



  this.state = {
    name: "",
    email: "",
    password: ""
  }
}
// componentDidMount() {
//   this.setState({
//     name: "asdada",
//     email:"sdf,kjnkln@.comn",
//     password:"51378584gjgk"
//   })
// }

onChangeName (e) {
  this.setState({
    name: e.target.value
  })
}
onChangeEmail (e) {
  this.setState({
    email: e.target.value
  })
}
onChangePassword (e) {
  this.setState({
    password: e.target.value
  })
}

onSubmit(e) {
  e.preventDefault();

  const user = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password
  };

  axios.post('http://localhost:5000/user/register', user)
  .then(res => {
    console.log(res);
    this.props.history.push("/signin")
  })
  .catch(error => {
      console.log(error.response)
  })};
  

render(){
const {classes} = this.props
  return (
    <Container component="main" maxWidth="xs"   onSubmit={this.onSubmit}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <ValidatorForm className={classes.form} ref="form"
                onSubmit={this.onSubmit}
            
                onError={errors => console.log(errors)}>
        <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            value={this.state.name}
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={this.onChangeName}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={this.state.email}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChangeEmail}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}

          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={this.state.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChangePassword}
            validators={['required', 'minNumber:6']}
            errorMessages={['this field is required', 'min characters is 6 or above']}

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="./signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  )}
  };

  export default withStyles(useStyles)(SignUp)