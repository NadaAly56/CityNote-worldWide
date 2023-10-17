import CityItem from '../cityItem/CityItem'
import Spinner from '../spinner/Spinner'
import styles from './CityList.module.css'
export default function CityList({cities, isLoading}) {

  return (
    isLoading? <Spinner />:
    <ul className={styles.cityList}>
        {
        cities.map(city =>
        <CityItem  key={city.id} city={city}/>)
        }
    </ul>
  )
}
