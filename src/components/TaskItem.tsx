import React, { useEffect } from "react";
import useTaskStore from "../store/taskStore";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const currentTaskId = useTaskStore((state) => state.currentTaskId);
  //const currentTask = useTaskStore((state) => state.getCurrentTask);
  //const currentTaskId = useTaskStore((state) => state.getTaskById(currentTaskId));
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleIsEditing = useTaskStore((state) => state.toggleIsEditing);
  const setNewTitle = useTaskStore((state) => state.setTitle);
  const setNewDescription = useTaskStore((state) => state.setDescription);
  const title = useTaskStore((state) => state.title);
  const description = useTaskStore((state) => state.description);

  // if (!currentTask) return null;

  useEffect(() => {
    console.log("Current Task ID:", currentTaskId);
    console.log("All Tasks:", tasks);
  }, [currentTaskId, tasks]);

  const handleEditSubmit = () => {
    editTask(task.id, title, description);
    toggleIsEditing(task);
  };

  return (
    <div className="task-item">
      {task.isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit task title"
          />
          <input
            type="text"
            value={description}
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
