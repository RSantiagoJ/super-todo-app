import React from "react";
import useTaskStore from "../store/taskStore";

const TaskForm: React.FC = () => {
  const title = useTaskStore((state) => state.title);
  const description = useTaskStore((state) => state.description);
  const addTask = useTaskStore((state) => state.addTask);
  const setTitle = useTaskStore((state) => state.setTitle);
  const setDescription = useTaskStore((state) => state.setDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addTask(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
