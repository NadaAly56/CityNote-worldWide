import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './styles/AppLayout.module.css'
import Map from '../components/map/map'
import { useUser } from '../contexts/userContext'
import { useCities } from '../contexts/citiesContext'
export default function AppLayout() {
  const {getUserData} = useUser()
  const {getCities} = useCities()
  useEffect(()=>{
    getUserData()
    getCities()
  },[])
  return (
    <div className={styles.app}>
        <Sidebar />
        <Map />
    </div>
  )
}
