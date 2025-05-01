import clsx from "clsx";

const ROADMAPS: Array<{
  year: number;
  quarter: string;
  items: string[];
}> = [
  {
    year: 2024,
    quarter: "Q3",
    items: ["Seed Round", "Lending & Borrowing", "Team Expansion", "CTO, CCO, CLA", "Partnership Expansion"],
  },
  {
    year: 2024,
    quarter: "Q4",
    items: ["GTM", "Alpha V1 & V2", "DEX Launch", "Public Sale"],
  },
  {
    year: 2025,
    quarter: "Q1",
    items: [
      "Audits & Security Check",
      "Token Treasury",
      "Integration",
      "ETH & Polygon Testnet",
      "Expand Blockchain",
      "Partnerships",
    ],
  },
  {
    year: 2025,
    quarter: "Q2",
    items: ["Visa, Mastercard Partnership", "Token Treasury Integration", "ETH & Polygon Mainnet", "Governance Launch"],
  },
  {
    year: 2025,
    quarter: "Q3",
    items: ["Virtual Credit Card Release", "Payment Provider Partnerships", "Entry to 1st 3 Markets"],
  },
  {
    year: 2025,
    quarter: "Q4",
    items: ["Lucia V3", "Accelerator", "Partnerships", "Entry to next 3 Markets"],
  },
  { year: 2026, quarter: "Q1", items: ["Series A", "Next 3 Markets Entry"] },
  { year: 2026, quarter: "Q2", items: ["Global Expansion"] },
];

const GROUPED_ROADMAPS = ROADMAPS.reduce(
  (acc, item, i) => {
    i % 3 ? acc[acc.length - 1].push(item) : acc.push([item]);
    return acc;
  },
  [] as Array<Array<(typeof ROADMAPS)[number]>>,
);

const RoadMap = () => (
  <div className="mt-12">
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold	bg-gradient-to-r from-[#977F93] from-[-60%] via-[#E99B4D] via-5% to-[#B49AC6] to-80% bg-clip-text text-transparent leading-tight text-center">
      Roadmap
    </h2>
    <div className="lg:bg-[url('/images/line-roadmap.png')] lg:bg-no-repeat lg:bg-center mt-8">
      <div className="mx-auto max-w-7xl px-2 lg:px-6 lg:px-8 lg:py-8 flex flex-col gap-8">
        {GROUPED_ROADMAPS.map((group, index) => (
          <div key={`group-${index}`} className="grid lg:grid-cols-3 gap-8">
            {group.map(({ year, quarter, items }, itemIndex) => (
              <div
                key={`${year}${quarter}`}
                className={clsx(
                  "shadow-[0_4px_4px_0_#0000001A] px-8 py-12 rounded-[30px] flex items-center h-56 gap-16",
                  index % 2 === 1
                    ? itemIndex === 0
                      ? "lg:order-2"
                      : itemIndex === 1
                        ? "lg:order-1"
                        : "lg:order-0"
                    : "",
                  index === 0 ? "bg-[#FDF8F4E5]" : index === 1 ? "bg-[#F9F7F7]" : "bg-[#F7F3F6E5]",
                )}
              >
                <div className="text-center">
                  <p className="font-extralight text-3xl">{year}</p>
                  <p className="font-extralight text-6xl text-[#E99B4D]">{quarter}</p>
                </div>
                <ul className="list-disc">
                  {items.map((item) => (
                    <li key={`${year}-${quarter}-${item}`} className="font-extralight text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RoadMap;
