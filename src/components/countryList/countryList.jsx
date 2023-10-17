import React, { useEffect } from 'react'
import styles from './countryList.module.css'
import Spinner from '../spinner/Spinner'
import CountryItem from '../countryItem/CountryItem'
import Message from '../message/Message'

export default function CountryList({isLoading, cities}) {
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
            <CountryItem  key={country.id} country={country}/>)
            }
        </ul>
      )
}
