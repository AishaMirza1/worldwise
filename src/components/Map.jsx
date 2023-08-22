import { useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer,Popup, useMap, useMapEvents} from 'react-leaflet'
import { useCities } from '../contexts/CityProvider';

import Button from "./Button"
import styles from "./Map.module.css"
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const {cities} = useCities()
  const [mapLat,mapLng] = useUrlPosition()
  const[ position,setPosition]= useState([28.7041,77.1025])
  const {isLoading :isLoadingPosition, position:geolocationPosition,getPosition} = useGeolocation()


 
  useEffect(()=>{
    if(mapLat && mapLng) setPosition([mapLat,mapLng])
  },[mapLat,mapLng])
   
  useEffect(()=>{
   
    if(geolocationPosition!=null) setPosition([geolocationPosition.lat,geolocationPosition.lng])
  },[geolocationPosition])
  return (
    <div className={styles.mapContainer} >
   {!geolocationPosition && <Button type="position" onClick={getPosition}>{isLoadingPosition? "Loading..." : "Use Your Position"}</Button>}
    <MapContainer center={position} zoom={4} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>
      <Marker position={[city.position.lat,city.position.lng]} key={city.id}> 
      <Popup>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
    )}
  
    <ChangeCenter position={position} />
    <DetectClick />
  </MapContainer>
    </div>
  );
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position,7)
return null
}
function DetectClick(){
  const navigate = useNavigate()

  useMapEvents({
    click: (e)=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    
  })
  return null
}

export default Map;
