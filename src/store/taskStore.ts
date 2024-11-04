import { create } from "zustand";
import { Task } from "../types";

type State = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string, description: string) => void;
  sortByName: () => void;
  sortByCreationDate: () => void;
  sortByCompletionStatus: () => void;
  getTaskById: (id: number | null) => Task | undefined;
};

const useTaskStore = create<State>()(
  (set, get) => ({
    // set initial values
    tasks: [],
    //  id: 0,
    //  title: "",
    // description: "",
    // currentTaskId: null,
    //newTitle: "",
    // newDescription: "",

    //setTitle: (title: string) => set({ title }),
    //setNewDescription: (newDescription: string) => set({ newDescription }),
    //setNewTitle: (newTitle: string) => set({ newTitle }),
    //setDescription: (description: string) => set({ description }),
    //setCurrentTaskById: (id: number | null) => set({ currentTaskId: id }),

    // updateTaskField: (id, field, value) =>
    //   set((state) => ({
    //     tasks: state.tasks.map((task) =>
    //       task.id === id ? { ...task, [field]: value } : task
    //     ),
    //   })),

    // setEditTitle: (id: number, title: string) =>
    //   set((state) => ({
    //     tasks: state.tasks.map((task) =>
    //       task.id === id ? { ...task, newTitle: title } : task
    //     ),
    //   })),

    // setEditDescription: (id: number, description: string) =>
    //   set((state) => ({
    //     tasks: state.tasks.map((task) =>
    //       task.id === id ? { ...task, newDescription: description } : task
    //     ),
    //   })),

    // startEditingTask: (id) =>
    //   set((state) => ({
    //     tasks: state.tasks.map((task) =>
    //       task.id === id
    //         ? {
    //             ...task,
    //             isEditing: true,
    //             newTitle: task.title,
    //             newDescription: task.description,
    //           }
    //         : task
    //     ),
    //   })),

    // cancelEditingTask: (id) =>
    //   set((state) => ({
    //     tasks: state.tasks.map((task) =>
    //       task.id === id ? { ...task, isEditing: false } : task
    //     ),
    //   })),

    // toggleIsEditing: (id: number) =>
    //   set((state) => ({
    //     currentTaskId: id,
    //     tasks: state.tasks.map((task) =>
    //       task.id === id ? { ...task, isEditing: !task.isEditing } : task
    //     ),
    //   })),

    addTask: (title: string, description: string) => {
      console.log("Adding task:", title, description);

      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            title: title,
            description: description,
            //newTitle: title,
            //newDescription: description,
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

    // getCurrentTask: () => {
    //   const { currentTaskId, tasks } = get();
    //   return tasks.find((task) => task.id === currentTaskId);
    // },

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

    // editTask: (id: number, newTitle: string, newDescription: string) =>
    //   set((state) => ({
    //     tasks: state.tasks.map((task) =>
    //       task.id === id
    //         ? {
    //             ...task,
    //             title: newTitle,
    //             description: newDescription,
    //             isEditing: false,
    //             newTitle: "", // Reset new title
    //             newDescription: "", // Reset new description
    //           }
    //         : task
    //     ),
    //   })),
    editTask: (id, title, description) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, title, description, isEditing: false }
            : task
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
  })
  // {
  //   name: "task-storage",
  //   storage: createJSONStorage(() => localStorage),
  //   onRehydrateStorage: () => {
  //     console.log("Rehydrating tasks from local storage...");
  //   },
  // }
);

export default useTaskStore;
