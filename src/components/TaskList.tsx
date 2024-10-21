import React from "react";
import { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
  onSortByName: () => void;
  onSortByCreationDate: () => void;
  onSortByStatus: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onSortByName,
  onSortByCreationDate,
  onSortByStatus,
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      <br></br>
      <button onClick={onSortByName} type="button" className="universal-button">
        Sort Tasks by Name
      </button>
      <br></br>
      <button
        onClick={onSortByCreationDate}
        type="button"
        className="universal-button"
      >
        Sort Tasks by Creation Date
      </button>
      <button
        onClick={onSortByStatus}
        type="button"
        className="universal-button"
      >
        Sort Tasks by Completion Status
      </button>
    </div>
  );
};

export default TaskList;
