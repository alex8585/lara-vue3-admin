import { defineStore } from "pinia";
import { filterArrToFilterStr } from "@/support/helpers";
import axiosClient from "@/support/axiosClient";

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
    async fetchItems(
      page = 1,
      perPage = 5,
      orderBy = "id",
      descending = true,
      filter: any
    ) {
      this._loading = true;
      const filterStr = filterArrToFilterStr(filter);
      let itemsUrl = `${url}/?page=${page}&perPage=${perPage}&orderBy=${orderBy}&descending=${descending}`;

      if (filterStr) {
        itemsUrl = `${itemsUrl}${filterStr}`;
      }
      const res = await axiosClient.get<any>(itemsUrl);
      this.users.data = res.data.data;
      this.users.meta = res.data.metaData;
      this._loading = false;
    },
  },
});
