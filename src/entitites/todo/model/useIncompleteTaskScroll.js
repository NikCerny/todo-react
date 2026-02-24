import { useRef } from 'react';

const useIncompleteTaskScroll = (filteredAndSortedTasks) => {
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = filteredAndSortedTasks.find(
    ({ isDone }) => !isDone
  )?.id;

  return { firstIncompleteTaskRef, firstIncompleteTaskId };
};

export default useIncompleteTaskScroll;
