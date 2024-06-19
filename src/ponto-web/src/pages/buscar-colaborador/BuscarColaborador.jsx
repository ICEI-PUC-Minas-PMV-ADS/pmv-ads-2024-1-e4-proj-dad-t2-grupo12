import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import './BuscarColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import { obterColaboradorPeloNome } from "../../services/api.jsx";
import BuscarInput from "../../components/buscar-input/BuscarInput.jsx"; // Adjust path if necessary

const BuscarColaborador = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const obterPeloNome = async (term) => {
        try {
            const response = await obterColaboradorPeloNome(term);
            setColaboradores(response);
        } catch (error) {
            console.error("Erro ao buscar colaborador pelo nome:", error);
        }
    };

    const debouncedSearch = useCallback(_.debounce((term) => {
        if (term) {
            obterPeloNome(term);
        } else {
            setColaboradores([]);
        }
    }, 500), []);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    return (
        <div className="app">
            <Header />
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral />
                </div>
                <div className="conteudo-central">
                    <div className="top-table">
                        <div className="title-top-table">
                            <h2>Buscar Colaborador</h2>
                        </div>
                    </div>
                    <div className="main-painel-inicial-buscar">
                        <div className="painel-table-inicial-buscar">
                            <BuscarInput
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                colaboradores={colaboradores}
                                obterPeloNome={obterPeloNome}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuscarColaborador;
