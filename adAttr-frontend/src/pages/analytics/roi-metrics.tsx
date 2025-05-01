import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs, unix } from "dayjs";
import ReactEcharts from "echarts-for-react";

import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getSalesMarketingValueQuery } from "~/services/metrics";
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
  const { data: salesValue } = useQuery(
    getSalesMarketingValueQuery({
      type: "sales",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );
  const { data: marketingValue } = useQuery(
    getSalesMarketingValueQuery({
      type: "marketing",
      groupBy,
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  const salesValueMap = useMemo(
    () =>
      (salesValue?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { sum: item.sum, date: item.date };
          return acc;
        },
        {} as { [key: string]: { sum: number; date?: string } },
      ),
    [groupBy, salesValue],
  );
  const marketingValueMap = useMemo(
    () =>
      (marketingValue?.data ?? []).reduce(
        (acc, item) => {
          acc[dateFormatter(item.date!, groupBy)] = { sum: item.sum, date: item.date };
          return acc;
        },
        {} as { [key: string]: { sum: number; date?: string } },
      ),
    [groupBy, marketingValue],
  );

  const option = useMemo(() => {
    const times = [];
    const minTime = unix(
      Math.min(
        dayjs(Object.values(salesValueMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
        dayjs(Object.values(marketingValueMap)?.[0]?.date ?? Number.MAX_SAFE_INTEGER).unix(),
      ),
    );

    for (
      let time = startTime ?? minTime;
      time.unix() <= (endTime ?? dayjs()).unix();
      time = time?.add(1, groupBy as "day" | "month" | "year")
    ) {
      times.push(dateFormatter(time.toISOString(), groupBy));
    }

    return {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["date", "Sales", "Marketing", "ROI"],
          ...times.map((time) => [
            time,
            salesValueMap[time]?.sum,
            marketingValueMap[time]?.sum,
            (marketingValueMap[time]?.sum ?? 0) === 0
              ? 0
              : (((salesValueMap[time]?.sum ?? 0) - (marketingValueMap[time]?.sum ?? 0)) /
                  marketingValueMap[time]?.sum) *
                100,
          ]),
        ],
      },
      xAxis: { type: "category" },
      yAxis: [{}, {}],
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: "bar", yAxisIndex: 0 },
        { type: "bar", yAxisIndex: 0 },
        { type: "line", yAxisIndex: 1 },
      ],
    };
  }, [groupBy, startTime, endTime, salesValueMap, marketingValueMap]);

  return { option };
};

const ROIMetrics = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { option } = useData({ groupBy, startTime, endTime });

  return (
    <CardGroup tw="grid grid-cols-1 gap-2">
      <Card tw="px-3 pt-2 pb-4">
        <CardHeader>
          <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
            ROI Analytics
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
          <ReactEcharts option={option} />
        </CardContent>
      </Card>
    </CardGroup>
  );
};

export default ROIMetrics;
