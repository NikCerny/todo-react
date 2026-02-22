import { useState, useEffect, useRef } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";
import SortSelect from "./SortSelect";

const Todo = () => {
  const tasksIni = [
    { id: "task-1", title: "example1", isDone: false },
    { id: "task-2", title: "example 2", isDone: true },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return tasksIni;
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("byDate");
  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure you want to delete all?");

    if (isConfirmed) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone };
        }
        return task;
      }),
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      // setSearchQuery(""); // empty filter after Add click
      newTaskInputRef.current.focus(); // focus field after Add click
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  const clearSearchQuery = searchQuery.trim().toLowerCase();
  let filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;

  
  const sortTasks = (taskArr) => {
    if (!taskArr) return taskArr;
    switch (sortType) {
      case "byCompleted":
        return [...taskArr].sort((a, b) => b.isDone - a.isDone);
      case "ByInCompleted":
        return [...taskArr].sort((a, b) => a.isDone - b.isDone);
      case "ByTitle":
        return [...taskArr].sort((a, b) => a.title.localeCompare(b.title));
      case "byDate":
      default:
        return taskArr;
    }
  };
  if (filteredTasks) {
    filteredTasks = sortTasks(filteredTasks);
  } else {
    filteredTasks = sortTasks(tasks);
  }

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        inputRef={newTaskInputRef}
      ></AddTaskForm>
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></SearchTaskForm>
      <SortSelect sortType={sortType} setSortType={setSortType} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
      />
    </div>
  );
};

export default Todo;
