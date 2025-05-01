import axios from "axios";

import { BASE_URL } from "~/constants";

export const userInfoQuery = {
  queryKey: ["userInfo"],
  queryFn: () => axios.get(`${BASE_URL}/user/user-info`).then((res) => res.data),
};

export const deleteUserMutation = {
  mutationKey: ["deleteUser"],
  mutationFn: () => axios.delete(`${BASE_URL}/user`).then((res) => res.data),
};
