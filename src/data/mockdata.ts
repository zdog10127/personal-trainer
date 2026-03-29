import { User, Student, WorkoutSheet, WorkoutLog, ProgressRecord } from '../types/interface';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'admin',
    password: '123456',
    name: 'Admin',
    role: 'admin',
    email: 'admin@forcetrack.com',
    phone: '(34) 99999-0001',
    cref: '012345-G/MG',
    bio: 'Administrador do sistema ForceTrack.',
  },
  {
    id: 'u2',
    username: 'gabriel',
    password: '123456',
    name: 'Gabriel Teles',
    role: 'admin',
    email: 'gabriel@forcetrack.com',
    phone: '(34) 99999-0002',
    cref: '023456-G/MG',
    bio: 'Administrador do sistema ForceTrack.',
  },
  {
    id: 'u3',
    username: 'bernardo',
    password: '123456',
    name: 'Bernardo Gerçossimo',
    role: 'admin',
    email: 'bernardo@forcetrack.com',
    phone: '(34) 99999-0003',
    cref: '034567-G/MG',
    bio: 'Personal trainer com foco em emagrecimento e condicionamento físico e hipertrofia.',
  },
];

export const mockStudents: Student[] = [
  {
    id: '1',
    personalId: 'u3',
    name: 'Lucas Mendes',
    age: 26,
    weight: 82,
    height: 178,
    goal: 'hipertrofia',
    level: 'intermediário',
    since: '2024-03-10',
    nextSession: '2025-03-29',
    bodyFat: 18,
    observations: 'Foco em peitoral e ombro. Evitar carga excessiva no joelho direito.',
  },
  {
    id: '2',
    personalId: 'u3',
    name: 'Fernanda Costa',
    age: 31,
    weight: 64,
    height: 165,
    goal: 'emagrecimento',
    level: 'iniciante',
    since: '2024-11-05',
    nextSession: '2025-03-28',
    bodyFat: 28,
    observations: 'Preferência por treinos funcionais. Problemas na coluna lombar.',
  },
  {
    id: '3',
    personalId: 'u3',
    name: 'Rafael Oliveira',
    age: 34,
    weight: 95,
    height: 182,
    goal: 'força',
    level: 'avançado',
    since: '2023-08-15',
    nextSession: '2025-03-30',
    bodyFat: 15,
    observations: 'Atleta de powerlifting. Prioridade nos levantamentos básicos.',
  },
  {
    id: '4',
    personalId: 'u3',
    name: 'Camila Santos',
    age: 28,
    weight: 58,
    height: 162,
    goal: 'condicionamento',
    level: 'intermediário',
    since: '2024-06-20',
    nextSession: '2025-03-29',
    bodyFat: 22,
  },
];

