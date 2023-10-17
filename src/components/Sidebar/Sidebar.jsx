import React from 'react'
import styles from './Sidebar.module.css'
import Logo from '../logo/Logo'
import AppNav from '../appNav/AppNav'
import { Outlet } from 'react-router-dom'
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo />
       <AppNav />
       <Outlet />
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} WorldWise Inc. 
            </p>
        </footer>
    </div>
  )
}
