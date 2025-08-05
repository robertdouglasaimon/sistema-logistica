"use client";
import './Filial.css';
import { useState, useEffect } from "react";

function Filial() {
/* Estados relacionados aos campos e botão de cadastro de filiais */
    const [nomeFilial, setNomeFilial] = useState(""); // Estado para o nome da filial
    const [statusFilial, setStatusFilial] = useState(""); // Estado para o status da filial
    const [enderecoFilial, setEnderecoFilial] = useState(""); // Estado para o endereço da filial
    const [tipoFilial, setTipoFilial] = useState(""); // Estado para o tipo da filial
    const [empresaFilial, setEmpresaFilial] = useState(""); // Estado para a empresa da filial

/* Estados relacionados aos indicadores de filiais ativas e inativas */
    const [filiaisAtivas, setFiliaisAtivas] = useState(0); // Estado para filiais ativas
    const [filiaisInativas, setFiliaisInativas] = useState(0); // Estado para filiais inativas
    const [totalFiliais, setTotalFiliais] = useState(0); // Estado para o total de filiais
    
/* Estados relacionados a Lista da tabela "Lista de Filiais" e suas funcionalidades */
    const [listaFiliais, setListaFiliais] = useState([]); // Estado para a lista de filiais
    const [editarFiliais, setEditarFiliais] = useState(false); // Estado para editar filiais
    const [filialSelecionada, setFilialSelecionada] = useState(null); // Estado para a filial selecionada

//-----------------------------------------------------------------------------------------------------------------//   
   // Função para cadastrar novas filiais:
    const cadastrarFilial = async () => {
        // Verifica se todos os campos foram preenchidos.
        if (!nomeFilial || !statusFilial || !enderecoFilial || !tipoFilial || !empresaFilial) {
            alert("Por favor, preencha todos os campos.");
            return;
        } 

        // Verifica se status é válido ou não
        const statusValido = ["Ativa", "Inativa"];
        if (!statusValido.includes(statusFilial))  {
            alert("Status inválido. Deve ser 'Ativa' ou 'Inativa'.");
            return;
        }

        const novaFilial = {
            nome: nomeFilial.trim(),
            status: statusFilial.trim(),
            endereco: enderecoFilial.trim(),
            tipo: tipoFilial.trim(),
            nome_empresa: empresaFilial.trim()
        };

        try {
            const resposta = await fetch("http://localhost:3001/Filial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novaFilial)
            });

            if (resposta.ok) {
                alert("Filial cadastrada com sucesso!");
                setNomeFilial(""); // Limpa os campos
                setStatusFilial(""); 
                setEnderecoFilial("");
                setTipoFilial("");
                setEmpresaFilial("");

                buscarFiliais(); // Atualiza a lista de filiais
            } else {
                console.error("Erro ao cadastrar filial:", resposta);
            }
        } catch (error) {
            console.error("Erro ao cadastrar filial:", error);
            alert("Erro ao cadastrar filial.");
        }
    }


    // 🔄 Função para buscar as filiais no back-end:
    const buscarFiliais = async () => {
        try {
            const resposta = await fetch("http://localhost:3001/Filial");
            const dados = await resposta.json();
            console.log("Filiais recebidas:", dados); // 🧪 Verifica os dados recebidos
            setListaFiliais(dados);

            // 📊 Calcula os indicadores com base nos dados reais
            const ativas = dados.filter(f => f.status === "Ativa").length;
            const inativas = dados.filter(f => f.status === "Inativa").length;
            const total = dados.length;

            setFiliaisAtivas(ativas);
            setFiliaisInativas(inativas);
            setTotalFiliais(total);
        } catch (error) {
            console.error("Erro ao buscar filiais:", error);
        }
    };

    // 🚀 useEffect para carregar as filiais ao montar o componente
    useEffect(() => {
        buscarFiliais();
    }, []);


    // 📝 Função para EDITAR as Filiais:
    const editarFilial = (id_filial) => {
        const filial = listaFiliais.find(f => f.id_filial === id_filial);
        setFilialSelecionada(filial);
        setEditarFiliais(true); // Abre o modal
    };

    // 📝 Função para SALVAR a edição dos dados das Filiais:
    const salvarEdicao = async() => {
            try {
            const resposta = await fetch(`http://localhost:3001/Filial/${filialSelecionada.id_filial}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filialSelecionada)
            });
            if (resposta.ok) {
                alert("Filial editada com sucesso!");
                setEditarFiliais(false);
                buscarFiliais();
            } else {
                alert("Erro ao editar filial.");
            }
        } catch (error) {
            console.error("Erro na edição:", error);
        }
    };

    /* 🗑️ Função para excluir filiais */
    function excluirFilial(id_filial) {
        if(confirm("Tem certeza que deseja excluir essa filial?")) {
            fetch(`http://localhost:3001/Filial/${id_filial}`, {
                method: "DELETE" // Usando o DELETE para excluir.
            })
            .then(resposta => {
                if(resposta.ok) {
                    alert("Filial excluída com sucesso!");
                    buscarFiliais(); // 🔁 Atualiza a lista após exclusão
                } else {
                    alert("Erro ao excluir filial!");
                }
            })
            .catch(error => {
                console.error("Erro ao excluir filial:", error);
                alert("Erro na requisição.");
            });
        }
    }

    return (
        <section className='filial-section'>
            <div className="filial-box">
                <h1 className='filial-title'>Cadastro de Filial</h1>

                <section>
                    {/* 📊 Indicadores de filiais ativas, inativas e total de filiais */}
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
                    {/* 📝 Formulário de cadastro de filiais */}
                    <div className="filial-form">
                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Digite o nome da Filial" 
                            value={nomeFilial}
                            onChange={(e) => setNomeFilial(e.target.value)}
                            required 
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Status da Filial" 
                            value={statusFilial}
                            onChange={(e) => setStatusFilial(e.target.value)}
                            required 
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Endereço da Filial"
                            value={enderecoFilial}
                            onChange={(e) => setEnderecoFilial(e.target.value)} 
                            required  
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Tipo da Filial" 
                            value={tipoFilial}
                            onChange={(e) => setTipoFilial(e.target.value)}
                            required 
                        />

                        <label className='filial-label'></label>
                        <input 
                            type="text" 
                            className="filial-input" 
                            placeholder="Empresa" 
                            value={empresaFilial}
                            onChange={(e) => setEmpresaFilial(e.target.value)}
                            required 
                        />

                        <button className="filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center" onClick={cadastrarFilial}>
                            Cadastrar Filial
                        </button>
                    </div>         
                </section>

                <section>
                    <h2 className="lista-filial-title">Lista de Filiais</h2>
                    {/* 📋 Tabela de filiais */}
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
                            {listaFiliais.map((filial) => (
                                <tr key={filial.id_filial}>
                                    <td>{filial.nome}</td>
                                    <td>{filial.status}</td>
                                    <td>{filial.endereco}</td>
                                    <td>{filial.tipo}</td>
                                    <td>{filial.nome_empresa}</td>
                                    <td>
                                        <button className="filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center"
                                        onClick={() => editarFilial(filial.id_filial)}
                                        >
                                            Editar
                                        </button>
                                    </td>

                                    {/* Modal de edição dos dados da tabela Filial */}
                                    {editarFiliais && filialSelecionada && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <h2>Editar Filial</h2>
                                            <input value={filialSelecionada.nome} onChange={e => setFilialSelecionada({...filialSelecionada, nome: e.target.value})} />
                                            <input value={filialSelecionada.status} onChange={e => setFilialSelecionada({...filialSelecionada, status: e.target.value})} />
                                            <input value={filialSelecionada.endereco} onChange={e => setFilialSelecionada({...filialSelecionada, endereco: e.target.value})} />
                                            <input value={filialSelecionada.tipo} onChange={e => setFilialSelecionada({...filialSelecionada, tipo: e.target.value})} />
                                            <input value={filialSelecionada.nome_empresa} onChange={e => setFilialSelecionada({...filialSelecionada, nome_empresa: e.target.value})} />
                                            

                                            {/* Repita para os outros campos */}
                                            <button onClick={salvarEdicao}>Salvar</button>
                                            <button onClick={() => setEditarFiliais(false)}>Cancelar</button>
                                        </div>
                                    </div>
                                    )}

                                    <td>
                                        <button 
                                            className="filial-button bg-red-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-red-600 transition font-semibold text-center" 
                                            onClick={() => excluirFilial(filial.id_filial)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </section>
    );
}

export default Filial;
