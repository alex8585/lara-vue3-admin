import axios from "axios";
import queryString from "query-string";
import cookie from "cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined") {
      let token: string | null = cookie.parse(document.cookie).token;
      if (!token) {
        token = localStorage.getItem("token");
      }
      const auth = token ? `Bearer ${token}` : "";

      config.headers.Authorization = auth;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
