import { useContext } from "react";
import { TasksContext } from "./context/TasksContextDef";

const SortSelect = () => {
  const { sortType, setSortType } = useContext(TasksContext);
  
  return (
    <select
      className="field todo__field"
      id="sort-select"
      name="sort"
      value={sortType}
      onChange={(event) => setSortType(event.target.value)}
    >
      <option value="byDate">by date</option>
      <option value="byCompleted">by completed</option>
      <option value="byInCompleted">by incompleted</option>
      <option value="byTitle">by title</option>
    </select>
  );
};

export default SortSelect;
