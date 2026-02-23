import { TaskProvider } from '../components/context/TasksContext';
import Todo from '../components/Todo';

const TasksPage = () => {
  return (
    <TaskProvider>
      <Todo />
    </TaskProvider>
  );
};

export default TasksPage;
