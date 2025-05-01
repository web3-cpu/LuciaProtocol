import { DURATION_OPTIONS, GROUP_BY_OPTIONS } from "~/hooks/use-time-selector";

import "twin.macro";

interface TimeSelectorProps {
  withGroupBy?: boolean;

  duration: string;
  setDuration: (v: string) => void;
  groupByOptions: readonly string[];
  groupBy: string;
  setGroupBy: (v: string[number]) => void;
}

const TimeSelector = ({
  withGroupBy,
  duration,
  setDuration,
  groupBy,
  setGroupBy,
  groupByOptions,
}: TimeSelectorProps) => (
  <div tw="flex gap-2">
    <select
      value={duration}
      onChange={(ev) => setDuration(ev.target.value as (typeof DURATION_OPTIONS)[number])}
      className="text-[#B9B4AE] bg-transparent focus:outline-none"
    >
      {DURATION_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {withGroupBy && (
      <select
        value={groupBy}
        onChange={(ev) =>
          setGroupBy(ev.target.value as (typeof GROUP_BY_OPTIONS)[(typeof DURATION_OPTIONS)[number]][number])
        }
        className="text-[#B9B4AE] bg-transparent focus:outline-none"
      >
        {groupByOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default TimeSelector;
