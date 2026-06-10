import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Grid, 
  BookOpen, 
  Layers, 
  ClipboardList, 
  GraduationCap, 
  UserRound, 
  UsersRound, 
  UserCheck, 
  CalendarCheck, 
  Clock, 
  Trophy, 
  BarChart3, 
  LayoutDashboard,
  X
} from 'lucide-react';
import escudo from '../assets/escudo-ficct.png';
import './Sidebar.css';

export default function Sidebar() {
  const stored = sessionStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;
  const role = user?.role?.toLowerCase();

  const canViewDocentes = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);
  const canViewGruposCup = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);
  const canViewAsignacionesDocentes = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);
  const canViewCargaHorariaAulas = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);
  const canViewEvaluacionesNotas = ['admin', 'administrador', 'coordinador', 'docente', 'autoridad'].includes(role);
  const canViewAdmisionesCup = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);
  const canViewReportesAcademicos = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);
  const canViewDashboardAdmin = ['admin', 'administrador', 'coordinador', 'autoridad'].includes(role);

  useEffect(() => {
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (isCollapsed && window.innerWidth > 992) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, []);

  const closeSidebar = () => {
    document.body.classList.remove('sidebar-open');
  };

  return (
    <>
      {/* Overlay oscuro que bloquea contenido detrás */}
      <div className="sidebar-overlay" onClick={closeSidebar} />

      <aside className="app-sidebar">
        {/* Botón cerrar tipo slider para móviles */}
        <button type="button" className="sidebar-close-btn" onClick={closeSidebar} aria-label="Cerrar menú">
          <X size={20} />
        </button>

        <div className="sidebar-top">
          <img src={escudo} alt="Escudo FICCT" className="sidebar-escudo" />
          <div className="brand">
            <h2>Sistema CUP</h2>
            <small>FICCT - UAGRM</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <Grid size={18} className="nav-icon" /> 
            <span className="nav-label">Dashboard</span>
          </NavLink>

          {canViewDashboardAdmin && (
            <NavLink 
              to="/dashboard-admin" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <LayoutDashboard size={18} className="nav-icon" /> 
              <span className="nav-label">Panel Administrativo</span>
            </NavLink>
          )}

          {user?.role === 'admin' && (
            <>
              <NavLink 
                to="/usuarios" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Users size={18} className="nav-icon" /> 
                <span className="nav-label">Usuarios y Roles</span>
              </NavLink>

              <NavLink 
                to="/carreras" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <BookOpen size={18} className="nav-icon" /> 
                <span className="nav-label">Carreras y Cupos</span>
              </NavLink>

              <NavLink 
                to="/materias" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Layers size={18} className="nav-icon" /> 
                <span className="nav-label">Materias del CUP</span>
              </NavLink>

              <NavLink 
                to="/admin/preinscripciones" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <ClipboardList size={18} className="nav-icon" /> 
                <span className="nav-label">Preinscripciones CUP</span>
              </NavLink>

              <NavLink 
                to="/admin/pagos-preinscripcion" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <ClipboardList size={18} className="nav-icon" /> 
                <span className="nav-label">Pagos CUP</span>
              </NavLink>
            </>
          )}

          {canViewDocentes && (
            <NavLink 
              to="/docentes" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <GraduationCap size={18} className="nav-icon" /> 
              <span className="nav-label">Docentes</span>
            </NavLink>
          )}

          {canViewGruposCup && (
            <NavLink 
              to="/grupos-cup" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <UsersRound size={18} className="nav-icon" /> 
              <span className="nav-label">Grupos CUP</span>
            </NavLink>
          )}

          {canViewAsignacionesDocentes && (
            <NavLink 
              to="/asignacion-docentes" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <UserCheck size={18} className="nav-icon" /> 
              <span className="nav-label">Asignación de docentes</span>
            </NavLink>
          )}

          {canViewCargaHorariaAulas && (
            <NavLink 
              to="/carga-horaria-aulas" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <CalendarCheck size={18} className="nav-icon" /> 
              <span className="nav-label">Carga horaria y aulas</span>
            </NavLink>
          )}

          {canViewEvaluacionesNotas && (
            <NavLink 
              to="/evaluaciones-notas" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <ClipboardList size={18} className="nav-icon" /> 
              <span className="nav-label">Evaluaciones y notas</span>
            </NavLink>
          )}

          {canViewAdmisionesCup && (
            <NavLink 
              to="/admisiones-cup" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <Trophy size={18} className="nav-icon" /> 
              <span className="nav-label">Admisión por cupos</span>
            </NavLink>
          )}

          {canViewReportesAcademicos && (
            <NavLink 
              to="/reportes-academicos" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <BarChart3 size={18} className="nav-icon" /> 
              <span className="nav-label">Reportes académicos</span>
            </NavLink>
          )}

          {role === 'docente' && (
            <>
              <NavLink 
                to="/docente/mi-perfil" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <UserRound size={18} className="nav-icon" /> 
                <span className="nav-label">Mi perfil docente</span>
              </NavLink>

              <NavLink 
                to="/docente/mis-grupos" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <UsersRound size={18} className="nav-icon" /> 
                <span className="nav-label">Mis grupos asignados</span>
              </NavLink>

              <NavLink 
                to="/docente/mi-carga-horaria" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Clock size={18} className="nav-icon" /> 
                <span className="nav-label">Mi carga horaria</span>
              </NavLink>

              <NavLink 
                to="/docente/mis-asistencias" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <CalendarCheck size={18} className="nav-icon" /> 
                <span className="nav-label">Mis asistencias</span>
              </NavLink>
            </>
          )}

          {role === 'postulante' && (
            <>
              <NavLink 
                to="/postulante/mi-grupo-horario" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Clock size={18} className="nav-icon" /> 
                <span className="nav-label">Mi horario</span>
              </NavLink>

              <NavLink 
                to="/postulante/mis-notas" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <GraduationCap size={18} className="nav-icon" /> 
                <span className="nav-label">Mis notas</span>
              </NavLink>

              <NavLink 
                to="/postulante/resultado-admision" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Trophy size={18} className="nav-icon" /> 
                <span className="nav-label">Resultado de admisión</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-mini">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'Usuario'}</span>
              <span className="user-role">{user?.role || ''}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
