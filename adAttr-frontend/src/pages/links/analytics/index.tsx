import { styled } from "styled-components";

import Breadcrumb from "~/components/Breadcrumb";

import TotalMetrics from "./total-metrics";
import UserMetrics from "./user-metrics";
import LinkMetrics from "./link-metrics";
import CustomerMetrics from "./customer-metrics";
import CustomerRateMetrics from "./customer-rate-metrics";

export const Component = () => {
  const breadcrumbItems = [
    { url: "dashboard", label: "Overview", active: false },
    { url: "links", label: "Links", active: false },
    { url: "analytics", label: "Analytics", active: true },
  ];

  return (
    <AnalyticsContainer>
      <Header>
        <Breadcrumb items={breadcrumbItems} />
      </Header>

      <TotalMetrics />
      <UserMetrics />
      <LinkMetrics />
      <CustomerMetrics />
      <CustomerRateMetrics />
    </AnalyticsContainer>
  );
};

const AnalyticsContainer = styled.div`
  border-radius: 16px 16px 0 0;
  background-color: var(--Background-1, #fdfaf7);
  padding: 20px 20px 80px;
  height: 100%;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;
