import { memo, useContext } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { TasksContext } from '../context/TasksContextDef';

const TodoList = ({ styles }) => {
  const { tasks, filteredAndSortedTasks } = useContext(TasksContext);
  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredAndSortedTasks?.length === 0;

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={styles.list}>
      {(filteredAndSortedTasks ?? tasks).map((task) => (
        <TodoItem className={styles.item} key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default memo(TodoList);
