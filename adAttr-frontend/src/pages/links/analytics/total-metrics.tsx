import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getLinkQuery } from "~/services/links";

import { CardContent, CardHeader, Card, HeaderTitle, CardGroup } from "./styled";

import "twin.macro";

const TotalMetrics = () => {
  const { id } = useParams();
  const { data: link } = useQuery(getLinkQuery(Number(id)));

  return (
    <CardGroup tw="flex gap-3">
      <Card tw="px-3 pt-2 pb-4">
        <CardHeader>
          <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
            Link
          </HeaderTitle>
        </CardHeader>
        <CardContent>
          <a className="underline" href={link?.link}>
            {link?.link}
          </a>
        </CardContent>
      </Card>

      <Card tw="px-3 pt-2 pb-4">
        <CardHeader>
          <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
            Origin
          </HeaderTitle>
        </CardHeader>
        <CardContent>
          <a className="underline" href={link?.target}>
            {link?.target}
          </a>
        </CardContent>
      </Card>

      <Card tw="px-3 pt-2 pb-4">
        <CardHeader>
          <HeaderTitle variant="paragraph2" weight="medium" color="#9B958F">
            Description
          </HeaderTitle>
        </CardHeader>
        <CardContent>{link?.campaign?.description}</CardContent>
      </Card>
    </CardGroup>
  );
};

export default TotalMetrics;
