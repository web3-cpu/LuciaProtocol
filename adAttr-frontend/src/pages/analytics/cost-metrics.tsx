import { useQuery } from "@tanstack/react-query";

import TimeSelector from "~/components/time-selector";
import useTimeSelector from "~/hooks/use-time-selector";
import { getCustomerMetricsQuery, getSalesMarketingValueQuery } from "~/services/metrics";
import Typography from "~/components/typography";

import { Card, CardContent, CardGroup, CardHeader, HeaderTitle } from "./styled";

import "twin.macro";

const CustomerAcquisitionCost = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: marketingValueData } = useQuery(
    getSalesMarketingValueQuery({
      type: "marketing",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );
  const { data: salesValueData } = useQuery(
    getSalesMarketingValueQuery({
      type: "sales",
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

  const marketingValue = Number(marketingValueData?.data[0].sum) || 0;
  const salesValue = Number(salesValueData?.data[0].sum) || 0;
  const newVisitedCustomersNumber = Number(newVisitedCustomers?.data[0].count) || 0;
  const cost =
    newVisitedCustomersNumber === 0
      ? marketingValue === 0
        ? 0
        : Infinity
      : (marketingValue + salesValue) / newVisitedCustomersNumber;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Customer Acquisition Cost
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
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {cost === Infinity ? "Infinity" : `$${cost.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CustomerRetentionCost = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: marketingValueData } = useQuery(
    getSalesMarketingValueQuery({
      type: "marketing",
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
    }),
  );
  const { data: visitedCustomers } = useQuery(
    getCustomerMetricsQuery({
      type: "visited",
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

  const marketingValue = Number(marketingValueData?.data[0].sum) || 0;
  const visitedCustomersNumber = Number(visitedCustomers?.data[0].count) || 0;
  const newVisitedCustomersNumber = Number(newVisitedCustomers?.data[0].count) || 0;
  const returningCustomers = visitedCustomersNumber - newVisitedCustomersNumber;
  const cost = returningCustomers === 0 ? (marketingValue === 0 ? 0 : Infinity) : marketingValue / returningCustomers;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Customer Retention Cost
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
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {cost === Infinity ? "Infinity" : `$${cost.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CostPerQualifiedLead = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: marketingValueData } = useQuery(
    getSalesMarketingValueQuery({
      type: "marketing",
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

  const marketingValue = Number(marketingValueData?.data[0].sum) || 0;
  const payingCustomersNumber = Number(payingCustomers?.data[0].count) || 0;
  const cost =
    payingCustomersNumber === 0 ? (marketingValue === 0 ? 0 : Infinity) : marketingValue / payingCustomersNumber;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Cost Per Qualified Lead
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
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {cost === Infinity ? "Infinity" : `$${cost.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AverageRevenuePerCustomer = () => {
  const { duration, setDuration, groupBy, setGroupBy, groupByOptions, startTime, endTime } = useTimeSelector();
  const { data: salesValueData } = useQuery(
    getSalesMarketingValueQuery({
      type: "sales",
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

  const salesValue = Number(salesValueData?.data[0].sum) || 0;
  const payingCustomersNumber = Number(payingCustomers?.data[0].count) || 0;
  const cost = payingCustomersNumber === 0 ? 0 : salesValue / payingCustomersNumber;

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Average Revenue Per Customer
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
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {cost === Infinity ? "Infinity" : `$${cost.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CostMetrics = () => (
  <CardGroup tw="flex gap-3">
    <CustomerAcquisitionCost />
    <CustomerRetentionCost />
    <CostPerQualifiedLead />
    <AverageRevenuePerCustomer />
  </CardGroup>
);

export default CostMetrics;
