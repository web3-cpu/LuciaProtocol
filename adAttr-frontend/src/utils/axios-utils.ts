import axios from "axios";

export const initAxios = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        removeToken();
        localStorage.removeItem("token");
        location.href = "/login";
      }
      return Promise.reject(error);
    },
  );
};

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  axios.defaults.headers.common.Authorization = undefined;
};
