"use client";
import './Clientes.css';
import { useState, useEffect } from "react";

function Clientes() {
    /* Estados relacionados aos clientes ativos e inativos */
    const [clientesAtivos, setClientesAtivos] = useState(0); // Estado para clientes ativos
    const [clientesInativos, setClientesInativos] = useState(0); // Estado para clientes inativos
    const [clientesPJ, setClientesPJ] = useState(0); // Estado para clientes PJ
    const [clientesPF, setClientesPF] = useState(0); // Estado para clientes PF
    const [totalClientes, setTotalClientes] = useState(0); // Estado para o total de clientes

    // 🔄 Função para buscar clientes no back-end:
    const buscarClientes = async () => {
        try {
            const resposta = await fetch('http://localhost:3001/Cliente');
            const dados = await resposta.json();
            console.log('Clientes recebidos:', dados); // 🧪 Verifica os dados recebidos

            // 📊 Calcula os indicadores com base nos dados reais
            const clientesAtivos = dados.filter(c => c.status === 'Ativo').length;
            const clientesInativos = dados.filter(c => c.status === 'Inativo').length;
            const clientesPJ = dados.filter(c => c.tipo_empresa === 'PJ').length;
            const clientesPF = dados.filter(c => c.tipo_empresa === 'PF').length;
            const totalClientes = dados.length;


            setClientesAtivos(clientesAtivos);
            setClientesInativos(clientesInativos);
            setClientesPJ(clientesPJ);
            setClientesPF(clientesPF);
            setTotalClientes(totalClientes);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    useEffect(() => {
        buscarClientes();
    }, []);

    return (
        <section className="clientes-container">
            <h1 className="clientes-title">Clientes</h1>
            
        {/* 📊 Indicadores: Clientes Ativos, Tipo: PJ/PF  */}
            <section>
                <div className="clientes-indicadores">
                    <div className="indicador-clientes-card ativo">
                        <span className='indicador-clientes-valor'>Clientes Ativos </span>
                        <span className="indicador-clientes-titulo">{clientesAtivos}</span>
                    </div>

                    <div className="indicador-clientes-card pj">
                        <span className='indicador-clientes-valor'>Clientes PJ <br/> </span>
                        <span className="indicador-clientes-titulo">{clientesPJ}</span>
                    </div>

                    <div className="indicador-clientes-card pf">
                        <span className='indicador-clientes-valor'>Clientes PF <br/> </span>
                        <span className="indicador-clientes-titulo">{clientesPF}</span>
                    </div>

                    <div className="indicador-clientes-card inativo">
                        <span className='indicador-clientes-valor'>Clientes Inativos </span>
                        <span className="indicador-clientes-titulo">{clientesInativos}</span>
                    </div>

                    <div className="indicador-clientes-card total">
                        <span className='indicador-clientes-valor'>Total de Clientes </span>
                        <span className="indicador-clientes-titulo">{totalClientes}</span>
                    </div>

                </div>
            </section>


        </section>
    );
}

export default Clientes;