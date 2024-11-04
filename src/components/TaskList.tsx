import React from "react";
import TaskItem from "../components/TaskItem";
import useTaskStore from "../store/taskStore";

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  //const sortByName = useTaskStore((state) => state.sortByName);
  //const sortByCreationDate = useTaskStore((state) => state.sortByCreationDate);
  //const sortByCompletionStatus = useTaskStore(
  //  (state) => state.sortByCompletionStatus
  //);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <br />
      <button onClick={() => {}} type="button" className="universal-button">
        Sort Tasks by Name
      </button>
      <br />
      <button onClick={() => {}} type="button" className="universal-button">
        Sort Tasks by Creation Date
      </button>
      <button onClick={() => {}} type="button" className="universal-button">
        Sort Tasks by Completion Status
      </button>
    </div>
  );
};

export default TaskList;
