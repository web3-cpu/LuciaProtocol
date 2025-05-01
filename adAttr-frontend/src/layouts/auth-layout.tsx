import { Outlet } from "react-router-dom";
import tw, { styled } from "twin.macro";

import Typography from "~/components/typography";

const background = [
  {
    image: "/images/auth-image1.png",
    title: "AI Driven",
    caption: "Unlock the Power of a System Designed to Maximize Conversions",
  },
  {
    image: "/images/auth-image2.png",
    title: "Drive your ROI over 200%",
    caption: "With our AI modeled Attribution models, we can guarantee over 200%",
  },
  {
    image: "/images/auth-image3.png",
    title: "24/7 Suport with LuciaAI Bot",
    caption: "Our Advanced LuciaAI Bot Advanced AI Chat bot would get quick help with your your proplem/Issue",
  },
];

const AuthLayout = () => {
  const imageIndex = 0;
  // const timerId = useRef<NodeJS.Timeout | null>(null);
  // const [imageIndex, setImageIndex] = useState(0);

  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     setImageIndex((index) => (index + 1) % background.length);
  //   }, 5_000);

  //   return () => {
  //     if (timerId.current) clearInterval(timerId.current);
  //   };
  // }, []);

  return (
    <LayoutContainer>
      <ContentContainer>
        <BackgroundContainer>
          <BackgroundImage src={background[imageIndex].image} />
          <GradientBackground />
          <TextContainer>
            <Typography tw="text-white" variant="h3" weight="bold">
              {background[imageIndex].title}
            </Typography>
            <Typography tw="text-white" variant="paragraph1" weight="bold">
              {background[imageIndex].caption}
            </Typography>
          </TextContainer>
        </BackgroundContainer>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </ContentContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = tw.div`bg-background h-full md:(flex justify-center items-center)`;
const ContentContainer = tw.div`h-full md:(flex justify-center items-start h-auto)`;
const TextContainer = tw.div`absolute w-full bottom-[70%] text-center p-2 pb-8 md:(p-16 h-1/2 top-auto bottom-0)`;

const OutletContainer = tw.div`bg-white rounded-t-3xl px-5 py-8 w-full fixed bottom-0 overflow-auto h-[70%] md:(relative -left-8 rounded-b-3xl w-auto min-h-0 top-12 px-12 py-16)`;
const GradientBackground = styled.div`
  ${tw`absolute w-full h-full top-0`}
  ${tw`md:(top-auto bottom-0)`}
  background: linear-gradient(180deg, rgba(148, 85, 35, 0) 0%, rgba(134, 68, 15, 0.79) 100%);
`;

const BackgroundContainer = tw.div`relative w-full h-full md:(w-[38em] h-auto)`;
const BackgroundImage = tw.img`relative w-full -top-24 md:top-0`;

export default AuthLayout;
