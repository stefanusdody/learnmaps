import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';


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

const App = (props) => {

  const [viewport, setViewport] = useState({
    latitude: -6.240344,
    longitude: 106.854319,
    width: "100%",
    height: "100vh",
    zoom: 12
  });

  const { classes } = props;
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);


  return (
    <Grid item xs={12} sm={12} md={12}>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/stefanusdody1984/ck8u8nvrx14ml1io1shwto85d"
      onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >


      </ReactMapGL>
     </Grid>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
