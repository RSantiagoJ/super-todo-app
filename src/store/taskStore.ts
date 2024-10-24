import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task } from "../types";

type State = {
  tasks: Task[];
  currentTaskId: number | null;
  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
  sortByName: () => void;
  sortByCreationDate: () => void;
  sortByCompletionStatus: () => void;
  toggleIsEditing: (task: Task) => void;
  getTaskById: (id: number) => Task | undefined;
  setCurrentTaskById: (id: number | null) => void;
  title: string;
  description: string;
  newTitle: string;
  newDescription: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setNewTitle: (title: string) => void;
  setNewDescription: (description: string) => void;
};

const useTaskStore = create<State>()(
  persist(
    (set, get) => ({
      tasks: [],
      title: "",
      description: "",
      currentTaskId: null,
      newTitle: "",
      newDescription: "",

      setTitle: (title: string) => set({ title }),
      setDescription: (description: string) => set({ description }),
      setNewTitle: (title: string) => set({ newTitle: title }),
      setNewDescription: (description: string) =>
        set({ newDescription: description }),
      setCurrentTaskById: (id: number | null) => set({ currentTaskId: id }),

      toggleIsEditing: (task: Task) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === task.id ? { ...t, isEditing: !t.isEditing } : t
          ),
        })),

      addTask: (title: string, description: string) =>
        set((state) => ({
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
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      deleteTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      getTaskById: (id: number) => {
        return get().tasks.find((task) => task.id === id);
      },

      editTask: (id: number, title: string, description: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title, description } : task
          ),
        })),

      sortByName: () =>
        set((state) => ({
          tasks: [...state.tasks].sort((a, b) =>
            a.title.localeCompare(b.title)
          ),
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
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;
