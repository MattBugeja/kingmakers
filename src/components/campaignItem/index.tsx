import React from "react";
import CampaignCell from "../campaignCell";
import { formatBudget, isActive } from "../../utilities";

type CampaignProps = {
  campaign: {
    id: number;
    status: string;
    name: string;
    startDate: string;
    endDate: string;
    budget: number;
  };
};

const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
  return (
    <div
      className={`flex flex-row justify-between campaigns-center border-b border-gray-300 shadow ${
        isActive(campaign.startDate, campaign.endDate) ? "bg-green-100" : "bg-red-100"
      } hover:shadow-lg transition-shadow duration-300 ease-in-out p-5 rounded-lg text-gray-800`}
    >
      <CampaignCell className="font-semibold text-lg" cellContent={campaign.name} />
      <CampaignCell className="text-sm" cellContent={campaign.status} />
      <CampaignCell className="text-sm" cellContent={campaign.startDate} />
      <CampaignCell className="text-sm" cellContent={campaign.endDate} />
      <CampaignCell
        className="text-sm"
        cellContent={formatBudget(campaign.budget)}
      />
    </div>
  );
};

export default Campaign;
