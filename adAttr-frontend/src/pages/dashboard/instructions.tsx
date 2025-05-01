import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import tw from "twin.macro";

import CheckRingIcon from "~/assets/icons/check_ring.svg";
import Button from "~/components/button";
import Typography from "~/components/typography";
import { setOnboardingInfoMutation } from "~/services/dashboard";
import { DashboardInfo } from "~/services/types";

interface InstructionCardProps {
  title: string;
  description: string | ReactNode;
  isCompleted?: boolean;
  isFirst?: boolean;
  isLast?: boolean;

  action?: ReactNode;
  shouldShowAction?: boolean;
}

const InstructionCardContainer = styled.div<{ $isFirst?: boolean; $isLast?: boolean; $isCompleted?: boolean }>`
  ${tw`px-7 py-3 bg-white rounded-lg relative h-full flex flex-col`}
  box-shadow: 0px 8px 20px 0px #9E7D581C;

  ${({ $isCompleted }) => $isCompleted && `filter: drop-shadow(0px 0px 1px #F1A34D);`}

  ${({ $isFirst }) =>
    !$isFirst &&
    `&::before {
    content: url("/icons/polygon.svg");
    position: absolute;
    top: 50%;
    left: -10px; /* Adjust the value based on the size of the arrow */
    transform: translateY(-50%);
  }`}
  ${({ $isLast }) =>
    !$isLast &&
    `&::after {
    content: url("/icons/polygon.svg");
    position: absolute;
    top: 50%;
    right: -10px; /* Adjust the value based on the size of the arrow */
    transform: translateY(-50%) scaleX(-1);
  }`}
`;

const InstructionLink = styled.div`
  ${tw`bg-primary`}
  position: absolute;
  width: 20px;
  height: 1px;
  top: 50%;
  right: -30px;
  transform: translateY(-2px);
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    transform: translateY(-1.5px);
    right: -2px;
    ${tw`bg-primary`}
  }
`;

const InstructionCard = ({
  title,
  description,
  isCompleted,
  isFirst,
  isLast,
  action,
  shouldShowAction,
}: InstructionCardProps) => {
  return (
    <div tw="relative flex-1">
      <InstructionCardContainer $isFirst={isFirst} $isLast={isLast} $isCompleted={isCompleted}>
        <Typography variant="paragraph2" weight="medium">
          {title}
        </Typography>
        <Typography tw="mt-2 block text-[#514D4A] flex-1">{description}</Typography>
        <div tw="flex items-center mt-4">
          {isCompleted ? (
            <>
              <Typography variant="label1" weight="medium">
                Completed
              </Typography>
              <CheckRingIcon />
            </>
          ) : (
            shouldShowAction && action
          )}
        </div>
      </InstructionCardContainer>
      {isCompleted && !isLast && <InstructionLink />}
    </div>
  );
};

function Instructions({ dashboardInfo }: { dashboardInfo?: DashboardInfo }) {
  const queryClient = useQueryClient();
  const onboardingInfo = JSON.parse(dashboardInfo?.onboarding || "{}");
  const { mutateAsync: setOnboardingInfo } = useMutation(setOnboardingInfoMutation(queryClient));
  const navigate = useNavigate();

  return (
    <ContentContainer>
      <TipHeader>Here's what you need to do to make the most of the Lucia Attribution experience.</TipHeader>

      <div tw="flex gap-10 mt-4">
        <InstructionCard
          isFirst
          shouldShowAction={!dashboardInfo?.firstLinkCreated}
          isCompleted={dashboardInfo?.firstLinkCreated}
          title="Step1: Create a link"
          description={
            <>
              Create your first link. &nbsp;
              <a className="underline" href="">
                Why are links important?
              </a>
            </>
          }
          action={
            <Button
              onClick={() => {
                navigate("/links");
              }}
              variant="link"
              label="Create your first link"
            />
          }
        />
        <InstructionCard
          shouldShowAction={dashboardInfo?.firstLinkCreated}
          isCompleted={dashboardInfo?.apiKeyCreated}
          title="Step2: Create your API Key"
          description="Create your API Key."
          action={
            <Button
              onClick={() => {
                navigate("/integrations");
              }}
              variant="link"
              label="Create Now"
            />
          }
        />
        <InstructionCard
          shouldShowAction={dashboardInfo?.apiKeyCreated}
          isCompleted={onboardingInfo?.integratedSDK}
          title="Step3: Integrate Lucia SDK to your application"
          description={
            <a className="underline" href="https://docs.clickinsights.xyz/" target="_blank">
              How to integrate Lucia SDK?
            </a>
          }
          action={
            <Button
              onClick={() => {
                setOnboardingInfo({
                  ...onboardingInfo,
                  integratedSDK: true,
                });
              }}
              variant="link"
              label="I've done it"
            />
          }
        />
        <InstructionCard
          isLast
          shouldShowAction={onboardingInfo?.integratedSDK}
          isCompleted={onboardingInfo?.viewedMetrics}
          title="Step4: Watch your metrics grow"
          description="TBD"
          action={
            <Button
              onClick={() => {
                setOnboardingInfo({
                  ...onboardingInfo,
                  viewedMetrics: true,
                });
                navigate("/analytics");
              }}
              variant="link"
              label="Watch Now"
            />
          }
        />
      </div>
    </ContentContainer>
  );
}

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #242b36;
  font-weight: 500;
  line-height: 154%;
  padding: 20px;
`;

const TipHeader = styled.h2`
  font-family: Montserrat, sans-serif;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default Instructions;
