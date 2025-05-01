import { useQuery } from "@tanstack/react-query";

import MoneyLightIcon from "~/assets/icons/money_light.svg";
import LightningDuotoneLineIcon from "~/assets/icons/lightning_duotone_line.svg";
import LinkIcon from "~/assets/icons/link.svg";
import Typography from "~/components/typography";
import { getButtonsQuery, getPagesQuery, getUsersQuery } from "~/services/metrics";

import { CardContent, CardHeader, HeaderIcon, Card, HeaderTitle, CardGroup } from "./styled";

import "twin.macro";

const TotalUsers = () => {
  const { data: users } = useQuery(getUsersQuery());

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderIcon>
          <MoneyLightIcon {...{ stroke: "#F1A34D" }} />
        </HeaderIcon>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Users
        </HeaderTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {users?.length ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TotalPages = () => {
  const { data: pages } = useQuery(getPagesQuery());

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderIcon>
          <LightningDuotoneLineIcon {...{ stroke: "#F1A34D" }} />
        </HeaderIcon>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Pages
        </HeaderTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {pages?.length ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TotalButtons = () => {
  const { data: buttons } = useQuery(getButtonsQuery());

  return (
    <Card tw="px-3 pt-2 pb-4">
      <CardHeader>
        <HeaderIcon>
          <LinkIcon {...{ stroke: "#F1A34D" }} />
        </HeaderIcon>
        <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
          Buttons
        </HeaderTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="subheading3" weight="bold" color="#6A6055">
          {buttons?.length ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TotalMetrics = () => (
  <CardGroup tw="flex gap-3">
    <TotalUsers />
    <TotalPages />
    <TotalButtons />
  </CardGroup>
);

export default TotalMetrics;
