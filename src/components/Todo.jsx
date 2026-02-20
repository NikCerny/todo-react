import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

const Todo = () => {
  const tasks = [
    { id: "task-1", title: "example1", isDone: false },
    { id: "task-2", title: "example 2", isDone: true },
  ];

  const deleteAllTasks = () => {
    console.log("deleting taskS...");
  };

  const deleteTask = (taskId) => {
    console.log(`Deleting task: ${taskId}`);
  };

  const toggleTaskComplete = (taskId, isDone) => {
    console.log(`task ${taskId}: ${isDone ? "Done" : "NotDone"}`);
  };

  const filterTasks = (query) => {
    console.log(`Search: ${query}`);
  };

  const addTask = () => {
    console.log("Task added");
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask}></AddTaskForm>
      <SearchTaskForm onSearchInput={filterTasks}></SearchTaskForm>
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
