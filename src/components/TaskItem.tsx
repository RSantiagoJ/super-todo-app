import React, { useEffect, useState } from "react";
import useTaskStore from "../store/taskStore";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const editTask = useTaskStore((state) => state.editTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  //const updateTaskField = useTaskStore((state) => state.updateTaskField);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubmit = () => {
    editTask(task.id, newTitle, newDescription);
    //setIsEditing(false);
    //editTask(task.id, task.newTitle ?? "", task.newDescription ?? "");
  };

  // useEffect(() => {
  //   console.log("All Tasks:", tasks);
  // }, [tasks]);
  console.log("render item");

  useEffect(() => {
    console.log(task);
  });
  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            // onChange={(e) =>
            //   updateTaskField(task.id, "newTitle", e.target.value)
            // }
            placeholder="Edit task title"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            // onChange={(e) =>
            //   updateTaskField(task.id, "newDescription", e.target.value)
            // }
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
            // onDoubleClick={() => toggleIsEditing(task.id)}\
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title} - {task.description}
          </span>
        </>
      )}
      {/* <button onClick={() => toggleIsEditing(task.id)}>Edit</button> */}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
