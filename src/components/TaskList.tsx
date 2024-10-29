import React from "react";
import useTaskStore from "../store/taskStore";

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const sortByName = useTaskStore((state) => state.sortByName);
  const sortByCreationDate = useTaskStore((state) => state.sortByCreationDate);
  const sortByCompletionStatus = useTaskStore(
    (state) => state.sortByCompletionStatus
  );
  const editTask = useTaskStore((state) => state.editTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleIsEditing = useTaskStore((state) => state.toggleIsEditing);
  const setNewTitle = useTaskStore((state) => state.setNewTitle);
  const setNewDescription = useTaskStore((state) => state.setNewDescription);
  const newTitle = useTaskStore((state) => state.newTitle);
  const newDescription = useTaskStore((state) => state.newDescription);

  const handleEditSubmit = (taskId: number) => {
    editTask(taskId, newTitle, newDescription);
    setNewTitle(""); // Clear the newTitle after saving
    setNewDescription(""); // Clear the newDescription after saving
    useTaskStore.getState().setCurrentTaskById(taskId);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
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
              <button onClick={() => handleEditSubmit(task.id)}>Save</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                onClick={() => {
                  setNewTitle(task.title);
                  setNewDescription(task.description);
                  toggleIsEditing(task.id);
                }}
              >
                {task.title} - {task.description}
              </span>
            </>
          )}
          <button
            onClick={() => {
              setNewTitle(task.title);
              setNewDescription(task.description);
              toggleIsEditing(task.id);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
      <br />
      <button onClick={sortByName} type="button" className="universal-button">
        Sort Tasks by Name
      </button>
      <br />
      <button
        onClick={sortByCreationDate}
        type="button"
        className="universal-button"
      >
        Sort Tasks by Creation Date
      </button>
      <button
        onClick={sortByCompletionStatus}
        type="button"
        className="universal-button"
      >
        Sort Tasks by Completion Status
      </button>
    </div>
  );
};

export default TaskList;
