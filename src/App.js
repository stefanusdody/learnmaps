import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker} from "react-map-gl";
import { makeStyles } from '@material-ui/core/styles';
import PinDropIcon from '@material-ui/icons/PinDrop';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import * as parkDate from "./data/skateboard-parks.json";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: -6.2349858,
    longitude: 106.9945444,
    width: "100%",
    height: "100vh",
    zoom: 12
  });

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
          <MenuItem
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}

          >
            <Card >
              <CardContent>
               <Typography variant="h5" component="h2">
                 {selectedPark.properties.title}
               </Typography>
               <br/>
               <Grid container spacing={2}>

                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p">
                     Pasien Positif
                  </Typography>
                 </Grid>
                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p" align="right">
                     {selectedPark.properties.konfimasi}
                  </Typography>
                 </Grid>

                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p">
                     Pasien Dalam Pengawasan (PDP)
                  </Typography>
                 </Grid>
                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p" align="right">
                     {selectedPark.properties.PDP}
                  </Typography>
                 </Grid>

                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p">
                     Orang Dalam Pemantauan (ODP)
                  </Typography>
                 </Grid>
                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p" align="right">
                     {selectedPark.properties.ODP}
                  </Typography>
                 </Grid>

                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p">
                     Data Update
                  </Typography>
                 </Grid>
                 <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="body2" component="p" align="right">
                     {selectedPark.properties.update}
                  </Typography>
                 </Grid>

                 <Grid item xs={4} sm={4} md={4}>
                  <Typography variant="body2" component="p">
                     Sumber Data
                  </Typography>
                 </Grid>
                 <Grid item xs={8} sm={8} md={8}>
                  <Typography variant="body2" component="p" align="right">
                     {selectedPark.properties.sumber}
                  </Typography>
                 </Grid>

               </Grid>
              </CardContent>
            </Card >
          </MenuItem>
        ) : null}

      </ReactMapGL>
      </Grid>
  );
}

export default App;
