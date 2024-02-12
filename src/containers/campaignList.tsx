import { useEffect } from "react";
import Header from "../components/header";
import SearchComponent from "../components/searchField";
import { HEADER_ITEMS } from "../constants";
import { usePaginationContext } from "../contexts/pagination-context";
import PaginationContainer from "./pagination";
import FilterContainer from "./filterContainer";
import { useFilter } from "../contexts/filter-context";
import Campaign from "../components/campaignItem";

export const CampaignList = () => {
  const { handlePagination, paginatedCampaignList, pageNumber, numberOfRows } =
    usePaginationContext();

  const { filteredCampaigns, setSearchTerm, clearFilter } = useFilter();

  useEffect(() => {
    handlePagination(filteredCampaigns);
  }, [pageNumber, numberOfRows, filteredCampaigns]);

  return (
    <div className="m-10">
      <div className="flex justify-between items-center h-20">
        <FilterContainer />
        <SearchComponent
          clearFilter={clearFilter}
          placeholder="Search"
          performSearch={setSearchTerm}
        />
      </div>

      <Header headerTitles={HEADER_ITEMS} />
      {paginatedCampaignList.length === 0 && (
        <div className="mt-5">No campaigns to display</div>
      )}

      {paginatedCampaignList.map((campaign) => {
        return <Campaign key={Math.random()} campaign={campaign} />;
      })}
      <PaginationContainer />
    </div>
  );
};
