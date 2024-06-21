import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const userInfo = await AsyncStorage.getItem('userInfo');
        return { token, userInfo: JSON.parse(userInfo) };
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        return null;
    }
};

const PaginaInicial = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const navigation = useNavigation();
    const [nome, setNome] = useState('');


    useEffect(() => {

        const fetchUserData = async () => {
            const data = await getUserData();
            if (data && data.userInfo && data.userInfo.nome) {
                setNome(data.userInfo.nome);
            }
        };

        fetchUserData();

        const date = new Date().toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
        });
        setCurrentDate(date);

        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
            });
            setCurrentTime(time);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image
                        source={require('../../assets/image15.png')}
                        style={styles.headerImage}
                    />
                </TouchableOpacity>
                <Text style={styles.welcome}>Bem vindo, {nome}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.date}>{currentDate}</Text>
                    <Text style={styles.time}>{currentTime}</Text>
                </View>
                <View style={styles.menu}>
                    <View style={styles.menuRow}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('RegistroPonto')}>
                            <Image
                                source={require('../../assets/image11.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Registrar ponto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                            <Image
                                source={require('../../assets/image12.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Perfil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuRow}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Holerite')}>
                            <Image
                                source={require('../../assets/image13.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Saldos e holerite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TabelaPonto')}>
                            <Image
                                source={require('../../assets/image14.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Espelho</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.sloganContainer}>
                    <Image
                        source={require('../../assets/logotransparente21.png')}
                        style={styles.logo}
                    />
                </View>
            </View>
            <View style={styles.footer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    contentText: {
        fontSize: 20,
        textAlign: 'center',
    },
    header: {
        paddingTop: 60,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 26,
        color: 'rgba(252, 163, 17, 1)',
        textAlign: 'center',
        fontFamily: 'Inter',
    },
    body: {
        flex: 1,
        backgroundColor: 'rgba(19, 33, 60, 1)',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
    },
    dateTimeContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    date: {
        fontSize: 26,
        color: '#fff',
        marginBottom: 1,
        fontFamily: 'Inter',
    },
    time: {
        fontSize: 26,
        color: '#fff',
        fontFamily: 'Inter',
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    menuItem: {
        backgroundColor: '#fff',
        padding: 35,
        margin: 10,
        borderRadius: 15,
        width: '45%',
        alignItems: 'center',
    },
    menuItemImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    menuItemText: {
        color: 'rgba(19, 33, 60, 1)',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'DM Sans Medium',
    },
    sloganContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footer: {
        backgroundColor: '#fff',
        padding: 25,
    },
    headerImage: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -17,
        right: -175,
    },
});

export default PaginaInicial;
