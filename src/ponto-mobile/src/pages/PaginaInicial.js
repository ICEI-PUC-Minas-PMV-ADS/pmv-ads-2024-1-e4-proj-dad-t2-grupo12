import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HeaderMenu from "../components/HeaderMenu";

const PaginaInicial = () => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderMenu></HeaderMenu>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>Conteúdo da página vai aqui</Text>
            </View>
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
});

export default PaginaInicial;
