import { TasksContext } from './TasksContextDef';
import useTasks from './useTasks';
import useIncompleteTaskScroll from './useIncompleteTaskScroll';

export {TasksContext}
export const TaskProvider = ({ children }) => {
  const {
    tasks,
    filteredAndSortedTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    sortType,
    setSortType,
    disappearingTaskId,
    appearingTaskId,
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTaskScroll(filteredAndSortedTasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredAndSortedTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        sortType,
        setSortType,
        disappearingTaskId,
        appearingTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
