import axios from "axios";

import { BASE_URL } from "~/constants";

const getAPIKeys = () =>
  axios
    .get<
      {
        client_id: number;
        created_at: string;
      }[]
    >(`${BASE_URL}/key`)
    .then((res) => res.data);
export const getAPIKeysQuery = () => ({ queryKey: ["APIKeys"], queryFn: getAPIKeys });
