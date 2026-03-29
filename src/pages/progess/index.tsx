import React, { useState, type ComponentType } from 'react';
import styled from 'styled-components';
import {
  Box, Grid, Typography, Select, MenuItem, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
  RadarChart as RadarChartBase,
  PolarGrid as PolarGridBase,
  PolarAngleAxis as PolarAngleAxisBase,
  Radar as RadarBase,
} from 'recharts';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/dataContext';
import { mockProgress } from '../../data/mockdata';
import { Card, measurementLabels } from './styles';

const RadarChart = RadarChartBase as ComponentType<any>;
const PolarGrid = PolarGridBase as ComponentType<any>;
const PolarAngleAxis = PolarAngleAxisBase as ComponentType<any>;
const Radar = RadarBase as ComponentType<any>;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ background: 'var(--tooltip-bg)', border: '1px solid var(--card-border)', borderRadius: 1, p: 1.5 }}>
      <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem', mb: 0.5 }}>{label}</Typography>
      {payload.map((p: any) => (
        <Typography key={p.name} sx={{ color: p.color, fontSize: '0.82rem', fontWeight: 700 }}>
          {p.name}: {p.value}{p.name === 'Gordura' ? '%' : p.name === 'Peso' ? 'kg' : 'cm'}
        </Typography>
      ))}
    </Box>
  );
};

export const Progress: React.FC = () => {
  const { user } = useAuth();
  const { getStudentsByPersonal } = useData();

  const myStudents = getStudentsByPersonal(user!.id);
  const [selectedStudent, setSelectedStudent] = useState(myStudents[0]?.id || '');

  const records = mockProgress[selectedStudent] || [];

  const chartData = records.map(r => ({
    date: new Date(r.date + 'T00:00:00').toLocaleDateString('pt-BR', { month: '2-digit', year: '2-digit' }),
    Peso: r.weight, Gordura: r.bodyFat, Peitoral: r.chest,
    Cintura: r.waist, Quadril: r.hip, Coxa: r.thigh, Braço: r.arm,
  }));

  const first = records[0];
  const last = records[records.length - 1];

  const deltas = first && last
    ? Object.keys(measurementLabels).map(key => {
        const f = (first as any)[key];
        const l = (last as any)[key];
        if (f === undefined || l === undefined) return null;
        const delta = parseFloat((l - f).toFixed(1));
        return { key, ...measurementLabels[key], first: f, last: l, delta };
      }).filter(Boolean)
    : [];

  const radarData = deltas
    .filter(d => d!.unit === 'cm')
    .map(d => ({ subject: d!.label, value: d!.last }));

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>
          PROGRESSO FÍSICO
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
          Acompanhe as medidas e composição corporal
        </Typography>
      </Box>

      {myStudents.length === 0 ? (
        <Card><Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Nenhum aluno cadastrado.</Typography></Card>
      ) : (
        <>
          <FormControl size="small" sx={{ minWidth: 220, mb: 3 }}>
            <Select
              value={selectedStudent}
              onChange={e => setSelectedStudent(e.target.value)}
              sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-border)' } }}
            >
              {myStudents.map(s => (
                <MenuItem key={s.id} value={s.id} sx={{ fontSize: '0.85rem' }}>{s.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {records.length < 2 ? (
            <Card>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Dados insuficientes. Mínimo de 2 avaliações para mostrar progresso.
              </Typography>
            </Card>
          ) : (
            <>
              {/* Delta cards */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {deltas.map(d => {
                  if (!d) return null;
                  const isGood = ['weight', 'bodyFat', 'waist', 'hip'].includes(d.key)
                    ? d.delta <= 0 : d.delta >= 0;
                  const deltaColor = d.delta === 0 ? 'var(--text-secondary)' : isGood ? '#C6F135' : '#FF4D4D';
                  return (
                    <Grid key={d.key} size={{ xs: 6, sm: 4, md: 3 }}>
                      <Card sx={{ position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${d.color}, transparent)` } }}>
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                          {d.label}
                        </Typography>
                        <Typography sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.3rem', lineHeight: 1.2, mt: 0.3, fontFamily: '"Barlow Condensed", sans-serif' }}>
                          {d.last} <Typography component="span" sx={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{d.unit}</Typography>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <Typography sx={{ color: deltaColor, fontSize: '0.75rem', fontWeight: 700 }}>
                            {d.delta > 0 ? '+' : ''}{d.delta} {d.unit}
                          </Typography>
                          <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>vs início</Typography>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Card>
                    <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.82rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Peso & Gordura Corporal
                    </Typography>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                        <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="Peso" stroke="#C6F135" strokeWidth={2} dot={{ fill: '#C6F135', r: 4 }} />
                        {chartData[0]?.Gordura && (
                          <Line type="monotone" dataKey="Gordura" stroke="#FF6B35" strokeWidth={2} dot={{ fill: '#FF6B35', r: 4 }} />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </Grid>

                {radarData.length > 2 && (
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.82rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Medidas Atuais (cm)
                      </Typography>
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="var(--chart-grid)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                          <Radar name="Medidas" dataKey="value" stroke="#C6F135" fill="#C6F135" fillOpacity={0.12} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Card>
                  </Grid>
                )}
              </Grid>

              {chartData.some(d => d.Peitoral || d.Cintura || d.Braço) && (
                <Card sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.82rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Circunferências (cm)
                  </Typography>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                      <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      {chartData[0]?.Peitoral && <Line type="monotone" dataKey="Peitoral" stroke="#00B8D9" strokeWidth={2} dot={{ r: 3 }} />}
                      {chartData[0]?.Cintura && <Line type="monotone" dataKey="Cintura" stroke="#FFB800" strokeWidth={2} dot={{ r: 3 }} />}
                      {chartData[0]?.Quadril && <Line type="monotone" dataKey="Quadril" stroke="#9C6FFF" strokeWidth={2} dot={{ r: 3 }} />}
                      {chartData[0]?.Braço && <Line type="monotone" dataKey="Braço" stroke="#4DFFB4" strokeWidth={2} dot={{ r: 3 }} />}
                      {chartData[0]?.Coxa && <Line type="monotone" dataKey="Coxa" stroke="#FF4D9A" strokeWidth={2} dot={{ r: 3 }} />}
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              )}

              <Card>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '0.82rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Histórico Completo de Avaliações
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell align="center">Peso (kg)</TableCell>
                        <TableCell align="center">Gordura (%)</TableCell>
                        <TableCell align="center">Peitoral</TableCell>
                        <TableCell align="center">Cintura</TableCell>
                        <TableCell align="center">Quadril</TableCell>
                        <TableCell align="center">Braço</TableCell>
                        <TableCell align="center">Coxa</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...records].reverse().map((r, i) => (
                        <TableRow key={r.date} sx={{ '&:last-child td': { border: 0 } }}>
                          <TableCell sx={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: i === 0 ? 700 : 400 }}>
                            {new Date(r.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                            {i === 0 && <Chip label="Atual" size="small" sx={{ ml: 1, height: 16, fontSize: '0.55rem', background: 'rgba(198,241,53,0.1)', color: '#C6F135' }} />}
                          </TableCell>
                          {[r.weight, r.bodyFat, r.chest, r.waist, r.hip, r.arm, r.thigh].map((v, ci) => (
                            <TableCell key={ci} align="center" sx={{ color: v !== undefined ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                              {v !== undefined ? v : '—'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
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