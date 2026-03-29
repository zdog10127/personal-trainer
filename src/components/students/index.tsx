import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box, Typography, Button, TextField, Dialog, DialogContent,
  DialogTitle, MenuItem, IconButton, Grid, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import SaveIcon from '@mui/icons-material/SaveRounded';
import { Student } from '../../types/interface';
import { useAuth } from '../../context/authContext';
import { StyledField } from './styles';

type FormData = {
  name: string;
  age: string;
  weight: string;
  height: string;
  bodyFat: string;
  goal: Student['goal'];
  level: Student['level'];
  since: string;
  nextSession: string;
  observations: string;
};

const EMPTY_FORM: FormData = {
  name: '', age: '', weight: '', height: '', bodyFat: '',
  goal: 'hipertrofia', level: 'iniciante',
  since: new Date().toISOString().split('T')[0],
  nextSession: '', observations: '',
};

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Student, 'id'>) => void;
  student?: Student | null;
}

export const StudentForm: React.FC<StudentFormProps> = ({ open, onClose, onSave, student }) => {
  const { user } = useAuth();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name,
        age: String(student.age),
        weight: String(student.weight),
        height: String(student.height),
        bodyFat: student.bodyFat !== undefined ? String(student.bodyFat) : '',
        goal: student.goal,
        level: student.level,
        since: student.since,
        nextSession: student.nextSession || '',
        observations: student.observations || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [student, open]);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Nome obrigatório';
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 10) e.age = 'Idade inválida';
    if (!form.weight || isNaN(Number(form.weight))) e.weight = 'Peso inválido';
    if (!form.height || isNaN(Number(form.height))) e.height = 'Altura inválida';
    if (!form.since) e.since = 'Data obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      personalId: user!.id,
      name: form.name.trim(),
      age: Number(form.age),
      weight: Number(form.weight),
      height: Number(form.height),
      bodyFat: form.bodyFat ? Number(form.bodyFat) : undefined,
      goal: form.goal,
      level: form.level,
      since: form.since,
      nextSession: form.nextSession || undefined,
      observations: form.observations.trim() || undefined,
    });
  };

  const isEdit = !!student;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 3, pb: 2 }}>
          <Box>
            <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: 'var(--text-primary)', letterSpacing: '0.06em', lineHeight: 1 }}>
              {isEdit ? 'EDITAR ALUNO' : 'NOVO ALUNO'}
            </Typography>
            <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', mt: 0.3 }}>
              {isEdit ? `Editando ${student?.name}` : 'Preencha os dados do novo aluno'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'var(--text-secondary)', '&:hover': { color: 'var(--text-primary)' } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'var(--card-border)' }} />
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <StyledField
            label="Nome completo *"
            value={form.name}
            onChange={set('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <StyledField label="Idade *" value={form.age} onChange={set('age')} type="number" error={!!errors.age} helperText={errors.age} fullWidth inputProps={{ min: 10, max: 99 }} />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <StyledField label="Peso (kg) *" value={form.weight} onChange={set('weight')} type="number" error={!!errors.weight} helperText={errors.weight} fullWidth inputProps={{ step: 0.1 }} />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <StyledField label="Altura (cm) *" value={form.height} onChange={set('height')} type="number" error={!!errors.height} helperText={errors.height} fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <StyledField label="% Gordura" value={form.bodyFat} onChange={set('bodyFat')} type="number" fullWidth inputProps={{ step: 0.1 }} />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <StyledField label="Objetivo *" value={form.goal} onChange={set('goal')} select fullWidth>
                {(['hipertrofia', 'emagrecimento', 'condicionamento', 'força'] as const).map(g => (
                  <MenuItem key={g} value={g} sx={{ fontSize: '0.85rem', textTransform: 'capitalize' }}>{g}</MenuItem>
                ))}
              </StyledField>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <StyledField label="Nível *" value={form.level} onChange={set('level')} select fullWidth>
                {(['iniciante', 'intermediário', 'avançado'] as const).map(l => (
                  <MenuItem key={l} value={l} sx={{ fontSize: '0.85rem', textTransform: 'capitalize' }}>{l}</MenuItem>
                ))}
              </StyledField>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <StyledField label="Aluno desde *" value={form.since} onChange={set('since')} type="date" error={!!errors.since} helperText={errors.since} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <StyledField label="Próxima sessão" value={form.nextSession} onChange={set('nextSession')} type="date" fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
          <StyledField
            label="Observações"
            value={form.observations}
            onChange={set('observations')}
            fullWidth multiline rows={3}
            placeholder="Lesões, preferências, restrições..."
          />
        </Box>
      </DialogContent>
      <Divider sx={{ borderColor: 'var(--card-border)' }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          sx={{ color: 'var(--text-secondary)', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}
        >
          CANCELAR
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            background: '#C6F135', color: 'var(--accent-contrast)',
            fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, letterSpacing: '0.08em',
            '&:hover': { background: '#d4f55e' },
          }}
        >
          {isEdit ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR ALUNO'}
        </Button>
      </Box>
    </Dialog>
  );
};