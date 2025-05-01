import type { Meta } from "@storybook/react";

import Line from "./index";

import "twin.macro";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Charts/Line",
  component: Line,
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
} satisfies Meta<typeof Line>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = () => (
  <div style={{ width: "500px" }}>
    <Line
      data={[
        {
          name: "This week",
          value: { "1D": 80, "15D": 55, "1M": 140, "6M": 180, "1Y": 70, Max: 200 },
          color: "#F1A34D",
          options: {
            lineStyle: {
              width: 4,
            },
            symbol: "none",
          },
        },
        {
          name: "Last week",
          value: { "1D": 120, "15D": 170, "1M": 70, "6M": 160, "1Y": 130, Max: 150 },
          color: "#E6E8EC",
          options: {
            lineStyle: {
              width: 4,
            },
            symbol: "none",
            emphasis: {
              lineStyle: {
                color: "#E6E8EC",
              },
            },
          },
        },
      ]}
      options={{
        yAxis: {
          axisLabel: {
            show: false,
          },
        },
      }}
    />
  </div>
);
