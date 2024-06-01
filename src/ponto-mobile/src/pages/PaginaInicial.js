import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderMenu from "../components/HeaderMenu";

const PaginaInicial = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
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

    const userName = 'Leo'; // Substitua pelo nome do usuário

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderMenu />
            </View>
            <View style={styles.body}>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.date}>{currentDate}</Text>
                    <Text style={styles.time}>{currentTime}</Text>
                </View>
                <View style={styles.menu}>
                    <View style={styles.menuRow}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image
                                source={require('../../assets/image11.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Registrar ponto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image
                                source={require('../../assets/image12.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Perfil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuRow}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image
                                source={require('../../assets/image13.png')}
                                style={styles.menuItemImage}
                            />
                            <Text style={styles.menuItemText}>Saldos e holerite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
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
        backgroundColor: '#fff', // Fundo branco
        padding: 20,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 26,
        color: 'rgba(252, 163, 17, 1)', // Amarelo
        textAlign: 'center',
        fontFamily: 'Inter',
    },
    body: {
        flex: 1,
        backgroundColor: 'rgba(19, 33, 60, 1)', // Azul-marinho
        padding: 20,
        justifyContent: 'flex-start', // Alinhamento no topo
        alignItems: 'center',
        borderTopLeftRadius: 25, // Raio de canto superior esquerdo
        borderTopRightRadius: 25, // Raio de canto superior direito
        overflow: 'hidden', // Para garantir que o raio de canto seja exibido corretamente
    },
    dateTimeContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    date: {
        fontSize: 26,
        color: '#fff', // Branco
        marginBottom: 1,
        fontFamily: 'Inter',
    },
    time: {
        fontSize: 26,
        color: '#fff', // Branco
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
        backgroundColor: '#fff', // Fundo branco
        padding: 35,
        margin: 10,
        borderRadius: 15,
        width: '45%', // Ajuste a largura para caber lado a lado
        alignItems: 'center',
    },
    menuItemImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    menuItemText: {
        color: 'rgba(19, 33, 60, 1)', // Azul-marinho
        fontSize: 14, // Tamanho da fonte ligeiramente maior para melhor legibilidade
        fontWeight: '500', // Fonte semi-negrito para destaque
        textAlign: 'center', // Centraliza o texto
        marginTop: 5, // Espaçamento entre a imagem e o texto
        fontFamily: 'DM Sans Medium',
    },
    sloganContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footer: {
        backgroundColor: '#fff', // Fundo branco
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
