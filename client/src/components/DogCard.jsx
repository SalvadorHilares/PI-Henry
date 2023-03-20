import React from 'react'
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";

const DogCard = ({id, name, temperament, weight, image}) => {
  return (
    <div key={id} className={styles.DogCard}>
      <img src={image.url} alt={image.id} className={styles.img}></img>
      <h3 className={styles.h3}>{name}</h3>
      <h3 className={styles.h3}>Temperamentos: {temperament}</h3>
      <h3 className={styles.h3}>Peso: {weight} kg</h3>
      <Link to={`/dogs/${id}`} className={styles.link}>Ver Informacion</Link>
    </div>
  )
}

export default DogCard