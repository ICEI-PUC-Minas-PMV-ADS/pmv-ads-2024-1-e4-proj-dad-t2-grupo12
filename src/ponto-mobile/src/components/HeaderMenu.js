import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const HeaderMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handlePrintOk = () => {
        console.log('ok');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={toggleMenu}>
                    <Text style={styles.menuIcon}>{isMenuOpen ? 'X' : '☰'}</Text>
                </Pressable>
                <Text style={styles.title}>Controle de Ponto</Text>
            </View>
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
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: 24,
    },
    menu: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
    },
    menuItem: {
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    selectedMenuItem: {
        color: 'blue',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default HeaderMenu;
