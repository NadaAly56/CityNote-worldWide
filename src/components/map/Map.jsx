import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate} from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../../contexts/citiesContext';
import useGeolocation from '../../hooks/useGeoLocation';
import Button from '../button/Button';
import useUrlPosition from '../../hooks/useUrlPosition';
import { v4 as uuidv4 } from 'uuid';
export default function Map() {
  const { cities} = useCities()
  const [mapPosition, setMapPosition] = useState([40,0])
  const {isLoading, position, getPosition} = useGeolocation()
  const [lat, lng] = useUrlPosition()

  useEffect(()=>{
    if(lat && lng) setMapPosition([lat, lng])
  },[lat, lng])

  useEffect(()=>{
    if (position) setMapPosition([position.lat, position.lng])
  },[position])
  return   (
    <div className={styles.mapContainer}>
      {!position && <Button type='position' onClick={getPosition}>
        {isLoading?'Loading...':'Use your position'}
      </Button>}
        <MapContainer className={styles.map} center={mapPosition} zoom={7} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <Marker position={mapPosition}>
        <Popup>
          your location
        </Popup>
      </Marker>
    {
     cities.map(city=>{
        return <Marker key={uuidv4()} position={[city.position._lat, city.position._long]}>
        <Popup>
          {city.city_name}
        </Popup>
      </Marker>
      })
    }
    <ChangeCenter position={mapPosition} />
    <DetectClick />
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null;
}
function DetectClick(){
  const navigate = useNavigate()
  useMapEvents({
    click: e=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}