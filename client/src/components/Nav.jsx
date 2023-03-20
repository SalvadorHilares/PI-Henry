import React from 'react'
import { Link } from "react-router-dom";
import styles from './Nav.module.css'

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <h1 className={styles.title}>Patitas Cariñosas</h1>
      </div>
      <div className={styles.list_container}>
      <Link to='/home' className={styles.link}>Home</Link>
      <Link to='/dog/create' className={styles.link}>Crear perro</Link>
      </div>
    </div>
  )
}

export default Nav