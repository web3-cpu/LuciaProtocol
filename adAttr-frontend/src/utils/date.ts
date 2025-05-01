import dayjs, { extend } from "dayjs";
import utc from "dayjs/plugin/utc";

extend(utc);

export const dateFormatter = (date: string, groupBy: string) =>
  dayjs(date)
    .utc()
    .format(groupBy === "year" ? "YYYY" : groupBy === "month" ? "MM/YYYY" : "MM/DD/YYYY");
