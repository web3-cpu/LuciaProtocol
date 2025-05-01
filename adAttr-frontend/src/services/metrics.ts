import axios from "axios";

import { BASE_URL } from "~/constants";

import { Button, Page, User } from "./types";

// Total Metrics
const getUsers = () => axios.get<User[]>(`${BASE_URL}/dashboard/users`).then((res) => res.data);
export const getUsersQuery = () => ({ queryKey: ["users"], queryFn: getUsers });

const getPages = () => axios.get<Page[]>(`${BASE_URL}/dashboard/pages`).then((res) => res.data);
export const getPagesQuery = () => ({ queryKey: ["pages"], queryFn: getPages });

const getButtons = () => axios.get<Button[]>(`${BASE_URL}/dashboard/buttons`).then((res) => res.data);
export const getButtonsQuery = () => ({ queryKey: ["buttons"], queryFn: getButtons });

// link click metrics
const getLinkClicks = (type: string, groupBy?: string, startTime?: string, endTime?: string, linkId?: number) =>
  axios
    .get<{
      data: {
        date?: string;
        count: number;
      }[];
    }>(`${BASE_URL}/dashboard/metrics/${type}-link-clicks`, {
      params: {
        group_by: groupBy,
        start_time: startTime,
        end_time: endTime,
        link_id: linkId,
      },
    })
    .then((res) => res.data);

export const getLinkClicksQuery = ({
  type,
  groupBy,
  startTime,
  endTime,
  linkId,
}: {
  type: "total" | "unique" | "new-unique";
  groupBy?: string;
  startTime?: string;
  endTime?: string;
  linkId?: number;
}) => ({
  queryKey: ["link-clicks", { type, groupBy, startTime, endTime, linkId }],
  queryFn: () => getLinkClicks(type, groupBy, startTime, endTime, linkId),
});

// sales / marketing value metrics
const getSalesMarketingValue = (type: string, groupBy?: string, startTime?: string, endTime?: string) =>
  axios
    .get<{
      data: {
        date?: string;
        sum: number;
      }[];
    }>(`${BASE_URL}/dashboard/metrics/${type}-value`, {
      params: {
        group_by: groupBy,
        start_time: startTime,
        end_time: endTime,
      },
    })
    .then((res) => res.data);

export const getSalesMarketingValueQuery = ({
  type,
  groupBy,
  startTime,
  endTime,
}: {
  type: "marketing" | "sales";
  groupBy?: string;
  startTime?: string;
  endTime?: string;
}) => ({
  queryKey: ["values", { type, groupBy, startTime, endTime }],
  queryFn: () => getSalesMarketingValue(type, groupBy, startTime, endTime),
});

// sales / marketing value metrics
const getLinkClicksByType = (type: string, groupBy?: string, startTime?: string, endTime?: string, linkId?: string) =>
  axios
    .get<{
      data: ({
        date?: string;
        count: number;
      } & { [key: string]: string })[];
    }>(`${BASE_URL}/dashboard/metrics/link-clicks-by-${type}`, {
      params: {
        group_by: groupBy,
        start_time: startTime,
        end_time: endTime,
        link_id: linkId,
      },
    })
    .then((res) => res.data);

export const getLinkClicksByTypeQuery = ({
  type,
  groupBy,
  startTime,
  endTime,
  linkId,
}: {
  type: "agent" | "language";
  groupBy?: string;
  startTime?: string;
  endTime?: string;
  linkId?: string;
}) => ({
  queryKey: ["link-clicks-by", { type, groupBy, startTime, endTime, linkId }],
  queryFn: () => getLinkClicksByType(type, groupBy, startTime, endTime, linkId),
});

// link click metrics
const getCustomerMetrics = (type: string, groupBy?: string, startTime?: string, endTime?: string, linkId?: number) =>
  axios
    .get<{
      data: {
        date?: string;
        count: number;
      }[];
    }>(`${BASE_URL}/dashboard/metrics/${type}-customers`, {
      params: {
        group_by: groupBy,
        start_time: startTime,
        end_time: endTime,
        link_id: linkId,
      },
    })
    .then((res) => res.data);
export const getCustomerMetricsQuery = ({
  type,
  groupBy,
  startTime,
  endTime,
  linkId,
}: {
  type: "visited" | "new-visited" | "paying";
  groupBy?: string;
  startTime?: string;
  endTime?: string;
  linkId?: number;
}) => ({
  queryKey: ["customer-metrics", { type, groupBy, startTime, endTime, linkId }],
  queryFn: () => getCustomerMetrics(type, groupBy, startTime, endTime, linkId),
});
