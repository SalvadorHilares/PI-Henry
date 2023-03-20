import {GET_DOGS, GET_SPECIFIC_DOG, GET_SPECIFIC_NAME, 
    CREATE_DOG,GET_TEMPERAMENTS, SORT_DOG, GET_PAGES} from "../actions"

const initialState = {
    dogs : [],
    specific_dog : {},
    temperaments : [],
    dogs_page : []
};

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_SPECIFIC_DOG:
            return{
                ...state,
                specific_dog: action.payload
            }
        case GET_SPECIFIC_NAME:
            return{
                ...state,
                dogs: action.payload
            }
        case CREATE_DOG:
            state.dogs.push(action.payload);
            return{
                ...state,
                dogs: [...state.dogs]
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }
        case SORT_DOG:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_PAGES:
            const array = state.dogs.slice(action.payload*8, 8*(action.payload+1))
            return{
                ...state,
                dogs_page: [...array]
            }
        default:
            return state;
    }
}

export default rootReducer;