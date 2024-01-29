import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './styles/AppLayout.module.css'
import Map from '../components/map/map'
import User from '../components/user/User'

export default function AppLayout() {
  
  return (
    <div className={styles.app}>
     
        <Sidebar />
        
        <Map />
        <User />
    </div>
  )
}
