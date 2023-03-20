import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as actions from "../redux/actions";
import styles from './DogDetail.module.css'

const DogDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const dogDetail = useSelector((state) => state.specific_dog);
  React.useEffect(()=>{
    dispatch(actions.getSpecificDog(params.id))
  },[dispatch, params.id])
  return (
    <div className={styles.specific}>
      <div className={styles.right}>
        <h1 className={styles.h1}>Raza</h1>
      {dogDetail.image !== undefined ? 
      <img className={styles.img} src={dogDetail.image.url} alt={dogDetail.image.id}>
      </img> : setTimeout(0.5)}
      <h1 className={styles.h1}>{dogDetail.name}</h1>
      </div>
      <div className={styles.left}>
      <h1 className={styles.h12}>Características</h1>
      <hr/>
      <h2 className={styles.h2}>Años de vida : {dogDetail.YearsLife}</h2>
      <h2 className={styles.h2}>Temperamento : {dogDetail.temperament}</h2>
      <h2 className={styles.h2}>Peso : {dogDetail.weight} kg</h2>
      <h2 className={styles.h2}>Altura : {dogDetail.height} cm</h2>
      </div>
    </div>
  )
}

export default DogDetail;