import React, { useEffect, useState } from 'react';
import {
    SafeAreaView
} from 'react-native';
import ProdList from '../components/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../store/actions/user';

const Products = () =>{

    const products = useSelector(state => state.user.products);
    const [userToken, setUserToken] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData(){
            setUserToken(await AsyncStorage.getItem('user_token'));
        }
        fetchData();
        dispatch(getUser(userToken));
    })

    return(
        <SafeAreaView>
            <ProdList data={products}/>
        </SafeAreaView>
    )
}

export default Products;