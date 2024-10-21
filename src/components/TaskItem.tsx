import React, { useState } from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleEditSubmit = () => {
    onEdit(task.id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
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
            onChange={() => onToggle(task.id)}
          />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title} - {task.description}
          </span>
        </>
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
