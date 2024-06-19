import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'react-native';

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

const SolicitarAlteracaoScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [motivo, setMotivo] = useState('');
  const [file, setFile] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [timeToChange, setTimeToChange] = useState('');

  const [times, setTimes] = useState({
    entryTime: "09:10",
    breakStartTime: "12:05",
    breakEndTime: "13:05",
    exitTime: "18:22",
  });

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setCurrentDate(new Date());
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setFile(result);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleTimeChange = (key) => {
    setShowTimeModal(true);
    setTimeToChange(key);
  };

  const handleTimeChangeConfirm = () => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [timeToChange]: newTime,
    }));
    setShowTimeModal(false);
    setSelectedTime(timeToChange);
  };

  const calculateDuration = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);
    const diff = endDate - startDate;
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  };

  const workDuration = `Turno de ${calculateDuration(times.entryTime, times.breakStartTime)}`;
  const breakDuration = `Intervalo de ${calculateDuration(times.breakStartTime, times.breakEndTime)}`;
  const postBreakWorkDuration = `Turno de ${calculateDuration(times.breakEndTime, times.exitTime)}`;

  const handleSubmit = () => {
    if (!motivo) {
      Alert.alert('Erro', 'Por favor, insira um motivo para a solicitação.');
      return;
    }

    const requestData = {
      motivo,
      file,
      times,
      currentDate,
    };

    console.log('Dados da solicitação:', requestData);
    Alert.alert('Sucesso', 'Solicitação enviada com sucesso.');
  };

  const formattedDate = format(currentDate, 'EEE, dd/MM/yyyy', { locale: ptBR });
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
            <Image source={require('./assets/Vectorgreen.png')} style={styles.menuItemImage} />
            <Text style={styles.grayText}> {times.entryTime}</Text>
          </Text>
        </TouchableOpacity>
        <Text style={[styles.grayText, { marginBottom: 10 }]}>{workDuration}</Text>
        <TouchableOpacity onPress={() => handleTimeChange('breakStartTime')}>
          <Text style={[styles.timeText, { marginBottom: 10 }]}>
            <Image source={require('./assets/Vectorred.png')} style={styles.menuItemImage} /> 
            <Text style={styles.grayText}> {times.breakStartTime}</Text>
          </Text>
        </TouchableOpacity>
        <Text style={[styles.grayText, { marginBottom: 10 }]}>{breakDuration}</Text>
        <TouchableOpacity onPress={() => handleTimeChange('breakEndTime')}>
          <Text style={[styles.timeText, { marginBottom: 10 }]}>
            <Image source={require('./assets/Vectorgreen.png')} style={styles.menuItemImage} /> 
            <Text style={styles.grayText}> {times.breakEndTime}</Text>
          </Text>
        </TouchableOpacity>
        <Text style={[styles.grayText, { marginBottom: 10 }]}>{postBreakWorkDuration}</Text>
        <TouchableOpacity onPress={() => handleTimeChange('exitTime')}>
          <Text style={[styles.timeText, { marginBottom: 10 }]}>
            <Image source={require('./assets/Vectorred.png')} style={styles.menuItemImage} /> 
            <Text style={styles.grayText}> {times.exitTime}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.smallBox}>
        <Text style={styles.motivoText}>Motivo:</Text>
        <TextInput
          style={[styles.textInput, { height: 85 }]}
          value={motivo}
          onChangeText={setMotivo}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFilePicker}>
        <Text style={styles.buttonText}>Anexar um arquivo</Text>
      </TouchableOpacity>
      {file && <Text style={styles.fileText}>Arquivo: {file.name}</Text>}
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
    bottom: -15,
  },
  date: {
    color: 'rgba(23, 15, 118, 1)',
    fontSize: 20,
    marginVertical: 5,
    bottom: -10,
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
    marginTop: -68,
  },
  textInput: {
    flex: 1,
    color: '#000',
    fontSize: 13,
    marginLeft: 0,
    paddingVertical: 0,
    marginTop: -1,
    borderWidth: 0,
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

export default SolicitarAlteracaoScreen;
