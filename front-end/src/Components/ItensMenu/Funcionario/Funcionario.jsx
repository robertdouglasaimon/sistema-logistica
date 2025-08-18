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

// Estados relacionados ao cadastro de funcionários
   const [nomeFuncionario, setNomeFuncionario] = useState("");
   const [cpfFuncionario, setCpfFuncionario] = useState("");
   const [telefoneFuncionario, setTelefoneFuncionario] = useState("");
   const [cargoFuncionario, setCargoFuncionario] = useState("");
   const [salarioFuncionario, setSalarioFuncionario] = useState("");
   const [statusFuncionario, setStatusFuncionario] = useState("");
   const [admissaoFuncionario, setAdmissaoFuncionario] = useState("");
   const [demissaoFuncionario, setDemissaoFuncionario] = useState("");

   const [listaFiliais, setListaFiliais] = useState([]); // array de filiais
   const [filialSelecionada, setFilialSelecionada] = useState(""); // id selecionado
   




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

    const cadastrarFuncionario = async () => {
        // Validando os dados do funcionário
        const statusFuncionarioValido = ["Ativo", "Inativo"];

        // Verifique se o status do funcionário é valido
        if (!statusFuncionarioValido.includes(statusFuncionario.trim())) {
            alert("Status inválido. Deve ser 'Ativo' ou 'Inativo'.");
            return;
        }

        // Verifique se uma filial foi selecionada
        if (!filialSelecionada) {
        alert("Selecione uma filial antes de cadastrar.");
        return;
        }

        // Verifique se o salário é um número válido
        if (isNaN(parseFloat(salarioFuncionario))) {
        alert("Salário inválido.");
        return;
        }



        const novoFuncionario = {
            nome: nomeFuncionario, // Trim para remover espacos em branco
            cpf: cpfFuncionario.trim(),
            status: statusFuncionario.trim(),  
            cargo: cargoFuncionario.trim(), 
            salario: parseFloat(salarioFuncionario),         
            id_filial: parseInt(filialSelecionada), 
            admissao: admissaoFuncionario.trim(),
            demissao: demissaoFuncionario.trim(),      
        };
        try {
            const resposta = await fetch("http://localhost:3001/Funcionario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoFuncionario)
            });

            if(resposta) {
                alert("Funcionario cadastrado com sucesso!");
                setNomeFuncionario("");
                setCpfFuncionario("");
                setStatusFuncionario("Ativo");
                setCargoFuncionario("");
                setSalarioFuncionario("");
                setFilialSelecionada("");
                setAdmissaoFuncionario("");
                setDemissaoFuncionario("");

                mostrarFuncionarios(); // Atualiza lista
            } else {
                alert("Erro ao cadastrar funcionário.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar funcionario:", error);
            alert("Erro na requisição.");
        }


    }

    const idFilial = async () => {
        try {
            const resposta = await fetch("http://localhost:3001/Filial");
            const data_filial = await resposta.json();

            setListaFiliais(data_filial); // salva o array completo
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };




    useEffect(() => {
        mostrarFuncionarios();
        idFilial();
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

                {/* 🔍 Busca de funcionários */}
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

                {/* 👤 Castro de Funcionario */}
                <section>
                    <h2 className='funcionario-cadastro-title'>Cadastrar Funcionario</h2>
                    <div className='funcionario-cadastro'>
                        <input 
                            type="text" 
                            placeholder="Digite o nome.." 
                            value={nomeFuncionario}
                            onChange={(e) => setNomeFuncionario(e.target.value)}

                        />

                        <input 
                            type="text" 
                            placeholder='Digite o CPF' 
                            value={cpfFuncionario}
                            onChange={(e) => setCpfFuncionario(e.target.value)}

                        />

                        {/* Select para escolher o Status do Funcionario */}
                        <select className='funcionario-label' 
                            value={statusFuncionario}
                            onChange={(e) => setStatusFuncionario(e.target.value)}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                        
                        <input 
                            type="text" 
                            placeholder='Digite o Cargo' 
                            value={cargoFuncionario}
                            onChange={(e) => setCargoFuncionario(e.target.value)}

                        />

                        <input 
                            type="text" 
                            placeholder='Digite o Salário' 
                            value={salarioFuncionario}
                            onChange={(e) => setSalarioFuncionario(e.target.value)}

                        />

                        {/* Select para escolher a Filial do Funcionario */}
                        <select 
                            className="funcionario-label" 
                            value={filialSelecionada}
                            onChange={(e) => setFilialSelecionada(e.target.value)}
                            required
                        >
                            <option value="">Selecione a Filial</option>
                            {listaFiliais.map((filial) => (
                                <option key={filial.id_filial} value={filial.id_filial}>
                                    {filial.id_filial}
                                </option>
                            ))}
                        </select>

                        
                        <input 
                            type="text" 
                            placeholder='Digite a Data de Admissão'
                            value={admissaoFuncionario}
                            onChange={(e) => setAdmissaoFuncionario(e.target.value)}

                        />

                        <input 
                            type="text" 
                            placeholder='Digite a Data de Demissão'
                            value={demissaoFuncionario}
                            onChange={(e) => setDemissaoFuncionario(e.target.value)}

                        />                        

                        
                        <button className='filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center' onClick={cadastrarFuncionario}>Cadastrar</button>

                    </div>
                </section>

                {/* 📋 Tabela de funcionários */}
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

                                                    {/* Selecionar Filial */}
                                                    <select className='funcionario-label'
                                                        value={funcionarioEditando.id_filial}
                                                        onChange={(e) =>
                                                            setFuncionarioEditando({
                                                                ...funcionarioEditando,
                                                                id_filial: e.target.value
                                                            })
                                                        }
                                                        required
                                                    >
                                                        <option value="">Selecione a Filial</option>
                                                        {listaFiliais.map((filial) => (
                                                            <option key={filial.id_filial} value={filial.id_filial}>
                                                                {filial.id_filial}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* Selecionar Status */}
                                                    <select
                                                        className="funcionario-label"
                                                        value={funcionarioEditando.status || ""}
                                                        onChange={(e) =>
                                                            setFuncionarioEditando({
                                                                ...funcionarioEditando,
                                                                status: e.target.value
                                                            })
                                                        }
                                                    >
                                                        <option value="Ativo">Ativo</option>
                                                        <option value="Inativo">Inativo</option>
                                                    </select>


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