import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";
import { IcampaignList } from "../types";

interface PaginationContextType {
  pageNumber: number;
  setPageNumber: (value: number) => void;
  numberOfRows: number;
  setNumberOfRows: (value: number) => void;
  paginatedCampaignList: IcampaignList[];
  handlePagination: (campaignList: IcampaignList[]) => void;
  nextPage: () => void;
  previousPage: () => void;
  numberOfEntries: number;
  entryStartIndex: number;
  entryEndIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfRows, setNumberOfRowsState] = useState(10);
  const [paginatedCampaignList, setpaginatedCampaignList] = useState<IcampaignList[]>([]);
  const [numberOfEntries, setNumberOfEntries] = useState(0);

  const handlePagination = (campaignList: IcampaignList[]): void => {
    const totalEntries = campaignList.length;
    const startIndex = (pageNumber - 1) * numberOfRows;
    const endIndex = Math.min(startIndex + numberOfRows, totalEntries);

    setpaginatedCampaignList(campaignList.slice(startIndex, endIndex));
    setNumberOfEntries(totalEntries);
  };

  const setNumberOfRows = (newRows: number) => {
    setNumberOfRowsState(newRows);
    const newTotalPages = Math.ceil(numberOfEntries / newRows);
    setPageNumber((current) => Math.min(current, newTotalPages));
  };

  const totalPages = Math.ceil(numberOfEntries / numberOfRows);

  const nextPage = () =>
    setPageNumber((current) => Math.min(current + 1, totalPages));
  const previousPage = () =>
    setPageNumber((current) => Math.max(current - 1, 1));

  const value = useMemo(
    () => ({
      pageNumber,
      setPageNumber,
      numberOfRows,
      setNumberOfRows,
      paginatedCampaignList,
      handlePagination,
      nextPage,
      previousPage,
      numberOfEntries,
      entryStartIndex: (pageNumber - 1) * numberOfRows + 1,
      entryEndIndex: Math.min(pageNumber * numberOfRows, numberOfEntries),
      canGoNext: pageNumber < totalPages,
      canGoPrevious: pageNumber > 1,
    }),
    [pageNumber, numberOfRows, paginatedCampaignList, numberOfEntries]
  );

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider"
    );
  }
  return context;
};
