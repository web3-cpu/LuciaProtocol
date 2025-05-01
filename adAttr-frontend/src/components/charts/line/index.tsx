import ReactEcharts, { EChartsOption } from "echarts-for-react";
import { useState } from "react";
import tw from "twin.macro";
import merge from "lodash.merge";

import Typography from "~/components/typography";

interface LineChartProps {
  data: Array<{
    name: string;
    color: string;
    value: { [key: string]: number };
    options?: {
      [key: string]: unknown;
    };
  }>;
  options?: EChartsOption;
}

const LineChart = ({ data, options }: LineChartProps) => {
  const [legends, setLegends] = useState(
    data.reduce<{ [key: string]: boolean }>((acc, item) => ({ ...acc, [item.name]: true }), {}),
  );

  const option: EChartsOption = merge(
    {
      tooltip: {
        trigger: "axis",
      },
      color: data.map((item) => item.color),
      legend: {
        show: false,
        selected: legends,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: Object.keys(data[0].value),
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      series: data.map((item) => ({
        name: item.name,
        type: "line",
        data: Object.values(item.value),
        ...item.options,
      })),
    },
    options,
  );

  const toggleLegend = (name: string) => setLegends((oldLegends) => ({ ...oldLegends, [name]: !oldLegends[name] }));

  return (
    <div>
      <div tw="relative">
        <ReactEcharts option={option} />
      </div>
      <div tw="flex justify-between mt-4">
        {data.map((item) => (
          <div key={item.name} tw="flex cursor-pointer text-[#12121270]" onClick={() => toggleLegend(item.name)}>
            <div
              css={[
                tw`w-2 h-2 rounded-full mt-1.5 mr-1.5`,
                `
                background-color: ${item.color};
              `,
                !legends[item.name] && tw`grayscale`,
              ]}
            />
            <Typography variant="paragraph2" weight="medium">
              {item.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
