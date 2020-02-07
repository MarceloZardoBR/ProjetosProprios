import React, { useState } from 'react';

import{
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    Alert
} from 'react-native';
import commonStyles from '../CommonStyles';
import ModalProducts from './ModalProducts';

const ProductList = props =>{

    const Data = [...props.data];

    const [displayModal, setDisplayModal] = useState(false);

    function handleModal(){
        setDisplayModal(true);
    }

    function handleModalCancel(){
        setDisplayModal(false);
    }

    return(
        <View style={styles.container}>
                <FlatList data={Data} 
                    renderItem={({item}) =>
                    <TouchableOpacity onPress={handleModal}>
                        <ModalProducts isVisible={displayModal}
                                        onCancel={handleModalCancel}
                                        id={item._id}/>
                        <Item name={item.name} value={item.value}category={item.category} />
                    </TouchableOpacity>}
                    keyExtractor={item => item._id} />
        </View>
    )
}

const Item = props =>{
    return(
        <View style={styles.flatItem}>
            <Text style={styles.textStyle}>Nome:{props.name}</Text>
            <Text style={styles.textStyle}>Preço:{props.value}</Text>
            <Text style={styles.textStyle}>Categoria:{props.category}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width: '90%',
        justifyContent: 'center',
        marginLeft:20,
    },
    flatItem:{
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#e6e8e6',
        height: 90,
        justifyContent:'center',
    },
    textStyle:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20
    }
});

export default ProductList;