import { ref } from "vue";

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

  async function logout() {
    try {
      const resp = await axiosClient.post(`${url}/logout`);
      console.log(resp.data);
      isLoged.value = false;
      localStorage.removeItem("token");
      user.value = null;
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  async function getUser() {
    const token = getToken();
    if (!token) {
      isLoged.value = false;
      user.value = null;
      return null;
    }
    try {
      const resp = await axiosClient.get(`${url}/me`);
      isLoged.value = true;
      user.value = resp.data;
      return user.value;
    } catch (error: any) {
      isLoged.value = false;
      localStorage.removeItem("token");
      console.log(error.response.data.message);
      return null;
    }
  }

  //  onMounted(async () => {});

  return { logout, isLoged, user, getUser, login, register };
}
