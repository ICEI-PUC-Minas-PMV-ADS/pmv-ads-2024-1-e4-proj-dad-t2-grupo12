// Perfil.jsx
import React from 'react';
import './Perfil.css';

const Perfil = () => {
    return (
        <div className="perfil-container">
            <div className="perfil-dados-fixo">
                <img src="src/assets/exemplo.jpeg" alt="Foto do usuário" className="perfil-foto"/>
                <input type="text" value="Usuário Teste" disabled className="input-disabled"/>
                <input type="text" value="usuario@teste.com" disabled className="input-disabled"/>
                <input type="text" value="000.000.000-00" disabled className="input-disabled"/>
                <button className="btn-resetar">Resetar Senha</button>
            </div>
            <div className="perfil-dados-editaveis">
            <label className="label-perfil">
                    Setor:
                    <select defaultValue="Comercial" className="input-editavel">
                        <option value="Comercial">Comercial</option>
                        <option value="Operacional">Operacional</option>
                        <option value="RH">RH</option>
                        <option value="Logistica">Logística</option>
                    </select>
                </label>
                <label className="label-perfil">
                    Status:
                    <select defaultValue="Ativo" className="input-editavel">
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </label>
                <label  className="label-perfil">Salário: <input type="text" defaultValue="R$ 5000,00" className="input-editavel2"/></label>
            </div>
        </div>
    );
}

export default Perfil;

