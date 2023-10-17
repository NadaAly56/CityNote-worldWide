import React, { useEffect } from 'react'
import styles from './countryList.module.css'
import Spinner from '../spinner/Spinner'
import CountryItem from '../countryItem/CountryItem'
import Message from '../message/Message'
import { useCities } from '../../contexts/citiesContext'

export default function CountryList() {
    const {isLoading, cities} = useCities()
    useEffect(()=>{
        console.log("loading",isLoading)
        console.log(cities)
    },[isLoading, cities])
     if (isLoading) return <Spinner />
    if (cities.length<=0) return <Message message="Add your first city by clicking on a city on the map" />
    
    const countries = cities.reduce((arr, city)=>{
        if (!arr.map((el)=>el.country).includes(city.country))
            return [...arr, {country: city.country, emoji: city.emoji}]
        else return arr 
    },[])
    
    return (
        <ul className={styles.countryList}>
            {
            countries.map(country =>
            <CountryItem  key={country.country} country={country}/>)
            }
        </ul>
        
      )
}
