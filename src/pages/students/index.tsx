import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box, Grid, Typography, Avatar, Chip, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, Tabs, Tab,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded';
import NotesIcon from '@mui/icons-material/NotesRounded';
import { Student } from '../../types/interface';
import { mockWorkoutLogs, mockWorkoutSheets } from '../../data/mockdata';
import { Card, GoalColors, LevelColors } from './styles';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/dataContext';
import { StudentForm } from '../../components/students';

const StudentDetail: React.FC<{
  student: Student;
  onBack: () => void;
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
}> = ({ student, onBack, onEdit, onDelete }) => {
  const [tab, setTab] = useState(0);
  const logs = mockWorkoutLogs.filter(l => l.studentId === student.id).sort((a, b) => b.date.localeCompare(a.date));
  const sheets = mockWorkoutSheets.filter(s => s.studentId === student.id && s.active);
  const bmi = (student.weight / ((student.height / 100) ** 2)).toFixed(1);
  const feelings = ['😞', '😕', '😐', '😊', '🔥'];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={onBack}>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>← ALUNOS</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small" startIcon={<EditIcon />} onClick={() => onEdit(student)}
            sx={{ color: '#C6F135', fontSize: '0.72rem', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, '&:hover': { background: 'rgba(198,241,53,0.06)' } }}
          >
            EDITAR
          </Button>
          <Button
            size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(student)}
            sx={{ color: '#FF4D4D', fontSize: '0.72rem', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, '&:hover': { background: 'rgba(255,77,77,0.06)' } }}
          >
            EXCLUIR
          </Button>
        </Box>
      </Box>
      <Card sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Avatar sx={{ width: 64, height: 64, background: 'rgba(198,241,53,0.12)', color: '#C6F135', fontSize: '1.4rem', fontWeight: 700 }}>
            {student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ fontSize: '2rem', color: 'var(--text-primary)', lineHeight: 1 }}>{student.name.toUpperCase()}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              <Chip label={student.goal} size="small" sx={{ fontSize: '0.62rem', fontWeight: 700, background: `${GoalColors[student.goal]}18`, color: GoalColors[student.goal] }} />
              <Chip label={student.level} size="small" sx={{ fontSize: '0.62rem', background: `${LevelColors[student.level]}15`, color: LevelColors[student.level] }} />
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ maxWidth: 480 }}>
            {[
              { label: 'Idade', value: `${student.age} anos` },
              { label: 'Peso', value: `${student.weight} kg` },
              { label: 'Altura', value: `${student.height} cm` },
              { label: 'IMC', value: bmi },
              ...(student.bodyFat ? [{ label: '% Gordura', value: `${student.bodyFat}%` }] : []),
              { label: 'Aluno desde', value: new Date(student.since + 'T00:00:00').toLocaleDateString('pt-BR') },
            ].map(item => (
              <Grid size={{ xs: 4, sm: 3 }} key={item.label}>
                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        {student.observations && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid var(--card-border)', display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <NotesIcon sx={{ fontSize: 14, color: '#FFB800', mt: 0.3 }} />
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
              {student.observations}
            </Typography>
          </Box>
        )}
      </Card>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{
        mb: 2,
        '& .MuiTab-root': { color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },
        '& .Mui-selected': { color: '#C6F135 !important' },
        '& .MuiTabs-indicator': { background: '#C6F135' },
      }}>
        <Tab label="Fichas de Treino" />
        <Tab label="Histórico de Treinos" />
      </Tabs>
      {tab === 0 && (
        <Box>
          {sheets.length === 0 ? (
            <Card><Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nenhuma ficha ativa.</Typography></Card>
          ) : sheets.map(sheet => (
            <Card key={sheet.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{sheet.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                    {sheet.focus} · {sheet.weekDays.join(', ')}
                  </Typography>
                </Box>
                <Box sx={{ width: 36, height: 36, background: '#C6F135', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 900, color: 'var(--accent-contrast)', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }}>
                    {sheet.type}
                  </Typography>
                </Box>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Exercício</TableCell>
                      <TableCell>Grupo</TableCell>
                      <TableCell align="center">Séries</TableCell>
                      <TableCell align="center">Reps</TableCell>
                      <TableCell align="center">Descanso</TableCell>
                      <TableCell>Técnica</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sheet.exercises.map(ex => (
                      <TableRow key={ex.id} sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell sx={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600 }}>{ex.name}</TableCell>
                        <TableCell sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{ex.muscleGroup}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ width: 24, height: 24, background: 'rgba(198,241,53,0.1)', color: '#C6F135', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.72rem', fontWeight: 700, mx: 'auto' }}>
                            {ex.sets}
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.82rem' }}>{ex.reps}</TableCell>
                        <TableCell align="center" sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{ex.restSeconds}s</TableCell>
                        <TableCell sx={{ color: 'var(--text-secondary)', fontSize: '0.72rem', fontStyle: 'italic' }}>{ex.technique || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          ))}
        </Box>
      )}
      {tab === 1 && (
        <Box>
          {logs.length === 0 ? (
            <Card><Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nenhum treino registrado.</Typography></Card>
          ) : logs.map(log => (
            <Card key={log.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Box sx={{ width: 36, height: 36, background: 'var(--card-bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1, border: '1px solid var(--divider)' }}>
                  <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', color: '#C6F135', fontSize: '1.1rem', letterSpacing: '0.05em' }}>{log.sheetType}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                    Treino {log.sheetType} — {new Date(log.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                    {log.duration} minutos · Sensação: {feelings[log.generalFeeling - 1]} {log.generalFeeling}/5
                  </Typography>
                </Box>
              </Box>
              {log.exercises.map(exLog => (
                <Box key={exLog.exerciseId} sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 0.8 }}>
                    {exLog.exerciseName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {exLog.sets.map(s => (
                      <Box key={s.setNumber} sx={{ background: 'var(--card-bg-deep)', border: '1px solid var(--card-border)', borderRadius: 1, px: 1.5, py: 0.8, textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>S{s.setNumber}</Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#C6F135', lineHeight: 1.2 }}>{s.weight}kg</Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{s.reps} reps</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export const Students: React.FC<{
  selectedStudentId?: string | null;
  onSelectStudent: (id: string) => void;
}> = ({ selectedStudentId, onSelectStudent }) => {
  const { user } = useAuth();
  const { students, addStudent, updateStudent, deleteStudent } = useData();

  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [toast, setToast] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' }>({ open: false, msg: '', severity: 'success' });

  const myStudents = students.filter(s => s.personalId === user?.id);
  const selected = selectedStudentId ? myStudents.find(s => s.id === selectedStudentId) : null;

  const showToast = (msg: string, severity: 'success' | 'error' = 'success') =>
    setToast({ open: true, msg, severity });

  const handleSave = (data: Omit<Student, 'id'>) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
      showToast('Aluno atualizado com sucesso!');
    } else {
      addStudent(data);
      showToast('Aluno cadastrado com sucesso!');
    }
    setFormOpen(false);
    setEditingStudent(null);
  };

  const handleEdit = (s: Student) => {
    setEditingStudent(s);
    setFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingStudent) return;
    if (selectedStudentId === deletingStudent.id) onSelectStudent('');
    deleteStudent(deletingStudent.id);
    setDeletingStudent(null);
    showToast('Aluno removido.');
  };

  if (selected) {
    return (
      <>
        <StudentDetail
          student={selected}
          onBack={() => onSelectStudent('')}
          onEdit={handleEdit}
          onDelete={setDeletingStudent}
        />
        <StudentForm open={formOpen} onClose={() => { setFormOpen(false); setEditingStudent(null); }} onSave={handleSave} student={editingStudent} />
        <DeleteDialog student={deletingStudent} onClose={() => setDeletingStudent(null)} onConfirm={handleDeleteConfirm} />
        <ToastBar toast={toast} onClose={() => setToast(p => ({ ...p, open: false }))} />
      </>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>ALUNOS</Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
            {myStudents.length} {myStudents.length === 1 ? 'aluno cadastrado' : 'alunos cadastrados'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setEditingStudent(null); setFormOpen(true); }}
          sx={{
            background: '#C6F135', color: 'var(--accent-contrast)',
            fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, letterSpacing: '0.1em',
            '&:hover': { background: '#d4f55e' },
          }}
        >
          NOVO ALUNO
        </Button>
      </Box>
      {myStudents.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.9rem', mb: 2 }}>Nenhum aluno cadastrado ainda.</Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
            sx={{ borderColor: 'rgba(198,241,53,0.3)', color: '#C6F135', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, '&:hover': { borderColor: '#C6F135', background: 'rgba(198,241,53,0.06)' } }}
          >
            CADASTRAR PRIMEIRO ALUNO
          </Button>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {myStudents.map(student => {
            const logs = mockWorkoutLogs.filter(l => l.studentId === student.id);
            const lastLog = logs.sort((a, b) => b.date.localeCompare(a.date))[0];
            const goal = GoalColors[student.goal];
            const bmi = (student.weight / ((student.height / 100) ** 2)).toFixed(1);
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={student.id}>
                <Box sx={{
                  background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                  borderRadius: 1.5, p: 2.5, cursor: 'pointer', position: 'relative',
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: 'rgba(198,241,53,0.25)', transform: 'translateY(-1px)' },
                  '&:hover .actions': { opacity: 1 },
                }}>
                  <Box className="actions" sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 0.5, opacity: 0, transition: 'opacity 0.15s' }}>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={e => { e.stopPropagation(); handleEdit(student); }} sx={{ color: 'var(--text-secondary)', background: 'var(--card-border)', '&:hover': { color: '#C6F135' }, width: 28, height: 28 }}>
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton size="small" onClick={e => { e.stopPropagation(); setDeletingStudent(student); }} sx={{ color: 'var(--text-secondary)', background: 'var(--card-border)', '&:hover': { color: '#FF4D4D' }, width: 28, height: 28 }}>
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box onClick={() => onSelectStudent(student.id)}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, pr: 4 }}>
                      <Avatar sx={{ width: 52, height: 52, background: `${goal}12`, color: goal, fontWeight: 700, fontSize: '1rem' }}>
                        {student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ color: 'var(--text-primary)', fontWeight: 700 }}>{student.name}</Typography>
                        <Box sx={{ display: 'flex', gap: 0.8, mt: 0.4 }}>
                          <Chip label={student.goal} size="small" sx={{ height: 16, fontSize: '0.58rem', fontWeight: 700, background: `${goal}18`, color: goal }} />
                          <Chip label={student.level} size="small" sx={{ height: 16, fontSize: '0.58rem', background: `${LevelColors[student.level]}15`, color: LevelColors[student.level] }} />
                        </Box>
                      </Box>
                    </Box>
                    <Grid container spacing={1}>
                      {[
                        { l: 'Idade', v: `${student.age}a` },
                        { l: 'Peso', v: `${student.weight}kg` },
                        { l: 'IMC', v: bmi },
                        ...(student.bodyFat ? [{ l: 'Gordura', v: `${student.bodyFat}%` }] : []),
                      ].map(item => (
                        <Grid size={{ xs: 3 }} key={item.l}>
                          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'block', textAlign: 'center' }}>{item.l}</Typography>
                          <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center', fontSize: '0.85rem' }}>{item.v}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                    {lastLog && (
                      <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid var(--hover-row)', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 12, color: 'var(--text-muted)' }} />
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                          Último treino: {new Date(lastLog.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
      <StudentForm open={formOpen} onClose={() => { setFormOpen(false); setEditingStudent(null); }} onSave={handleSave} student={editingStudent} />
      <DeleteDialog student={deletingStudent} onClose={() => setDeletingStudent(null)} onConfirm={handleDeleteConfirm} />
      <ToastBar toast={toast} onClose={() => setToast(p => ({ ...p, open: false }))} />
    </Box>
  );
};

const DeleteDialog: React.FC<{ student: Student | null; onClose: () => void; onConfirm: () => void }> = ({ student, onClose, onConfirm }) => (
  <Dialog open={!!student} onClose={onClose} PaperProps={{ sx: { background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 2, minWidth: 360 } }}>
    <DialogTitle sx={{ color: 'var(--text-primary)', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.06em', pb: 1 }}>
      CONFIRMAR EXCLUSÃO
    </DialogTitle>
    <DialogContent>
      <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        Tem certeza que deseja excluir <strong style={{ color: 'var(--text-primary)' }}>{student?.name}</strong>? Esta ação não pode ser desfeita.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
      <Button onClick={onClose} sx={{ color: 'var(--text-secondary)', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}>CANCELAR</Button>
      <Button
        variant="contained" onClick={onConfirm}
        sx={{ background: '#FF4D4D', color: '#fff', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, '&:hover': { background: '#ff3333' } }}
      >
        EXCLUIR
      </Button>
    </DialogActions>
  </Dialog>
);

const ToastBar: React.FC<{ toast: { open: boolean; msg: string; severity: 'success' | 'error' }; onClose: () => void }> = ({ toast, onClose }) => (
  <Snackbar open={toast.open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    <Alert severity={toast.severity} sx={{
      background: toast.severity === 'success' ? 'rgba(198,241,53,0.1)' : 'rgba(255,77,77,0.1)',
      color: toast.severity === 'success' ? '#C6F135' : '#FF4D4D',
      border: `1px solid ${toast.severity === 'success' ? 'rgba(198,241,53,0.2)' : 'rgba(255,77,77,0.2)'}`,
      '& .MuiAlert-icon': { color: toast.severity === 'success' ? '#C6F135' : '#FF4D4D' },
    }}>
      {toast.msg}
    </Alert>
  </Snackbar>
);