import { TaskProvider } from "./components/context/TasksContext";
import Todo from "./components/Todo";

const App = () => {
  return (
    <TaskProvider>
      <Todo></Todo>
    </TaskProvider>
  );
};

export default App;
