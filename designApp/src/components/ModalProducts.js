import React,{ useState } from 'react';

import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    View
} from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const ModalProducts = (props) =>{

    const prodId = props.id;
    const token = AsyncStorage.getItem('user_token');

    const handleEdit = () => {
        console.log(prodId);
    }

    const handleDelete = async () =>{
        await api.delete('/deleteProduct',{
            data:{
                prodId
            },
            headers:{'x-access-token':token},
        }).catch(err => console.log(err));
    }

    return(
        <Modal animationType='slide'
                transparent={true}
                visible={props.isVisible}
                onRequestClose={props.onCancel}>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handleEdit} style={styles.optionButton}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleDelete} style={styles.optionButton}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        flexDirection: 'row'
    },
    optionButton:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    offset:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    buttonText:{
        fontWeight:'bold',
        fontSize: 20,
        marginLeft: 20,
        backgroundColor: '#409fff',
        borderRadius: 4,
        height: '20%',
        width: '30%',
    }
})

export default ModalProducts;