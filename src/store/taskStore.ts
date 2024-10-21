import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title: string, description: string) =>
    set((state: TaskStore) => ({
      tasks: [
        ...state.tasks,
        { id: Date.now(), title, description, completed: false },
      ],
    })),

  toggleTask: (id: number) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  deleteTask: (id: number) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  editTask: (id: number, title: string, description: string) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      ),
    })),
}));

export default useTaskStore;