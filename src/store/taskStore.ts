import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task } from "../types";

type State = {
  tasks: Task[];
  id: number | null;
  title: string;
  description: string;
  currentTaskId: number | null;

  newTitle: string;
  newDescription: string;

  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
  sortByName: () => void;
  sortByCreationDate: () => void;
  sortByCompletionStatus: () => void;
  toggleIsEditing: (id: number) => void;
  getTaskById: (id: number | null) => Task | undefined;
  setCurrentTaskById: (id: number | null) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setNewTitle: (newTitle: string) => void;
  //setNewTitle: (id: number, title: string) => void;
  setNewDescription: (newDescription: string) => void;
  //setNewDescription: (id: number, description: string) => void;
  getCurrentTask: () => Task | undefined;
};

const useTaskStore = create<State>()(
  persist(
    (set, get) => ({
      // set initial values
      tasks: [],
      id: 0,
      title: "",
      description: "",
      currentTaskId: null,

      newTitle: "",
      newDescription: "",

      setTitle: (title: string) => set({ title }),
      setNewDescription: (newDescription: string) => set({ newDescription }),
      setNewTitle: (newTitle: string) => set({ newTitle }),
      setDescription: (description: string) => set({ description }),
      setCurrentTaskById: (id: number | null) => set({ currentTaskId: id }),

      // setNewTitle: (id: number, title: string) =>
      //   set((state) => ({
      //     tasks: state.tasks.map((task) =>
      //       task.id === id ? { ...task, newTitle: title } : task
      //     ),
      //   })),

      // setNewDescription: (id: number, description: string) =>
      //   set((state) => ({
      //     tasks: state.tasks.map((task) =>
      //       task.id === id ? { ...task, newDescription: description } : task
      //     ),
      //   })),

      toggleIsEditing: (id: number) =>
        set((state) => ({
          currentTaskId: id,
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isEditing: !task.isEditing } : task
          ),
        })),

      addTask: (title: string, description: string) => {
        console.log("Adding task:", title, description);

        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now(),
              title,
              description,
              completed: false,
              isEditing: false,
              newTitle: "",
              newDescription: "",
            },
          ],
          title: "", // reset val after adding
          description: "", // reset val after adding
        }));
      },

      getCurrentTask: () => {
        const { currentTaskId, tasks } = get();
        return tasks.find((task) => task.id === currentTaskId);
      },

      getTaskById: (id: number | null) =>
        get().tasks.find((task) => task.id === id),

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

      // editTask: (id: number, newTitle: string, newDescription: string) =>
      //   set((state) => ({
      //     tasks: state.tasks.map((task) =>
      //       task.id === id
      //         ? {
      //             ...task,
      //             title: newTitle,
      //             description: newDescription,
      //             isEditing: false,
      //           }
      //         : task
      //     ),
      //   })),

      editTask: (id: number, newTitle: string, newDescription: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  title: newTitle,
                  description: newDescription,
                  isEditing: false,
                  newTitle: "", // Reset new title
                  newDescription: "", // Reset new description
                }
              : task
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
      onRehydrateStorage: () => {
        console.log("Rehydrating tasks from local storage...");
      },
    }
  )
);

export default useTaskStore;
