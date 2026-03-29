import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box, Typography, Avatar, Button, TextField, Divider,
  IconButton, Snackbar, Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import SaveIcon from '@mui/icons-material/SaveRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import BadgeIcon from '@mui/icons-material/BadgeRounded';
import EmailIcon from '@mui/icons-material/EmailRounded';
import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/dataContext';
import { Card, StyledField } from './styles';

export const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { getStudentsByPersonal } = useData();
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cref: user?.cref || '',
    bio: user?.bio || '',
  });

  if (!user) return null;

  const myStudents = getStudentsByPersonal(user.id);
  const initials = user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setToast(true);
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email || '',
      phone: user.phone || '',
      cref: user.cref || '',
      bio: user.bio || '',
    });
    setEditing(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>
          MEU PERFIL
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
          Gerencie suas informações pessoais
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Box sx={{ width: { xs: '100%', md: 240 }, flexShrink: 0 }}>
          <Card sx={{ textAlign: 'center', mb: 2 }}>
            <Avatar sx={{
              width: 80, height: 80, mx: 'auto', mb: 2,
              background: 'rgba(198,241,53,0.15)', color: '#C6F135',
              fontSize: '1.8rem', fontWeight: 700,
              border: '2px solid rgba(198,241,53,0.2)',
            }}>
              {initials}
            </Avatar>
            <Typography variant="h5" sx={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', display: 'block', mt: 0.3 }}>
              @{user.username}
            </Typography>
            <Box sx={{
              mt: 1.5, px: 2, py: 0.6, display: 'inline-block',
              background: 'rgba(198,241,53,0.08)', borderRadius: 1,
              border: '1px solid rgba(198,241,53,0.15)',
            }}>
              <Typography sx={{ color: '#C6F135', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                ADMIN
              </Typography>
            </Box>
          </Card>

          <Card sx={{ mb: 2 }}>
            <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1.5 }}>
              Estatísticas
            </Typography>
            {[
              { label: 'Alunos ativos', value: myStudents.length },
            ].map(item => (
              <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid var(--hover-row)' }}>
                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{item.label}</Typography>
                <Typography sx={{ color: '#C6F135', fontWeight: 700, fontSize: '0.85rem' }}>{item.value}</Typography>
              </Box>
            ))}
          </Card>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{
              borderColor: 'rgba(255,77,77,0.3)',
              color: '#FF4D4D',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.08em',
              '&:hover': { borderColor: '#FF4D4D', background: 'rgba(255,77,77,0.06)' },
            }}
          >
            SAIR DA CONTA
          </Button>
        </Box>
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Informações Pessoais
              </Typography>
              {!editing ? (
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => setEditing(true)}
                  sx={{
                    color: '#C6F135', fontSize: '0.72rem', fontWeight: 700,
                    fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.08em',
                    '&:hover': { background: 'rgba(198,241,53,0.06)' },
                  }}
                >
                  EDITAR
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    startIcon={<CloseIcon />}
                    onClick={handleCancel}
                    sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}
                  >
                    CANCELAR
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{
                      background: '#C6F135', color: 'var(--accent-contrast)',
                      fontSize: '0.72rem', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
                      '&:hover': { background: '#d4f55e' },
                    }}
                  >
                    SALVAR
                  </Button>
                </Box>
              )}
            </Box>
            {editing ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <StyledField label="Nome completo" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} fullWidth />
                <StyledField label="E-mail" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} fullWidth />
                <StyledField label="Telefone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} fullWidth />
                <StyledField label="CREF" value={form.cref} onChange={e => setForm(p => ({ ...p, cref: e.target.value }))} fullWidth />
                <StyledField label="Bio" value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} fullWidth multiline rows={3} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { icon: <BadgeIcon sx={{ fontSize: 15 }} />, label: 'Nome', value: user.name },
                  { icon: <EmailIcon sx={{ fontSize: 15 }} />, label: 'E-mail', value: user.email || '—' },
                  { icon: <PhoneIcon sx={{ fontSize: 15 }} />, label: 'Telefone', value: user.phone || '—' },
                  { icon: <BadgeIcon sx={{ fontSize: 15 }} />, label: 'CREF', value: user.cref || '—' },
                ].map((item, i, arr) => (
                  <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.8, borderBottom: i < arr.length - 1 ? '1px solid var(--hover-row)' : 'none' }}>
                    <Box sx={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', width: 18 }}>{item.icon}</Box>
                    <Box>
                      <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</Typography>
                      <Typography sx={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 500, mt: 0.2 }}>{item.value}</Typography>
                    </Box>
                  </Box>
                ))}
                {user.bio && (
                  <>
                    <Divider sx={{ my: 2, borderColor: 'var(--hover-row)' }} />
                    <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                      "{user.bio}"
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Card>
        </Box>
      </Box>
      <Snackbar open={toast} autoHideDuration={3000} onClose={() => setToast(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ background: 'rgba(198,241,53,0.1)', color: '#C6F135', border: '1px solid rgba(198,241,53,0.2)', '& .MuiAlert-icon': { color: '#C6F135' } }}>
          Perfil atualizado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};