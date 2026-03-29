import { createTheme, Theme } from '@mui/material/styles';

const shared = {
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: '"Barlow", "Inter", sans-serif',
    h1: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em' },
    h2: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em' },
    h3: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.04em' },
    h4: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.02em' },
    h5: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.08em' },
  },
};

export const darkTheme: Theme = createTheme({
  ...shared,
  palette: {
    mode: 'dark',
    primary:    { main: '#C6F135', light: '#d4f55e', dark: '#a3cc1a', contrastText: '#0a0a0a' },
    secondary:  { main: '#FF6B35', light: '#ff8a5e', dark: '#cc4e1f', contrastText: '#fff' },
    background: { default: '#0C0C0E', paper: '#141416' },
    text:       { primary: '#F0EDE8', secondary: '#8A8780' },
    divider:    'rgba(240,237,232,0.08)',
    error:      { main: '#FF4D4D' },
    success:    { main: '#C6F135' },
    warning:    { main: '#FFB800' },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid rgba(240,237,232,0.06)' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'uppercase', borderRadius: 2 }, containedPrimary: { color: '#0a0a0a' } } },
    MuiChip:   { styleOverrides: { root: { borderRadius: 2 } } },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: 'rgba(240,237,232,0.06)' },
        head: { color: '#8A8780', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' },
      },
    },
    MuiSelect: { styleOverrides: { icon: { color: '#8A8780' } } },
    MuiMenuItem: { styleOverrides: { root: { fontSize: '0.85rem' } } },
  },
});

export const lightTheme: Theme = createTheme({
  ...shared,
  palette: {
    mode: 'light',
    primary:    { main: '#5BBD2C', light: '#72cc45', dark: '#3f8c1a', contrastText: '#fff' },
    secondary:  { main: '#FF6B35', light: '#ff8a5e', dark: '#cc4e1f', contrastText: '#fff' },
    background: { default: '#F2F4F0', paper: '#FFFFFF' },
    text:       { primary: '#1A1C18', secondary: '#5A5E54' },
    divider:    'rgba(26,28,24,0.1)',
    error:      { main: '#D32F2F' },
    success:    { main: '#5BBD2C' },
    warning:    { main: '#F59E0B' },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid rgba(26,28,24,0.08)' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'uppercase', borderRadius: 2 } } },
    MuiChip:   { styleOverrides: { root: { borderRadius: 2 } } },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: 'rgba(26,28,24,0.08)' },
        head: { color: '#5A5E54', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' },
      },
    },
    MuiSelect: { styleOverrides: { icon: { color: '#5A5E54' } } },
    MuiMenuItem: { styleOverrides: { root: { fontSize: '0.85rem' } } },
  },
});

export const cssVars = {
  dark: `
    :root[data-theme="dark"] {
      --bg-default:         #0C0C0E;
      --bg-sidebar:         #0F0F11;
      --card-bg:            #141416;
      --card-bg-deep:       #1a1a1e;
      --card-bg-hover:      #2a2a2e;
      --card-border:        rgba(240,237,232,0.06);
      --card-border-hover:  rgba(240,237,232,0.12);
      --card-border-strong: rgba(240,237,232,0.22);
      --input-bg:           rgba(240,237,232,0.03);
      --text-primary:       #F0EDE8;
      --text-secondary:     #8A8780;
      --text-muted:         #3a3a3e;
      --tooltip-bg:         #1e1e22;
      --chart-grid:         rgba(240,237,232,0.05);
      --accent:             #C6F135;
      --accent-contrast:    #0a0a0a;
      --divider:            rgba(240,237,232,0.06);
      --hover-row:          rgba(240,237,232,0.02);
    }
  `,
  light: `
    :root[data-theme="light"] {
      --bg-default:         #F2F4F0;
      --bg-sidebar:         #E8EBE4;
      --card-bg:            #FFFFFF;
      --card-bg-deep:       #F5F7F2;
      --card-bg-hover:      #ECEEE9;
      --card-border:        rgba(26,28,24,0.09);
      --card-border-hover:  rgba(26,28,24,0.16);
      --card-border-strong: rgba(26,28,24,0.28);
      --input-bg:           rgba(26,28,24,0.03);
      --text-primary:       #1A1C18;
      --text-secondary:     #5A5E54;
      --text-muted:         #A8ADA2;
      --tooltip-bg:         #FFFFFF;
      --chart-grid:         rgba(26,28,24,0.07);
      --accent:             #5BBD2C;
      --accent-contrast:    #FFFFFF;
      --divider:            rgba(26,28,24,0.08);
      --hover-row:          rgba(26,28,24,0.02);
    }
  `,
};