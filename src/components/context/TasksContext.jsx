import { TasksContext } from "./TasksContextDef";
import useTasks from "../../hooks/useTasks";
import useIncompleteTaskScroll from "../../hooks/useIncompleteTaskScroll";

export const TaskProvider = ({ children }) => {
  const {
    tasks,
    filteredAndSortedTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    sortType,
    setSortType,
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
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        sortType,
        setSortType,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
