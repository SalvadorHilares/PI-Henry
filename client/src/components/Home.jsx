import React, {useEffect, useState} from 'react'
import * as ReactRedux from "react-redux";
import * as actions from "../redux/actions";
import DogCard from './DogCard';
import styles from './Home.module.css'

const Home = () => {
  const [options, setOptions] = useState({
    search : '',
    sort : '',
    option : '',
    page : 0,
    isSort : 0,
    isSearch : 0
  });

  const dispatch = ReactRedux.useDispatch();
  const dogsPage = ReactRedux.useSelector((state) => state.dogs_page);
  const dogs = ReactRedux.useSelector((state) => state.dogs)

  const handleChange = (e) =>{
    e.preventDefault();
    setOptions({...options,[e.target.name] : e.target.value});
  }

  const handlePageClick = async () =>{
    dispatch(actions.getPages(options.page))
  }

  const Anterior = () =>{
    if(options.page - 1 > -1){
      options.page = options.page - 1;
      handlePageClick();
    }
  }

  const Siguiente = () =>{
    if(options.page + 1 < Math.ceil(dogs.length/8)){
      options.page = options.page + 1;
      handlePageClick();
    }
  }

  const handleFilter = async (e) =>{
    e.preventDefault();
    dispatch(actions.sortDogs({
      array : dogs,
      sort : options.sort,
      type: options.option
    }))
    options.isSort++;
  }

  const handleSearch = (e) =>{
    e.preventDefault();
    if(options.search === ''){
      dispatch(actions.getDogs());
    }else{
      dispatch(actions.getSpecificName(options.search));
    }
    options.isSearch++;
  }

  useEffect(()=>{
    console.log("second")
  })

  useEffect(() =>{
    console.log("first")
    dispatch(actions.getPages(options.page))
  },[dispatch, options.isSort, options.page, options.isSearch])

  useEffect(()=>{
    console.log("Error");
  },[])

  return (
    <div className={styles.home}>
      <h1 className={styles.h1}>Bienvenido al mejor aplicativo para conocer a tu perro ideal</h1>
      <form onSubmit={(e) => handleFilter(e)}>
        <select name='option' onChange={handleChange} className={styles.select}>
          <option value='name'>Orden alfabético</option>
          <option value='weight'>Peso</option>
        </select>
        <select name='sort' onChange={handleChange} className={styles.select}>
          <option value='ascendente'>Ascendente</option>
          <option value='descendente'>Descendente</option>
        </select>
        <button type='submit' className={styles.buttom}>Filtrar</button>
      </form>
      <input className={styles.input} type='search' name='search' value={options.search} onChange={handleChange}></input>
      <button type='submit' onClick={handleSearch}>Buscar</button>
      { 
      dogsPage.map(dog =>{
          return <DogCard
          key={dog.id}
          id = {dog.id}
          name = {dog.name}
          temperament = {dog.temperament}
          weight = {dog.weight}
          image = {dog.image}
          />
        })
      }
      <button onClick={Anterior} className={styles.buttom}>Anterior</button>
      <button onClick={Siguiente} className={styles.buttom}>Siguiente</button>
    </div>
  )
}

export default (Home);