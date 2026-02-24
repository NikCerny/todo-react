import Field from '@/shared/ui/Field';
import Button from '@/shared/ui/Button';
import { useContext, useState } from 'react';
import { TasksContext } from '@/entitites/todo';

const AddTaskForm = ({ styles }) => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);
  const onSubmit = (event) => {
    event.preventDefault();
    if (!isNewTaskTitleEmpty) {
      addTask(trimNewTaskTitle);
    }
  };

  const [error, setError] = useState('');

  const trimNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = trimNewTaskTitle.length === 0;

  const onInput = (event) => {
    const { value } = event.target;
    const trimValue = value.trim();
    const hasOnlySpaces = value.length > 0 && trimValue.length === 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? 'The task cannot be empty' : '');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        onInput={onInput}
        ref={newTaskInputRef}
        error={error}
      ></Field>
      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;
