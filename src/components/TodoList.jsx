import { memo, useContext } from "react";
import TodoItem from "./TodoItem";
import { TasksContext } from "./context/TasksContextDef";

const TodoList = () => {
  const { tasks, filteredAndSortedTasks } = useContext(TasksContext);
  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredAndSortedTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>;
  }

  return (
    <ul className="todo__list">
      {(filteredAndSortedTasks ?? tasks).map((task) => (
        <TodoItem className="todo__item" key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default memo(TodoList);
