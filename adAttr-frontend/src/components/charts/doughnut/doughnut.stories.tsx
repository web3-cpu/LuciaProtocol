import type { Meta } from "@storybook/react";

import Typography from "~/components/typography";

import Doughnut from "./index";

import "twin.macro";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Charts/Doughnut",
  component: Doughnut,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    data: [],
  },
} satisfies Meta<typeof Doughnut>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = () => (
  <div style={{ width: "500px" }}>
    <Doughnut
      data={[
        {
          name: "Impressions",
          value: 60,
          color: "#00B2FF",
          renderValue: () => <Typography weight="semibold">12.5K</Typography>,
        },
        {
          name: "Clicks",
          value: 15,
          color: "#8DD0B7",
          renderValue: () => (
            <>
              <Typography weight="semibold">1.2K</Typography>
              <Typography weight="medium">800</Typography>
            </>
          ),
        },
        {
          name: "Conversions",
          value: 25,
          color: "#F1A34D",
          renderValue: () => <Typography weight="semibold">800</Typography>,
        },
      ]}
    />
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithChildren = () => (
  <div style={{ width: "500px" }}>
    <Doughnut
      data={[
        {
          name: "Impressions",
          value: 60,
          color: "#00B2FF",
          renderValue: () => <Typography weight="semibold">12.5K</Typography>,
        },
        {
          name: "Clicks",
          value: 15,
          color: "#8DD0B7",
          renderValue: () => (
            <>
              <Typography weight="semibold">1.2K</Typography>
              <Typography weight="medium">800</Typography>
            </>
          ),
        },
        {
          name: "Conversions",
          value: 25,
          color: "#F1A34D",
          renderValue: () => <Typography weight="semibold">800</Typography>,
        },
      ]}
    >
      <div tw="text-center">
        <Typography variant="subheading3" weight="bold">
          2
        </Typography>
        <Typography variant="paragraph2" weight="medium" color="#82CFB2">
          Connected
        </Typography>
      </div>
    </Doughnut>
  </div>
);
