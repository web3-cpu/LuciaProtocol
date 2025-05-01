import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { getDashboardInfoQuery } from "~/services/dashboard";

import WelcomeCard from "./welcomeCard.page";
import Instructions from "./instructions";
import QuickGuide from "./quickGuide.page";
import FAQSection from "./FAQSection.page";
import CampaignROI from "./campaignROI.page";
import SalesTrackingWidget from "./salesTracking.page";

const DashboardContainer = styled.div`
  border-radius: 16px 16px 0 0;
  background-color: var(--Background-1, #fdfaf7);
  padding: 20px 20px 80px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;
const Sessions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ColSessions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Component = () => {
  const { data: dashboardInfo } = useQuery(getDashboardInfoQuery());

  return (
    <>
      <DashboardContainer>
        <WelcomeCard name={dashboardInfo?.name} />
        <Instructions dashboardInfo={dashboardInfo} />
        <Sessions>
          <ColSessions>
            <CampaignROI />
            <SalesTrackingWidget />
          </ColSessions>
          <QuickGuide />
          <FAQSection />
        </Sessions>
      </DashboardContainer>
    </>
  );
};
