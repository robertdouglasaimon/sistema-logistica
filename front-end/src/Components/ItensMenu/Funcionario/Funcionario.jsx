"use client";
import './Funcionario.css';
import { use, useEffect, useState } from "react";

function Funcionario() {
// Estados relacionados aos campos e botão de cadastro de funcionários
    const [mostradorFuncionarios, setMostradorFuncionarios] = useState([]);
    const [funcionarioAtivo, setFuncionarioAtivo] = useState(0);
    const [funcionarioInativo, setFuncionarioInativo] = useState(0);
    const [totalFuncionarios, setTotalFuncionarios] = useState(0);

//  Estados para filtrar os funcionários
    const [filtroNomeFuncionario, setFiltroNomeFuncionario] = useState("");
    const [filtroCpfFuncionario, setFiltroCpfFuncionario] = useState("");

    /* Estado relacionado a limpeza do filtro */
    const [limparFiltroFuncionario, setLimparFiltroFuncionario] = useState(false);

// Estados relacionados a edição de funcionários
   const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
   const [funcionarioEditando, setFuncionarioEditando] = useState({});




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


    const filtrarFuncionarios = () => {
        const funcionariosFiltrados = mostradorFuncionarios.filter((funcionario) => {
            return (
                funcionario.nome.toLowerCase().includes(filtroNomeFuncionario.toLowerCase()) &&
                funcionario.cpf.toLowerCase().includes(filtroCpfFuncionario.toLowerCase())
            );
        })
        setMostradorFuncionarios(funcionariosFiltrados);
    };

    const limparPesquisaFiltroFuncionarios = () => {
        setFiltroNomeFuncionario(""); // Limpa o filtro
        setFiltroCpfFuncionario("");
        setLimparFiltroFuncionario(true);

        mostrarFuncionarios(); // 🔁 Recarrega os dados do banco

        setTimeout(() => setLimparFiltroFuncionario(false), 100); // Limpa o filtro
    };


    useEffect(() => {
        mostrarFuncionarios();
        filtrarFuncionarios();
        limparPesquisaFiltroFuncionarios();
    }, []);

/* 📝 Função para editar funcionários */
    function abrirModalEdicao(funcionario) {
        setFuncionarioEditando(funcionario);
        setMostrarModalEdicao(true);
    }


/* 🔄 Função para Salvar a Edição de Funcionários */
    async function salvarEdicaoFuncionario() {
        try {
            const resposta = await fetch(`http://localhost:3001/Funcionario/${funcionarioEditando.id_funcionario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(funcionarioEditando)
            });

            if (resposta.ok) {
                alert("Funcionário editado com sucesso!");
                setMostrarModalEdicao(false);
                setFuncionarioEditando({});
                mostrarFuncionarios(); // Atualiza lista
            } else {
                alert("Erro ao editar funcionário.");
            }
        } catch (error) {
            console.error("Erro ao editar:", error);
            alert("Erro na requisição.");
        }
    }


/* 🗑️ Função para excluir funcionários */
    function excluirFuncionario(id_funcionario) {
        if(confirm("Tem certeza que deseja excluir esse funcionario?")) {
            fetch(`http://localhost:3001/Funcionario/${id_funcionario}`, {
                method: "DELETE" // Usando o DELETE para excluir.
            })
            .then(resposta => {
                if(resposta.ok) {
                    alert("Funcionario excluído com sucesso!");
                    mostrarFuncionarios(); // 🔁 Atualiza a lista após exclusão
                } else {
                    alert("Erro ao excluir o funcionario!");
                }
            })
            .catch(error => {
                console.error("Erro ao excluir funcionario:", error);
                alert("Erro na requisição.");
            });
        }
    }

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

                {/* 📊 Busca de funcionários */}
                <section>
                    <div className="busca-funcionario">
                        <input 
                            type="text" 
                            placeholder="Digite o nome..." 
                            value={filtroNomeFuncionario}
                            onChange={(e) => setFiltroNomeFuncionario(e.target.value)}
                        />

                        <input 
                            type="text" 
                            placeholder="Digite o CPF..."
                            value={filtroCpfFuncionario}
                            onChange={(e) => setFiltroCpfFuncionario(e.target.value)} 
                        />

                        <button className='filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center' onClick={filtrarFuncionarios}>Filtrar</button>

                        <button className='filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center' onClick={limparPesquisaFiltroFuncionarios}>Limpar Filtro</button>
                    </div>
                </section>

                {/* 📊 Tabela de funcionários */}
                <section>
                    <h2 className="lista-funcionarios-title">Lista de Filiais</h2>
                    {/* 📊 Tabela de funcionários */}
                    <table className="funcionario-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Status</th>
                                <th>Cargo</th>
                                <th>Salário</th>
                                <th>ID_Filial</th>
                                <th>Admissão</th>
                                <th>Demissão</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostradorFuncionarios.map((funcionario) => (
                                <tr key={funcionario.id_funcionario}>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.cpf}</td>
                                    <td>{funcionario.status}</td>
                                    <td>{funcionario.cargo}</td>
                                    <td>{`R$ ${funcionario.salario}.00`}</td>
                                    <td>{funcionario.id_filial}</td>
                                    <td>{funcionario.admissao}</td>
                                    <td>{funcionario.demissao}</td>
                                    <td>
                                        <button 
                                            className="filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center" 
                                            onClick={() => abrirModalEdicao(funcionario)}
                                            >
                                                Editar
                                        </button>
                                    </td>

                                    {/* Modal de Edição de Dados do Funcionario */}
                                    {mostrarModalEdicao && (
                                        <div className="modal-funcionario">
                                            <div className="modal-conteudo">
                                                <h2>Editar Funcionário</h2>
                                                <form>
                                                    <input type="text" value={funcionarioEditando.nome} onChange={e => setFuncionarioEditando({...funcionarioEditando, nome: e.target.value})} placeholder="Nome" />
                                                    <input type="text" value={funcionarioEditando.cpf} onChange={e => setFuncionarioEditando({...funcionarioEditando, cpf: e.target.value})} placeholder="CPF" />
                                                    <input type="number" value={funcionarioEditando.id_filial} onChange={e => setFuncionarioEditando({...funcionarioEditando, id_filial: e.target.value})} placeholder="ID Filial" />
                                                    <input type="text" value={funcionarioEditando.status} onChange={e => setFuncionarioEditando({...funcionarioEditando, status: e.target.value})} placeholder="Status" />
                                                    <input type="date" value={funcionarioEditando.admissao} onChange={e => setFuncionarioEditando({...funcionarioEditando, admissao: e.target.value})} />
                                                    <input type="number" value={funcionarioEditando.salario} onChange={e => setFuncionarioEditando({...funcionarioEditando, salario: e.target.value})} placeholder="Salário" />
                                                    <input type="date" value={funcionarioEditando.demissao} onChange={e => setFuncionarioEditando({...funcionarioEditando, demissao: e.target.value})} />
                                                    <input type="text" value={funcionarioEditando.cargo} onChange={e => setFuncionarioEditando({...funcionarioEditando, cargo: e.target.value})} placeholder="Cargo" />

                                                    <div className="modal-botoes">
                                                        <button type="button" onClick={salvarEdicaoFuncionario}>Salvar</button>
                                                        <button type="button" onClick={() => setMostrarModalEdicao(false)}>Cancelar</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}




                                    <td>
                                        <button 
                                            className="filial-button bg-red-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-red-600 transition font-semibold text-center" 
                                            onClick={() => excluirFuncionario(funcionario.id_funcionario)}>
                                            
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

export default Funcionario;