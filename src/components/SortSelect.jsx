const SortSelect = ({ sortType, setSortType }) => {
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
      <option value="ByInCompleted">by incompleted</option>
      <option value="ByTitle">by title</option>
    </select>
  );
};

export default SortSelect;
