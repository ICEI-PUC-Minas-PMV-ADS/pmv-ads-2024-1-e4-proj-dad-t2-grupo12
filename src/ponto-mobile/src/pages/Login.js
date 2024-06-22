import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { login } from "../services/Api";

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const entrar = async () => {
        try {
            if (email || password) {
                const userData = await login(email, password);

                if (userData.jwtToken) {
                    await AsyncStorage.setItem('userToken', userData.jwtToken);
                    await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
                    navigation.navigate('PaginaInicial');
                } else {
                    setErrorMessage(userData.mensagem);
                    setModalVisible(true);
                }
            } else {
                setErrorMessage("Insira um login e senha para continuar");
                setModalVisible(true);
            }
        } catch (error) {
            setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
            setModalVisible(true);
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
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{errorMessage}</Text>
                    <Button title="Fechar" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Login;
