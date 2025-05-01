import * as React from "react";
import { styled } from "styled-components";

function CampaignROI() {
  return (
    <CampaignCard>
      <Title>Grow your ROI</Title>
      <ROIContainer>
        <ROIImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8469adb08d5bd7e2880205189472af2d6df9b164a1e7b4d28ff1cd3e68a206f9?apiKey=e1d604d4eed341a6a7af82f9215bc1f2&"
          alt="Graph"
        />
        <ROIText>200%</ROIText>
      </ROIContainer>
      <Description>Integrate your campaigns and ads increase your ROI.</Description>
    </CampaignCard>
  );
}

const CampaignCard = styled.section`
  align-self: stretch;
  border-radius: 12px;
  background-color: #f4ece3;
  display: flex;
  max-width: 300px;
  flex-direction: column;
  color: #4a443c;
  font-weight: 700;
  padding: 30px 18px;
`;

const Title = styled.h1`
  white-space: nowrap;
  font:
    28px/143% Montserrat,
    sans-serif;
`;

const ROIContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  font-size: 56px;
  white-space: nowrap;
  line-height: 71%;
`;

const ROIImage = styled.img`
  aspect-ratio: 0.98;
  object-fit: contain;
  width: 46px;
`;

const ROIText = styled.div`
  font-family: Montserrat, sans-serif;
  flex-grow: 1;
`;

const Description = styled.p`
  color: #4a443c;
  margin-top: 8px;
  font:
    500 13px/20px Montserrat,
    sans-serif;
`;

export default CampaignROI;
