import React from 'react'
import styles from './CityItem.module.css'
import { Timestamp } from 'firebase/firestore';
export default function CityItem({city}) {
    const {city_name, emoji, date} = city
    // const timestamp = new Timestamp(date);
    // const jsDate = timestamp.toDate();
  return (
    <li className={styles.cityItem}>
      {console.log(date, typeof date)}
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{city_name}</h3>
        <time className={styles.date}>{}</time>
        <button className={styles.deleteBtn}>&times;</button>
    </li>
  )
}
