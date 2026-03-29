import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import '@fontsource/bebas-neue';
import '@fontsource/inter';
import { AuthProvider, useAuth } from './context/authContext';
import { ThemeModeProvider, useThemeMode } from './context/themeContext';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { Students } from './pages/students';
import { Workout } from './pages/workout';
import { Loads } from './pages/loads';
import { Progress } from './pages/progess';
import { Profile } from './pages/profile';
import { cssVars, darkTheme, lightTheme } from './themes';
import { Sidebar } from './components/sidebar';
import { DataProvider } from './context/dataContext';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  if (!user) return <Login />;

  const handleNavigate = (page: string, data?: any) => {
    setActivePage(page);
    if (page === 'students' && data) setSelectedStudentId(data);
    else if (page !== 'students') setSelectedStudentId(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} />;
      case 'students':  return <Students selectedStudentId={selectedStudentId} onSelectStudent={id => id ? setSelectedStudentId(id) : setSelectedStudentId(null)} />;
      case 'workout':   return <Workout />;
      case 'loads':     return <Loads />;
      case 'progress':  return <Progress />;
      case 'profile':   return <Profile />;
      default:          return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-default)' }}>
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, sm: 3, md: 4 } }}>
        {renderPage()}
      </Box>
    </Box>
  );
};

const AppWithTheme: React.FC = () => {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.2); border-radius: 2px; }
        ${cssVars.dark}
        ${cssVars.light}
      `}</style>
      <ThemeModeProvider>
        <AppWithTheme />
      </ThemeModeProvider>
    </>
  );
}

export default App;