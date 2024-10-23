import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
  sortByName: () => void;
  sortByCreationDate: () => void;
  sortByCompletionStatus: () => void;
  toggleIsEditing: (task: Task) => void;
  getTaskById: (id: number) => Task | undefined;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  task: {
    id: 0,
    title: "",
    description: "",
    completed: false,
    isEditing: false,
  }, // Default task initialization

  setIsEditingTest: (isEditing: boolean, id: number) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !isEditing } : task
      ),
    })),

  toggleIsEditing: (task: Task) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((t) =>
        t.id === task.id ? { ...t, isEditing: !t.isEditing } : task
      ),
    })),

  tasks: [],
  addTask: (title: string, description: string) =>
    set((state: TaskStore) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now(),
          title,
          description,
          completed: false,
          isEditing: false,
        },
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

  // do not use set for ftching or reading data from state
  getTaskById: (id: number) => {
    return get().tasks.find((task) => task.id === id);
  },
  editTask: (id: number, title: string, description: string) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      ),
    })),

  sortByName: () =>
    set((state) => ({
      tasks: [...state.tasks].sort((a, b) => a.title.localeCompare(b.title)),
    })),

  sortByCompletionStatus: () =>
    set((state) => ({
      tasks: [...state.tasks].sort(
        (a, b) => Number(a.completed) - Number(b.completed)
      ),
    })),

  sortByCreationDate: () =>
    set((state) => ({
      tasks: [...state.tasks].sort((a, b) => a.id - b.id),
    })),
}));

export default useTaskStore;
