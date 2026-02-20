import Field from "./Field";

const SearchTaskForm = () => {
  return (
    <form className="todo__form">
      <Field
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
      ></Field>
    </form>
  );
};

export default SearchTaskForm;
