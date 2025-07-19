import Sidebar from "@/Components/Cabecalho/Sidebar/Sidebar";
import Topbar from "@/Components/Cabecalho/Topbar/Topbar";

export default function Home() {
  return (
    <div className="container"> 
      <Sidebar />

      <div className="content"> {/* <- Contéudo principal */}
        <Topbar />
        <main className="main-content"> {/* <- Contéudo principal vai aqui dentro do main */}
          <p>Sistema carregado com sucesso.</p>
        </main>
      </div>

    </div>
  );
}
