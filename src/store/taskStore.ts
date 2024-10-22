import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  task: Task;
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
  sortByName: () => void;
  sortByCreationDate: () => void;
  sortByCompletionStatus: () => void;
  setIsEditing: (isEditing: boolean, id: number) => void;
  //setNewTitle: (newTitle: string) => void;
  //setNewDescription: (newDescription: string) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  task: {
    id: 0,
    title: "",
    description: "",
    completed: false,
    isEditing: false,
    // toggleIsEditing: function (): void {
    //   throw new Error("Function not implemented.");
    // },
  }, // Default task initialization

  setIsEditing: (isEditing: boolean, id: number) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !isEditing } : task
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
          toggleIsEditing: function () {
            this.isEditing = !this.isEditing;
          },
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

  editTask: (id: number, title: string, description: string) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      ),
    })),

  sortByName: () =>
    set((state: TaskStore) => ({
      tasks: state.tasks.sort((a, b) => a.title.localeCompare(b.title)),
    })),

  sortByCompletionStatus: () =>
    set((state: TaskStore) => ({
      tasks: state.tasks.sort(
        (a, b) => Number(a.completed) - Number(b.completed)
      ),
    })),

  sortByCreationDate: () =>
    set((state: TaskStore) => ({
      tasks: state.tasks.sort((a, b) => a.id - b.id),
    })),
}));

export default useTaskStore;
