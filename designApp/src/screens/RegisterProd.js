import React,{useState, useEffect} from 'react';

import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native'
import commonStyles from '../CommonStyles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const RegisterProd = () =>{

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [userToken, setUserToken] = useState('');

    const config = {
        headers:{
            'x-access-token': userToken
        }
    }

    useEffect(() => {
        async function fetchData(){
            setUserToken(await AsyncStorage.getItem('user_token'));
            console.log(userToken);
        }
        fetchData();
    })

    const handleSubmit = async () => {
        await api.post('/addDesign',{
            name:name,
            value:value,
            category:category,
        },config).catch(err => console.log(err))
          .then(res => {
              if(res.status == 201){
                  Alert.alert('Sucesso!', 'Produto Cadastrado');
              }
              setName('');
              setValue('');
              setCategory('');
          })
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput style={commonStyles.textInput} placeholder='Nome do Produto'
                       value={name} onChangeText={e => setName(e)} />
            <TextInput style={commonStyles.textInput} placeholder='Preço do Produto'
                       value={value} onChangeText={e => setValue(e)} />
            <TextInput style={commonStyles.textInput} placeholder='Categoria do Produto'
                       value={category} onChangeText={e => setCategory(e)} />
            <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton:{
        width: '90%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#409fff'
    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#FFF'
    }
});

export default RegisterProd;