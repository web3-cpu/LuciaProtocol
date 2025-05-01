import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactEcharts from "echarts-for-react";

import "twin.macro";

import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getCustomerMetricsQuery, getLinkClicksQuery } from "~/services/metrics";

import { Card, CardContent, CardGroup, CardHeader, HeaderTitle } from "./styled";

const CustomerAcquisitionRate = () => {
  const [newVisitedCustomersNumber, setNewVisitedCustomersNumber] = useState(0);
  const [uniqueLinkClicksNumber, setUniqueLinkClicksNumber] = useState(0);
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: uniqueLinkClicks } = useQuery(
    getLinkClicksQuery({
      type: "new-unique",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );
  const { data: newVisitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "new-visited",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  useEffect(() => {
    if (uniqueLinkClicks?.data && uniqueLinkClicks.data.length > 0) {
      setUniqueLinkClicksNumber(Number(uniqueLinkClicks?.data[0].count));
    }
  }, [uniqueLinkClicks?.data]);

  useEffect(() => {
    if (newVisitedCustomers?.data && newVisitedCustomers.data.length > 0) {
      setNewVisitedCustomersNumber(Number(newVisitedCustomers?.data[0].count));
    }
  }, [newVisitedCustomers?.data]);
  const rate = uniqueLinkClicksNumber === 0 ? 0 : (newVisitedCustomersNumber / uniqueLinkClicksNumber) * 100;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Customer Acquisition Rate
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
        <ReactEcharts
          option={{
            tooltip: {
              formatter: "{a} : {c}%",
            },
            series: [
              {
                type: "gauge",
                name: "Customer Acquisition Rate",
                startAngle: 90,
                endAngle: -270,
                pointer: {
                  show: false,
                },
                progress: {
                  show: true,
                  overlap: false,
                  roundCap: true,
                  clip: false,
                  itemStyle: {
                    borderWidth: 1,
                    borderColor: "#464646",
                  },
                },
                axisLine: {
                  lineStyle: {
                    width: 20,
                  },
                },
                splitLine: {
                  show: false,
                  distance: 0,
                  length: 10,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                  distance: 20,
                },
                data: [
                  {
                    value: rate,
                    title: {
                      offsetCenter: ["0%", "0%"],
                    },
                    detail: {
                      valueAnimation: true,
                      offsetCenter: ["0%", "0%"],
                    },
                  },
                ],
                detail: {
                  fontSize: 16,
                  formatter: `Customers: ${newVisitedCustomersNumber}\nLink Clicks: ${uniqueLinkClicksNumber}\n Rate: ${rate.toFixed(1)}%`,
                },
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
};

const CustomerRetentionRate = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: visitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "visited",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );
  const { data: totalCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "visited",
    }),
  );
  const { data: newVisitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "new-visited",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  const visitedCustomersNumber = Number(visitedCustomers?.data[0].count) || 0;
  const newVisitedCustomersNumber = Number(newVisitedCustomers?.data[0].count) || 0;
  const totalCustomersNumber = Number(totalCustomers?.data[0].count) || 0;
  const rate =
    totalCustomersNumber === 0
      ? NaN
      : ((visitedCustomersNumber - newVisitedCustomersNumber) / totalCustomersNumber) * 100;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Customer Retention Rate
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
        <ReactEcharts
          option={{
            tooltip: {
              formatter: "{a} : {c}%",
            },
            series: [
              {
                type: "gauge",
                name: "Customer Retention Rate",
                startAngle: 90,
                endAngle: -270,
                pointer: {
                  show: false,
                },
                progress: {
                  show: true,
                  overlap: false,
                  roundCap: true,
                  clip: false,
                  itemStyle: {
                    borderWidth: 1,
                    borderColor: "#464646",
                  },
                },
                axisLine: {
                  lineStyle: {
                    width: 20,
                  },
                },
                splitLine: {
                  show: false,
                  distance: 0,
                  length: 10,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                  distance: 20,
                },
                data: [
                  {
                    value: rate,
                    title: {
                      offsetCenter: ["0%", "0%"],
                    },
                    detail: {
                      valueAnimation: true,
                      offsetCenter: ["0%", "0%"],
                    },
                  },
                ],
                detail: {
                  fontSize: 12,
                  formatter: `Returning Customers: ${visitedCustomersNumber - newVisitedCustomersNumber}\nTotal Customers: ${totalCustomersNumber}\n Rate: ${rate.toFixed(1)}%`,
                },
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
};

const SalesConversionRate = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: visitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "visited",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );
  const { data: payingCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "paying",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );

  const visitedCustomersNumber = Number(visitedCustomers?.data[0].count) || 0;
  const payingCustomersNumber = Number(payingCustomers?.data[0].count) || 0;
  const rate = visitedCustomersNumber === 0 ? NaN : (payingCustomersNumber / visitedCustomersNumber) * 100;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Sales Conversion Rate
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
        <ReactEcharts
          option={{
            tooltip: {
              formatter: "{a} : {c}%",
            },
            series: [
              {
                type: "gauge",
                name: "Sales Conversion Rate",
                startAngle: 90,
                endAngle: -270,
                pointer: {
                  show: false,
                },
                progress: {
                  show: true,
                  overlap: false,
                  roundCap: true,
                  clip: false,
                  itemStyle: {
                    borderWidth: 1,
                    borderColor: "#464646",
                  },
                },
                axisLine: {
                  lineStyle: {
                    width: 20,
                  },
                },
                splitLine: {
                  show: false,
                  distance: 0,
                  length: 10,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                  distance: 20,
                },
                data: [
                  {
                    value: rate,
                    title: {
                      offsetCenter: ["0%", "0%"],
                    },
                    detail: {
                      valueAnimation: true,
                      offsetCenter: ["0%", "0%"],
                    },
                  },
                ],
                detail: {
                  fontSize: 12,
                  formatter: `Paying Customers: ${payingCustomersNumber}\nVisited Customers: ${visitedCustomersNumber}\n Rate: ${rate.toFixed(1)}%`,
                },
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
};

const CustomerRateMetrics = () => (
  <CardGroup tw="flex gap-3">
    <CustomerAcquisitionRate />
    <CustomerRetentionRate />
    <SalesConversionRate />
  </CardGroup>
);

export default CustomerRateMetrics;
