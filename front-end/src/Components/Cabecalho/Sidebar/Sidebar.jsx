import './Sidebar.css';

// Instalada a biblioteca lucide-react para usar os itens abaixo. O NPM dela é npm install lucide-react. Abaixo segue a estrutura da biblioteca, com os itens que eu quero, para aplicar no projeto:
import {
  Building2,
  Factory,
  Users,
  UserCheck,
  Box,
  ClipboardList,
  Truck,
  Store,
} from 'lucide-react';

// Array com os itens da sidebar e seus respectivos labels e icones lá da biblioteca lucide-react:
const navItems = [
  { icon: Building2, label: 'Empresa' },
  { icon: Factory, label: 'Filial' },
  { icon: Users, label: 'Funcionários' },
  { icon: UserCheck, label: 'Clientes' },
  { icon: Store, label: 'Fornecedores' },
  { icon: Box, label: 'Produtos' },
  { icon: ClipboardList, label: 'Pedidos' },
  { icon: Truck, label: 'Viagens' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Sistema Logística</h2>
      <ul className="sidebar-list">

        {navItems.map(({ icon: Icon, label }, index) => (
          <li key={index}>
            <button className="sidebar-button">
              <Icon className="sidebar-icon" />
              <span>{label}</span>
            </button>
          </li>
        ))}
        
      </ul>
    </aside>
  );
}

export default Sidebar;