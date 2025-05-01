import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { BASE_URL } from "~/constants";

import { CampaignPayload, Link, LinkPayload } from "./types";

const getLink = (id: number) => axios.get<Link>(`${BASE_URL}/dashboard/links/${id}`).then((res) => res.data);
export const getLinkQuery = (id: number) => ({ queryKey: ["links", { id }], queryFn: () => getLink(id) });

const token = localStorage.getItem("token");
const getLinks = () => {
  return axios
    .get(`${BASE_URL}/dashboard/campaigns`, {
      headers: {
        Authorization: `JWT ${token}`, // JWT authorization header
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return { code: 404, message: "No campaigns found" }; // Handle error response
      }
      throw error; // For other errors, re-throw the error to handle it elsewhere
    });
};

// React Query Hook to use getLinks
export const getLinksQuery = () => ({ queryKey: ["links"], queryFn: getLinks });

const createCampaign = (data: CampaignPayload) =>
  axios.post<{ link: string }>(`${BASE_URL}/link/campaign`, data).then((res) => res.data);
export const createCampaignMutation = (queryClient: QueryClient) => ({
  mutationFn: createCampaign,
  onSuccess: () => {
    queryClient.refetchQueries({ queryKey: ["links"] });
  },
});

const createLink = (data: LinkPayload) =>
  axios.post<{ link: string }>(`${BASE_URL}/link/campaign`, data).then((res) => res.data);
export const createLinkMutation = (queryClient: QueryClient) => ({
  mutationFn: createLink,
  onSuccess: () => {
    queryClient.refetchQueries({ queryKey: ["links"] });
  },
});
