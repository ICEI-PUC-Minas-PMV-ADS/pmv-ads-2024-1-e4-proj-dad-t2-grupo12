import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Pressable, Modal, Button, FlatList, TouchableOpacity} from 'react-native';
import { getRegistrosPonto, saveRegistroPonto, editarRegistroPonto } from "../services/Api";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const userInfo = await AsyncStorage.getItem('userInfo');
        console.log(userInfo)
        return { token, userInfo: JSON.parse(userInfo) };
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        return null;
    }
};

const RegistroPonto = () => {
    const [user, setUser] = useState(null);
    const [registro, setRegistro] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const currentDate = new Date();
        console.log(new Date())
        currentDate.setHours(currentDate.getHours() - 3);
        console.log(currentDate)

        return currentDate;
    });
    console.log(selectedDate)
    const [lastAddedRegistro, setLastAddedRegistro] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [saldoDiario, setSaldoDiario] = useState('00:00');
    const [horasTrabalhadas, setHorasTrabalhadas] = useState('00h 00m');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData();
                setUser(userData)
                if (userData) {
                    let data = await getRegistrosPonto(userData.userInfo.id);

                    const selectedDateString = selectedDate.toISOString().slice(0, 10);
                    let registroSelecionado = data.find(registro => {
                        const registroDateString = new Date(registro.dataRegistro).toISOString().slice(0, 10);
                        return registroDateString === selectedDateString;
                    });

                    if (!registroSelecionado) {
                        const novoHorario = {
                            dataRegistro: selectedDate.toISOString(),
                            inicioExpediente: null,
                            inicioIntervalo: null,
                            fimIntervalo: null,
                            fimExpediente: null,
                            saldo: 0,
                            usuarioId: userData.userInfo.id
                        };
                        registroSelecionado = await saveRegistroPonto(novoHorario);
                    }

                    let saldoPrefixo = registroSelecionado && registroSelecionado.isPositivo ? '+' : '-';

                    setSaldoDiario(saldoPrefixo + registroSelecionado.saldo);

                    setRegistro(registroSelecionado);
                    setLastAddedRegistro(registroSelecionado);
                }
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, [selectedDate]);

    const goToPreviousDay = () => {
        const previousDay = new Date(selectedDate);
        previousDay.setDate(selectedDate.getDate() - 1);
        setSelectedDate(previousDay);
    };

    const goToNextDay = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDay);
    };

    const addHorario = async () => {
        const horariosPreenchidos = [
            registro.inicioExpediente,
            registro.inicioIntervalo,
            registro.fimIntervalo,
            registro.fimExpediente
        ].filter(horario => horario !== null).length;

        if (horariosPreenchidos >= 4) {
            return;
        }

        const currentDateTime = new Date();
        currentDateTime.setHours(currentDateTime.getHours() - 3);
        const currentDateTimeString = currentDateTime.toISOString();

        let novoRegistro = { ...registro };

        if (!novoRegistro.inicioExpediente) {
            novoRegistro.inicioExpediente = currentDateTimeString;
        } else if (!novoRegistro.inicioIntervalo) {
            novoRegistro.inicioIntervalo = currentDateTimeString;
        } else if (!novoRegistro.fimIntervalo) {
            novoRegistro.fimIntervalo = currentDateTimeString;
        } else {
            novoRegistro.fimExpediente = currentDateTimeString;
        }

        novoRegistro.isPositivo = null;
        novoRegistro.saldo = null;
        novoRegistro.usuarioId = user.userInfo.id;

        try {
            const updatedRegistro = await editarRegistroPonto(novoRegistro.id, novoRegistro);
            setRegistro(updatedRegistro);
            setLastAddedRegistro(updatedRegistro);

            let saldoPrefixo = updatedRegistro && updatedRegistro.isPositivo ? '+' : '-';

            setSaldoDiario(saldoPrefixo + updatedRegistro.saldo)
        } catch (error) {
            console.error('Erro ao atualizar o horário:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return '';
        }

        const date = new Date(dateString);
        date.setHours(date.getHours() + 3);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatTime = (timeString) => {
        if (!timeString) {
            return '';
        }

        const date = new Date(timeString);
        date.setHours(date.getHours() + 3);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goToPreviousDay}><Text style={styles.navText}>Anterior</Text></Pressable>
                <Pressable onPress={goToNextDay}><Text style={styles.navText}>Próximo</Text></Pressable>
            </View>
            {registro && (
                <Text style={styles.date}>{formatDate(registro.dataRegistro)}</Text>
            )}
            <View style={styles.summary}>
                <View style={styles.totals}>
                    <Text style={styles.summaryText}>Trab. no dia</Text>
                    <Text style={styles.summaryText}>{horasTrabalhadas}</Text>
                </View>
                <View style={styles.totals}>
                    <Text style={styles.summaryText}>Saldo do dia</Text>
                    <Text style={[styles.summaryText, { color: registro && registro.isPositivo ? 'green' : 'red' }]}>
                        {saldoDiario}
                    </Text>
                </View>
                <View style={styles.totals}>
                    <Text style={styles.summaryText}>Saldo total</Text>
                    <Text style={styles.summaryText}>+09h 55m</Text>
                </View>
            </View>
            {registro && (
                <FlatList
                    data={[registro]}
                    renderItem={({ item }) => (
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineIndicator} />
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineDesc}>Início Expediente: {formatTime(item.inicioExpediente)}</Text>
                                <Text style={styles.timelineDesc}>Início Intervalo: {formatTime(item.inicioIntervalo)}</Text>
                                <Text style={styles.timelineDesc}>Fim Intervalo: {formatTime(item.fimIntervalo)}</Text>
                                <Text style={styles.timelineDesc}>Fim Expediente: {formatTime(item.fimExpediente)}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            )}
            <Pressable
                style={[styles.addButton, registro && [registro.inicioExpediente, registro.inicioIntervalo, registro.fimIntervalo, registro.fimExpediente].filter(horario => horario !== null).length >= 4 ? { backgroundColor: 'gray' } : {}]}
                onPress={() => {
                    if ([registro.inicioExpediente, registro.inicioIntervalo, registro.fimIntervalo, registro.fimExpediente].filter(horario => horario !== null).length >= 4) {
                        alert('Não é possível adicionar mais horários.');
                    } else {
                        setModalVisible(true);
                    }
                }}
                disabled={registro && [registro.inicioExpediente, registro.inicioIntervalo, registro.fimIntervalo, registro.fimExpediente].filter(horario => horario !== null).length >= 4}
            >
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>

            <Pressable
                style={styles.editButton}
                onPress={() => navigation.navigate('SolicitarAlteracao', { registro: registro })}
            >
                <Icon name="edit" size={30} color="#fff" />
            </Pressable>

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Ponto atualizado com sucesso!</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            addHorario();
                            setModalVisible(false);
                        }}>
                            <Text style={styles.buttonText}>Ok</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Desfazer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    navText: {
        color: '#007BFF',
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 25,
        paddingTop: 10,
        textAlign: 'center',
        marginVertical: 10,
        paddingBottom: 20,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingVertical: 10,
    },
    timelineIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007BFF',
        marginRight: 10,
        marginTop: 5,
    },
    timelineContent: {
        flex: 1,
        borderLeftWidth: 2,
        borderLeftColor: '#007BFF',
        paddingLeft: 10,
    },
    timelineTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timelineDesc: {
        paddingBottom: 20,
        fontSize: 20,
        color: '#555',
        marginTop: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#FFD700',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    totals: {
        alignItems: "center"
    },
    editButton: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        backgroundColor: '#FFD700',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RegistroPonto;
