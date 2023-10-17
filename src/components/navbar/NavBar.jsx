import React from 'react'
import {  NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import Logo from '../logo/Logo';

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink className={styles.ctaLink} to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
