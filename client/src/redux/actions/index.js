export const GET_DOGS = "GET_DOGS";
export const GET_SPECIFIC_NAME = "GET_SPECIFIC_NAME";
export const GET_SPECIFIC_DOG = "GET_SPECIFIC_DOG";
export const CREATE_DOG = "CREATE_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SORT_DOG = "SORT_DOG";
export const GET_PAGES = "GET_PAGES";

export const getPages = (page) =>{
    return async dispatch =>{
        return dispatch({
            type: GET_PAGES,
            payload: page
        })
    }
}

export const sortDogs = (sort) =>{
    return async dispatch =>{
        const res = await fetch("http://localhost:8000/sort",{
            method: "POST",
            body: JSON.stringify(sort),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const dogs = await res.json();
        return dispatch ({
            type: SORT_DOG,
            payload: dogs
        })
    }
}

export const getDogs = () =>{
    return async dispatch =>{
        const res = await fetch("http://localhost:8000/dogs",{
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const dogs = await res.json();
        return dispatch({
            type : GET_DOGS,
            payload : dogs
        });
    }
};

export const getSpecificName = (name) =>{
    return async dispatch =>{
        const res = await fetch(`http://localhost:8000/dogsname=${name}`,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const specificName = await res.json();
        return dispatch(
            {
                type: GET_SPECIFIC_NAME,
                payload: specificName
            }
        );
    }
};

export const getSpecificDog = (id) =>{
    return async dispatch =>{
        const res = await fetch(`http://localhost:8000/dogs/${id}`,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const specificDog = await res.json();
        return dispatch(
            {
                type: GET_SPECIFIC_DOG,
                payload: specificDog
            }
        );
    }
};

export const createDog = (dog) =>{
    return async dispatch => {
        const res = await fetch('http://localhost:8000/dogs',{
            method: 'POST',
            body: JSON.stringify(dog),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const new_dog = await res.json();
        return dispatch({
            type : CREATE_DOG,
            payload : new_dog
        })
    }
};

export const getTemperaments = () =>{
    return async dispatch =>{
        const res = await fetch('http://localhost:8000/temperaments',{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const temperaments = await res.json();
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: temperaments
        })
    }
}