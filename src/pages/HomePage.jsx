import React from 'react'
import styles from '../pages/styles/homepage.module.css'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/navbar/navBar'
export default function Home() {
  return  <main className={styles.homepage}>
    <NavBar />
  <section>
    <h1>
      You travel the world.
      <br />
      WorldWide keeps track of your adventures.
    </h1>
    <h2>
      A world map that tracks your footsteps into every city you can think
      of. Never forget your wonderful experiences, and show your friends how
      you have wandered the world.
    </h2>
    <Link to='/app' className='cta'>Start Tracking now</Link>
  </section>
</main>
}
