export interface IcampaignList {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface IRawCampaignList {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
}
