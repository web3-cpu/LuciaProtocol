export interface DashboardInfo {
  companyName: string | null;
  confirmedEmail: boolean;
  name: string;
  apiKeyCreated: boolean;
  firstLinkCreated: boolean;
  onboarding: string | null;
}

export interface User {
  id: number;
  email: string;
  name: string;
  company_name: string;
  picture: string;
  role?: string;
  provider?: string;
  isGuest: boolean;
  verified: boolean;
}

export interface Page {}

export interface Button {}

export interface Link {
  id: number;
  link: string;
  target: string;
  alias: boolean;
  company_id: number;
  num_clicks: number;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  campaign: Campaign | null;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  platform: string;
  generated_link_id: number;
  company_id: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  generatedLinkId: number;
  companyId: number;
}

export interface LinkPayload {
  target: string;
}
export interface CampaignPayload {
  target: string;
  platform: string;
  description: string;
  cost: number;
}
