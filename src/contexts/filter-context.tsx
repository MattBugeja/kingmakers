import React, { createContext, useContext, ReactNode, useState } from "react";
import { IcampaignList } from "../types";

interface FilterContextType {
  campaignList: IcampaignList[];
  filteredCampaigns: IcampaignList[];
  setSearchTerm: (term: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  clearFilter: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
  initialCampaigns: IcampaignList[];
}

export const FilterProvider: React.FC<ProviderProps> = ({
  children,
  initialCampaigns,
}) => {

  const [campaignList, setCampaignList] =
    useState<IcampaignList[]>(initialCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] =
    useState<IcampaignList[]>(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filterCampaigns = () => {
    let result = campaignList;

    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter((campaign) => {
        const campaignStart = new Date(campaign.startDate);
        const campaignEnd = new Date(campaign.endDate);

        return campaignEnd >= start && campaignStart <= end;
      });
    }

    setFilteredCampaigns(result);
  };

  const clearFilter = () => {
    setFilteredCampaigns(initialCampaigns)
  };

  React.useEffect(() => {
    setCampaignList(initialCampaigns);
    setFilteredCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  React.useEffect(() => {
    filterCampaigns();
  }, [searchTerm, startDate, endDate, campaignList, initialCampaigns]);

  return (
    <FilterContext.Provider
      value={{
        campaignList,
        filteredCampaigns,
        setSearchTerm,
        setStartDate,
        setEndDate,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
