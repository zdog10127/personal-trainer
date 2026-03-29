import React from 'react';
import styled from 'styled-components';
import { Box, Grid, Typography, Avatar, Chip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenterRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsRounded';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/dataContext';
import { mockWorkoutLogs } from '../../data/mockdata';
import { Card, GoalBadge, LevelColors, StatCard } from './styles';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'BOM DIA';
  if (h < 18) return 'BOA TARDE';
  return 'BOA NOITE';
};

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { getStudentsByPersonal } = useData();

  const myStudents = getStudentsByPersonal(user!.id);
  const myStudentIds = myStudents.map(s => s.id);

  const myLogs = mockWorkoutLogs.filter(l => myStudentIds.includes(l.studentId));

  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
  const thisWeekLogs = myLogs.filter(l => new Date(l.date) >= weekAgo).length;
  const avgFeeling = myLogs.length
    ? (myLogs.reduce((a, l) => a + l.generalFeeling, 0) / myLogs.length).toFixed(1)
    : '—';

  const recentLogs = [...myLogs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const feelings = ['😞', '😕', '😐', '😊', '🔥'];

  const firstName = user!.name.split(' ')[0].toUpperCase();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>
          {greeting()}, {firstName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          {' '}— {myStudents.length} {myStudents.length === 1 ? 'aluno ativo' : 'alunos ativos'}
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Alunos Ativos',       value: myStudents.length, icon: <FitnessCenterIcon />, suffix: '' },
          { label: 'Treinos esta Semana', value: thisWeekLogs,       icon: <CalendarTodayIcon />, suffix: '' },
          { label: 'Total de Registros',  value: myLogs.length,      icon: <TrendingUpIcon />,    suffix: '' },
          { label: 'Humor Médio',         value: avgFeeling,         icon: <EmojiEventsIcon />,   suffix: myLogs.length ? '/5' : '' },
        ].map((stat, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h3" sx={{ fontSize: '2.2rem', color: '#C6F135', mt: 0.5, lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </Typography>
                </Box>
                <Box sx={{ color: 'var(--text-muted)', mt: 0.5 }}>{stat.icon}</Box>
              </Box>
            </StatCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ color: 'var(--text-primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Seus Alunos
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#C6F135', cursor: 'pointer', letterSpacing: '0.08em', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => onNavigate('students')}
          >
            VER TODOS →
          </Typography>
        </Box>
        {myStudents.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Nenhum aluno cadastrado ainda.{' '}
              <span
                style={{ color: '#C6F135', cursor: 'pointer' }}
                onClick={() => onNavigate('students')}
              >
                Cadastrar agora →
              </span>
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {myStudents.map(student => {
              const goal = GoalBadge[student.goal];
              const bmi = (student.weight / ((student.height / 100) ** 2)).toFixed(1);
              const lastLog = myLogs
                .filter(l => l.studentId === student.id)
                .sort((a, b) => b.date.localeCompare(a.date))[0];

              return (
                <Grid key={student.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                    sx={{ cursor: 'pointer', transition: 'border-color 0.15s', '&:hover': { borderColor: 'rgba(198,241,53,0.25)' } }}
                    onClick={() => onNavigate('students', student.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Avatar sx={{ width: 42, height: 42, background: 'rgba(198,241,53,0.1)', color: '#C6F135', fontWeight: 700, fontSize: '0.9rem' }}>
                        {student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {student.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>
                          {student.age} anos · {student.height}cm · {student.weight}kg
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.8, mb: 2, flexWrap: 'wrap' }}>
                      <Chip label={goal.label} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, background: `${goal.color}18`, color: goal.color, letterSpacing: '0.05em' }} />
                      <Chip label={student.level} size="small" sx={{ height: 18, fontSize: '0.6rem', background: `${LevelColors[student.level]}15`, color: LevelColors[student.level], letterSpacing: '0.05em' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>IMC {bmi}</Typography>
                      {student.bodyFat !== undefined && (
                        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>{student.bodyFat}% gordura</Typography>
                      )}
                    </Box>
                    {lastLog && (
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.62rem', display: 'block', mt: 1 }}>
                        Último treino: {new Date(lastLog.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </Typography>
                    )}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ color: 'var(--text-primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 2 }}>
          Treinos Recentes
        </Typography>
        <Card>
          {recentLogs.length === 0 ? (
            <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhum treino registrado ainda.</Typography>
          ) : recentLogs.map((log, i) => {
            const student = myStudents.find(s => s.id === log.studentId);
            return (
              <Box key={log.id}>
                {i > 0 && <Box sx={{ height: 1, background: 'var(--hover-row)', my: 1.5 }} />}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, background: 'rgba(198,241,53,0.08)', color: '#C6F135', fontSize: '0.7rem', fontWeight: 700 }}>
                    {student?.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.82rem' }}>
                      {student?.name} — Treino {log.sheetType}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                      {new Date(log.date + 'T00:00:00').toLocaleDateString('pt-BR')} · {log.duration}min
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1rem' }}>{feelings[log.generalFeeling - 1]}</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{log.generalFeeling}/5</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Card>
      </Box>
    </Box>
  );
};