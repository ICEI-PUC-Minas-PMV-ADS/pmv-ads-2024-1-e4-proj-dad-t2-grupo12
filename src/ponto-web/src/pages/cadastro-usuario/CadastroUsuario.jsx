import './CadastroUsuario.css';
import { useState, useEffect } from 'react';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import { cadastrarColaborador, obterSetores } from "../../services/Api.jsx";
import GenericModal from "../../components/generic-modal/GenericModal.jsx";

const CadastroUsuario = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        confirmarSenha: '',
        setor: '',
        status: 'ativo',
        dataNascimento: '',
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            cidade: '',
            estado: '',
            cep: '',
        },
        usuarioAdmin: false
    });

    const [setores, setSetores] = useState([]);

    useEffect(() => {
        const fetchSetores = async () => {
            try {
                const response = await obterSetores();
                if (response) {
                    setSetores(response);
                } else {
                    console.error('Erro ao buscar setores:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar setores:', error);
            }
        };

        fetchSetores();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id.startsWith('endereco.')) {
            const enderecoField = id.split('.')[1];
            setFormData({
                ...formData,
                endereco: {
                    ...formData.endereco,
                    [enderecoField]: value,
                }
            });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleSubmit = async () => {
        try {
            const cadastroUsuarioDto = {
                nome: formData.nome,
                cpf: formData.cpf,
                email: formData.email,
                senha: formData.senha,
                confirmacaoSenha: formData.confirmarSenha,
                statusUsuario: formData.status,
                setores: [JSON.parse(formData.setor)],
                dataNascimento: formData.dataNascimento,
                endereco: {
                    rua: formData.endereco.logradouro,
                    numero: formData.endereco.numero,
                    complemento: formData.endereco.complemento,
                    cidade: formData.endereco.cidade,
                    estado: formData.endereco.estado,
                    cep: formData.endereco.cep,
                },
                usuarioAdmin: formData.usuarioAdmin === "Sim"
            };

            const response = await cadastrarColaborador(cadastroUsuarioDto);
            if (response) {
                handleShowModal()
            } else {
                console.error('Erro ao cadastrar usuário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    return (
        <>
            <Header />
            <MenuLateral />
            <div className="cadastro-usuario">
                <h1>Cadastro de Usuário</h1>
                <div className="input-container-cadastro">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        className="input-cadastro"
                        type="text"
                        id="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container-cadastro">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        className="input-cadastro"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        className="input-cadastro"
                        type="text"
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container-cadastro">
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input
                        className="input-cadastro"
                        type="date"
                        id="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container-cadastro">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        className="input-cadastro"
                        type="password"
                        id="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="confirmar-senha">Confirmação de Senha:</label>
                    <input
                        className="input-cadastro"
                        type="password"
                        id="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container-cadastro">
                    <label htmlFor="setor">Setor:</label>
                    <select
                        id="setor"
                        value={formData.setor}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione o setor</option>
                        {setores.map((setor) => (
                            <option key={setor.id} value={JSON.stringify(setor)}>
                                {`${setor.nome} - ${setor.categoria}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-container-cadastro">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
                <div className="input-container-cadastro">
                    <label htmlFor="admin">Usuário administrador:</label>
                    <select
                        id="admin"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="true">Sim</option>
                        <option value="false">Nao</option>
                    </select>
                </div>
                <div className="input-container-cadastro">
                    <div className="endereco-container">
                        <div className="endereco-inputs">
                            <label htmlFor="logradouro">Logradouro:</label>
                            <input
                                className="input-cadastro"
                                type="text"
                                id="endereco.logradouro"
                                value={formData.endereco.logradouro}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="endereco-inputs">
                            <label htmlFor="numero">Número:</label>
                            <input
                                className="input-cadastro"
                                type="text"
                                id="endereco.numero"
                                value={formData.endereco.numero}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="input-container-cadastro">
                    <div className="endereco-container">
                        <div className="endereco-inputs">
                            <label htmlFor="complemento">Complemento:</label>
                            <input
                                className="input-cadastro"
                                type="text"
                                id="endereco.complemento"
                                value={formData.endereco.complemento}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="endereco-inputs">
                            <label htmlFor="cidade">Cidade:</label>
                            <input
                                className="input-cadastro"
                                type="text"
                                id="endereco.cidade"
                                value={formData.endereco.cidade}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="input-container-cadastro">
                    <div className="endereco-container">
                        <div className="endereco-inputs">
                            <label htmlFor="estado">Estado:</label>
                            <input
                                className="input-cadastro"
                                type="text"
                                id="endereco.estado"
                                value={formData.endereco.estado}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="endereco-inputs">
                            <label htmlFor="cep">CEP:</label>
                            <input
                                className="input-cadastro"
                                type="text"
                                id="endereco.cep"
                                value={formData.endereco.cep}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="botao-cadastro-colaborador"
                    onClick={handleSubmit}
                >
                    Cadastrar
                </button>
                <div>
                    <GenericModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        title="Cadastro Colaborador"
                        message="Colaborador cadastrado com sucesso!"
                        closeText="Fechar"
                    />
                </div>
            </div>
        </>
    );
};

export default CadastroUsuario;
