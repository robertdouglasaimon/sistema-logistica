"use client";
import "./Empresa.css";
import { useState } from "react";

function Empresa() {
  // Estado de cada campo
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");


  // Função de submit — evita erro de tela e serve de base
  const salvarDados = (e) => {
    e.preventDefault();
    console.log("Empresa cadastrada:", {
      cnpj,
      telefone,
      endereco,
      razaoSocial,
      nomeFantasia,
      email,
      status
    });

    // Aqui vai vir lógica para enviar os dados para o backend.
  };

  return (
    <div className="empresa-tela">

      <section className="empresa-busca">
        <h2>Buscar Empresas</h2>
        <div className="filtro-campos">
          <input type="text" placeholder="Nome Fantasia" />
          <input type="text" placeholder="CNPJ" />
          <input type="text" placeholder="Status" />
          <button>Filtrar</button>
        </div>
      </section>

      <section className="empresa-lista">
        <h2>Lista de Empresas</h2>
        <table>
          <thead>
            <tr>
              <th>Nome Fantasia</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* registros mockados ou reais */}
          </tbody>
        </table>
      </section>

      <section className="empresa-cadastro">
        <h2>Cadastro de Empresa</h2>
        <form onSubmit={salvarDados}>
          {/* campos de nome fantasia, cnpj, telefone, etc */}
          <button type="submit">Salvar</button>
        </form>
      </section>

    </div>
  );
};

export default Empresa;
