import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const HeaderMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handlePrintOk = () => {
        console.log('ok');
    };

    return (
        <View style={styles.containerMenu}>
            <View style={styles.header}>
                <Pressable onPress={toggleMenu}>
                    <Text style={styles.menuIcon}>{isMenuOpen ? 'X' : '☰'}</Text>
                </Pressable>
                <Text style={styles.title}>Controle de Ponto</Text>
            </View>
            <View style={styles.contentMenu}>
                {isMenuOpen && (
                    <View style={styles.menu}>
                        <Pressable onPress={handlePrintOk}>
                            <Text style={styles.menuItem}>Página inicial</Text>
                        </Pressable>
                        <View style={styles.divider}></View>
                        <Pressable>
                            <Text style={styles.menuItem}>Solicitações</Text>
                        </Pressable>
                        <View style={styles.divider}></View>
                        <Pressable>
                            <Text style={styles.menuItem}>Cadastrar colaborador</Text>
                        </Pressable>
                        <View style={styles.divider}></View>
                        <Pressable>
                            <Text style={styles.menuItem}>Perfil</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}

const HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
    containerMenu: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: HEADER_HEIGHT,
        marginTop: 30,
        backgroundColor: '#efeef4',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: 24,
    },
    menu: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'red', // Opacidade ajustável
        paddingVertical: 10,
        width: '100%', // Largura total
        zIndex: 1,
    },
    menuItem: {
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contentMenu: {
        flex: 1,
        position: 'relative',
        zIndex: 0,
    },
});

export default HeaderMenu;
