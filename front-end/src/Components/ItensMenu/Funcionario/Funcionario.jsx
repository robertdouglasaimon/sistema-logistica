"use client";
import './Funcionario.css';
import { use, useEffect, useState } from "react";

function Funcionario() {
// Estados relacionados aos campos e botão de cadastro de funcionários
    const [mostradorFuncionarios, setMostradorFuncionarios] = useState([]);
    const [funcionarioAtivo, setFuncionarioAtivo] = useState(0);
    const [funcionarioInativo, setFuncionarioInativo] = useState(0);
    const [totalFuncionarios, setTotalFuncionarios] = useState(0);


    const mostrarFuncionarios = async () => {
        try {
            const resposta = await fetch("http://localhost:3001/Funcionario");
            const data_funcionario = await resposta.json();
            console.log ("Funcionarios recebidos:", data_funcionario); // 🧪 Verifica os dados recebidos 
            setMostradorFuncionarios(data_funcionario);


             // 📊 Calcula os indicadores com base nos dados reais
             const funcionariosAtivos = data_funcionario.filter(f => f.status === "Ativo").length; // Total de funcionários ativos.
             const funcionariosInativos = data_funcionario.filter(f => f.status === "Inativo").length; // Total de funcionários inativos.
             const totalFuncionarios = data_funcionario.length; // Total de funcionários cadastrados.

             setFuncionarioAtivo(funcionariosAtivos);
             setFuncionarioInativo(funcionariosInativos);
             setTotalFuncionarios(totalFuncionarios);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }


    useEffect(() => {
        mostrarFuncionarios();
    }, []);

    return (
        <section className='funcionario-section'>
            <div className="funcionario-box">
                <h1 className='funcionario-title'>
                    <strong>Buscar Funcionários</strong>
                </h1>

                {/* 📊 Indicadores de funcionário ativos e inativos */}
                <section>
                    <div className="funcionarios-indicadores">
                        <div className="indicador-funcionario  ativo">
                            <span className='indicador-funcionario-titulo'>Funcionários ativos</span>
                            <span className='indicador-funcionario-valor'>{funcionarioAtivo}</span>
                        </div>
                        <div className="indicador-funcionario  inativo">
                            <span className='indicador-funcionario-titulo'>Funcionários inativos</span>
                            <span className='indicador-funcionario-valor'>{funcionarioInativo}</span>
                        </div>
                        <div className="indicador-funcionario total">
                            <span className='indicador-funcionario-titulo'>Total de Funcionários</span>
                            <span className='indicador-funcionario-valor'>{totalFuncionarios}</span>
                        </div>
                    </div>
                </section>

                <section>
                    
                </section>


            </div>
        </section>



    );
}

export default Funcionario;