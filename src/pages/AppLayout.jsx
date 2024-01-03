import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './styles/AppLayout.module.css'
import Map from '../components/map/map'
import { useUser } from '../contexts/userContext'
export default function AppLayout() {
  const {getUserData, user} = useUser()
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <div className={styles.app}>
        <Sidebar />
        <Map />
    </div>
  )
}
