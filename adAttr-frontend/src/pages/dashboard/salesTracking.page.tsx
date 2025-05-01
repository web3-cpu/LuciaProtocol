import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SalesTrackingWidget = () => {
  const navigate = useNavigate();

  return (
    <WidgetContainer>
      <Title>Track your URL Links faster</Title>
      <Description>Accurate & real-time metrics on how your links is performing</Description>
      <ConnectionSection
        onClick={() => {
          navigate("/links");
        }}
      >
        <ConnectionButton>
          <ConnectionIcon
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f500efca5805614eab9fad781a01d91954aa41b5527d788897d2ef51f42db07c?apiKey=e1d604d4eed341a6a7af82f9215bc1f2&"
          />
          <ButtonText>Generate New Link</ButtonText>
        </ConnectionButton>
      </ConnectionSection>
    </WidgetContainer>
  );
};

const WidgetContainer = styled.section`
  align-self: stretch;
  border-radius: 12px;
  background-color: #f1f3f5;
  display: flex;
  max-width: 300px;
  margin-top: 20px;
  flex-direction: column;
  font-size: 28px;
  color: #4a443c;
  font-weight: 700;
  line-height: 143%;
  padding: 29px;
`;

const Title = styled.h1`
  font-family: Montserrat, sans-serif;
`;

const Description = styled.p`
  color: #4a443c;
  margin-top: 21px;
  font:
    500 13px/20px Montserrat,
    sans-serif;
`;

const ConnectionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ConnectionButton = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 6px 27px;
  border-radius: 200px;
  border: 4px solid #fef4e9;
  background-color: #242b36;
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
`;

const ConnectionIcon = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
`;

const ButtonText = styled.span`
  font-family: Montserrat, sans-serif;
  flex-grow: 1;
`;

export default SalesTrackingWidget;
