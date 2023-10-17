import styles from './CityList.module.css'
export default function CityList({cities, isLoading}) {

  return (
    isLoading? <div>Loading....</div>:
    cities && <ul className={styles.cityList}>
        {
        cities.map(city=><li key={city.id}>{city.city_name}</li>)
        }
    </ul>
  )
}
