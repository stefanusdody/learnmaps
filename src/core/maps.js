import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Container from '@material-ui/core/Container';

import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
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

const center = {
  lat: -6.200000,
  lng: 106.816666,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Maps = (props) => {

  const { classes } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [ data, setData ] = useState([])
  const [selected, setSelected] = React.useState(null);

  const [viewport, setViewport] = useState({
    latitude: -6.200000,
    longitude: 106.816666,
    width: "100%",
    height: "100vh",
    zoom: 5
  });


  useEffect(() => {
    setData(getData())
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={5}
      center={center}
      options={options}
    >
    {data.map((r,i) => (
      <div key={i}>
       <Marker
         position={{ lat: r.latitudeCurrent, lng: r.longitudeCurrent }}
         onClick={() => {
              setSelected(data);
            }}
       />
      </div>
    ))}

    {selected ? (
          <InfoWindow
            position={{ lat: selected.latitudeCurrent, lng: selected.longitudeCurrent }}
          >
            <div>
              <h2>
                Alert
              </h2>
            </div>
          </InfoWindow>
        ) : null}


    </GoogleMap>
    </div>
  );
}

Maps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Maps);
