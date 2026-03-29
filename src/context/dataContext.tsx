import React, { createContext, useContext, useState, useCallback } from 'react';
import { Student, WorkoutSheet } from '../types/interface';
import { mockStudents, mockWorkoutSheets } from '../data/mockdata';

interface DataContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => Student;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudentsByPersonal: (personalId: string) => Student[];
  workoutSheets: WorkoutSheet[];
  addWorkoutSheet: (sheet: Omit<WorkoutSheet, 'id' | 'createdAt'>) => WorkoutSheet;
  updateWorkoutSheet: (id: string, data: Partial<WorkoutSheet>) => void;
  deleteWorkoutSheet: (id: string) => void;
  getSheetsByStudent: (studentId: string) => WorkoutSheet[];
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [workoutSheets, setWorkoutSheets] = useState<WorkoutSheet[]>(mockWorkoutSheets);

  const addStudent = useCallback((data: Omit<Student, 'id'>): Student => {
    const newStudent: Student = { ...data, id: `s_${Date.now()}` };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  }, []);

  const updateStudent = useCallback((id: string, data: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setWorkoutSheets(prev => prev.filter(ws => ws.studentId !== id));
  }, []);

  const getStudentsByPersonal = useCallback((personalId: string) => {
    return students.filter(s => s.personalId === personalId);
  }, [students]);

  const addWorkoutSheet = useCallback((data: Omit<WorkoutSheet, 'id' | 'createdAt'>): WorkoutSheet => {
    const newSheet: WorkoutSheet = {
      ...data,
      id: `ws_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setWorkoutSheets(prev => [...prev, newSheet]);
    return newSheet;
  }, []);

  const updateWorkoutSheet = useCallback((id: string, data: Partial<WorkoutSheet>) => {
    setWorkoutSheets(prev => prev.map(ws => ws.id === id ? { ...ws, ...data } : ws));
  }, []);

  const deleteWorkoutSheet = useCallback((id: string) => {
    setWorkoutSheets(prev => prev.filter(ws => ws.id !== id));
  }, []);

  const getSheetsByStudent = useCallback((studentId: string) => {
    return workoutSheets.filter(ws => ws.studentId === studentId && ws.active);
  }, [workoutSheets]);

  return (
    <DataContext.Provider value={{
      students, addStudent, updateStudent, deleteStudent, getStudentsByPersonal,
      workoutSheets, addWorkoutSheet, updateWorkoutSheet, deleteWorkoutSheet, getSheetsByStudent,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
};