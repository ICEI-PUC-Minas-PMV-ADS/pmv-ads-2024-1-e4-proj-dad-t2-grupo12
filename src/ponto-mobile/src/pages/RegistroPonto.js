import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput, Button, FlatList } from 'react-native';
import { getRegistrosPonto, saveRegistroPonto } from "../services/Api";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TabelaPontosSemanais = () => {
    const [horarios, setHorarios] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTime, setNewTime] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRegistrosPonto();
                setHorarios(data);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };
        fetchData();
    }, []);

    const addHorario = async () => {
        if (newTime && newDescription && horarios.length < 4) {
            const novoRegistro = {
                dataRegistro: newTime,
                inicioExpediente: newTime,
                inicioIntervalo: '',
                fimIntervalo: '',
                fimExpediente: '',
                saldo: 0,
                holerite: {
                    id: '',
                    valorHoraPositivas: 0,
                    valorHoraNegativas: 0,
                    valorTotalPositivas: 0,
                    valorTotalNegativas: 0,
                    salarioFinal: 0,
                    usuarioId: 'string'
                },
                usuarioId: 'string'
            };

            try {
                const savedRegistro = await saveRegistroPonto(novoRegistro);
                setHorarios([...horarios, savedRegistro]);
                setNewTime('');
                setNewDescription('');
                setModalVisible(false);
            } catch (error) {
                console.error('Erro ao salvar o registro:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, "EEE, dd 'de' MMM 'de' yyyy", { locale: ptBR });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable><Text style={styles.navText}>Anterior</Text></Pressable>
                {/*{horarios.length > 0 && (*/}
                {/*    <Text style={styles.title}>{formatDate(horarios[0].dataRegistro)}</Text>*/}
                {/*)}*/}
                <Pressable><Text style={styles.navText}>Próximo</Text></Pressable>
            </View>
            {horarios.length > 0 && (
                <Text style={styles.date}>{formatDate(horarios[0].dataRegistro)}</Text>
            )}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Trab. no dia 07h 55m</Text>
                <Text style={styles.summaryText}>Saldo do dia -00h 11m</Text>
                <Text style={styles.summaryText}>Saldo total +09h 55m</Text>
            </View>
            <FlatList
                data={horarios}
                renderItem={({ item }) => (
                    <View style={styles.timelineItem}>
                        <View style={styles.timelineIndicator} />
                        <View style={styles.timelineContent}>
                            <Text style={styles.timelineDesc}>{item.inicioExpediente}</Text>
                            <Text style={styles.timelineDesc}>{item.inicioIntervalo}</Text>
                            <Text style={styles.timelineDesc}>{item.fimIntervalo}</Text>
                            <Text style={styles.timelineDesc}>{item.fimExpediente}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Hora"
                            value={newTime}
                            onChangeText={setNewTime}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            value={newDescription}
                            onChangeText={setNewDescription}
                        />
                        <Button title="Adicionar" onPress={addHorario} />
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
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
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
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
});

export default TabelaPontosSemanais;
