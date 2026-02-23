const useTasksLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    const savedSortType = localStorage.getItem("sortType");

    const saveTask = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const setNewSortType = (sortType) => {
        localStorage.setItem("sortType", sortType);
    }

  return {savedTasks: savedTasks ? JSON.parse(savedTasks) : null, saveTask, savedSortType, setNewSortType}
}

export default useTasksLocalStorage