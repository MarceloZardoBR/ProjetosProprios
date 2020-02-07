import { LOGGIN_USER } from '../actions/actionTypes';

const initialState = {
    name: null,
    login: null,
    email: null,
    products: [{
        name: null,
        value: null,
        category: null
    }]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGGIN_USER:
            return{
                ...state,
                name:action.payload.name,
                login:action.payload.login,
                email:action.payload.email,
                products:[...action.payload.products]
            }
        default: return state
    }
}

export default reducer;