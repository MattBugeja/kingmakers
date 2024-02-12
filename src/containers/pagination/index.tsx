import Pagination from "../../components/pagination";
import { usePaginationContext } from "../../contexts/pagination-context";

const PaginationContainer = () => {
  const {
    nextPage,
    previousPage,
    numberOfEntries,
    entryStartIndex,
    entryEndIndex,
    canGoNext,
    canGoPrevious,
  } = usePaginationContext();

  return (
    <Pagination
      canGoNext={canGoNext}
      canGoPrevious={canGoPrevious}
      numberOfEntries={numberOfEntries}
      nextPage={nextPage}
      previousPage={previousPage}
      entryStartIndex={entryStartIndex}
      entryEndIndex={entryEndIndex}
    />
  );
};

export default PaginationContainer;
