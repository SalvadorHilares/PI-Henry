import React from 'react'
import styles from './Landing.module.css'
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {getDogs} from "../redux/actions"

const Landing = () => {
  const dispatch = useDispatch();
  dispatch(getDogs());
  return (
    <div className={styles.img_header}>
        <div className={styles.welcome}>
            <h1 className={styles.h1}>Patitas Cariñosas</h1>
            <hr className={styles.hr}/>
            <p className={styles.p}>LA MEJOR MEDICINA ES EL AMOR INCODICIONAL DE TU MASCOTA</p>
            <Link className={styles.button} to='/home'>¡Catálogo!</Link>
        </div>
    </div>
  )
}

export default Landing