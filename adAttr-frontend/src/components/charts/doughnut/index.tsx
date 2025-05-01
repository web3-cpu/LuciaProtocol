import ReactEcharts, { EChartsOption } from "echarts-for-react";
import merge from "lodash.merge";
import { useEffect, useState } from "react";
import tw from "twin.macro";

import Typography from "~/components/typography";

interface DoughnutChartProps {
  data: Array<{
    name: string;
    color?: string;
    value: number;
    renderValue?: () => React.ReactNode;
  }>;
  children?: React.ReactNode;
  options?: EChartsOption;
}

const DoughnutChart = ({ data, children, options }: DoughnutChartProps) => {
  const [legends, setLegends] = useState(
    data.reduce<{ [key: string]: boolean }>((acc, item) => {
      acc[item.name] = true;
      return acc;
    }, {}),
  );

  useEffect(() => {
    setLegends(
      data.reduce<{ [key: string]: boolean }>((acc, item) => {
        acc[item.name] = true;
        return acc;
      }, {}),
    );
  }, [data]);

  const reversedData = [...data].reverse();
  const option: EChartsOption = merge(
    {
      tooltip: {
        trigger: "item",
      },
      color: data[0]?.color
        ? reversedData.map((item) => item.color)
        : ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
      legend: {
        show: false,
        selected: legends,
      },
      series: [
        {
          type: "pie",
          radius: ["70%", "85%"],
          showEmptyCircle: true,
          emptyCircleStyle: {
            opacity: 0.2,
          },
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
        {
          type: "pie",
          radius: ["70%", "85%"],
          avoidLabelOverlap: false,
          padAngle: Object.values(legends).filter((v) => v === true).length > 1 ? -5 : 0,
          itemStyle: {
            borderRadius: 1000,
            borderJoin: "round",
          },
          clockwise: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            scale: false,
            itemStyle: {
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          data: reversedData.map(({ name, value }) => ({ name, value })),
        },
      ],
    },
    options,
  );
  const totalValue = data.reduce((acc, item) => acc + (legends[item.name] ? Number(item.value) : 0), 0);

  const toggleLegend = (name: string) => setLegends((oldLegends) => ({ ...oldLegends, [name]: !oldLegends[name] }));

  return (
    <div>
      <div tw="relative">
        <ReactEcharts option={option} />
        {children && <div tw="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">{children}</div>}
      </div>
      <div tw="flex justify-around mt-4">
        {data.map((item) => (
          <div key={item.name} tw="flex cursor-pointer" onClick={() => toggleLegend(item.name)}>
            <div
              css={[
                tw`w-2 h-2 rounded-full mt-1.5 mr-1.5`,
                `
                background-color: ${item.color};
              `,
                !legends[item.name] && tw`grayscale`,
              ]}
            />
            <div>
              <Typography variant="paragraph2" weight="medium">
                {item.name}
              </Typography>
              <div tw="flex items-center gap-1.5 mt-2">
                {item.renderValue ? item.renderValue() : item.value}
                {legends[item.name] && (
                  <Typography
                    css={`
                      color: #b9b4ae;
                    `}
                  >
                    {((item.value / totalValue) * 100).toFixed(1)}%
                  </Typography>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
