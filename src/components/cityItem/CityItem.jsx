import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { convertToEmoji } from '../form/Form'
import { useCities } from '../../contexts/citiesContext'
export default function CityItem({city}) {
    const { currentCity } = useCities()
    const {city_name, emoji, date, id, position} = city
    const lat = position._lat
    const long = position._long
    // const timestamp = new Timestamp(date);
    // const jsDate = timestamp.toDate();
  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${long}`} 
      className={`${styles.cityItem} ${id === currentCity.id? styles['cityItem--active']:''}`}>
      {console.log(date.toDate(), typeof date)}
        <span className={styles.emoji}>{convertToEmoji('U+1F604')}</span>
        <h3 className={styles.name}>{city_name}</h3>
        <time className={styles.date}>{}</time>
        <button className={styles.deleteBtn}>&times;</button>
    </Link>
    </li>
    
  )
}
