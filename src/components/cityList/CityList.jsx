import CityItem from "../cityItem/CityItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./CityList.module.css";
export default function CityList({ cities, isLoading }) {
  return isLoading ? (
    <Spinner />
  ) : cities.length <= 0 ? (
    <Message message="Add your first city by clicking on a city on the map" />
  ) : (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
