import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet
} from 'react-native';
import CommonStyles from '../CommonStyles';
import { useSelector } from 'react-redux';

const Menu = () =>{

    const loggedUser = useSelector(state => state.user);
    const [user, setUser] = useState('');

    useEffect(() => {
        setUser(loggedUser);
    })

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Seja Bem Vindo(a) {user.name}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText:{
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Menu;