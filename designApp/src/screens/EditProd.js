import React,{useState, useEffect} from 'react';

import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import commonStyles from '../CommonStyles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const EditProd = (props) =>{

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    const [userToken, setUserToken] = useState('');
    const prod_id = props.id;

    const config = {
        headers:{
            'x-access-token': userToken
        }
    }

    useEffect(() => {
        const getProduct = async () =>{
          await api.get('/userProducts',{
            headers:{
                'x-access-token':user_token
            }
          }).catch(err => console.log(err))
            .then(res => {
                setProducts(res.data);
                const data = res.data.filter(prod => prod._id == prod_id);
                setProduct({...data[0]});
            })
        }
        getProduct();
    },[props.id]);

    useEffect(() => {
        setName(product.name);
        setValue(product.value);
        setCategory(product.category);
    },[product]);

    useEffect(() => {
        async function fetchData(){
            setUserToken(await AsyncStorage.getItem('user_token'));
        }
        fetchData();
    })

    const handleEdit = () =>{
        const oldProd = products.filter(prod => prod._id !== prod_id);
        const editedProduct = {
            _id: match.params.id,
            name:name,
            value:value,
            category:category
        }
        oldProd.unshift(editedProduct);
        await api.put('/editProduct',{
            products:oldProd
        },config);
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput style={commonStyles.textInput} placeholder='Nome do Produto'
                       value={name} onChangeText={e => setName(e)} />
            <TextInput style={commonStyles.textInput} placeholder='Preço do Produto'
                       value={value} onChangeText={e => setValue(e)} />
            <TextInput style={commonStyles.textInput} placeholder='Categoria do Produto'
                       value={category} onChangeText={e => setCategory(e)} />
            <TouchableOpacity style={styles.sendButton} onPress={handleEdit}>
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

export default EditProd;
