import React, { useEffect, useState } from 'react'
import {  NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import Logo from '../logo/Logo';
import { useUser } from '../../contexts/userContext';

export const NavBar = () => {
  const {handleSignOut, isUserSigned} = useUser()
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
        { !isUserSigned ?
          <>
           <li>
          <NavLink className={styles.ctaLink} to="/login">Login</NavLink>
          </li>
          <li>
          <NavLink className={styles.ctaLink} to="/signup">sign up</NavLink>
        </li>
          </> : 
          <li>
          <NavLink className={styles.ctaLink} to="/" onClick={handleSignOut}>sign Out</NavLink>
        </li>
        }
       
      </ul>
    </nav>
  );
}
