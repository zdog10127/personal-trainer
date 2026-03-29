import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box, Typography, Button, TextField, Dialog, DialogContent,
  DialogTitle, MenuItem, IconButton, Divider, Checkbox,
  FormControlLabel, Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import SaveIcon from '@mui/icons-material/SaveRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import DragIndicatorIcon from '@mui/icons-material/DragIndicatorRounded';
import { Exercise, WorkoutSheet } from '../../types/interface';
import { MUSCLE_GROUPS, StyledField, WEEK_DAYS } from './styles';

type ExerciseForm = Omit<Exercise, 'id'> & { id: string };

const emptyExercise = (): ExerciseForm => ({
  id: `ex_${Date.now()}_${Math.random()}`,
  name: '',
  muscleGroup: 'Peitoral',
  sets: 3,
  reps: '8-12',
  restSeconds: 60,
  technique: '',
  observations: '',
});

interface WorkoutSheetFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<WorkoutSheet, 'id' | 'createdAt'>) => void;
  sheet?: WorkoutSheet | null;
  studentId: string;
}

export const WorkoutSheetForm: React.FC<WorkoutSheetFormProps> = ({
  open, onClose, onSave, sheet, studentId,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<WorkoutSheet['type']>('A');
  const [focus, setFocus] = useState('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseForm[]>([emptyExercise()]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    if (sheet) {
      setName(sheet.name);
      setType(sheet.type);
      setFocus(sheet.focus);
      setWeekDays(sheet.weekDays);
      setExercises(sheet.exercises.map(e => ({ ...e })));
    } else {
      setName('');
      setType('A');
      setFocus('');
      setWeekDays([]);
      setExercises([emptyExercise()]);
    }
    setErrors({});
  }, [sheet, open]);

  const toggleDay = (day: string) => {
    setWeekDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const addExercise = () => {
    setExercises(prev => [...prev, emptyExercise()]);
  };

  const removeExercise = (id: string) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  };

  const updateExercise = (id: string, field: keyof ExerciseForm, value: any) => {
    setExercises(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Nome obrigatório';
    if (!focus.trim()) e.focus = 'Foco obrigatório';
    if (weekDays.length === 0) e.weekDays = 'Selecione ao menos um dia';
    exercises.forEach((ex, i) => {
      if (!ex.name.trim()) e[`ex_name_${i}`] = 'Nome obrigatório';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      studentId,
      name: name.trim(),
      type,
      focus: focus.trim(),
      weekDays,
      active: true,
      exercises: exercises.map(({ id, ...ex }) => ({
        id,
        name: ex.name.trim(),
        muscleGroup: ex.muscleGroup,
        sets: Number(ex.sets),
        reps: ex.reps,
        restSeconds: Number(ex.restSeconds),
        technique: ex.technique?.trim() || undefined,
        observations: ex.observations?.trim() || undefined,
      })),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '92vh',
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 3, pb: 2 }}>
          <Box>
            <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.6rem', color: 'var(--text-primary)', letterSpacing: '0.06em', lineHeight: 1 }}>
              {sheet ? 'EDITAR FICHA' : 'NOVA FICHA DE TREINO'}
            </Typography>
            <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', mt: 0.3 }}>
              {sheet ? `Editando: ${sheet.name}` : 'Preencha os dados e adicione os exercícios'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'var(--text-secondary)', '&:hover': { color: 'var(--text-primary)' } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'var(--card-border)' }} />
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', mb: 2 }}>
          Dados da Ficha
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <StyledField
            label="Nome da ficha *"
            value={name}
            onChange={e => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ flex: 2, minWidth: 200 }}
          />
          <StyledField
            label="Tipo *"
            value={type}
            onChange={e => setType(e.target.value as WorkoutSheet['type'])}
            select
            sx={{ width: 100 }}
          >
            {(['A', 'B', 'C', 'D'] as const).map(t => (
              <MenuItem key={t} value={t} sx={{ fontSize: '0.85rem' }}>Treino {t}</MenuItem>
            ))}
          </StyledField>
          <StyledField
            label="Foco / Objetivo *"
            value={focus}
            onChange={e => setFocus(e.target.value)}
            error={!!errors.focus}
            helperText={errors.focus}
            placeholder="Ex: Hipertrofia — Push"
            sx={{ flex: 2, minWidth: 180 }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', mb: 1 }}>
            Dias da semana *{errors.weekDays && <span style={{ color: '#FF4D4D', marginLeft: 8 }}>{errors.weekDays}</span>}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {WEEK_DAYS.map(day => {
              const active = weekDays.includes(day);
              return (
                <Box
                  key={day}
                  onClick={() => toggleDay(day)}
                  sx={{
                    px: 1.5, py: 0.7, borderRadius: 1, cursor: 'pointer',
                    background: active ? 'rgba(198,241,53,0.12)' : 'var(--input-bg)',
                    border: `1px solid ${active ? 'rgba(198,241,53,0.35)' : 'var(--divider)'}`,
                    color: active ? '#C6F135' : '#8A8780',
                    fontSize: '0.75rem', fontWeight: active ? 700 : 400,
                    transition: 'all 0.15s',
                    userSelect: 'none',
                    '&:hover': { borderColor: 'rgba(198,241,53,0.25)' },
                  }}
                >
                  {day}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'var(--card-border)', mb: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Exercícios ({exercises.length})
          </Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={addExercise}
            sx={{
              color: '#C6F135', fontSize: '0.72rem',
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
              '&:hover': { background: 'rgba(198,241,53,0.06)' },
            }}
          >
            ADICIONAR EXERCÍCIO
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {exercises.map((ex, idx) => (
            <Box
              key={ex.id}
              sx={{
                background: 'var(--input-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 1.5,
                p: 2,
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <DragIndicatorIcon sx={{ fontSize: 16, color: 'var(--text-muted)' }} />
                <Box sx={{
                  width: 24, height: 24, background: 'rgba(198,241,53,0.1)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Typography sx={{ fontSize: '0.7rem', color: '#C6F135', fontWeight: 700 }}>{idx + 1}</Typography>
                </Box>
                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', flex: 1 }}>
                  {ex.name || 'Novo exercício'}
                </Typography>
                {exercises.length > 1 && (
                  <Tooltip title="Remover exercício">
                    <IconButton
                      size="small"
                      onClick={() => removeExercise(ex.id)}
                      sx={{ color: 'var(--text-muted)', '&:hover': { color: '#FF4D4D' }, width: 28, height: 28 }}
                    >
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                <StyledField
                  label="Nome do exercício *"
                  value={ex.name}
                  onChange={e => updateExercise(ex.id, 'name', e.target.value)}
                  error={!!errors[`ex_name_${idx}`]}
                  helperText={errors[`ex_name_${idx}`]}
                  size="small"
                  sx={{ flex: 2, minWidth: 160 }}
                />
                <StyledField
                  label="Grupo muscular"
                  value={ex.muscleGroup}
                  onChange={e => updateExercise(ex.id, 'muscleGroup', e.target.value)}
                  select
                  size="small"
                  sx={{ flex: 1, minWidth: 140 }}
                >
                  {MUSCLE_GROUPS.map(mg => (
                    <MenuItem key={mg} value={mg} sx={{ fontSize: '0.82rem' }}>{mg}</MenuItem>
                  ))}
                </StyledField>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                <StyledField
                  label="Séries"
                  value={ex.sets}
                  onChange={e => updateExercise(ex.id, 'sets', e.target.value)}
                  type="number"
                  size="small"
                  inputProps={{ min: 1, max: 20 }}
                  sx={{ width: 90 }}
                />
                <StyledField
                  label="Repetições"
                  value={ex.reps}
                  onChange={e => updateExercise(ex.id, 'reps', e.target.value)}
                  size="small"
                  placeholder="Ex: 8-12 ou 15"
                  sx={{ flex: 1, minWidth: 100 }}
                />
                <StyledField
                  label="Descanso (seg)"
                  value={ex.restSeconds}
                  onChange={e => updateExercise(ex.id, 'restSeconds', e.target.value)}
                  type="number"
                  size="small"
                  inputProps={{ min: 0, step: 15 }}
                  sx={{ width: 120 }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <StyledField
                  label="Técnica / Cadência"
                  value={ex.technique || ''}
                  onChange={e => updateExercise(ex.id, 'technique', e.target.value)}
                  size="small"
                  placeholder="Ex: 2-0-2, pausa, drop-set..."
                  sx={{ flex: 1, minWidth: 140 }}
                />
                <StyledField
                  label="Observações"
                  value={ex.observations || ''}
                  onChange={e => updateExercise(ex.id, 'observations', e.target.value)}
                  size="small"
                  placeholder="Dicas extras..."
                  sx={{ flex: 1, minWidth: 140 }}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          onClick={addExercise}
          sx={{
            mt: 2, py: 2, border: '1px dashed rgba(198,241,53,0.2)',
            borderRadius: 1.5, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 1, cursor: 'pointer',
            transition: 'all 0.15s',
            '&:hover': { background: 'rgba(198,241,53,0.04)', borderColor: 'rgba(198,241,53,0.35)' },
          }}
        >
          <AddIcon sx={{ fontSize: 16, color: '#C6F135' }} />
          <Typography sx={{ color: '#C6F135', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>
            ADICIONAR EXERCÍCIO
          </Typography>
        </Box>
      </DialogContent>
      <Divider sx={{ borderColor: 'var(--card-border)' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
        <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
          {exercises.length} {exercises.length === 1 ? 'exercício' : 'exercícios'} · {weekDays.length} {weekDays.length === 1 ? 'dia' : 'dias'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
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
            {sheet ? 'SALVAR ALTERAÇÕES' : 'CRIAR FICHA'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};