import React from 'react'
import styles from './Sidebar.module.css'
import Logo from '../logo/Logo'
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo />
       
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} WorldWise Inc. 
            </p>
        </footer>
    </div>
  )
}
