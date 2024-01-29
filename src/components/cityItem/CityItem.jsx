import React, { useEffect } from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../../contexts/citiesContext'
export default function CityItem({city}) {
    const { currentCity, deleteCity } = useCities()
    const {city_name, date, emoji, id, position} = city
    const lat = position._lat
    const long = position._long
    const formatedDate = date && date.toDate()? date.toDate().toDateString():"date"
    function handleDelete(e) {
      e.preventDefault()
      deleteCity(id)
    }
    return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${long}`} 
      className={`${styles.cityItem} ${id === currentCity.id? styles['cityItem--active']:''}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{city_name}</h3>
        <time className={styles.date}>{formatedDate}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
    </Link>
    </li>
    
  )
}
