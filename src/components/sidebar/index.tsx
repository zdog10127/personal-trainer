import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Typography, Divider, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/GridViewRounded';
import PeopleIcon from '@mui/icons-material/PeopleAltRounded';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenterRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import AssignmentIcon from '@mui/icons-material/AssignmentRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import { useAuth } from '../../context/authContext';
import { useThemeMode } from '../../context/themeContext';
import { CollapseBtn, Logo, LogoMark, NavItem, SidebarContainer, ThemeToggle, ThemeToggleThumb } from './styles';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard',        icon: <DashboardIcon fontSize="small" /> },
  { id: 'students',  label: 'Alunos',            icon: <PeopleIcon fontSize="small" /> },
  { id: 'workout',   label: 'Fichas de Treino',  icon: <AssignmentIcon fontSize="small" /> },
  { id: 'loads',     label: 'Cargas & Evolução', icon: <FitnessCenterIcon fontSize="small" /> },
  { id: 'progress',  label: 'Progresso Físico',  icon: <TrendingUpIcon fontSize="small" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();

  const initials = user?.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';
  const isLight = mode === 'light';

  return (
    <SidebarContainer $collapsed={collapsed}>
      <Logo $collapsed={collapsed}>
        <LogoMark>
          <FitnessCenterIcon sx={{ fontSize: 16, color: 'var(--accent-contrast)' }} />
        </LogoMark>
        {!collapsed && (
          <Box>
            <Typography sx={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1, fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.1em' }}>
              FORCETRACK
            </Typography>
            <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              Personal Pro
            </Typography>
          </Box>
        )}
      </Logo>
      <Divider sx={{ borderColor: 'var(--divider)', mx: 1 }} />
      {!collapsed && user && (
        <Box sx={{ p: 2, mt: 1 }}>
          <Box
            onClick={() => onNavigate('profile')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, background: activePage === 'profile' ? 'rgba(91,189,44,0.08)' : 'rgba(128,128,128,0.05)', borderRadius: 1, cursor: 'pointer', border: `1px solid ${activePage === 'profile' ? 'rgba(91,189,44,0.2)' : 'transparent'}`, transition: 'all 0.15s', '&:hover': { background: 'rgba(91,189,44,0.05)' } }}
          >
            <Avatar sx={{ width: 36, height: 36, background: 'var(--accent)', color: 'var(--accent-contrast)', fontSize: '0.8rem', fontWeight: 700 }}>
              {initials}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.2, fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </Typography>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.62rem' }}>Ver perfil</Typography>
            </Box>
            <PersonIcon sx={{ fontSize: 14, color: 'var(--text-muted)' }} />
          </Box>
        </Box>
      )}
      {collapsed && user && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
          <Tooltip title={user.name} placement="right">
            <Avatar
              onClick={() => onNavigate('profile')}
              sx={{ width: 34, height: 34, background: activePage === 'profile' ? 'var(--accent)' : 'rgba(91,189,44,0.15)', color: activePage === 'profile' ? 'var(--accent-contrast)' : 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {initials}
            </Avatar>
          </Tooltip>
        </Box>
      )}
      <List sx={{ flex: 1, px: 0, py: 1 }}>
        {navItems.map(item => (
          <Tooltip key={item.id} title={collapsed ? item.label : ''} placement="right">
            <NavItem $active={activePage === item.id} onClick={() => onNavigate(item.id)} sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 32, color: 'inherit' }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: activePage === item.id ? 700 : 500 }} />}
            </NavItem>
          </Tooltip>
        ))}
      </List>
      <Box sx={{ p: 1, pb: 3 }}>
        <Divider sx={{ borderColor: 'var(--divider)', mb: 1 }} />
        <Tooltip title={collapsed ? (isLight ? 'Modo Escuro' : 'Modo Claro') : ''} placement="right">
          <Box
            onClick={toggleMode}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: collapsed ? 0 : 1.5, py: 1, mx: 1, borderRadius: 1, cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start', transition: 'all 0.15s', '&:hover': { background: 'rgba(128,128,128,0.06)' } }}
          >
            {isLight
              ? <LightModeIcon sx={{ fontSize: 16, color: 'var(--text-secondary)', flexShrink: 0 }} />
              : <DarkModeIcon sx={{ fontSize: 16, color: 'var(--text-secondary)', flexShrink: 0 }} />
            }
            {!collapsed && (
              <>
                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.82rem', flex: 1 }}>
                  {isLight ? 'Modo Claro' : 'Modo Escuro'}
                </Typography>
                <ThemeToggle>
                  <ThemeToggleThumb $light={isLight} />
                </ThemeToggle>
              </>
            )}
          </Box>
        </Tooltip>
        <Tooltip title={collapsed ? 'Sair' : ''} placement="right">
          <NavItem onClick={logout} sx={{ justifyContent: collapsed ? 'center' : 'flex-start', '&&': { color: 'var(--text-muted)', '&:hover': { color: '#FF4D4D', background: 'rgba(255,77,77,0.06)' } } }}>
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 32, color: 'inherit' }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Sair" primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: 500 }} />}
          </NavItem>
        </Tooltip>
      </Box>
      <CollapseBtn onClick={() => setCollapsed(p => !p)}>
        {collapsed
          ? <ChevronRightIcon sx={{ fontSize: 14, color: 'var(--text-secondary)' }} />
          : <ChevronLeftIcon sx={{ fontSize: 14, color: 'var(--text-secondary)' }} />}
      </CollapseBtn>
    </SidebarContainer>
  );
};