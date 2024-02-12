import { useEffect, useState } from "react";
import "./App.css";
import { CampaignList } from "./containers/campaignList";
import { PaginationProvider } from "./contexts/pagination-context";
import { FilterProvider } from "./contexts/filter-context";
import { formatCampaignList } from "./utilities";
import { IRawCampaignList } from "./types";

declare global {
  interface Window {
    addCampaigns: (campaigns: IRawCampaignList[]) => void;
  }
}

function App() {
  const [campaignList, setCampaignsList] = useState<IRawCampaignList[]>([]);

  window.addCampaigns = (campaigns: IRawCampaignList[]) => {
    setCampaignsList((prevCampaigns) => [...prevCampaigns, ...campaigns]);
  };

  useEffect(() => {
    (window as any).addCampaigns = (campaigns: IRawCampaignList[]) => {
      setCampaignsList((prevCampaigns) => [...prevCampaigns, ...campaigns]);
    };

    return () => {
      delete (window as any).addCampaigns;
    };
  }, [campaignList]);

  return (
    <div className="App">
      <FilterProvider initialCampaigns={formatCampaignList(campaignList)}>
        <PaginationProvider>
          {campaignList && <CampaignList />}
        </PaginationProvider>
      </FilterProvider>
    </div>
  );
}

export default App;
