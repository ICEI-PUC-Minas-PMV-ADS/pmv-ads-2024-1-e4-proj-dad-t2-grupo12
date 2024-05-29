import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Button, FlatList } from 'react-native';
import { getRegistrosPonto, saveRegistroPonto, updateRegistroPonto } from "../services/Api";

const TabelaPontosSemanais = () => {
    const [horario, setHorario] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [successMessage, setSuccessMessage] = useState('');
    const [lastAddedRegistro, setLastAddedRegistro] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [saldoDiario, setSaldoDiario] = useState('00:00');
    const [horasTrabalhadas, setHorasTrabalhadas] = useState('00h 00m');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getRegistrosPonto(selectedDate);

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
                        usuarioId: '664bdc3adf17108bf6c8a689'
                    };
                    registroSelecionado = await saveRegistroPonto(novoHorario);
                }

                setHorario(registroSelecionado);
                setLastAddedRegistro(registroSelecionado);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, [selectedDate]);

    const openConfirmModal = () => {
        setConfirmModalVisible(true);
    };

    const cancelConfirmAction = () => {
        setConfirmModalVisible(false);
    };

    const confirmDesfazerAcao = async () => {
        try {
            if (lastAddedRegistro) {
                await deleteUltimoRegistroPonto(lastAddedRegistro.id);
                setHorario(null);
                setSuccessMessage('');
                setLastAddedRegistro(null);
                setConfirmModalVisible(false);
            }
        } catch (error) {
            console.error('Erro ao desfazer a ação:', error);
        }
    };

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
        const currentDateTime = new Date().toISOString();

        if (!horario) return;

        if (!horario.inicioExpediente) {
            horario.inicioExpediente = currentDateTime;
        } else if (!horario.inicioIntervalo) {
            horario.inicioIntervalo = currentDateTime;
        } else if (!horario.fimIntervalo) {
            horario.fimIntervalo = currentDateTime;
        } else if (!horario.fimExpediente) {
            horario.fimExpediente = currentDateTime;
        }

        horario.isPositivo = null;
        horario.saldo = null;

        try {
            const updatedRegistro = await updateRegistroPonto(horario.id, horario);
            setHorario(updatedRegistro);
            setLastAddedRegistro(updatedRegistro);
            setSuccessMessage('Ponto atualizado com sucesso.');
            setModalVisible(true);
        } catch (error) {
            console.error('Erro ao atualizar o horário:', error);
        }
    };

    const desfazerAcao = async () => {
        try {
            if (lastAddedRegistro) {
                await deleteUltimoRegistroPonto(lastAddedRegistro.id);
                setHorario(null);
                setSuccessMessage('');
                setLastAddedRegistro(null);
            }
        } catch (error) {
            console.error('Erro ao desfazer a ação:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return '';
        }

        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatTime = (timeString) => {
        if (!timeString) {
            return '';
        }

        const date = new Date(timeString);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goToPreviousDay}><Text style={styles.navText}>Anterior</Text></Pressable>
                <Pressable onPress={goToNextDay}><Text style={styles.navText}>Próximo</Text></Pressable>
            </View>
            {horario && (
                <Text style={styles.date}>{formatDate(horario.dataRegistro)}</Text>
            )}
            <View style={styles.summary}>
                <View style={styles.totals}>
                    <Text style={styles.summaryText}>Trab. no dia</Text>
                    <Text style={styles.summaryText}>{horasTrabalhadas}</Text>
                </View>
                <View style={styles.totals}>
                    <Text style={styles.summaryText}>Saldo do dia</Text>
                    <Text style={styles.summaryText}>{saldoDiario}</Text>
                </View>
                <View style={styles.totals}>
                    <Text style={styles.summaryText}>Saldo total</Text>
                    <Text style={styles.summaryText}>+09h 55m</Text>
                </View>
            </View>
            {horario && (
                <FlatList
                    data={[horario]}
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
            <Pressable style={styles.addButton} onPress={addHorario}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{successMessage}</Text>
                        {successMessage && (
                            <Button title="Desfazer" onPress={openConfirmModal} />
                        )}
                        <Button title="Ok" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal de confirmação para desfazer a ação */}
            <Modal visible={confirmModalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Deseja realmente desfazer a ação?</Text>
                        <Button title="Sim" onPress={confirmDesfazerAcao} />
                        <Button title="Não" onPress={cancelConfirmAction} />
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
        paddingTop: 70,
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
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        paddingBottom: 10,
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
        fontSize: 16,
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
    }
});

export default TabelaPontosSemanais;
