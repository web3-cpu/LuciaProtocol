import { styled } from "styled-components";

function QuickGuide() {
  return (
    <GuideWrapper>
      <GuideHeader>Quick Guide</GuideHeader>
      <GuideDescription>
        Watch our quick video to learn how to use Lucia Attribution and boost your ROI by over 200%.
      </GuideDescription>
      <VideoWrapper>
        <StyledImg
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/144dd08e4b21edc3fe8d908dcd568312bdd068034e51161b110277c36fcce9ae?apiKey=e1d604d4eed341a6a7af82f9215bc1f2&"
        />
      </VideoWrapper>
    </GuideWrapper>
  );
}

const GuideWrapper = styled.section`
  flex: 1;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const GuideHeader = styled.header`
  color: #000;
  font:
    700 16px Montserrat,
    sans-serif;
`;

const GuideDescription = styled.p`
  color: #85817c;
  margin-top: 10px;
  font:
    400 13px/20px Montserrat,
    sans-serif;
`;

const VideoWrapper = styled.div`
  border-radius: 12px;
  background-color: #f5e9dc;
  display: flex;
  margin-top: 11px;
  justify-content: center;
  align-items: center;
  padding: 50px 60px;
`;

const StyledImg = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 93px;
  margin: 64px 0 41px;
`;

export default QuickGuide;
