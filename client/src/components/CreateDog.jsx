import React, { useState, useEffect} from 'react'
import * as ReactRedux from "react-redux";
import { createDog, getTemperaments} from '../redux/actions';
import styles from "./CreateDog.module.css"

const CreateDog = () => {
  const [input,setInput] = useState({
    name : "",
    weight : new Array(2),
    height : new Array(2),
    YearsLife : "",
    temperaments : ""
  })
  const dispatch = ReactRedux.useDispatch();
  const temperaments = ReactRedux.useSelector((state) => state.temperaments);

  const onHandleChange = (e) => {
    if(e.target.name === 'temperaments'){
      input.temperaments = input.temperaments + e.target.value + ', ';
    }else if(e.target.name === 'min_weight'){
     input.weight[0] = e.target.value.toString();
    }else if(e.target.name === 'max_weight'){
      input.weight[1] = e.target.value.toString();
    }else if(e.target.name === 'min_height'){
      input.height[0] = e.target.value.toString();
    }else if(e.target.name === 'max_height'){
      input.height[1] = e.target.value.toString();
    }else{
      setInput({...input, [e.target.name] : e.target.value})
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(createDog({
      name : input.name,
      weight : input.weight[0] + " - " +input.weight[1],
      height : input.height[0] + " - " +input.height[1],
      YearsLife : input.YearsLife,
      temperaments : input.temperaments
    }));
  }

  useEffect(() =>{
    dispatch(getTemperaments())
  }, [dispatch])

  return (
    <div className={styles.create}>
    <h1 className={styles.h1}>Crea a tu perro favorito</h1>
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <label>Nombre : </label>
      <input type="text" name="name" onChange={onHandleChange} required/>
      <label>Peso minimo: </label>
      <input type="number" name='min_weight' min={1} onChange={onHandleChange} required></input>
      <label>Peso máximo: </label>
      <input type="number" name='max_weight' min={1} onChange={onHandleChange} required></input>
      <label>Altura minima: </label>
      <input type="number" name='min_height' min={1} onChange={onHandleChange} required></input>
      <label>Altura máxima: </label>
      <input type="number" name='max_height' min={1} onChange={onHandleChange} required></input>
      <label>Años de vida: </label>
      <input type="number" name='YearsLife' min={1} onChange={onHandleChange}></input>
      <label>Temperamentos: </label>
      <select multiple name='temperaments' onChange={onHandleChange}>
        {temperaments.map(temper => {
          return(
          <option value={temper} key={temper}>{temper}</option>
          )
        })}
      </select>
      <button type="submit">Crear Perro</button>
    </form>
    </div>
  )
}

export default CreateDog