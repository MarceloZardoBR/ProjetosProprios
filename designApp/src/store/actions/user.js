import { LOGGIN_USER } from './actionTypes';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const baseURL = 'http://localhost:3333';

export const loggedUser = user =>{
    return{
        type: LOGGIN_USER,
        payload: user
    }
}

export const authUser = (props) => {
    return dispatch => {
        axios.post(`${baseURL}/design/auth`,{
            login:props.login,
            password:props.password
        }).catch(err => console.log(err))
          .then(res => {
              AsyncStorage.setItem('user_token',res.data.token);
              dispatch(getUser(res.data.token));
          })
    }
}

export const getUser = token =>{
    return dispatch =>{
        axios.get(`${baseURL}/user`,{
            headers:{
                'x-access-token': token
            }
        }).catch(err => console.log(err))
          .then(res => {
            dispatch(loggedUser(res.data));
          })
    }
}

