import { defineStore } from "pinia";

import { fetchMany } from "@/support/query";
const url = "/api/v1/users";
interface User {
  id?: number;
  title?: string;
}

interface Users {
  data: User[];
  meta: {
    rowsNumber: number;
    page: number;
    rowsPerPage: number;
  };
}
interface State {
  users: Users;
  user: User;
  _loading: boolean;
}

export const useUsersStore = defineStore({
  id: "users",
  state: () =>
    <State>{
      users: {
        data: [],
        meta: {
          rowsPerPage: 5,
          page: 1,
          rowsNumber: 0,
        },
      },
      user: {},
      _loading: false,
    },

  getters: {
    data: (state) => state.users.data,
    meta: (state) => state.users.meta,
    loading: (state) => state._loading,
  },

  actions: {
    async fetchItems(...rest: [number, number, string, boolean, any]) {
      this._loading = true;
      const res = await fetchMany(url, ...rest);
      this.users.data = res.data.data;
      this.users.meta = res.data.metaData;
      this._loading = false;
    },
  },
});
