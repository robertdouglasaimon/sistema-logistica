"use client";
import './Dashboard.css';

import { useState } from "react";
import Sidebar from "@/Components/Cabecalho/Sidebar/Sidebar";
import Topbar from "@/Components/Cabecalho/Topbar/Topbar";

// Insira aqui os módulos que desejar:
import Empresa from "@/Components/ItensMenu/Empresa/Empresa";
import Filial from "@/Components/ItensMenu/Filial/Filial";
import Funcionario from "@/Components/ItensMenu/Funcionario/Funcionario";


function Dashboard() {
    const [moduloAtivo, setModuloAtivo] = useState("empresa");
    // const [moduloAtivo, setModuloAtivo] = useState("filial"); // Me fez criar de graça kkkk só precisa de um módulo.
    // const [moduloAtivo, setModuloAtivo] = useState("funcionarios");// Me fez criar de graça kkkk só precisa de um módulo.
  

  return (
    <div className="layout-geral">
      <Topbar />
      <Sidebar onSelecionarModulo={setModuloAtivo} />

      <main className="area-render-modulo">
        {moduloAtivo === "empresa" && <Empresa />}
        {moduloAtivo === "filial" && <Filial />}
        {moduloAtivo === "funcionarios" && <Funcionario />}
        {/* mais módulos */}
      </main>
    </div>
  );
}



export default Dashboard;