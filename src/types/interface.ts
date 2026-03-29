export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin';
  avatar?: string;
  email?: string;
  phone?: string;
  cref?: string;
  bio?: string;
}

export interface Student {
  id: string;
  personalId: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: 'hipertrofia' | 'emagrecimento' | 'condicionamento' | 'força';
  level: 'iniciante' | 'intermediário' | 'avançado';
  avatar?: string;
  since: string;
  nextSession?: string;
  bodyFat?: number;
  observations?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  restSeconds: number;
  technique?: string;
  videoUrl?: string;
  observations?: string;
}

export interface WorkoutSheet {
  id: string;
  studentId: string;
  name: string;
  type: 'A' | 'B' | 'C' | 'D';
  focus: string;
  exercises: Exercise[];
  createdAt: string;
  active: boolean;
  weekDays: string[];
}

export interface WorkoutLog {
  id: string;
  studentId: string;
  sheetId: string;
  sheetType: 'A' | 'B' | 'C' | 'D';
  date: string;
  duration: number;
  exercises: ExerciseLog[];
  generalFeeling: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
}

export interface SetLog {
  setNumber: number;
  weight: number;
  reps: number;
  rir?: number;
}

export interface ProgressRecord {
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  thigh?: number;
  arm?: number;
}