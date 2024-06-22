import { useState } from 'react';
import './Perfil.css';
import fotousuario from '../../assets/exemplo.jpeg';
import axios from 'axios';
import BuscarInput from "../../components/buscar-input/BuscarInput.jsx";

const Perfil = () => {
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleColaboradorSelect = (colaborador) => {
    setDadosUsuario(colaborador);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTrocarSenha = async () => {
    if (novaSenha === confirmarSenha) {
      try {
        const response = await axios.post('/api/editar-senha', { novaSenha });
        console.log(response.data);
        alert('Senha alterada com sucesso!');
        toggleModal();
      } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        alert('Erro ao alterar a senha');
      }
    } else {
      alert('As senhas não coincidem!');
    }
  };

  return (
      <div className="perfil-container">
        <BuscarInput onColaboradorSelect={handleColaboradorSelect} />
        <div className="perfil-dados-fixo">
          <img src={fotousuario} alt="Foto do usuário" className="perfil-foto" />
          <input type="text" value={dadosUsuario.nome || ''} disabled className="input-disabled" placeholder="Nome do Usuário" />
          <input type="text" value={dadosUsuario.email || ''} disabled className="input-disabled" placeholder="Email do Usuário" />
          <input type="text" value={dadosUsuario.cpf || ''} disabled className="input-disabled" placeholder="CPF do Usuário" />
          <input type="text" value={dadosUsuario.dataNascimento || ''} disabled className="input-disabled" placeholder="Data de Nascimento" />
          <input type="text" value={`${dadosUsuario.endereco?.rua || ''}${dadosUsuario.endereco?.numero || ''}${dadosUsuario.endereco?.cep || ''}${dadosUsuario.endereco?.cidade || ''}${dadosUsuario.endereco?.estado || ''}`} disabled className="input-disabled" placeholder="Endereço do Usuário" />
          <button className="btn-resetar" onClick={toggleModal}>Resetar Senha</button>
        </div>
        <div className="perfil-dados-editaveis">
          <label className="label-perfil">
            Setor:
            <select defaultValue={dadosUsuario.setor || ''} className="input-editavel">
              <option value="Comercial">Comercial</option>
              <option value="Operacional">Operacional</option>
              <option value="RH">RH</option>
              <option value="Logistica">Logística</option>
            </select>
          </label>
          <label className="label-perfil">
            Status:
            <select defaultValue={dadosUsuario.status || ''} className="input-editavel">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </label>
          <label className="label-perfil">
            Salário: <input type="text" defaultValue={dadosUsuario.salario || ''} className="input-editavel2" placeholder="Salário do Usuário" />
          </label>
        </div>

        {isModalVisible && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="modal-title">Trocar Senha</h2>
                <input
                    type="password"
                    placeholder="Nova Senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    className="input-modal"
                />
                <input
                    type="password"
                    placeholder="Confirmar Nova Senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="input-modal"
                />
                <div className="modal-buttons">
                  <button className="btn-modal" onClick={handleTrocarSenha}>Salvar</button>
                  <button className="btn-modal" onClick={toggleModal}>Cancelar</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Perfil;
