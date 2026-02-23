import { useContext } from "react";
import Field from "./Field";
import { TasksContext } from "./context/TasksContextDef";

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form
      className="todo__form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => {
          setSearchQuery(event.target.value);
        }}
      ></Field>
    </form>
  );
};

export default SearchTaskForm;
