import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { getRegistrosPonto } from "../services/Api";
import { addDays, subDays, format, startOfWeek, endOfWeek } from 'date-fns';
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

const TabelaPontosSemanais = ({ startDate }) => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        fetchData(startDate);
    }, [startDate]);

    const fetchData = async (startDate) => {
        try {
            const userData = await getUserData();
            if (userData) {
                const response = await getRegistrosPonto(userData.userInfo.id);
                const startOfWeekDate = startOfWeek(startDate);
                const endOfWeekDate = endOfWeek(startDate);
                const filteredData = response.filter(registro =>
                    new Date(registro.dataRegistro) >= startOfWeekDate &&
                    new Date(registro.dataRegistro) <= endOfWeekDate
                );
                setDados(filteredData);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const renderizarLinhas = () => {
        return dados.map((registro, index) => (
            <Pressable
                key={index}
                style={styles.row}
                onPress={() => console.log('clicou', registro)}
            >
                <Text style={styles.cell}>{format(new Date(registro.dataRegistro), 'dd/MM/yyyy')}</Text>
                <Text style={styles.cell}>{registro.inicioExpediente ? format(new Date(registro.inicioExpediente), 'HH:mm') : '-'}</Text>
                <Text style={styles.cell}>{registro.fimExpediente ? format(new Date(registro.fimExpediente), 'HH:mm') : '-'}</Text>
                <Text style={styles.cell}>{registro.saldo}</Text>
            </Pressable>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <View style={styles.principalRow}>
                    <Text style={[styles.cellPrincipal, styles.header]}>Data</Text>
                    <Text style={[styles.cellPrincipal, styles.header]}>Entrada</Text>
                    <Text style={[styles.cellPrincipal, styles.header]}>Saída</Text>
                    <Text style={[styles.cellPrincipal, styles.header]}>Saldo Diário</Text>
                </View>
                <ScrollView>
                    {renderizarLinhas()}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    tableContainer: {
        flex: 1,
        marginBottom: 20,
    },
    principalRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingVertical: 15,
        backgroundColor: '#14213d',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingVertical: 15,
        backgroundColor: '#ffffff',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#7e7d7d',
        fontSize: 14,
    },
    cellPrincipal: {
        flex: 1,
        textAlign: 'center',
        color: '#fdfdfd',
        fontSize: 14,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TabelaPontosSemanais;
