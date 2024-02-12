import React from "react";
import RowDropdown from "../../containers/rowDropdown/rowDropdown";

type PaginationProps = {
  nextPage: () => void;
  previousPage: () => void;
  numberOfEntries: number;
  entryStartIndex: number;
  entryEndIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  nextPage,
  previousPage,
  numberOfEntries,
  entryStartIndex,
  entryEndIndex,
  canGoNext,
  canGoPrevious,
}) => {
  return (
    <div className="flex justify-end pr-10 mt-10 gap-5 items-center">
      <div>Rows per page:</div>
      <RowDropdown />
      <div>
        {entryStartIndex} - {entryEndIndex} of {numberOfEntries}
      </div>
      <button
        onClick={previousPage}
        disabled={!canGoPrevious}
        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 p-2 rounded"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <button
        onClick={nextPage}
        disabled={!canGoNext}
        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 p-2 rounded"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
