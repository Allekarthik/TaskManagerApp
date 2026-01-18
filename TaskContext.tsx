import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Category = 'Work' | 'Personal' | 'Birthday';

export type Task = {
  id: number;
  title: string;
  category: Category;
  date:string;
  createdAt: string; // ✅ FULL ISO DATE-TIME
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, category: Category, date: string) => void;
  toggleTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

const STORAGE_KEY = 'TASKS_STORAGE';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  /* ---------- Load Tasks ---------- */
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setTasks(JSON.parse(data));
  };

  const saveTasks = async (updated: Task[]) => {
    setTasks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /* ---------- ADD TASK (FIXED) ---------- */
const addTask = (title: string, category: Category, date: string) => {
  const newTask: Task = {
    id: Date.now(),
    title,
    category,
    date,                                // ✅ FIX
    createdAt: new Date().toISOString(), // ✅ KEEP
    completed: false,
  };

  saveTasks([newTask, ...tasks]);
};


  /* ---------- TOGGLE TASK ---------- */
  const toggleTask = (id: number) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
