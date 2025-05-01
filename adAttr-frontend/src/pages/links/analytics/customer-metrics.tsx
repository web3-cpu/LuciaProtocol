import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs, unix } from "dayjs";
import { useParams } from "react-router-dom";

import LineChart from "~/components/charts/line";
import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getCustomerMetricsQuery } from "~/services/metrics";
import { dateFormatter } from "~/utils/date";

import { Card, CardContent, CardGroup, CardHeader, HeaderTitle } from "./styled";

import "twin.macro";

const useData = ({
  groupBy,
  startTime,
  endTime,
}: {
  groupBy: string;
  startTime: Dayjs | undefined;
  endTime: Dayjs | undefined;
}) => {
  const { id: linkId } = useParams();
  const { data: visitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "visited",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId: Number(linkId),
    }),
  );
  const { data: newVisitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "new-visited",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId: Number(linkId),
    }),
  );

  const visitedCustomersMap = useMemo(
    () =>
      (visitedCustomers?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [visitedCustomers, groupBy],
  );
  const newVisitedCustomersMap = useMemo(
    () =>
      (newVisitedCustomers?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [groupBy, newVisitedCustomers],
  );

  const data = useMemo(() => {
    const times = [];
    const minTime = unix(
      Math.min(
        dayjs(Object.values(visitedCustomersMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
        dayjs(Object.values(newVisitedCustomersMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
      ),
    );

    for (
      let time = startTime ?? minTime;
      time.unix() <= (endTime ?? dayjs()).unix();
      time = time?.add(1, groupBy as "day" | "month" | "year")
    ) {
      times.push(dateFormatter(time.toISOString(), groupBy));
    }

    return [
      {
        name: "Visited Customers",
        value: times.reduce(
          (acc, time) => {
            acc[time] = visitedCustomersMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#F1A34D",
      },
      {
        name: "New Visited Customers",
        value: times.reduce(
          (acc, time) => {
            acc[time] = newVisitedCustomersMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#F9D13E",
      },
    ];
  }, [visitedCustomersMap, newVisitedCustomersMap, groupBy, startTime, endTime]);

  return { data };
};

const CustomerMetrics = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useData({ groupBy, startTime, endTime });

  return (
    <CardGroup tw="grid grid-cols-1 gap-2">
      <Card tw="px-3 pt-2 pb-4">
        <CardHeader>
          <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
            Customers
          </HeaderTitle>
          <TimeSelector
            withGroupBy
            duration={duration}
            setDuration={setDuration}
            groupBy={groupBy}
            setGroupBy={(v) => setGroupBy(v)}
            groupByOptions={groupByOptions}
          />
        </CardHeader>
        <CardContent>
          <LineChart data={data} />
        </CardContent>
      </Card>
    </CardGroup>
  );
};

export default CustomerMetrics;
