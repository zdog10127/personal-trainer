import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownIcon from '@mui/icons-material/TrendingDownRounded';
import RemoveIcon from '@mui/icons-material/RemoveRounded';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/dataContext';
import { mockWorkoutLogs } from '../../data/mockdata';
import { Card } from './styles';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ background: 'var(--tooltip-bg)', border: '1px solid var(--card-border)', borderRadius: 1, p: 1.5 }}>
      <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem', mb: 0.5 }}>{label}</Typography>
      {payload.map((p: any) => (
        <Typography key={p.name} sx={{ color: p.color, fontSize: '0.82rem', fontWeight: 700 }}>
          {p.name}: {p.value}kg
        </Typography>
      ))}
    </Box>
  );
};

export const Loads: React.FC = () => {
  const { user } = useAuth();
  const { getStudentsByPersonal } = useData();

  const myStudents = getStudentsByPersonal(user!.id);

  const [selectedStudent, setSelectedStudent] = useState(myStudents[0]?.id || '');
  const [selectedExercise, setSelectedExercise] = useState('');

  const logs = mockWorkoutLogs
    .filter(l => l.studentId === selectedStudent)
    .sort((a, b) => a.date.localeCompare(b.date));

  const allExercises = Array.from(
    new Map(
      logs.flatMap(l => l.exercises).map(e => [e.exerciseId, e.exerciseName])
    ).entries()
  ).map(([id, name]) => ({ id, name }));

  const chartData = logs
    .filter(l => l.exercises.some(e => e.exerciseId === selectedExercise))
    .map(log => {
      const exLog = log.exercises.find(e => e.exerciseId === selectedExercise);
      if (!exLog) return null;
      const maxWeight = Math.max(...exLog.sets.map(s => s.weight));
      const avgWeight = exLog.sets.reduce((a, s) => a + s.weight, 0) / exLog.sets.length;
      const totalVolume = exLog.sets.reduce((a, s) => a + s.weight * s.reps, 0);
      return {
        date: new Date(log.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        'Carga Máx': maxWeight,
        'Carga Média': parseFloat(avgWeight.toFixed(1)),
        'Volume Total': totalVolume,
      };
    })
    .filter(Boolean) as any[];

  const prWeight = chartData.length ? Math.max(...chartData.map(d => d['Carga Máx'])) : 0;
  const lastEntry = chartData[chartData.length - 1];
  const prevEntry = chartData[chartData.length - 2];
  const trend = lastEntry && prevEntry ? lastEntry['Carga Máx'] - prevEntry['Carga Máx'] : 0;

  const recentLogsWithExercise = logs
    .filter(l => l.exercises.some(e => e.exerciseId === selectedExercise))
    .slice(-4)
    .reverse();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>
          CARGAS & EVOLUÇÃO
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
          Acompanhe a progressão de carga por exercício
        </Typography>
      </Box>
      {myStudents.length === 0 ? (
        <Card><Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nenhum aluno cadastrado.</Typography></Card>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Aluno</InputLabel>
              <Select
                value={selectedStudent}
                label="Aluno"
                onChange={e => { setSelectedStudent(e.target.value); setSelectedExercise(''); }}
                sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-border)' } }}
              >
                {myStudents.map(s => (
                  <MenuItem key={s.id} value={s.id} sx={{ fontSize: '0.85rem' }}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 250 }}>
              <InputLabel sx={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Exercício</InputLabel>
              <Select
                value={selectedExercise}
                label="Exercício"
                onChange={e => setSelectedExercise(e.target.value)}
                sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-border)' } }}
              >
                {allExercises.map(e => (
                  <MenuItem key={e.id} value={e.id} sx={{ fontSize: '0.85rem' }}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {!selectedExercise || chartData.length === 0 ? (
            <Card>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {allExercises.length === 0
                  ? 'Nenhum treino registrado para este aluno.'
                  : 'Selecione um exercício para ver a evolução de cargas.'}
              </Typography>
            </Card>
          ) : (
            <>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {[
                  { label: 'Carga Máxima (PR)', value: `${prWeight} kg`, color: '#C6F135' },
                  { label: 'Última Sessão', value: lastEntry ? `${lastEntry['Carga Máx']} kg` : '—', color: 'var(--text-primary)' },
                  {
                    label: 'Variação', color: trend > 0 ? '#C6F135' : trend < 0 ? '#FF4D4D' : 'var(--text-secondary)',
                    value: trend === 0 ? '= 0 kg' : `${trend > 0 ? '+' : ''}${trend} kg`,
                    icon: trend > 0 ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : trend < 0 ? <TrendingDownIcon sx={{ fontSize: 14 }} /> : <RemoveIcon sx={{ fontSize: 14 }} />,
                  },
                  { label: 'Sessões Registradas', value: chartData.length, color: '#00B8D9' },
                ].map((stat: any, i) => (
                  <Grid key={i} size={{ xs: 6, md: 3 }}>
                    <Card sx={{ position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${stat.color}, transparent)` } }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                        {stat.label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <Typography variant="h4" sx={{ color: stat.color, fontSize: '1.6rem' }}>{stat.value}</Typography>
                        {stat.icon && <Box sx={{ color: stat.color, display: 'flex', alignItems: 'center' }}>{stat.icon}</Box>}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Card sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Progressão de Carga
                </Typography>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                    <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }} />
                    <Line type="monotone" dataKey="Carga Máx" stroke="#C6F135" strokeWidth={2} dot={{ fill: '#C6F135', r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Carga Média" stroke="#00B8D9" strokeWidth={1.5} strokeDasharray="4 3" dot={{ fill: '#00B8D9', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Volume Total (kg × reps)
                </Typography>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                    <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="Volume Total" stroke="#FF6B35" strokeWidth={2} dot={{ fill: '#FF6B35', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Últimas Sessões — Detalhamento de Séries
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell align="center">Série 1</TableCell>
                        <TableCell align="center">Série 2</TableCell>
                        <TableCell align="center">Série 3</TableCell>
                        <TableCell align="center">Série 4</TableCell>
                        <TableCell align="center">Carga Máx</TableCell>
                        <TableCell align="center">Volume</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentLogsWithExercise.map(log => {
                        const exLog = log.exercises.find(e => e.exerciseId === selectedExercise)!;
                        const maxW = Math.max(...exLog.sets.map(s => s.weight));
                        const vol = exLog.sets.reduce((a, s) => a + s.weight * s.reps, 0);
                        return (
                          <TableRow key={log.id} sx={{ '&:last-child td': { border: 0 } }}>
                            <TableCell sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                              {new Date(log.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                            </TableCell>
                            {[0, 1, 2, 3].map(si => {
                              const s = exLog.sets[si];
                              return (
                                <TableCell key={si} align="center">
                                  {s ? (
                                    <Box sx={{ textAlign: 'center' }}>
                                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: s.weight === maxW ? '#C6F135' : 'var(--text-primary)' }}>
                                        {s.weight}kg
                                      </Typography>
                                      <Typography sx={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>{s.reps}×</Typography>
                                    </Box>
                                  ) : <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>—</Typography>}
                                </TableCell>
                              );
                            })}
                            <TableCell align="center">
                              <Chip label={`${maxW}kg`} size="small" sx={{ fontSize: '0.65rem', fontWeight: 700, background: 'rgba(198,241,53,0.1)', color: '#C6F135', height: 20 }} />
                            </TableCell>
                            <TableCell align="center" sx={{ color: '#FF6B35', fontWeight: 700, fontSize: '0.82rem' }}>
                              {vol}
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
    </Box>
  );
};