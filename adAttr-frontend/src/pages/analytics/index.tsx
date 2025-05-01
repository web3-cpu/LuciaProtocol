import { styled } from "styled-components";

import Breadcrumb from "~/components/Breadcrumb";

import TotalMetrics from "./total-metrics";
import LinkMetrics from "./link-metrics";
import ROIMetrics from "./roi-metrics";
import UserMetrics from "./user-metrics";
import CustomerMetrics from "./customer-metrics";
import CustomerRateMetrics from "./customer-rate-metrics";
import CostMetrics from "./cost-metrics";

import "twin.macro";

export const Component = () => {
  const breadcrumbItems = [
    { url: "dashboard", label: "Overview", active: false },
    { url: "analytics", label: "Analytics", active: true },
  ];

  return (
    <AnalyticsContainer>
      <HeaderBreadcrumb>
        <Breadcrumb items={breadcrumbItems} />
      </HeaderBreadcrumb>
      <TotalMetrics />
      <UserMetrics />
      <ROIMetrics />
      <LinkMetrics />
      <CustomerMetrics />
      <CustomerRateMetrics />
      <CostMetrics />
    </AnalyticsContainer>
  );
};

const AnalyticsContainer = styled.div`
  border-radius: 16px 16px 0 0;
  background-color: var(--Background-1, #fdfaf7);
  padding: 20px 20px 80px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const HeaderBreadcrumb = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;
