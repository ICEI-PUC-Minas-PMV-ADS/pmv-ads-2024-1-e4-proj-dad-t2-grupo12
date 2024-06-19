import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { format, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TabelaPontosSemanais from "../components/TabelaPontosSemanais";

const TelaPonto = () => {
    const [startDate, setStartDate] = useState(new Date());

    const handlePrevious = () => {
        setStartDate(subDays(startDate, 7));
    };

    const handleNext = () => {
        setStartDate(addDays(startDate, 7));
    };

    const startOfWeekDate = startOfWeek(startDate, { locale: ptBR });
    const endOfWeekDate = endOfWeek(startDate, { locale: ptBR });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.contentTextEspelho}>Espelho de ponto</Text>
                    <Text style={styles.contentTextData}>
                        Semana {format(startOfWeekDate, 'dd/MM/yyyy', { locale: ptBR })} - {format(endOfWeekDate, 'dd/MM/yyyy', { locale: ptBR })}
                    </Text>
                </View>
                <View style={styles.navigation}>
                    <Pressable onPress={handlePrevious} style={styles.navButtonLeft}>
                        <Text style={styles.navButton}>Anterior</Text>
                    </Pressable>
                    <Pressable onPress={handleNext} style={styles.navButtonRight}>
                        <Text style={styles.navButton}>Próximo</Text>
                    </Pressable>
                </View>
                <View style={styles.contentTabela}>
                    <TabelaPontosSemanais startDate={startDate} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    contentHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    contentTabela: {
        width: '100%',
    },
    contentTextEspelho: {
        fontSize: 24,
        paddingBottom: 10,
        color: '#faa211',
    },
    contentTextData: {
        fontSize: 18,
        color: '#170f75',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    navButtonLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    navButtonRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    navButton: {
        color: 'rgba(23, 15, 118, 1)',
        fontSize: 16,
        marginHorizontal: 10,
    },
});

export default TelaPonto;
