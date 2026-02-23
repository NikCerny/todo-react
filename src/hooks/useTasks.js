import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const tasksIni = [
    { id: "task-1", title: "example1", isDone: false },
    { id: "task-2", title: "example 2", isDone: true },
  ];

  const {savedTasks, saveTask, savedSortType, setNewSortType} = useTasksLocalStorage();

  const [tasks, setTasks] = useState(() => savedTasks ?? tasksIni);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(() => savedSortType ?? "byDate");
  const newTaskInputRef = useRef(null);


  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");
    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }
          return task;
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
      // setSearchQuery(""); // empty filter after Add click
      newTaskInputRef.current.focus(); // focus field after Add click
    }
  }, [newTaskTitle]);

  useEffect(() => {
      saveTask(tasks)
    }, [tasks, saveTask]);

  useEffect(() => {
    setNewSortType(sortType)
  }, [sortType, setNewSortType]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    let taskArr = tasks;
    if (clearSearchQuery.length > 0) {
      taskArr = tasks.filter(({ title }) =>
        title.toLowerCase().includes(clearSearchQuery),
      );
    }
    switch (sortType) {
      case "byCompleted":
        return [...taskArr].sort((a, b) => b.isDone - a.isDone);
      case "byInCompleted":
        return [...taskArr].sort((a, b) => a.isDone - b.isDone);
      case "byTitle":
        return [...taskArr].sort((a, b) => a.title.localeCompare(b.title));
      case "byDate":
      default:
        return taskArr;
    }
  }, [tasks, searchQuery, sortType]);



  return {
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
  }
}

export default useTasks