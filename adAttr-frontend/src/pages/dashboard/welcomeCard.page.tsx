import { styled } from "styled-components";

const WelcomeCard = ({ name = "" }: { name?: string }) => {
  const firstName = name.split(" ")[0];

  return (
    <Card>
      <Header>
        <Emoji>🎉</Emoji>
        <WelcomeText>
          <Greeting>Welcome onboard</Greeting>
          <Name>{firstName},</Name>
        </WelcomeText>
      </Header>
    </Card>
  );
};

const Card = styled.section`
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: space-between;
  gap: 20px;
  padding: 13px 27px 7px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding: 13px 20px 7px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: #000;
  font-weight: 500;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const Emoji = styled.div`
  font-size: 60px;
  font-family: Montserrat, sans-serif;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const WelcomeText = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: auto 0;
`;

const Greeting = styled.h2`
  font:
    13px/154% Montserrat,
    sans-serif;
`;

const Name = styled.h3`
  margin-top: 10px;
  font:
    32px/62.5% Montserrat,
    sans-serif;
`;

export default WelcomeCard;
