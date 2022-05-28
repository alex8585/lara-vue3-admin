import { ref, onMounted } from "vue";

import axiosClient from "@/support/axiosClient";

export default function useAuth() {
  const user = ref<any>(null);
  const isLoged = ref(false);

  const url = "/api/v1/auth";
  const login = async (email: string, password: string) => {
    const result: { error?: boolean; msg?: string | {}; token?: string } = {};

    try {
      const resp = await axiosClient.post(`${url}/login`, {
        email,
        password,
      });

      const token = resp?.data?.access_token;
      isLoged.value = true;
      localStorage.setItem("token", token);
      result.error = false;
      result.token = token;
      return result;
    } catch (error: any) {
      isLoged.value = false;
      result.error = true;
      if (error.response.status == 401) {
        result.msg = { email: ["Incorrect login or password"] };
      } else {
        result.msg = error.response.data.errors;
      }
      return result;
    }
  };

  const register = async (email: string, password: string) => {
    const result: { error?: boolean; msg?: string; token?: string } = {};

    try {
      const resp = await axiosClient.post(`${url}/register`, {
        email,
        password,
      });

      const token = resp?.data?.access_token;
      isLoged.value = true;
      localStorage.setItem("token", token);
      result.error = false;
      result.token = token;
      return result;
    } catch (error: any) {
      isLoged.value = false;
      result.error = true;
      result.msg = error.response.data.errors;

      return result;
    }
  };
  function getToken() {
    return localStorage.getItem("token");
  }

  async function getUser() {
    const resp = await axiosClient.get(`${url}/me`);
    return resp.data;
  }

  onMounted(async () => {
    const token = getToken();
    if (!token) {
      isLoged.value = false;
    } else {
      isLoged.value = true;
      user.value = await getUser();
    }
  });

  return { isLoged, user, login, register };
}
