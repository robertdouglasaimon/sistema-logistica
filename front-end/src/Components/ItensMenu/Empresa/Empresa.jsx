"use client";
import "./Empresa.css";
import { useState, useEffect } from "react";

function Empresa() {
  // Estado de cada campo
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Filtros
  // Lista de empresas
  const [empresas, setEmpresas] = useState([]);
  // Filtro de nome fantasia do item campo de buscar empresa 
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const [filtroNomeFantasia, setFiltroNomeFantasia] = useState("");
  const [filtroCnpj, setFiltroCnpj] = useState("");


  // Mensagem de sucesso
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  // Mensagem de erro
  const [mensagemErro, setMensagemErro] = useState(false); 
  const [mensagemErroTexto, setMensagemErroTexto] = useState(""); // 🆕 Novo estado para texto do erro

  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
  const [empresaEditando, setEmpresaEditando] = useState({});
  
  
// 🔍 Função de filtragem
  const filtrarEmpresas = () => {
    const resultado = empresas.filter((empresa) => {
      const nomeValido = empresa.razao_social?.toLowerCase().includes(filtroNomeFantasia.toLowerCase());
      const cnpjValido = empresa.cnpj?.includes(filtroCnpj);
      return nomeValido || cnpjValido;
    });
    setEmpresasFiltradas(resultado);
  };


// Limpar filtro
  const limparFiltro = () => {
    setFiltroNomeFantasia("");
    setFiltroCnpj("");
    setEmpresasFiltradas(empresas); // Restaura tudo.
  };

  useEffect(() => {
    buscarEmpresas();
    
  }, []);

// Buscar empresas dentro do banco de dados:
  const buscarEmpresas = () => {
    fetch("http://localhost:3001/Empresa")
      .then((response) => response.json())
      .then((data) => { 
        setEmpresas(data);
        setEmpresasFiltradas(data); // Mostra tudo no inicio
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  };

// Limpar campos
  const limparCampos = () => {
    setCnpj("");
    setTelefone("");
    setEndereco("");
    setRazaoSocial("");
    setEmail("");
    setStatus("");
  };


/* 📝 Função para editar as empresas */
    function abrirModalEdicao(empresa) {
        setEmpresaEditando(empresa);
        setMostrarModalEdicao(true);
    }


/* 🔄 Função para Salvar a Edição de Funcionários */
  async function salvarEdicaoEmpresa() {
      try {
          const resposta = await fetch(`http://localhost:3001/Empresa/${empresaEditando.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(empresaEditando)
          });

          if (resposta.ok) {
              alert("Empresa editada com sucesso!");
              setMostrarModalEdicao(false);
              setEmpresaEditando({});
              buscarEmpresas(); // Atualiza lista
          } else {
              alert("Erro ao editar empresa.");
          }
      } catch (error) {
          console.error("Erro ao editar:", error);
          alert("Erro na requisição.");
      }
  }

  function excluirEmpresa(id) {
    if(confirm("Tem certeza que deseja excluir essa empresa?")) {
        fetch(`http://localhost:3001/Empresa/${id}`, {
            method: "DELETE" // Usando o DELETE para excluir.
        })
        .then(resposta => {
            if(resposta.ok) {
                alert("Empresa excluida com sucesso!");
                buscarEmpresas(); // 🔁 Atualiza a lista após exclusão
            } else {
                alert("Erro ao excluir empresa!");
            }
        })
        .catch(error => {
            console.error("Erro ao excluir empresa:", error);
            alert("Erro na requisição.");
        });
    }
  }

  const salvarDados = (e) => {
    e.preventDefault();

  // Validando dados antes de enviar pelo salvarDados(Lembrando que esses dados vem da função validandoDados):
    if(!validandoDados()) {
      setMensagemErro(true); // Mostra mensagem de erro se os dados forem inválidos.
      setTimeout(() => setMensagemErro(false), 3000); // Limpa a mensagem de erro depois de 3 segundos.
      return
    } 

/*-------------------------------------------------------------------------------------------*/

    const novaEmpresa = {
      cnpj,
      telefone,
      endereco,
      razaoSocial,
      email,
      status
    };

    fetch("http://localhost:3001/Empresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaEmpresa)
    })
      .then((res) => {
          if (!res.ok) throw new Error("Erro ao cadastrar empresa"); // força erro se não retornar status 2xx
          return res.json();
      })
      .then((data) => {
        console.log("Empresa cadastrada com ID:", data.id);

        // Atualiza lista, mostra mensagem e limpa campos
        buscarEmpresas();
        setMensagemSucesso(true);
        limparCampos();
        setTimeout(() => setMensagemSucesso(false), 3000);
      })
      .catch((error) => console.error("Erro ao cadastrar empresa:", error));
            setMensagemErroTexto("Erro ao cadastrar empresa no servidor.");
            setMensagemErro(true);
            setTimeout(() => setMensagemErro(false), 3000);
  };

const validandoDados = () => {
  /*-------------------------------------------------------------------------------------------*/
  /* Validação dos campos da sessão "Cadastro de Empresa" */ 

  // Impedindo que os campos vazios sejam enviados:
      // Usarei trim() para remover espacos em branco.
  if (
    cnpj.trim() === "" || 
    telefone.trim() === "" || 
    endereco.trim() === "" || 
    razaoSocial.trim() === "" || 
    email.trim() === "" || 
    status.trim() === "") {
    setMensagemErroTexto("Preencha todos os campos obrigatórios.");
    return false;
  }

  // Validando CNPJ:
  const cnpjLimpo = cnpj.replace(/[^\d]/g, ""); // Remove tudo que não for numero.
  if (cnpjLimpo.length !== 14) { // Verifica se o CNPJ possui 14 digitos.
    setMensagemErroTexto("CNPJ inválido: deve conter 14 dígitos.");
    return false;
  }

  // Validando telefone:
  const telefoneLimpo = telefone.replace(/[^\d]/g, ""); // Remove tudo que não for numero.
  if (telefoneLimpo.length < 10) { // Verifica se o telefone possui 10 digitos.
    setMensagemErroTexto("Telefone inválido: deve conter pelo menos 10 dígitos.");
    return false;
  }

  // Validando email:
  if (!email.includes("@") || !email.includes(".")) {
    setMensagemErroTexto("Email inválido: deve conter '@' e '.'");
    return false;
  } 

  // Validando status:
  const statusValido = ["Ativo", "Inativo"];
  if (!statusValido.includes(status)) {
    setMensagemErroTexto("Status inválido: deve ser 'Ativo' ou 'Inativo'.");
    return false;
  }

  return true; // Tudo certo!
}


  return (
    <div className="empresa-tela">
      {/* BUSCA */}
      <section className="empresa-busca">
        <h2 className="busca-empresa-title">Buscar Empresa</h2>
        <div className="filtro-campos">
          <input 
            type="text" 
            placeholder="Nome Fantasia" 
            className="label-input-busca" 
            value={filtroNomeFantasia}
            onChange={(e) => setFiltroNomeFantasia(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="CNPJ" 
            className="label-input-busca" 
            value={filtroCnpj}
            onChange={(e) => setFiltroCnpj(e.target.value)}
          />
          <button 
            onClick={filtrarEmpresas}
            className="bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold">
            Filtrar
          </button>

          <button 
            onClick={limparFiltro}
            className="bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold">
            Limpar Filtro
          </button>
        </div>
      </section>

      {/* LISTA */}
      <section className="empresa-lista">
        <h2 className="lista-empresa-title">Lista de Empresas</h2>
        <table>
          <thead>
            <tr>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Status</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {empresasFiltradas.map((empresa, index) => (
              <tr key={index}>
                <td>{empresa.razao_social}</td>
                <td>{empresa.cnpj}</td>
                <td>{empresa.telefone}</td>
                <td>{empresa.endereco}</td>
                <td>{empresa.email}</td>
                <td>{empresa.status}</td>
                <td>
                  <button 
                    className='filial-button bg-blue-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-blue-600 transition font-semibold text-center'
                    onClick={() => abrirModalEdicao(empresa)}
                    >
                    Editar
                  </button>
                </td>
                
                <td>
                  <button 
                    className='filial-button bg-red-500 text-white px-4 ml-[0.5rem] py-2 rounded hover:bg-red-600 transition font-semibold text-center'
                    onClick={() => excluirEmpresa(empresa.id)}
                    >
                    Excluir
                  </button>
                </td>

              {mostrarModalEdicao && (
              <div className="modal-empresa">
                  <div className="modal-conteudo">
                      <h2>Editar Empresa</h2>
                      <form>
                          <input type="text" value={empresaEditando.razao_social} onChange={e => setEmpresaEditando({...empresaEditando, razao_social: e.target.value})} placeholder="Razão Social" />
                          <input type="text" value={empresaEditando.cnpj} onChange={e => setEmpresaEditando({...empresaEditando, cnpj: e.target.value})} placeholder="CNPJ" />
                          <input type="text" value={empresaEditando.telefone} onChange={e => setEmpresaEditando({...empresaEditando, telefone: e.target.value})} placeholder="Telefone" />
                          <input type="text" value={empresaEditando.endereco} onChange={e => setEmpresaEditando({...empresaEditando, endereco: e.target.value})} placeholder="Endereço" />
                          <input type="text" value={empresaEditando.email} onChange={e => setEmpresaEditando({...empresaEditando, email: e.target.value})} placeholder="Email" />

                          {/* Selecionar Status */}
                          <select  className="status-select" value={empresaEditando.status} onChange={e => setEmpresaEditando({...empresaEditando, status: e.target.value})}>
                              <option value="Ativo">Ativo</option>
                              <option value="Inativo">Inativo</option>
                          </select>
                          <br />
                          <br />

                          
                          <div className="modal-botoes">
                              <button 
                                type="button" 
                                onClick={salvarEdicaoEmpresa}>
                                  Salvar
                              </button>

                              <button 
                                type="button" 
                                onClick={() => setMostrarModalEdicao(false)}>
                                  Cancelar
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
              )}


              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CADASTRO */}
      <section className="empresa-cadastro">
        <h2 className="cadastro-empresa-title">Cadastro de Empresa</h2>
        <form onSubmit={salvarDados}>
          <div className="campos-cadastro-empresa">

            <label><b>Razão Social:</b>
              <input 
                className="cadastro-empresa-label" 
                type="text" 
                placeholder="Digite a Razão Social" 
                value={razaoSocial} 
                onChange={(e) => setRazaoSocial(e.target.value)} />
            </label>

            <label><b>CNPJ:</b>
              <input 
                className="cadastro-empresa-label" 
                type="text" 
                placeholder="Digite o CNPJ" 
                value={cnpj} 
                onChange={(e) => setCnpj(e.target.value)} />
            </label>

            <label><b>Telefone:</b>
              <input 
                className="cadastro-empresa-label" 
                type="text" 
                placeholder="Digite o Telefone" 
                value={telefone} 
                onChange={(e) => setTelefone(e.target.value)} />
            </label>

            <label><b>Endereço:</b>
              <input 
                className="cadastro-empresa-label" 
                type="text" 
                placeholder="Digite o Endereço" 
                value={endereco} 
                onChange={(e) => setEndereco(e.target.value)} />
            </label>

            <label>
              <b>Email:</b>
              <input 
                className="cadastro-empresa-label" 
                type="text" 
                placeholder="Digite o Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </label>

            {/* Selecionar Status */}
            <select className="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          {/* MENSAGEM SUCESSO */}
          {mensagemSucesso && (
            <div className="mensagem-sucesso">
              🎉 Empresa cadastrada com sucesso!
            </div>
          )}

          {/* MENSAGEM ERRO */}
          {mensagemErro && (
            <div className="mensagem-erro">
              🚫 {mensagemErroTexto}
            </div>
          )}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold pl-18 botao-salvar">Salvar</button>
        </form>
      </section>
    </div>
  );
}

export default Empresa;
