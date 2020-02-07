import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import commonStyles from '../CommonStyles';
import { authUser } from '../store/actions/user';
import { useDispatch } from 'react-redux';

const Menu = ({navigation}) => {

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    const handleLogin = () => {
        const data = {
            login,
            password
        };
        dispatch(authUser(data));
        navigation.navigate('Menu');
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.inputsContainer}>
                <TextInput style={commonStyles.textInput} placeholder={'Login'}
                           value={login} onChangeText={props => setLogin(props)} />
                <TextInput style={commonStyles.textInput} placeholder={'Senha'} secureTextEntry={true}
                           value={password} onChangeText={props => setPassword(props)} />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputsContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    loginButton:{
        width: '90%',
        backgroundColor: '#409fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 20,
    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#FFF'
    }
});

export default Menu;