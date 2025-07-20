"use client";
import "./Empresa.css";
import { useState } from "react";

function Empresa() {
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const salvarDadosEmpresa = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", { cnpj, telefone, endereco });

    // Aqui vai vir lógica para enviar os dados para o backend.
  };

  return (
    <section className="empresa-section">
      <div className="empresa-box">
        <h1 className="empresa-title">Cadastro de Empresas</h1>

        <form onSubmit={salvarDadosEmpresa} className="empresa-form">
          <div>
            <label className="empresa-label">CNPJ</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="empresa-input"
              placeholder="Digite o CNPJ da empresa"
              required
            />
          </div>

          <div>
            <label className="empresa-label">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="empresa-input"
              placeholder="(xx) xxxx-xxxx"
              required
            />
          </div>

          <div>
            <label className="empresa-label">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="empresa-input"
              placeholder="Rua, número, bairro, cidade"
              required
            />
          </div>

          <button type="submit" className="empresa-button">
            Salvar Empresa
          </button>
        </form>
      </div>
    </section>
  );
}

export default Empresa;
