import './Topbar.css';
import { LogOut } from 'lucide-react';

function Topbar() {

  // Array/Objeto com as informações do usuário
  const usuario = {
    nome: 'João Silva',
    cargo: 'Administrador',
    permissao: 'Nível 3',
  };

  return (
    <header className="topbar">
      <div className="topbar-info">

        <span className="topbar-nome">{usuario.nome}</span> {/* <- Exibe o nome do usuário que está logado */}

        <span className="topbar-cargo">{usuario.cargo} • {usuario.permissao}</span> {/* <- Exibe o cargo e a permissão do usuário que está logado */}
        
      </div>
      <button className="topbar-logout">
        <LogOut className="logout-icon" />
        Sair
      </button>
    </header>
  );
}
export default Topbar;