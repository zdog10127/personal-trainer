import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, InputAdornment,
  IconButton, Alert,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenterRounded';
import VisibilityIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';
import LockIcon from '@mui/icons-material/LockRounded';
import { useAuth } from '../../context/authContext';
import { Wrapper, LogoMark, StyledField, Card } from './styles';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Preencha usuário e senha.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = login(username.trim(), password);
      if (!ok) setError('Usuário ou senha incorretos.');
      setLoading(false);
    }, 400);
  };

  return (
    <Wrapper>
      <Card>
        <LogoMark>
          <FitnessCenterIcon sx={{ fontSize: 22, color: 'var(--accent-contrast)' }} />
        </LogoMark>
        <Typography
          sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: 'var(--text-primary)', letterSpacing: '0.1em', lineHeight: 1 }}
        >
          FORCETRACK
        </Typography>
        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.8rem', mt: 0.5, mb: 4, letterSpacing: '0.05em' }}>
          Personal Pro — Faça login para continuar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StyledField
            label="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledField
            label="Senha"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(p => !p)} edge="end" size="small" sx={{ color: 'var(--text-secondary)' }}>
                    {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Alert severity="error" sx={{ fontSize: '0.78rem', py: 0.5, background: 'rgba(255,77,77,0.08)', color: '#FF4D4D', border: '1px solid rgba(255,77,77,0.2)', '& .MuiAlert-icon': { color: '#FF4D4D' } }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 1, py: 1.4,
              background: '#C6F135',
              color: 'var(--accent-contrast)',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 800,
              fontSize: '0.9rem',
              letterSpacing: '0.12em',
              borderRadius: 1,
              '&:hover': { background: '#d4f55e' },
              '&:disabled': { background: 'rgba(198,241,53,0.3)', color: 'rgba(10,10,10,0.5)' },
            }}
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </Button>
        </Box>
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid var(--card-border)' }}>
          <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.68rem', textAlign: 'center', letterSpacing: '0.05em' }}>
            USUÁRIOS DE TESTE
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1.5 }}>
            {['admin', 'gabriel', 'bernardo'].map(u => (
              <Box
                key={u}
                onClick={() => { setUsername(u); setPassword('123456'); }}
                sx={{
                  px: 1.5, py: 0.6, borderRadius: 1,
                  background: 'var(--input-bg)',
                  border: '1px solid var(--divider)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  '&:hover': { borderColor: 'rgba(198,241,53,0.3)', background: 'rgba(198,241,53,0.05)' },
                }}
              >
                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', fontWeight: 600 }}>{u}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Wrapper>
  );
};