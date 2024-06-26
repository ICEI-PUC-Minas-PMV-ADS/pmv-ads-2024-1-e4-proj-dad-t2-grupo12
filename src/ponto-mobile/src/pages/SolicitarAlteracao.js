import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, Platform } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editarRegistroPonto, registrarSolicitacaoAlteracao } from '../services/Api';
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dayAbbreviations = {
    'domingo': 'dom',
    'segunda-feira': 'seg',
    'terça-feira': 'ter',
    'quarta-feira': 'qua',
    'quinta-feira': 'qui',
    'sexta-feira': 'sex',
    'sábado': 'sab',
};

const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const userInfo = await AsyncStorage.getItem('userInfo');
        console.log(userInfo);
        return { token, userInfo: JSON.parse(userInfo) };
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        return null;
    }
};

const SolicitarAlteracao = () => {
    const route = useRoute();
    const { registro } = route.params;

    const [currentDate, setCurrentDate] = useState(new Date());
    const [motivo, setMotivo] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [newTime, setNewTime] = useState('');
    const [timeToChange, setTimeToChange] = useState('');
    const [motivoError, setMotivoError] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData();
            if (userData) {
                setUserId(userData.userInfo.id);
            }
        };

        const timerID = setInterval(() => tick(), 1000);
        fetchData();
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setCurrentDate(new Date());
    };

    const handleTimeChange = (key) => {
        setShowTimeModal(true);
        setTimeToChange(key);
    };

    const formatTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        date.setHours(date.getHours() + 3);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const handleTimeChangeConfirm = () => {
        try {
            const [hours, minutes] = newTime.split(':').map(Number);
            const updatedDate = new Date(registro.dataRegistro);
            updatedDate.setHours(hours);
            updatedDate.setMinutes(minutes);
            updatedDate.setHours(updatedDate.getHours() - 3);

            setShowTimeModal(false);
            setSelectedTime(timeToChange);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const handleSubmit = async () => {
        if (!motivo.trim()) {
            setMotivoError(true);
            return;
        }

        let tipoPeriodo;

        if (timeToChange === 'entryTime') {
            tipoPeriodo = 'InicioExpediente';
        } else if (timeToChange === 'breakStartTime') {
            tipoPeriodo = 'InicioIntervalo';
        } else if (timeToChange === 'breakEndTime') {
            tipoPeriodo = 'FimIntervalo';
        } else {
            tipoPeriodo = 'FimExpediente';
        }

        const solicitacao = {
            motivo: motivo,
            novaData: `${registro.dataRegistro.split('T')[0]}T${newTime}:00Z`,
            tipoPeriodo: tipoPeriodo,
            aprovado: false,
            status: 'solicitado',
            usuarioId: userId,
            pontoId: registro.id,
        };

        try {
            const resposta = await registrarSolicitacaoAlteracao(solicitacao);

            if (resposta) {
                const editarPonto = {
                    id: registro.id,
                    dataRegistro: registro.dataRegistro,
                    inicioExpediente: registro.inicioExpediente,
                    inicioIntervalo: registro.inicioIntervalo,
                    fimIntervalo: registro.fimIntervalo,
                    fimExpediente: registro.fimExpediente,
                    usuarioId: registro.usuarioId,
                    temSolicitacaoAlteracao: true,
                };

                const respostaEdicao = await editarRegistroPonto(registro.id, editarPonto);

                if (respostaEdicao) {
                    setSuccessMessage('Solicitação registrada com sucesso');
                    setShowSuccessModal(true);
                }
            }
        } catch (error) {
            console.error('Erro ao atualizar ponto:', error);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigation.navigate('RegistroPonto');
    };

    const formattedDate = format(new Date(registro.dataRegistro), 'EEE, dd/MM/yyyy', { locale: ptBR });
    const formattedDay = formattedDate.split(',')[0].toLowerCase();
    const abbreviatedDay = dayAbbreviations[formattedDay];

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setCurrentDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Solicitar alteração</Text>
                <TouchableOpacity onPress={showDatePickerModal}>
                    <Text style={styles.date}>{abbreviatedDay}, {formattedDate.split(',')[1]}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={currentDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        locale="pt-BR"
                    />
                )}
            </View>
            <View style={styles.infoBox}>
                <TouchableOpacity onPress={() => handleTimeChange('entryTime')}>
                    <Text style={[styles.timeText, { marginBottom: 10 }]}>
                        <Image source={require('../../assets/Vectorgreen.png')} style={styles.menuItemImage} />
                        <Text style={styles.grayText}> {formatTime(registro.inicioExpediente)}</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimeChange('breakStartTime')}>
                    <Text style={[styles.timeText, { marginBottom: 10 }]}>
                        <Image source={require('../../assets/Vectorred.png')} style={styles.menuItemImage} />
                        <Text style={styles.grayText}> {formatTime(registro.inicioIntervalo)}</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimeChange('breakEndTime')}>
                    <Text style={[styles.timeText, { marginBottom: 10 }]}>
                        <Image source={require('../../assets/Vectorgreen.png')} style={styles.menuItemImage} />
                        <Text style={styles.grayText}> {formatTime(registro.fimIntervalo)}</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimeChange('exitTime')}>
                    <Text style={[styles.timeText, { marginBottom: 10 }]}>
                        <Image source={require('../../assets/Vectorred.png')} style={styles.menuItemImage} />
                        <Text style={styles.grayText}> {formatTime(registro.fimExpediente)}</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.smallBox}>
                <Text style={styles.motivoText}>Motivo:</Text>
                <TextInput
                    style={[styles.textInput, { height: 85 }, motivoError ? styles.inputError : null]}
                    value={motivo}
                    onChangeText={setMotivo}
                    multiline
                />
                {motivoError && (
                    <Text style={styles.errorMessage}>Motivo é obrigatório</Text>
                )}
            </View>
            <Modal
                visible={showTimeModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.modalInput}
                            value={newTime}
                            onChangeText={setNewTime}
                            placeholder="Novo Horário (HH:MM)"
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleTimeChangeConfirm}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showSuccessModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{successMessage}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCloseSuccessModal}>
                            <Text style={styles.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={handleSubmit}>
                    <Text style={styles.footerButtonText}>Fazer solicitação</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        marginBottom: 10,
    },
    date: {
        color: 'rgba(23, 15, 118, 1)',
        fontSize: 20,
        marginVertical: 5,
    },
    infoBox: {
        marginHorizontal: 20,
        padding: 25,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        height: windowHeight / 2,
    },
    smallBox: {
        marginHorizontal: 20,
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        height: windowHeight / 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    motivoText: {
        color: 'rgba(133, 133, 133, 1)',
        fontWeight: 'bold',
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        color: '#000',
        fontSize: 13,
        marginLeft: 10,
        paddingVertical: 0,
        marginTop: -1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    button: {
        marginHorizontal: 20,
        marginTop: 10,
        width: windowWidth / 2.5,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(252, 163, 17, 1)',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    footerButton: {
        width: windowWidth / 2.5,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(30, 22, 129, 1)',
        alignItems: 'center',
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 13,
    },
    timeText: {
        fontWeight: 'bold',
    },
    grayText: {
        color: 'rgba(133, 133, 133, 1)',
    },
    fileText: {
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 13,
        color: 'rgba(133, 133, 133, 1)',
    },
    menuItemImage: {
        width: 17,
        height: 13,
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
        alignItems: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: 200,
    },
    modalButton: {
        backgroundColor: 'rgba(30, 22, 129, 1)',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SolicitarAlteracao;
