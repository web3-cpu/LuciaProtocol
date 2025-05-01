import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import { BASE_URL } from "~/constants";

import { DashboardInfo } from "./types";

const getDashboardInfo = () => axios.get<DashboardInfo>(`${BASE_URL}/dashboard/info`).then((res) => res.data);
export const getDashboardInfoQuery = () => ({ queryKey: ["dashboardInfo"], queryFn: getDashboardInfo, staleTime: 0 });

const setOnboardingInfo = (onboarding: string) =>
  axios.put(`${BASE_URL}/dashboard/info/onboarding`, {
    onboarding,
  });
export const setOnboardingInfoMutation = (queryClient: QueryClient) => ({
  mutationFn: setOnboardingInfo,
  onSuccess: () => {
    queryClient.refetchQueries({ queryKey: ["dashboardInfo"] });
  },
});
