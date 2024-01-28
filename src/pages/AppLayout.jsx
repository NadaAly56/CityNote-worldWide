import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './styles/AppLayout.module.css'
import Map from '../components/map/map'
import User from '../components/user/User'
import { useUser } from '../contexts/userContext'
import { useCities } from '../contexts/citiesContext'
export default function AppLayout() {
  // const {getUserData} = useUser()
  // const {getCities} = useCities()
  // useEffect(()=>{
  //   getCities()
  // },[])
  return (
    <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
    </div>
  )
}
