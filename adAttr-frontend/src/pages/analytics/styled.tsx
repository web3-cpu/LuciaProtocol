import tw, { styled } from "twin.macro";

import Typography from "~/components/typography";

export const CardGroup = styled.div`
  ${tw`p-5 rounded-2xl`}
  background-color: #f8f3ed;
`;

export const Card = styled.div`
  ${tw`rounded-xl flex-1`}
  background-color: white;
`;

export const HeaderIcon = styled.div`
  ${tw`w-8 h-8 rounded-lg flex items-center justify-center`}
  background-color: #F8ECE080;
`;

export const HeaderTitle = tw(Typography)`flex-1`;

export const CardHeader = tw.div`
  flex items-center gap-2
`;

export const CardContent = tw.div`mt-8`;
