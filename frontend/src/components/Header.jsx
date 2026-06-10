import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Sidebar.css'; // Compartir el archivo CSS de layout y sidebar

export default function Header({ title = 'Dashboard', breadcrumb = 'Inicio' }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // Ignorar errores en logout para forzar salida local
    }
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (window.innerWidth > 992) {
      const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
      localStorage.setItem('sidebar-collapsed', isCollapsed ? 'true' : 'false');
      document.body.classList.remove('sidebar-open');
    } else {
      const isOpen = document.body.classList.toggle('sidebar-open');
      document.body.classList.remove('sidebar-collapsed');
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          type="button" 
          className="btn-sidebar-toggle" 
          onClick={toggleSidebar} 
          aria-label="Alternar menú lateral"
        >
          <Menu size={20} />
        </button>
        <div className="header-titles">
          <span className="header-breadcrumb">{breadcrumb}</span>
          <h1 className="header-page-title">{title}</h1>
        </div>
      </div>
      <div className="header-right">
        <button 
          className="btn-logout" 
          onClick={handleLogout} 
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} />
          <span className="logout-text">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
}
