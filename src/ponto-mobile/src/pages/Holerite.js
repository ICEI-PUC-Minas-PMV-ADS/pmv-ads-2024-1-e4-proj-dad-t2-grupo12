import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const getDayOfWeek = (date) => {
    const dayOfWeek = format(date, 'E');
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return daysOfWeek[parseInt(dayOfWeek, 10)];
};

const Header = ({ startDate, onPrevious, onNext }) => {
    const formattedStartDate = format(startDate, 'dd/MM/yyyy');
    const formattedEndDate = format(addDays(startDate, 6), 'dd/MM/yyyy');

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Espelho de ponto</Text>
            <Text style={styles.date}>
                Semana {formattedStartDate} - {formattedEndDate}
            </Text>
            <View style={styles.navigation}>
                <TouchableOpacity onPress={onPrevious} style={styles.navButtonLeft}>
                    <Text style={styles.navButton}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onNext} style={styles.navButtonRight}>
                    <Text style={styles.navButton}>Próxima</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const calculateTimeDifference = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const startDate = new Date(0, 0, 0, startHour, startMinute, 0);
    const endDate = new Date(0, 0, 0, endHour, endMinute, 0);
    const diff = (endDate - startDate) / 60000; // diferença em minutos

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes };
};

const formatTime = (hours, minutes) => {
    return `${hours < 10 ? '0' : ''}${hours}:${
        minutes < 10 ? '0' : ''
    }${minutes}`;
};

const getDailyBalance = (start, end, normalHours = 9) => {
    const workDuration = calculateTimeDifference(start, end);
    const normalWorkDuration = { hours: normalHours, minutes: 0 };

    const totalMinutesWorked = workDuration.hours * 60 + workDuration.minutes;
    const totalNormalMinutes = normalWorkDuration.hours * 60;

    const balanceMinutes = totalMinutesWorked - totalNormalMinutes;

    const balanceHours = Math.floor(Math.abs(balanceMinutes) / 60);
    const balanceMins = Math.abs(balanceMinutes) % 60;

    return {
        balance: formatTime(balanceHours, balanceMins),
        isPositive: balanceMinutes >= 0,
        isZero: balanceMinutes === 0,
    };
};

const hourlyRate = 20.0; // Exemplo de valor da hora extra do colaborador (R$ 20,00 por hora extra)

