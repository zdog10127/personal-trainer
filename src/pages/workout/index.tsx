import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box, Typography, Select, MenuItem, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, Alert, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/dataContext';
import { WorkoutSheet } from '../../types/interface';
import { Card, muscleGroupColors, SheetTab } from './styles';
import { WorkoutSheetForm } from '../../components/workout';

export const Workout: React.FC = () => {
  const { user } = useAuth();
  const { getStudentsByPersonal, getSheetsByStudent, addWorkoutSheet, updateWorkoutSheet, deleteWorkoutSheet } = useData();

  const myStudents = getStudentsByPersonal(user!.id);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(myStudents[0]?.id || '');
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSheet, setEditingSheet] = useState<WorkoutSheet | null>(null);
  const [deletingSheet, setDeletingSheet] = useState<WorkoutSheet | null>(null);
  const [toast, setToast] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' }>({ open: false, msg: '', severity: 'success' });

  const sheets = selectedStudentId ? getSheetsByStudent(selectedStudentId) : [];
  const activeSheet = selectedSheetId
    ? sheets.find(s => s.id === selectedSheetId) ?? sheets[0]
    : sheets[0];

  const totalSeries = (activeSheet?.exercises || []).reduce((a, e) => a + e.sets, 0);
  const estimatedTime = (activeSheet?.exercises || []).reduce((a, e) => {
    return a + e.sets * 45 + e.restSeconds * (e.sets - 1);
  }, 0);
  const muscleGroups = activeSheet
    ? Array.from(new Set(activeSheet.exercises.map(e => e.muscleGroup)))
    : [];

  const showToast = (msg: string, severity: 'success' | 'error' = 'success') =>
    setToast({ open: true, msg, severity });

  const handleSave = (data: Omit<WorkoutSheet, 'id' | 'createdAt'>) => {
    if (editingSheet) {
      updateWorkoutSheet(editingSheet.id, data);
      showToast('Ficha atualizada com sucesso!');
    } else {
      const newSheet = addWorkoutSheet(data);
      setSelectedSheetId(newSheet.id);
      showToast('Ficha criada com sucesso!');
    }
    setFormOpen(false);
    setEditingSheet(null);
  };

  const handleEdit = (sheet: WorkoutSheet) => {
    setEditingSheet(sheet);
    setFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingSheet) return;
    if (activeSheet?.id === deletingSheet.id) setSelectedSheetId(null);
    deleteWorkoutSheet(deletingSheet.id);
    setDeletingSheet(null);
    showToast('Ficha removida.');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>
            FICHAS DE TREINO
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
            Gerencie os protocolos de treino dos seus alunos
          </Typography>
        </Box>
        {selectedStudentId && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setEditingSheet(null); setFormOpen(true); }}
            sx={{
              background: '#C6F135', color: 'var(--accent-contrast)',
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, letterSpacing: '0.1em',
              '&:hover': { background: '#d4f55e' },
            }}
          >
            NOVA FICHA
          </Button>
        )}
      </Box>
      {myStudents.length === 0 ? (
        <Card>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Nenhum aluno cadastrado. Cadastre um aluno primeiro.
          </Typography>
        </Card>
      ) : (
        <>
          <FormControl size="small" sx={{ minWidth: 220, mb: 3 }}>
            <Select
              value={selectedStudentId}
              onChange={e => { setSelectedStudentId(e.target.value); setSelectedSheetId(null); }}
              displayEmpty
              sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-border-hover)' } }}
            >
              {myStudents.map(s => (
                <MenuItem key={s.id} value={s.id} sx={{ fontSize: '0.85rem' }}>{s.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {sheets.length === 0 ? (
            <Card sx={{ textAlign: 'center', py: 6 }}>
              <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.9rem', mb: 2 }}>
                Nenhuma ficha cadastrada para este aluno.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => { setEditingSheet(null); setFormOpen(true); }}
                sx={{ borderColor: 'rgba(198,241,53,0.3)', color: '#C6F135', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, '&:hover': { borderColor: '#C6F135', background: 'rgba(198,241,53,0.06)' } }}
              >
                CRIAR PRIMEIRA FICHA
              </Button>
            </Card>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                {sheets.map(sheet => (
                  <SheetTab
                    key={sheet.id}
                    $active={sheet.id === activeSheet?.id}
                    onClick={() => setSelectedSheetId(sheet.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{
                        width: 28, height: 28,
                        background: sheet.id === activeSheet?.id ? '#C6F135' : 'rgba(198,241,53,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0.5,
                      }}>
                        <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.9rem', fontWeight: 900, color: sheet.id === activeSheet?.id ? '#0a0a0a' : '#C6F135', letterSpacing: '0.05em' }}>
                          {sheet.type}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                          {sheet.focus.split('—')[0].trim()}
                        </Typography>
                        <Typography sx={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                          {sheet.weekDays.join(' / ')}
                        </Typography>
                      </Box>
                    </Box>
                  </SheetTab>
                ))}
              </Box>
              {activeSheet && (
                <>
                  <Card sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                          {activeSheet.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>
                          Criado em {new Date(activeSheet.createdAt + 'T00:00:00').toLocaleDateString('pt-BR')} · {activeSheet.weekDays.join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ color: '#C6F135', fontWeight: 700, fontSize: '1.4rem', fontFamily: '"Barlow Condensed", sans-serif' }}>{totalSeries}</Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>séries</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ color: '#00B8D9', fontWeight: 700, fontSize: '1.4rem', fontFamily: '"Barlow Condensed", sans-serif' }}>~{Math.round(estimatedTime / 60)}min</Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>estimado</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ color: '#FF6B35', fontWeight: 700, fontSize: '1.4rem', fontFamily: '"Barlow Condensed", sans-serif' }}>{activeSheet.exercises.length}</Typography>
                          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>exercícios</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                          <Tooltip title="Editar ficha">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(activeSheet)}
                              sx={{ color: 'var(--text-secondary)', background: 'var(--hover-row)', '&:hover': { color: '#C6F135', background: 'rgba(198,241,53,0.08)' }, width: 32, height: 32 }}
                            >
                              <EditIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir ficha">
                            <IconButton
                              size="small"
                              onClick={() => setDeletingSheet(activeSheet)}
                              sx={{ color: 'var(--text-secondary)', background: 'var(--hover-row)', '&:hover': { color: '#FF4D4D', background: 'rgba(255,77,77,0.08)' }, width: 32, height: 32 }}
                            >
                              <DeleteIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                      {muscleGroups.map(mg => (
                        <Chip
                          key={mg} label={mg} size="small"
                          sx={{
                            height: 20, fontSize: '0.62rem', fontWeight: 700,
                            background: `${muscleGroupColors[mg] || muscleGroupColors.default}18`,
                            color: muscleGroupColors[mg] || muscleGroupColors.default,
                          }}
                        />
                      ))}
                    </Box>
                  </Card>
                  <Card>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ width: 32 }}>#</TableCell>
                            <TableCell>Exercício</TableCell>
                            <TableCell>Grupo Muscular</TableCell>
                            <TableCell align="center">Séries</TableCell>
                            <TableCell align="center">Repetições</TableCell>
                            <TableCell align="center">Descanso</TableCell>
                            <TableCell>Técnica / Obs</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {activeSheet.exercises.map((ex, idx) => {
                            const mgColor = muscleGroupColors[ex.muscleGroup] || muscleGroupColors.default;
                            return (
                              <TableRow key={ex.id} sx={{ '&:last-child td': { border: 0 } }}>
                                <TableCell sx={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{idx + 1}</TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 3, height: 28, background: mgColor, borderRadius: 1, opacity: 0.7, flexShrink: 0 }} />
                                    <Typography sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{ex.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip label={ex.muscleGroup} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, background: `${mgColor}15`, color: mgColor }} />
                                </TableCell>
                                <TableCell align="center">
                                  <Box sx={{ width: 28, height: 28, background: 'rgba(198,241,53,0.1)', color: '#C6F135', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.78rem', fontWeight: 700, mx: 'auto' }}>
                                    {ex.sets}
                                  </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                                  {ex.reps}
                                </TableCell>
                                <TableCell align="center">
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.4 }}>
                                    <AccessTimeIcon sx={{ fontSize: 12, color: 'var(--text-secondary)' }} />
                                    <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{ex.restSeconds}s</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box>
                                    {ex.technique && (
                                      <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', fontStyle: 'italic' }}>{ex.technique}</Typography>
                                    )}
                                    {ex.observations && (
                                      <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{ex.observations}</Typography>
                                    )}
                                    {!ex.technique && !ex.observations && (
                                      <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>—</Typography>
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </>
              )}
            </>
          )}
        </>
      )}
      <WorkoutSheetForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingSheet(null); }}
        onSave={handleSave}
        sheet={editingSheet}
        studentId={selectedStudentId}
      />
      <Dialog
        open={!!deletingSheet}
        onClose={() => setDeletingSheet(null)}
        PaperProps={{ sx: { background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 2, minWidth: 360 } }}
      >
        <DialogTitle sx={{ color: 'var(--text-primary)', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.06em', pb: 1 }}>
          CONFIRMAR EXCLUSÃO
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Tem certeza que deseja excluir a ficha{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{deletingSheet?.name}</strong>?{' '}
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setDeletingSheet(null)} sx={{ color: 'var(--text-secondary)', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}>
            CANCELAR
          </Button>
          <Button
            variant="contained" onClick={handleDeleteConfirm}
            sx={{ background: '#FF4D4D', color: '#fff', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, '&:hover': { background: '#ff3333' } }}
          >
            EXCLUIR
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} sx={{
          background: toast.severity === 'success' ? 'rgba(198,241,53,0.1)' : 'rgba(255,77,77,0.1)',
          color: toast.severity === 'success' ? '#C6F135' : '#FF4D4D',
          border: `1px solid ${toast.severity === 'success' ? 'rgba(198,241,53,0.2)' : 'rgba(255,77,77,0.2)'}`,
          '& .MuiAlert-icon': { color: toast.severity === 'success' ? '#C6F135' : '#FF4D4D' },
        }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};