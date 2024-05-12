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
                        <Pressable
                            onPress={handlePrintOk}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { backgroundColor: '#faa211' },
                            ]}
                        >
                            <Text style={styles.menuText}>Página inicial</Text>
                        </Pressable>
                        <View style={styles.divider}></View>
                        <Pressable
                            onPress={handlePrintOk}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { backgroundColor: '#faa211' },
                            ]}
                        >
                            <Text style={styles.menuText}>Solicitações</Text>
                        </Pressable>
                        <View style={styles.divider}></View>
                        <Pressable
                            onPress={handlePrintOk}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { backgroundColor: '#faa511' },
                            ]}
                        >
                            <Text style={styles.menuText}>Cadastrar colaborador</Text>
                        </Pressable>
                        <View style={styles.divider}></View>
                        <Pressable
                            onPress={handlePrintOk}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { backgroundColor: '#faa211' },
                            ]}
                        >
                            <Text style={styles.menuText}>Perfil</Text>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
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
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        width: '50%',
        zIndex: 1,
    },
    menuItem: {
        fontSize: 18,
        fontWeight: "500",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 18,
        fontWeight: '500',
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
