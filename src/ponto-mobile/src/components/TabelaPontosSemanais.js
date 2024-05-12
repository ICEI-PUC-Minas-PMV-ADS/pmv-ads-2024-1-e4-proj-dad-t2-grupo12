import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const TabelaPontosSemanais = ({ data }) => {
    const [pressedIndex, setPressedIndex] = useState(null);

    const handlePressIn = (index) => {
        setPressedIndex(index);
    };

    const handlePressOut = () => {
        setPressedIndex(null);
    };

    const handleRowClick = (rowData) => {
        console.log('clicou', rowData);
    };

    return (
        <View style={styles.container}>
            <View style={styles.principalRow}>
                <Text style={[styles.cellPrincipal, styles.header]}>Data</Text>
                <Text style={[styles.cellPrincipal, styles.header]}>Entrada/Saída</Text>
                <Text style={[styles.cellPrincipal, styles.header]}>Saldo Diário</Text>
            </View>
            {data.map((rowData, index) => (
                <Pressable
                    key={index}
                    style={[styles.row, pressedIndex === index && styles.rowPressed]}
                    onPress={() => handleRowClick(rowData)}
                    onPressIn={() => handlePressIn(index)}
                    onPressOut={handlePressOut}
                >
                    <Text style={styles.cell}>{rowData.date}</Text>
                    <Text style={styles.cell}>{rowData.entryExit}</Text>
                    <Text style={styles.cell}>{rowData.dailyBalance}</Text>
                </Pressable>
            ))}
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
    rowPressed: {
        backgroundColor: '#dcdcdc'
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#7e7d7d',
        fontSize: 15
        ,
    },
    cellPrincipal: {
        flex: 1,
        textAlign: 'center',
        color: '#fdfdfd',
        fontSize: 15
        ,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 17
    },
});

const data = [
    { date: 'Seg - 08/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
    { date: 'Ter - 09/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
    { date: 'Qua - 10/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
    { date: 'Qui - 11/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
    { date: 'Sex - 12/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
    { date: 'Sab - 13/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
    { date: 'Dom - 14/04', entryExit: '08:00 - 17:00', dailyBalance: '00:00' },
];

export default () => <TabelaPontosSemanais data={data} />;