const TimeSheetTable = ({ startDate, workHours }) => {
    const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
        const currentDate = addDays(startDate, index);
        return format(currentDate, 'EEE', { locale: ptBR }); // Obtém o dia da semana abreviado
    });

    const dates = Array.from({ length: 7 }, (_, index) => {
        const currentDate = addDays(startDate, index);
        const formattedDate = format(currentDate, 'dd/MM', { locale: ptBR });
        const dayOfWeek = daysOfWeek[index];
        return `${dayOfWeek} - ${formattedDate}`;
    });

    return (
        <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Data</Text>
                <Text style={styles.tableHeaderText}>Entrada/Saída</Text>
                <Text style={styles.tableHeaderText}>Saldo diário</Text>
            </View>
            {dates.map((date, index) => {
                const [start, end] = workHours[index].split(' – ');
                const { balance, isPositive, isZero } = getDailyBalance(start, end);

                return (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{date}</Text>
                        <Text style={styles.tableRowText}>{workHours[index]}</Text>
                        <Text
                            style={[
                                styles.tableRowText,
                                isZero
                                    ? {}
                                    : {
                                        color: isPositive
                                            ? 'rgba(37, 205, 107, 1)'
                                            : 'rgba(248, 59, 59, 1)',
                                    },
                            ]}>
                            {balance}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const getMonthlyBalance = (startDate, endDate, workHours) => {
    let monthlyBalanceMinutes = 0;

    for (let i = 0; i < 7; i++) {
        const [start, end] = workHours[i].split(' – ');
        const { hours: balanceHours, minutes: balanceMins } = getDailyBalance(
            start,
            end
        );

        if (balanceHours > 0 || balanceMins > 0) {
            monthlyBalanceMinutes += balanceHours * 60 + balanceMins;
        }
    }

    const totalHours = Math.floor(monthlyBalanceMinutes / 60);
    const totalMinutes = monthlyBalanceMinutes % 60;

    return formatTime(totalHours, totalMinutes);
};

const getMonthlyExtraHours = (startDate, endDate, workHours) => {
    let totalExtraMinutes = 0;

    for (let i = 0; i < 7; i++) {
        const [start, end] = workHours[i].split(' – ');
        const { hours: balanceHours, minutes: balanceMins } = getDailyBalance(
            start,
            end
        );

        if (balanceHours > 0 || balanceMins > 0) {
            totalExtraMinutes += balanceHours * 60 + balanceMins;
        }
    }

    const totalHours = Math.floor(totalExtraMinutes / 60);
    const totalMinutes = totalExtraMinutes % 60;

    return formatTime(totalHours, totalMinutes);
};

const getMonthlyExtraHoursValue = (startDate, endDate, workHours) => {
    const totalExtraMinutes = getMonthlyExtraHours(startDate, endDate, workHours);
    const totalExtraHours = totalExtraMinutes / 60;
    return (totalExtraHours * hourlyRate).toFixed(2);
};

const getMonthlyDeficitHours = (startDate, endDate, workHours) => {
    let totalDeficitMinutes = 0;

    for (let i = 0; i < 7; i++) {
        const [start, end] = workHours[i].split(' – ');
        const { hours: balanceHours, minutes: balanceMins } = getDailyBalance(
            start,
            end
        );

        if (balanceHours < 0 || balanceMins < 0) {
            totalDeficitMinutes += Math.abs(balanceHours * 60 + balanceMins);
        }
    }

    const totalHours = Math.floor(totalDeficitMinutes / 60);
    const totalMinutes = totalDeficitMinutes % 60;

    return formatTime(totalHours, totalMinutes);
};

const getMonthlyDeficitHoursValue = (startDate, endDate, workHours) => {
    let totalDeficitHoursValue = 0;

    for (let i = 0; i < 7; i++) {
        const [start, end] = workHours[i].split(' – ');
        const { hours: balanceHours, minutes: balanceMins } = getDailyBalance(
            start,
            end
        );

        if (balanceHours < 0 || balanceMins < 0) {
            const deficitMinutes = Math.abs(balanceHours * 60 + balanceMins);
            totalDeficitHoursValue += (deficitMinutes / 60) * hourlyRate; // Converta os minutos em horas e multiplique pela taxa horária
        }
    }

    return totalDeficitHoursValue.toFixed(2); // Formata para duas casas decimais
};

const Holerite = () => {
    const [startDate, setStartDate] = useState(new Date());

    // Salário mensal do colaborador (exemplo: R$ 3000,00)
    const monthlySalary = 3000.0;

    const handlePrevious = () => {
        setStartDate(subDays(startDate, 7));
    };

    const handleNext = () => {
        setStartDate(addDays(startDate, 7));
    };

    const workHours = [
        '08:00 – 17:00',
        '09:00 – 18:30',
        '08:30 – 17:00',
        '08:00 – 17:00',
        '09:00 – 17:00',
        '08:00 – 17:00',
        '08:00 – 17:00',
    ];

    return (
        <ScrollView style={styles.container}>
            <Header
                startDate={startDate}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
            <TimeSheetTable startDate={startDate} workHours={workHours} />
            <View style={styles.additionalInfoContainer}>
                <View style={styles.additionalInfoItem}>
                    <Text style={[styles.additionalInfoText, styles.boldText]}>
                        Saldo final mensal:
                    </Text>
                    <Text style={styles.additionalInfoValue}>
                        {getMonthlyBalance(startDate, addDays(startDate, 6), workHours)}
                    </Text>
                </View>
                <View style={styles.additionalInfoItem}>
                    <Text style={[styles.additionalInfoText, styles.boldText]}>
                        Valor final:
                    </Text>
                    <Text style={styles.additionalInfoValue}>
                        R$ {monthlySalary.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.additionalInfoItem}>
                    <Text style={[styles.additionalInfoText, styles.boldText]}>
                        Horas extras totais:
                    </Text>
                    <Text style={styles.additionalInfoValue}>
                        {getMonthlyExtraHours(startDate, addDays(startDate, 6), workHours)}
                    </Text>
                </View>
                <View style={styles.additionalInfoItem}>
                    <Text style={[styles.additionalInfoText, styles.boldText]}>
                        Valor horas extras:
                    </Text>
                    <Text style={styles.additionalInfoValue}>
                        R${' '}
                        {getMonthlyExtraHoursValue(
                            startDate,
                            addDays(startDate, 6),
                            workHours
                        )}
                    </Text>
                </View>
                <View style={styles.additionalInfoItem}>
                    <Text style={[styles.additionalInfoText, styles.boldText]}>
                        Horas devidas totais:
                    </Text>
                    <Text style={styles.additionalInfoValue}>
                        {getMonthlyDeficitHours(
                            startDate,
                            addDays(startDate, 6),
                            workHours
                        )}
                    </Text>
                </View>
                <View style={styles.additionalInfoItem}>
                    <Text style={[styles.additionalInfoText, styles.boldText]}>
                        Valor horas devidas:
                    </Text>
                    <Text style={styles.additionalInfoValue}>
                        R${' '}
                        {getMonthlyDeficitHoursValue(
                            startDate,
                            addDays(startDate, 6),
                            workHours
                        )}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        color: 'rgba(252, 163, 17, 1)',
        fontSize: 24,
        bottom: -5,
    },
    date: {
        color: 'rgba(23, 15, 118, 1)',
        fontSize: 20,
        marginVertical: 5,
    },
    navigation: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -10,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
    },
    navButtonLeft: {
        marginLeft: 10,
    },
    navButtonRight: {
        marginRight: 10,
    },
    navButton: {
        color: 'rgba(23, 15, 118, 1)',
        fontSize: 16,
        marginHorizontal: 10,
    },
    tableContainer: {
        marginHorizontal: 0,
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: 'rgba(19, 33, 60, 1)',
        paddingVertical: 10,
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tableHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(133, 133, 133, 1)',
    },
    tableRowText: {
        color: 'rgba(133, 133, 133, 1)',
        flex: 1,
        textAlign: 'center',
    },
    additionalInfoContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    additionalInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    additionalInfoText: {
        color: 'rgba(133, 133, 133, 1)',
        fontSize: 16,
        textAlign: 'center',
    },
    additionalInfoValue: {
        color: 'rgba(133, 133, 133, 1)',
        fontSize: 16,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default Holerite;
