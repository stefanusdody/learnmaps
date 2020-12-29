import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from "react-router-dom";
import { addData } from './cartHelpers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Locations
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(15),
    height: theme.spacing(15),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Home = () => {
  const classes = useStyles();

  const [details, setDetails] = useState(null)

  const [values, setValues] = useState({
   longitude: null,
   latitude: null,
   redirectToReferrer: false
  })

  const { longitude, latitude, redirectToReferrer } = values

  const getUserGeolocationDetails = () => {
  fetch("https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0")
   .then(response => response.json())
   .then(data => setDetails(data))
  }

  const getCoordinates = (position) => {
   setValues({
        ...values,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
   }

const getLocation = () => {
 if (navigator.geolocation) {
   navigator.geolocation.watchPosition(getCoordinates);
 } else {
   alert("Geolocation is not supported by this browser.");
 }
}

const handleLocationError = (error) => {
 switch(error.code) {
 case error.PERMISSION_DENIED:
  alert("User denied the request for Geolocation.")
  break;
 case error.POSITION_UNAVAILABLE:
  alert("Location information is unavailable.")
  break;
 case error.TIMEOUT:
  alert("The request to get user location timed out.")
  break;
 case error.UNKNOWN_ERROR:
  alert("An unknown error occurred.")
  break;
 default:
 alert("An unknown error occurred.")
 }
};

useEffect(() => {
  getLocation();
  getUserGeolocationDetails()
}, []);

const createData = {
       Browser : navigator.appCodeName,
       UserAgent : navigator.appVersion,
       EngineName : navigator.product,
       ScreenWidth : window.screen.width,
       ScreenHeight : window.screen.height,
       ColorDepth : window.screen.colorDepth,
       OperatingSystem : navigator.platform,
       latitudeCurrent: latitude,
       longitudeCurrent: longitude
     };

     const addToLocalStorage = () => {
        addData(createData)
      }

      const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/maps" />
        }
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonPinIcon className={classes.large} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Locations
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            href="/maps"
            className={classes.submit}
            onClick={addToLocalStorage}
          >
            Search Your Location
          </Button>
          {redirectUser()}
        </form>
        <Typography component="h1" variant="subtitle1">
          Please Turn On your GPS
        </Typography>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Home
