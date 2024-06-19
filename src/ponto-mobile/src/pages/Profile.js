import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { obterUsuario, editarSenha } from "../services/Api";


const { width, height } = Dimensions.get('window');

const Profile = () => {
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [cpfUsuario, setCpfUsuario] = useState(null);
  const [setorNomeUsuario, setSetorNomeUsuario] = useState(null);
  const [setorCategoriaUsuario, setSetorCategoriaUsuario] = useState(null);
  const [dataNascimentoUsuario, setDataNascimentoUsuario] = useState(null);
  const [enderecoUsuarioRua, setEnderecoUsuarioRua] = useState(null);
  const [enderecoUsuarioNumero, setEnderecoUsuarioNumero] = useState(null);
  const [enderecoUsuarioCep, setEnderecoUsuarioCep] = useState(null);
  const [enderecoUsuarioCidade, setEnderecoUsuarioCidade] = useState(null);
  const [enderecoUsuarioEstado, setEnderecoUsuarioEstado] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dados = await obterUsuario();
        setDadosUsuario(dados.email);
        setNomeUsuario(dados.nome);
        setCpfUsuario(dados.cpf);
        setSetorNomeUsuario(dados.setores[0].nome);
        setSetorCategoriaUsuario(dados.setores[0].categoria);
        setDataNascimentoUsuario(dados.dataNascimento);
        setEnderecoUsuarioRua(dados.endereco.rua);
        setEnderecoUsuarioNumero(dados.endereco.numero);
        setEnderecoUsuarioCep(dados.endereco.cep);
        setEnderecoUsuarioCidade(dados.endereco.cidade);
        setEnderecoUsuarioEstado(dados.endereco.estado);

      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTrocarSenha = async () => {
    if (novaSenha === confirmarSenha) {
      const request = {
        novaSenha: novaSenha
      }
      senhaResposta = await editarSenha(request);
      console.log(senhaResposta)
      // Lógica para trocar a senha do usuário
      alert('Senha alterada com sucesso!');
      toggleModal();
    } else {
      alert('As senhas não coincidem!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <Text style={styles.headerText}>Profile</Text>
        <Text style={styles.headerText}>Logout</Text>
      </View>
      <Image
        source={{ uri: '' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{nomeUsuario}</Text>
      <Text style={styles.department}>{setorNomeUsuario}, {setorCategoriaUsuario}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Email: {dadosUsuario}</Text>
        <Text style={styles.label}>CPF: {cpfUsuario}</Text>
        <Text style={styles.label}>Data de Nascimento: {dataNascimentoUsuario}</Text>
        <Text style={styles.label}>Endereço: {enderecoUsuarioRua}, {enderecoUsuarioNumero}, {enderecoUsuarioCep}, {enderecoUsuarioCidade}, {enderecoUsuarioEstado}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Trocar Senha"
          onPress={toggleModal}
          color="#0B1ABB"
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Trocar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Nova Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.button} onPress={handleTrocarSenha}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  department: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  userInfo: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: '10%',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#0B1ABB',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
