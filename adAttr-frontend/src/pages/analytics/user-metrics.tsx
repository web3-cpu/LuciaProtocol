import { useMemo } from "react";
import dayjs, { Dayjs, unix } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { PiGlobeSimpleLight } from "react-icons/pi";

import DoughnutChart from "~/components/charts/doughnut";
import LineChart from "~/components/charts/line";
import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getLinkClicksByTypeQuery } from "~/services/metrics";
import { dateFormatter } from "~/utils/date";
import LightningDuotoneLineIcon from "~/assets/icons/lightning_duotone_line.svg";

import { Card, CardContent, CardGroup, CardHeader, HeaderIcon, HeaderTitle } from "./styled";
import "twin.macro";

const UsersByAgent = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useQuery(
    getLinkClicksByTypeQuery({
      type: "agent",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderIcon>
          <PiGlobeSimpleLight size={24} color="#F1A34D" />
        </HeaderIcon>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Agents
        </HeaderTitle>
        <TimeSelector
          duration={duration}
          setDuration={setDuration}
          groupBy={groupBy}
          setGroupBy={(v) => setGroupBy(v)}
          groupByOptions={groupByOptions}
        />
      </CardHeader>
      <CardContent>
        <DoughnutChart
          data={(data?.data ?? []).map((item) => ({
            name: item.agent,
            value: item.count,
          }))}
        />
      </CardContent>
    </Card>
  );
};

const UsersByLanguage = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useQuery(
    getLinkClicksByTypeQuery({
      type: "language",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderIcon>
          <LightningDuotoneLineIcon {...{ stroke: "#F1A34D" }} />
        </HeaderIcon>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Languages
        </HeaderTitle>
        <TimeSelector
          duration={duration}
          setDuration={setDuration}
          groupBy={groupBy}
          setGroupBy={(v) => setGroupBy(v)}
          groupByOptions={groupByOptions}
        />
      </CardHeader>
      <CardContent>
        <DoughnutChart
          data={(data?.data ?? []).map((item) => ({
            name: item.language,
            value: item.count,
          }))}
        />
      </CardContent>
    </Card>
  );
};

const useData = ({
  groupBy,
  startTime,
  endTime,
}: {
  groupBy: string;
  startTime: Dayjs | undefined;
  endTime: Dayjs | undefined;
}) => {
  const { data: usersByAgent } = useQuery(
    getLinkClicksByTypeQuery({
      type: "agent",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  const { data: usersByLanguage } = useQuery(
    getLinkClicksByTypeQuery({
      type: "language",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  const usersByAgentMap = useMemo(
    () =>
      (usersByAgent?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [groupBy, usersByAgent],
  );
  const usersByLanguageMap = useMemo(
    () =>
      (usersByLanguage?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { count: item.count, date: item.date };
          return acc;
        },
        {} as { [key: string]: { count: number; date?: string } },
      ),
    [groupBy, usersByLanguage],
  );

  const data = useMemo(() => {
    const times = [];
    const minTime = unix(
      Math.min(
        dayjs(Object.values(usersByAgentMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
        dayjs(Object.values(usersByLanguageMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
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
        name: "Users by Agent",
        value: times.reduce(
          (acc, time) => {
            acc[time] = usersByAgentMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#F1A34D",
      },
      {
        name: "Users by Language",
        value: times.reduce(
          (acc, time) => {
            acc[time] = usersByLanguageMap[time]?.count ?? 0;
            return acc;
          },
          {} as { [key: string]: number },
        ),
        color: "#F9D13E",
      },
    ];
  }, [usersByAgentMap, usersByLanguageMap, groupBy, startTime, endTime]);

  return { data };
};

const UsersGrowByAgentAndLanguage = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useData({ groupBy, startTime, endTime });

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderIcon>
          <HiOutlineArrowTrendingUp size={24} color="#F1A34D" />
        </HeaderIcon>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Growth
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
  );
};

const UserMetrics = () => (
  <CardGroup tw="flex gap-3">
    <UsersByAgent />
    <UsersByLanguage />
    <UsersGrowByAgentAndLanguage />
  </CardGroup>
);

export default UserMetrics;
