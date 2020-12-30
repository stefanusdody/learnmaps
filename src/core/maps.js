import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { getData } from './cartHelpers';

const styles = theme => ({
  safe: {
    backgroundColor: "#8bc34a",
    color: "white"
  },
  warning: {
    backgroundColor: "#e57373",
    color: "white"
  },
  danger: {
    backgroundColor: "#b71c1c",
    color: "white"
  },
});

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Maps = (props) => {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [ data, setData ] = useState([])

  useEffect(() => {
    setData(getData())
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
    {data.map((r,i) => (
    <GoogleMap
      key={i}
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={{ lat: r.latitudeCurrent, lng: r.longitudeCurrent }}
      options={options}
    >

      <div>
       <Marker
         position={{ lat: r.latitudeCurrent, lng: r.longitudeCurrent }}
       />
      </div>


    </GoogleMap>
    ))}
    <br/>
    {data.map((r,i) => (
        <Grid key={i} container spacing={3} >
            <Grid item xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="p">
                   Phone data :
                </Typography>
                <Typography variant="body2" component="p">
                   {r.UserAgent}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="p">
                   Operating System :
                </Typography>
                <Typography variant="body2" component="p">
                   {r.OperatingSystem}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="p">
                   Browser :
                </Typography>
                <Typography variant="body2" component="p">
                   {r.Browser}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="p">
                   Device Dimensions  :
                </Typography>
                <Typography variant="body2" component="p">
                   {r.ScreenHeight} x {r.ScreenWidth} Pixel
                </Typography>
            </Grid>
         </Grid>
    ))}
    </div>
  );
}

Maps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Maps);
