"use client";
import './Dashboard.css';

import { useState } from "react";
import Sidebar from "@/Components/Cabecalho/Sidebar/Sidebar";
import Empresa from "@/Components/ItensMenu/Dashboard-Geral/Empresa/Empresa";
import Topbar from "@/Components/Cabecalho/Topbar/Topbar";

function Dashboard() {
  const [moduloAtivo, setModuloAtivo] = useState("empresa");

  return (
    <div className="layout-geral">
      <Topbar />
      <Sidebar onSelecionarModulo={setModuloAtivo} />
      <main className="area-render-modulo">
        {moduloAtivo === "empresa" && <Empresa />}
        {/* mais módulos */}
      </main>
    </div>
  );
}



export default Dashboard;