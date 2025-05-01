import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs, unix } from "dayjs";
import { useParams } from "react-router-dom";

import LineChart from "~/components/charts/line";
import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getLinkClicksQuery } from "~/services/metrics";
import { dateFormatter } from "~/utils/date";

import { Card, CardContent, CardGroup, CardHeader, HeaderTitle } from "./styled";

import "twin.macro";

const useData = ({
  groupBy,
  startTime,
  endTime,
  linkId,
}: {
  groupBy: string;
  startTime: Dayjs | undefined;
  endTime: Dayjs | undefined;
  linkId: number;
}) => {
  const { data: totalLinkClicks } = useQuery(
    getLinkClicksQuery({
      type: "total",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId,
    }),
  );
  const { data: uniqueLinkClicks } = useQuery(
    getLinkClicksQuery({
      type: "unique",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId,
    }),
  );
  const { data: newUniqueLinkClicks } = useQuery(
    getLinkClicksQuery({
      type: "new-unique",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId,
    }),
  );

  const totalLinkClickMap = useMemo(
    () =>
      (totalLinkClicks?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [totalLinkClicks, groupBy],
  );
  const uniqueLinkClickMap = useMemo(
    () =>
      (uniqueLinkClicks?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [groupBy, uniqueLinkClicks],
  );
  const newUniqueLinkClickMap = useMemo(
    () =>
      (newUniqueLinkClicks?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [groupBy, newUniqueLinkClicks],
  );

  const data = useMemo(() => {
    const times = [];
    const minTime = unix(
      Math.min(
        dayjs(Object.values(totalLinkClickMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
        dayjs(Object.values(uniqueLinkClickMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
        dayjs(Object.values(newUniqueLinkClickMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
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
        name: "Total Link Clicks",
        value: times.reduce(
          (acc, time) => {
            acc[time] = totalLinkClickMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#F1A34D",
      },
      {
        name: "Unique Link Clicks",
        value: times.reduce(
          (acc, time) => {
            acc[time] = uniqueLinkClickMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#F9D13E",
      },
      {
        name: "New Unique Link Clicks",
        value: times.reduce(
          (acc, time) => {
            acc[time] = newUniqueLinkClickMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#458B71",
      },
    ];
  }, [totalLinkClickMap, uniqueLinkClickMap, newUniqueLinkClickMap, groupBy, startTime, endTime]);

  return { data };
};

const LinkMetrics = () => {
  const { id: linkId } = useParams();
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useData({ groupBy, startTime, endTime, linkId: Number(linkId) });

  return (
    <CardGroup tw="grid grid-cols-1 gap-2">
      <Card tw="px-3 pt-2 pb-4">
        <CardHeader>
          <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
            Link Clicks
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

export default LinkMetrics;
