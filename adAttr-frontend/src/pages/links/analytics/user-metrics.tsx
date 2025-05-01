import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import DoughnutChart from "~/components/charts/doughnut";
import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getLinkClicksByTypeQuery } from "~/services/metrics";

import { Card, CardContent, CardGroup, CardHeader, HeaderTitle } from "./styled";

import "twin.macro";

const UsersByAgent = () => {
  const { id } = useParams();
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useQuery(
    getLinkClicksByTypeQuery({
      type: "agent",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId: id,
    }),
  );

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Users By Agent
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
  const { id } = useParams();
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data } = useQuery(
    getLinkClicksByTypeQuery({
      type: "language",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      linkId: id,
    }),
  );

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Users By Language
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

const UserMetrics = () => (
  <CardGroup tw="flex gap-3">
    <UsersByAgent />
    <UsersByLanguage />
  </CardGroup>
);

export default UserMetrics;
