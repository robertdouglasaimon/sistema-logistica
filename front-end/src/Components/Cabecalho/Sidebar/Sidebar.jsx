import './Sidebar.css';
import Link from 'next/link';

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
  { icon: Building2, label: 'Empresa', modulo: 'empresa' },
  { icon: Factory, label: 'Filial', modulo: 'filial' },
  { icon: Users, label: 'Funcionários', modulo: 'funcionarios' },
  { icon: UserCheck, label: 'Clientes', modulo: 'clientes' },
  { icon: Store, label: 'Fornecedores', modulo: 'fornecedores' },
  { icon: Box, label: 'Produtos', modulo: 'produtos' },
  { icon: ClipboardList, label: 'Pedidos', modulo: 'pedidos' },
  { icon: Truck, label: 'Viagens', modulo: 'viagens' },
];


function Sidebar({ onSelecionarModulo }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Sistema Logística</h2>

      <ul className="sidebar-list">
        {navItems.map(({ icon: Icon, label, modulo }, index) => (
          
          <li key={index}>
            <button
              className="sidebar-button"
              onClick={() => onSelecionarModulo(modulo)}
            >
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