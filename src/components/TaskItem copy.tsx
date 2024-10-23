import React, { useState } from "react";
import useTaskStore from "../store/taskStore";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const editTask = useTaskStore((state) => state.editTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleIsEditing = useTaskStore((state) => state.toggleIsEditing);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleEditSubmit = () => {
    editTask(task.id, newTitle, newDescription);
    toggleIsEditing(task);
  };

  return (
    <div className="task-item">
      {task.isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit task title"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Edit task description"
          />
          <button onClick={handleEditSubmit}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onDoubleClick={() => toggleIsEditing(task)}
          >
            {task.title} - {task.description}
          </span>
        </>
      )}
      <button onClick={() => toggleIsEditing(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
