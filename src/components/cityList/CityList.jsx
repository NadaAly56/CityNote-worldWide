import { useEffect } from "react";
import { useCities } from "../../contexts/citiesContext";
import CityItem from "../cityItem/CityItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./CityList.module.css";
import { v4 as uuidv4 } from 'uuid';
export default function CityList() {
  const {isLoading, cities, getCities} = useCities()
  // useEffect(()=>{
  //   getCities()
  //   console.log(cities);
  // },[])
  if (isLoading) return <Spinner />
  return cities.length <= 0 ? (
    <Message message="Add your first city by clicking on a city on the map" />
  ) : (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={uuidv4()} city={city} />
      ))}
    </ul>
  );
}
