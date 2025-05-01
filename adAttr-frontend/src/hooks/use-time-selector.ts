import { useMemo, useState } from "react";
import dayjs from "dayjs";

export const DURATION_OPTIONS = ["This Week", "This Month", "This Year", "MAX"] as const;
export const GROUP_BY_OPTIONS = {
  "This Week": ["day"],
  "This Month": ["day", "week"],
  "This Year": ["day", "month"],
  MAX: ["day", "month", "year"],
} as const;

const useTimeSelector = () => {
  const [duration, _setDuration] = useState<string>(DURATION_OPTIONS[0]);
  const [groupBy, setGroupBy] = useState<string>(GROUP_BY_OPTIONS[duration as (typeof DURATION_OPTIONS)[number]][0]);

  const groupByOptions = useMemo(
    () => GROUP_BY_OPTIONS[duration as (typeof DURATION_OPTIONS)[number]] as readonly string[],
    [duration],
  );
  const [startTime, endTime] = useMemo(() => {
    switch (duration) {
      case "This Week":
        return [dayjs().add(-1, "week").startOf("day"), dayjs().endOf("day")];
      case "This Month":
        return [dayjs().add(-1, "month").startOf("day"), dayjs().endOf("day")];
      case "This Year":
        return [dayjs().add(-1, "year").startOf("day"), dayjs().endOf("day")];
      default:
        return [undefined, undefined];
    }
  }, [duration]);

  const setDuration = (value: string) => {
    const options = GROUP_BY_OPTIONS[value as (typeof DURATION_OPTIONS)[number]];
    _setDuration(value);
    if (!(options as readonly string[]).includes(groupBy)) {
      setGroupBy(options[0]);
    }
  };

  return {
    duration,
    setDuration,
    groupByOptions,
    groupBy,
    setGroupBy,
    startTime,
    endTime,
  };
};

export default useTimeSelector;
