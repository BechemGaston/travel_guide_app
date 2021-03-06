import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import Rating from "@mui/lab/Rating";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import useStyles from "./styles";


function Map({coords, setBounds, setCoords, places, setchildClicked, weatherData}) {


    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
          <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          defaultCenter={coords}
          center={coords}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(e) => {
            setCoords({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
          }}
          onChildClick={(child) => setchildClicked(child)}
          >
          {places?.map((place, i) => (
            <div className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
            >
            {
              ! isDesktop ? (
                <LocationOnIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevator={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                <img 
                className={classes.pointer}
                src={place.photo? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                alt={place.name}
                /> 
                <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }

            </div>
          ))}

          {weatherData?.list?.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lng}>
              <img height={100} src={`https://openweathermap.org/img/w/${data.weatherData[0].icon}.png`} alt="weather" />
            </div>
          
          ))}
          </GoogleMapReact>
        </div>
    )
};


export default Map;