export const mockWorkoutSheets: WorkoutSheet[] = [
  {
    id: 'ws1', studentId: '1', name: 'Treino A — Peito & Tríceps', type: 'A',
    focus: 'Hipertrofia — Push', weekDays: ['Segunda', 'Quinta'], createdAt: '2025-01-15', active: true,
    exercises: [
      { id: 'e1', name: 'Supino Reto com Barra', muscleGroup: 'Peitoral', sets: 4, reps: '8-10', restSeconds: 90, technique: 'Pausa de 1s no peito' },
      { id: 'e2', name: 'Supino Inclinado com Halteres', muscleGroup: 'Peitoral', sets: 3, reps: '10-12', restSeconds: 75 },
      { id: 'e3', name: 'Crucifixo na Polia', muscleGroup: 'Peitoral', sets: 3, reps: '12-15', restSeconds: 60 },
      { id: 'e4', name: 'Tríceps Testa com Halteres', muscleGroup: 'Tríceps', sets: 3, reps: '10-12', restSeconds: 60 },
      { id: 'e5', name: 'Tríceps Corda na Polia', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', restSeconds: 60 },
    ],
  },
  {
    id: 'ws2', studentId: '1', name: 'Treino B — Costas & Bíceps', type: 'B',
    focus: 'Hipertrofia — Pull', weekDays: ['Terça', 'Sexta'], createdAt: '2025-01-15', active: true,
    exercises: [
      { id: 'e6', name: 'Puxada Frontal na Polia', muscleGroup: 'Costas', sets: 4, reps: '8-10', restSeconds: 90 },
      { id: 'e7', name: 'Remada Curvada com Barra', muscleGroup: 'Costas', sets: 4, reps: '8-10', restSeconds: 90 },
      { id: 'e8', name: 'Remada Unilateral com Haltere', muscleGroup: 'Costas', sets: 3, reps: '10-12', restSeconds: 75 },
      { id: 'e9', name: 'Rosca Direta com Barra', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', restSeconds: 60 },
      { id: 'e10', name: 'Rosca Martelo', muscleGroup: 'Bíceps', sets: 3, reps: '12-15', restSeconds: 60 },
    ],
  },
  {
    id: 'ws3', studentId: '1', name: 'Treino C — Pernas', type: 'C',
    focus: 'Hipertrofia — Lower', weekDays: ['Quarta'], createdAt: '2025-01-15', active: true,
    exercises: [
      { id: 'e11', name: 'Agachamento Livre', muscleGroup: 'Quadríceps', sets: 4, reps: '8-10', restSeconds: 120, technique: 'Profundidade total' },
      { id: 'e12', name: 'Leg Press 45°', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', restSeconds: 90 },
      { id: 'e13', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '15-20', restSeconds: 60 },
      { id: 'e14', name: 'Mesa Flexora', muscleGroup: 'Isquiotibiais', sets: 3, reps: '10-12', restSeconds: 60 },
      { id: 'e15', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', restSeconds: 45 },
    ],
  },
  {
    id: 'ws4', studentId: '3', name: 'Treino A — Squat', type: 'A',
    focus: 'Força — Agachamento', weekDays: ['Segunda'], createdAt: '2024-09-01', active: true,
    exercises: [
      { id: 'e20', name: 'Agachamento Livre', muscleGroup: 'Quadríceps', sets: 5, reps: '5', restSeconds: 180, technique: 'RPE 8' },
      { id: 'e21', name: 'Agachamento Pausa', muscleGroup: 'Quadríceps', sets: 3, reps: '3', restSeconds: 180 },
      { id: 'e22', name: 'Leg Press', muscleGroup: 'Quadríceps', sets: 3, reps: '8-10', restSeconds: 120 },
    ],
  },
];

export const mockWorkoutLogs: WorkoutLog[] = [
  {
    id: 'wl1', studentId: '1', sheetId: 'ws1', sheetType: 'A',
    date: '2025-03-26', duration: 62, generalFeeling: 4,
    exercises: [
      { exerciseId: 'e1', exerciseName: 'Supino Reto com Barra', sets: [
        { setNumber: 1, weight: 80, reps: 10 }, { setNumber: 2, weight: 82.5, reps: 9 },
        { setNumber: 3, weight: 82.5, reps: 8 }, { setNumber: 4, weight: 80, reps: 8 },
      ]},
      { exerciseId: 'e2', exerciseName: 'Supino Inclinado com Halteres', sets: [
        { setNumber: 1, weight: 28, reps: 12 }, { setNumber: 2, weight: 30, reps: 11 },
        { setNumber: 3, weight: 30, reps: 10 },
      ]},
    ],
  },
  {
    id: 'wl2', studentId: '1', sheetId: 'ws2', sheetType: 'B',
    date: '2025-03-24', duration: 58, generalFeeling: 5,
    exercises: [
      { exerciseId: 'e6', exerciseName: 'Puxada Frontal na Polia', sets: [
        { setNumber: 1, weight: 75, reps: 10 }, { setNumber: 2, weight: 80, reps: 9 },
        { setNumber: 3, weight: 80, reps: 8 }, { setNumber: 4, weight: 77.5, reps: 8 },
      ]},
      { exerciseId: 'e7', exerciseName: 'Remada Curvada com Barra', sets: [
        { setNumber: 1, weight: 70, reps: 10 }, { setNumber: 2, weight: 72.5, reps: 9 },
        { setNumber: 3, weight: 72.5, reps: 9 }, { setNumber: 4, weight: 70, reps: 10 },
      ]},
    ],
  },
  {
    id: 'wl3', studentId: '1', sheetId: 'ws1', sheetType: 'A',
    date: '2025-03-20', duration: 60, generalFeeling: 3,
    exercises: [
      { exerciseId: 'e1', exerciseName: 'Supino Reto com Barra', sets: [
        { setNumber: 1, weight: 77.5, reps: 10 }, { setNumber: 2, weight: 80, reps: 9 },
        { setNumber: 3, weight: 80, reps: 8 }, { setNumber: 4, weight: 77.5, reps: 9 },
      ]},
    ],
  },
  {
    id: 'wl4', studentId: '1', sheetId: 'ws1', sheetType: 'A',
    date: '2025-03-13', duration: 55, generalFeeling: 4,
    exercises: [
      { exerciseId: 'e1', exerciseName: 'Supino Reto com Barra', sets: [
        { setNumber: 1, weight: 75, reps: 10 }, { setNumber: 2, weight: 77.5, reps: 10 },
        { setNumber: 3, weight: 77.5, reps: 9 }, { setNumber: 4, weight: 75, reps: 9 },
      ]},
    ],
  },
  {
    id: 'wl5', studentId: '1', sheetId: 'ws1', sheetType: 'A',
    date: '2025-02-27', duration: 65, generalFeeling: 5,
    exercises: [
      { exerciseId: 'e1', exerciseName: 'Supino Reto com Barra', sets: [
        { setNumber: 1, weight: 72.5, reps: 10 }, { setNumber: 2, weight: 75, reps: 10 },
        { setNumber: 3, weight: 75, reps: 9 }, { setNumber: 4, weight: 72.5, reps: 10 },
      ]},
    ],
  },
];

export const mockProgress: Record<string, ProgressRecord[]> = {
  '1': [
    { date: '2024-03-10', weight: 87, bodyFat: 23, chest: 102, waist: 86, hip: 98, thigh: 62, arm: 36 },
    { date: '2024-06-10', weight: 85, bodyFat: 21, chest: 104, waist: 84, hip: 97, thigh: 63, arm: 37 },
    { date: '2024-09-10', weight: 84, bodyFat: 19.5, chest: 105, waist: 83, hip: 96, thigh: 64, arm: 38 },
    { date: '2024-12-10', weight: 83, bodyFat: 18.5, chest: 106, waist: 82, hip: 96, thigh: 65, arm: 38.5 },
    { date: '2025-03-10', weight: 82, bodyFat: 18, chest: 107, waist: 81, hip: 95, thigh: 66, arm: 39 },
  ],
  '2': [
    { date: '2024-11-05', weight: 70, bodyFat: 33, waist: 90, hip: 104 },
    { date: '2025-01-05', weight: 67, bodyFat: 31, waist: 87, hip: 101 },
    { date: '2025-03-05', weight: 64, bodyFat: 28, waist: 84, hip: 99 },
  ],
  '3': [
    { date: '2023-08-15', weight: 102, bodyFat: 20, chest: 115, waist: 94, arm: 42 },
    { date: '2024-02-15', weight: 98, bodyFat: 17, chest: 116, waist: 90, arm: 43 },
    { date: '2024-08-15', weight: 96, bodyFat: 15.5, chest: 117, waist: 88, arm: 44 },
    { date: '2025-02-15', weight: 95, bodyFat: 15, chest: 118, waist: 87, arm: 45 },
  ],
};