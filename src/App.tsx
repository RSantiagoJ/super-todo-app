import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTaskStore from "./store/taskStore";

const App: React.FC = () => {
  //const [tasks, setTasks] = useState<Task[]>([]);
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.editTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  //const sortByName = useTaskStore((state) => state.sortByName);

  // const handleAddTask = (title: string, description: string) => {
  //   const newTask: Task = {
  //     id: Date.now(),
  //     title,
  //     description,
  //     completed: false,
  //   };
  //   setTasks([...tasks, newTask]);
  // };

  // const handleToggleTask = (id: number) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  // const handleSortTasksByName = () => {
  //   const sortedItems = [...tasks].sort((a, b) =>
  //     a.title.localeCompare(b.title)
  //   );
  //   setTasks(sortedItems);
  // };

  // const handleSortTasksByStatus = () => {
  //   const sortedItems = [...tasks].sort(
  //     (a, b) => Number(a.completed) - Number(b.completed)
  //   );
  //   setTasks(sortedItems);
  // };

  // const handleSortTasksByCreationDate = () => {
  //   const sortedItems = [...tasks].sort((a, b) => a.id - b.id);
  //   setTasks(sortedItems);
  // };

  // const handleDeleteTask = (id: number) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  // const handleEditTask = (
  //   id: number,
  //   newTitle: string,
  //   newDescription: string
  // ) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id
  //         ? { ...task, title: newTitle, description: newDescription }
  //         : task
  //     )
  //   );
  // };

  return (
    <div className="App">
      <h1>Super Todo App</h1>
      <TaskForm
      // //onAdd={handleAddTask}
      // onAdd={addTask}
      />
      <TaskList
      // tasks={tasks}
      // onToggle={handleToggleTask}
      //onDelete={handleDeleteTask}
      // onEdit={handleEditTask}
      //onToggle={toggleTask}
      //onDelete={deleteTask}
      //onEdit={editTask}
      // onSortByName={handleSortTasksByName}
      //onSortByCreationDate={handleSortTasksByCreationDate}
      // onSortByStatus={handleSortTasksByStatus}
      //onSortByName={sortByName}
      />
    </div>
  );
};

export default App;
