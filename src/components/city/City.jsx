import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCities } from '../../contexts/citiesContext';
import styles from './City.module.css'
import Button from '../button/Button';
import Spinner from '../spinner/Spinner';
export default function City() {
    const {currentCity, setCurrentCity, getCurrentCity, isLoading} = useCities()
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(()=>{
        getCurrentCity(id)
    },[id])
    if (isLoading) return <Spinner />
    const {city_name, date, notes, emoji} = currentCity
    const formatedDate = date && date.toDate()? date.toDate().toDateString():"date"
  return (
     <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {city_name}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {city_name} on</h6>
        <p>{formatedDate}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${city_name}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {city_name} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" onClick={()=>navigate(-1)} >&larr; back</Button>
      </div>
    </div>
  )
}
