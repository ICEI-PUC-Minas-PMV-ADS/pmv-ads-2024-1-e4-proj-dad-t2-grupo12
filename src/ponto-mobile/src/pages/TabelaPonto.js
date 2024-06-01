import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderMenu from "../components/HeaderMenu";
import TabelaPontosSemanais from "../components/TabelaPontosSemanais";

const TelaPonto = () => {

    return (
        <View style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <HeaderMenu></HeaderMenu>*/}
            {/*</View>*/}
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.contentTextEspelho}>Espelho de ponto</Text>
                    <Text style={styles.contentTextData}>Semana 07/04/2024</Text>
                </View>
                <View style={styles.contentTabela}>
                    <TabelaPontosSemanais></TabelaPontosSemanais>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'row',
        paddingTop: 100
    },
    contentHeader: {
        paddingTop: 100,
        alignItems: 'center',
    },
    contentTabela: {
        width: '100%',
        height: '100%',
        paddingTop: 20,
    },
    contentTextEspelho: {
        fontSize: 27,
        paddingBottom: 10,
        color: '#faa211',
    },
    contentTextData: {
        fontSize: 20,
        color: '#170f75',
    },
});

export default TelaPonto;
