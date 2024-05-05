import './CadastroUsuario.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";

const CadastroUsuario = () => {
    return (
        <><Header></Header><MenuLateral></MenuLateral><div className="cadastro-usuario">
            <h1>Cadastro de Usuário</h1>
            <div className="input-container">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" />
            </div>
            <div className="input-container">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" />
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" />
            </div>
            <div className="input-container">
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" />
                <label htmlFor="confirmar-senha">Confirmação de Senha:</label>
                <input type="password" id="confirmar-senha" />
            </div>
            <div className="input-container">
                <label htmlFor="setor">Setor:</label>
                <select id="setor">
                    <option value="comercial">Comercial</option>
                    <option value="operacao">Operação</option>
                    <option value="rh">RH</option>
                    <option value="logistica">Logística</option>
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="status">Status:</label>
                <select id="status">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <button>Cadastrar</button>
        </div></>
);
}

export default CadastroUsuario;