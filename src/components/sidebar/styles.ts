import { Box, ListItemButton } from '@mui/material';
import styled from 'styled-components';

export const SidebarContainer = styled(Box)<{ $collapsed: boolean }>`
  width: ${p => p.$collapsed ? 68 : 240}px;
  min-height: 100vh;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--divider);
  display: flex;
  flex-direction: column;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
`;

export const Logo = styled(Box)<{ $collapsed: boolean }>`
  padding: ${p => p.$collapsed ? '20px 0' : '24px 20px'};
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
  white-space: nowrap;
  overflow: hidden;
`;

export const LogoMark = styled(Box)`
  width: 32px; height: 32px;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%);
  flex-shrink: 0;
`;

export const NavItem = styled(ListItemButton)<{ $active?: boolean }>`
  && {
    margin: 2px 8px;
    border-radius: 4px;
    padding: 10px 12px;
    color: ${p => p.$active ? 'var(--accent)' : 'var(--text-secondary)'};
    background: ${p => p.$active ? 'rgba(91,189,44,0.08)' : 'transparent'};
    border-left: 2px solid ${p => p.$active ? 'var(--accent)' : 'transparent'};
    transition: all 0.15s;
    white-space: nowrap;
    overflow: hidden;
    &:hover { background: rgba(91,189,44,0.05); color: var(--text-primary); }
  }
`;

export const CollapseBtn = styled(Box)`
  position: absolute; right: -12px; top: 50%; transform: translateY(-50%);
  width: 24px; height: 24px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 20; transition: background 0.15s;
  &:hover { filter: brightness(1.1); }
`;

export const ThemeToggle = styled(Box)`
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 18px;
  border-radius: 9px;
  background: var(--card-border);
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
`;

export const ThemeToggleThumb = styled(Box)<{ $light: boolean }>`
  position: absolute;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--accent);
  left: ${p => p.$light ? '16px' : '3px'};
  transition: left 0.2s;
`;