import React from 'react'
import styles from './CountryItem.module.css'
export default function CountryItem({country}) {
   
    return (
        <li className={styles.countryItem}>
          
            <span>"🇵🇹"</span>
            <h3 className={styles.name}>{country.country}</h3>
            
           
        </li> )
}
