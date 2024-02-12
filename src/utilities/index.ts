import { IRawCampaignList, IcampaignList } from "../types";

export const formatBudget = (budgetAmount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(budgetAmount);
};

export const isActive = (startDate: string, endDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  return today >= start && today <= end;
};

export const isCorrectlyDated = (
  startDate: string,
  endDate: string
): boolean => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  return start < end;
};

const isValidCampaign = (
  campaign: IRawCampaignList
): campaign is IRawCampaignList => {
  const hasRequiredFields =
    "id" in campaign &&
    "name" in campaign &&
    "endDate" in campaign &&
    "budget" in campaign;

  if (!hasRequiredFields) return false;

  const hasValidTypes =
    typeof campaign.id === "number" &&
    typeof campaign.name === "string" &&
    typeof campaign.endDate === "string" &&
    typeof campaign.budget === "number" &&
    (campaign.startDate ? typeof campaign.startDate === "string" : true);

  if (!hasValidTypes) return false;

  if (!isCorrectlyDated(campaign.startDate, campaign.endDate)) return false;

  return true;
};

export const formatCampaignList = (
  campaignList: IRawCampaignList[]
): IcampaignList[] => {
  const cleanCampaignList = campaignList.filter(isValidCampaign);

  cleanCampaignList.filter((campaign) =>
    isCorrectlyDated(campaign.startDate, campaign.endDate)
  );

  return cleanCampaignList.map((campaign) => {
    return {
      ...campaign,
      status: isActive(campaign.startDate, campaign.endDate)
        ? "Active"
        : "Inactive",
    };
  });
};
