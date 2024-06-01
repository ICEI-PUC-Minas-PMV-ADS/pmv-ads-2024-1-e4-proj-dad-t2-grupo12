import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getRegistrosPonto } from "../services/Api";

const TabelaPontosSemanais = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRegistrosPonto();
                setDados(response);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, []);

    const renderizarLinhas = () => {
        return dados.map((registro, index) => (
            <Pressable
                key={index}
                style={[styles.row]}
                onPress={() => console.log('clicou', registro)}
            >
                <Text style={styles.cell}>{registro.inicioExpediente}</Text>
                <Text style={styles.cell}>{registro.fimExpediente}</Text>
                <Text style={styles.cell}>{registro.saldo}</Text>
            </Pressable>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.principalRow}>
                <Text style={[styles.cellPrincipal, styles.header]}>Data</Text>
                <Text style={[styles.cellPrincipal, styles.header]}>Entrada/Saída</Text>
                <Text style={[styles.cellPrincipal, styles.header]}>Saldo Diário</Text>
            </View>
            {renderizarLinhas()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    principalRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingVertical: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#14213d',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingVertical: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#ffffff',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#7e7d7d',
        fontSize: 15
    },
    cellPrincipal: {
        flex: 1,
        textAlign: 'center',
        color: '#fdfdfd',
        fontSize: 15
    },
    header: {
        fontWeight: 'bold',
        fontSize: 17
    },
});

export default TabelaPontosSemanais;
