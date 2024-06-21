import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from "../services/Api";

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const entrar = async () => {
        try {
            const userData = await login(email, password);

            if (userData.jwtToken != null) {
                await AsyncStorage.setItem('userToken', userData.jwtToken);
                await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
                navigation.navigate('PaginaInicial')
            }

        } catch (error) {
            setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <View style={[styles.container, styles.specificContainer]}>
            <Text h3>Entrar no App</Text>
            <Input
                placeholder='E-mail'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={value => setEmail(value)}
                keyboardType='email-address'
            />
            <Input
                placeholder='Digite a senha'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Button
                icon={
                    <Icon
                        name="check"
                        size={15}
                        color="white"
                    />
                }
                title=" Entrar"
                buttonStyle={styles.button}
                onPress={entrar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    specificContainer: {
        backgroundColor: '#fff'
    },
    button: {
        width: "100%",
        marginTop: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        alignSelf: "flex-start",
        marginLeft: 10,
        color: "#f00",
        fontSize: 12,
    }
});

export default Login;
