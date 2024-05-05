import './CadastroUsuario.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";

const CadastroUsuario = () => {
    return (
        <><Header></Header><MenuLateral></MenuLateral><div className="cadastro-usuario">
            <h1>Cadastro de Usuário</h1>
            <div className="input-container-cadastro">
                <label htmlFor="nome">Nome:</label>
                <input className="input-cadastro" type="text" id="nome" />
            </div>
            <div className="input-container-cadastro">
                <label htmlFor="email">E-mail:</label>
                <input className="input-cadastro" type="email" id="email" />
                <label htmlFor="cpf">CPF:</label>
                <input className="input-cadastro" type="text" id="cpf" />
            </div>
            <div className="input-container-cadastro">
                <label htmlFor="senha">Senha:</label>
                <input className="input-cadastro" type="password" id="senha" />
                <label htmlFor="confirmar-senha">Confirmação de Senha:</label>
                <input className="input-cadastro" type="password" id="confirmar-senha" />
            </div>
            <div className="input-container-cadastro">
                <label htmlFor="setor">Setor:</label>
                <select id="setor">
                    <option value="comercial">Comercial</option>
                    <option value="operacao">Operação</option>
                    <option value="rh">RH</option>
                    <option value="logistica">Logística</option>
                </select>
            </div>
            <div className="input-container-cadastro">
                <label htmlFor="status">Status:</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <button className="botao-cadastro-colaborador">Cadastrar</button>
        </div></>
    );
}

export default CadastroUsuario;
