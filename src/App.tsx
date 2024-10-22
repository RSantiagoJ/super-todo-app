import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Super Todo App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
