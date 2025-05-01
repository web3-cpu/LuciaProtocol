import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getAPIKeysQuery } from "~/services/integrations";
import Breadcrumb from "~/components/Breadcrumb";

import ApiKeyGenerator from "./api-key-generator";

export const Component = () => {
  const breadcrumbItems = [
    { url: "dashboard", label: "Overview", active: false },
    { url: "integrations", label: "Integrations", active: true },
  ];
  const { data: keys } = useQuery(getAPIKeysQuery());

  const key = (keys ?? [])[0];

  return (
    <div className="rounded-t-lg bg-[var(--Background-1,#fdfaf7)] p-5 pb-20 h-full md:p-5">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex justify-between p-2 bg-white rounded-lg">
        <h2 className="font-montserrat text-2xl font-bold text-[#6a6055] p-1.5">All Integrations</h2>
      </div>

      <section className="mt-4">
        <ApiKeyGenerator />
      </section>

      {key && (
        <div className="flex flex-col mt-1 p-2 bg-white rounded-lg">
          Last Key Generated: {dayjs(key.created_at).format("MM/DD/YYYY hh:mm:ss A")}
        </div>
      )}
    </div>
  );
};
