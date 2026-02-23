import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useTasksLocalStorage from './useTasksLocalStorage';
import tasksAPI from '../api/tasksAPI';

const useTasks = () => {
  const { savedSortType, setNewSortType } = useTasksLocalStorage();
  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState(() => savedSortType ?? 'byDate');
  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?');
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => setTasks([]));
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      });
    },
    [tasks]
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isDone };
            }
            return task;
          })
        );
      });
    },
    [tasks]
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    });
  }, []);

  useEffect(() => {
    setNewSortType(sortType);
  }, [sortType, setNewSortType]);

  useEffect(() => {
    newTaskInputRef.current.focus();

    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then(setTasks);
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    let taskArr = tasks;
    if (clearSearchQuery.length > 0) {
      taskArr = tasks.filter(({ title }) =>
        title.toLowerCase().includes(clearSearchQuery)
      );
    }
    switch (sortType) {
      case 'byCompleted':
        return [...taskArr].sort((a, b) => b.isDone - a.isDone);
      case 'byInCompleted':
        return [...taskArr].sort((a, b) => a.isDone - b.isDone);
      case 'byTitle':
        return [...taskArr].sort((a, b) => a.title.localeCompare(b.title));
      case 'byDate':
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
  };
};

export default useTasks;
