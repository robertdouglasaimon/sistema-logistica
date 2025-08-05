"use client";
import './Filial.css';
import { useState, useEffect } from "react";

function Filial() {
    const [filiaisAtivas, setFiliaisAtivas] = useState(0); // Adicione aqui o estado para filiais ativas
    const [filiaisInativas, setFiliaisInativas] = useState(0); // Adicione aqui o estado para filiais inativas
    const [totalFiliais, setTotalFiliais] = useState(0); // Adicione aqui o estado para o total de filiais

    // Aqui vamos usar o useEffect para atualizar os estados quando as filiais forem alteradas
    useEffect(() => {
        const dadosSimulados = {
            ativas: 8,
            inativas: 2,
            total: 10
        };

        setFiliaisAtivas(dadosSimulados.ativas);
        setFiliaisInativas(dadosSimulados.inativas);
        setTotalFiliais(dadosSimulados.total);
        }, []);
   


    return(
    <section className='filial-section'>
        <div className="filial-box">
            <h1 className='filial-title'>Cadastro de Filial</h1>

            <section>
                {/* Indicadores de filiais ativas, inativas e total de filiais */}
                <div className="filial-indicadores">
                    <div className="indicador-card ativo">
                        <span className="indicador-titulo">Filiais Ativas</span>
                        <span className="indicador-valor">{filiaisAtivas}</span>
                    </div>
                    <div className="indicador-card inativo">
                        <span className="indicador-titulo">Filiais Inativas</span>
                        <span className="indicador-valor">{filiaisInativas}</span>
                    </div>
                    <div className="indicador-card total">
                        <span className="indicador-titulo">Total de Filiais</span>
                        <span className="indicador-valor">{totalFiliais}</span>
                    </div>
                </div>
            </section>

            <section>
            {/* Formulário de cadastro de filiais */}
                    <div className="filial-form">
                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Digite o nome da Filial" 
                            required 
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Status da Filial" 
                            required 
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Endereço da Filial" 
                            required  
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Tipo da Filial" 
                            required 
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Empresa" 
                            required 
                        />

                        <button className="filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center">Cadastrar Filial</button>
                    </div>         
            </section>

            <section>
            <h2 className="lista-filial-title">Lista de Filiais</h2>
                {/* Tabela de filiais */}
                <table className="filial-table">
                    <thead>
                        <tr>
                            <th>Nome da Filial</th> 
                            <th>Status da Filial</th>
                            <th>Endereço da Filial</th>
                            <th>Tipo da Filial</th>
                            <th>Empresa</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Adicione aqui as filiais cadastradas */}
                    </tbody>
                </table>
            </section>
        </div>
    </section>
    );
    
 };

export default Filial;
