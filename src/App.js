import  CssBaseline from "@mui/material/CssBaseline";
import  Grid from "@mui/material/Grid";


import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";
import { useEffect, useState } from "react";



 
function App() {

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('')

  const [childClicked, setchildClicked] = useState(null)

  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);


  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setisLoading] = useState(false)
  const [autocomplete, setAutocomplete] = useState(null);
  const [filteredPlaces, setfilteredPlaces] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoords({ lat: latitude, lng: longitude });
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setfilteredPlaces(filteredPlaces)
  }, [rating])
  

  useEffect(() => {

    if(bounds.sw && bounds.ne) {

    setisLoading(true)

    getWeatherData(coords.lat, coords.lng)
    .then((data) => setWeatherData(data))

    

    getPlacesData(type, bounds.sw, bounds.ne)
    .then((data)=> {
      console.log(data)

      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
      setfilteredPlaces([])
      setRating('')
      setisLoading(false)
    })
  }

  }, [type, bounds])


  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };
  



  return (
    <>
      <CssBaseline />
      <Header  onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
           />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          coords={coords}
          setBounds={setBounds}
          setCoords={setCoords}
          places={filteredPlaces.length ? filteredPlaces : places}
          setchildClicked={setchildClicked}
          weatherData={weatherData}
           />
          
        </Grid>

      </Grid>
    </>

  );
}

export default App;
