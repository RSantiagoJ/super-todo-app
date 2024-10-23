import React from "react";
import useTaskStore from "../store/taskStore";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const sortByName = useTaskStore((state) => state.sortByName);
  const sortByCreationDate = useTaskStore((state) => state.sortByCreationDate);
  const sortByCompletionStatus = useTaskStore(
    (state) => state.sortByCompletionStatus
  );

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
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
