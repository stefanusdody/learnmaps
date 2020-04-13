import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { makeStyles } from '@material-ui/core/styles';
import PinDropIcon from '@material-ui/icons/PinDrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import * as parkDate from "./data/skateboard-parks.json";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: -6.2349858,
    longitude: 106.9945444,
    width: "100%",
    height: "100vh",
    zoom: 12
  });

  const classes = useStyles();
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
      mapStyle="mapbox://styles/stefanusdody1984/ck8u8q2m414ow1io1gi4sihjy"
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
           <Badge badgeContent={park.properties.konfimasi} color="secondary">
             <PinDropIcon/>
           </Badge>
           </div>
          </Marker>

        ))}

        {selectedPark ? (
          <Popup
            className={classes.root}
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <Card >
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

export default App;
