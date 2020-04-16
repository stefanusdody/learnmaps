import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import * as parkDate from "./data/skateboard-parks.json";

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
    latitude: -6.236217,
    longitude: 106.994227,
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
      {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
          <div
          onClick={e => {
          e.preventDefault();
          setSelectedPark(park);
          }}
          >

           {park.properties.konfimasi < 1 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.safe }}/>
           )}

           {park.properties.konfimasi == 1 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 2 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 3 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 4 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 5 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 6 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 7 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 8 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi == 9 && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.warning }}/>
           )}

           {park.properties.konfimasi >= 10  && (
            <Badge badgeContent={park.properties.konfimasi} classes={{ badge: classes.danger }} />
           )}

           </div>
          </Marker>

        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <Card>
              <CardContent>
               <Typography variant="h5" component="h2" align="center">
                 {selectedPark.properties.title}
               </Typography>
               <br/>

                  <Typography variant="body2" component="p" align="center">
                     Pasien Positif
                  </Typography>

                  <Typography variant="body2" component="p" align="center">
                   {selectedPark.properties.konfimasi}
                  </Typography>
                  <br/>

                  <Typography variant="body2" component="p" align="center">
                     Pasien Dalam Pengawasan (PDP)
                  </Typography>

                  <Typography variant="body2" component="p" align="center">
                     {selectedPark.properties.PDP}
                  </Typography>
                  <br/>

                  <Typography variant="body2" component="p" align="center">
                     Orang Dalam Pemantauan (ODP)
                  </Typography>

                  <Typography variant="body2" component="p" align="center">
                     {selectedPark.properties.ODP}
                  </Typography>
                  <br/>

                  <Typography variant="body2" component="p" align="center">
                     Data Update
                  </Typography>

                  <Typography variant="body2" component="p" align="center">
                     {selectedPark.properties.update}
                  </Typography>
                  <br/>

                  <Typography variant="body2" component="p" align="center">
                     Sumber Data
                  </Typography>

                  <Typography variant="body2" component="p" align="center">
                     {selectedPark.properties.sumber}
                  </Typography>
                  <br/>

                  <Typography variant="body2" component="p" align="center">
                     Disclaimer
                  </Typography>

                  <Typography variant="body2" component="p" align="center">
                     Titik yang ditunjukan pada peta merujuk pada titik area Kelurahan
                  </Typography>
                  <Typography variant="body2" component="p" align="center">
                     (bukan titik lokasi/tempat tinggal pasien)
                  </Typography>

              </CardContent>
            </Card >
          </Popup>
        ) : null}

      </ReactMapGL>
     </Grid>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
