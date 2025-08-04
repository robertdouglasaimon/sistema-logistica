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
            <h1 className='filial-title'>Cadastro de Filiais</h1>

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


            {/* Adicione aqui o formulário de cadastro de filiais */}
        </div>
    </section>
    );
    
 };

export default Filial;
