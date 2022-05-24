import { defineStore } from "pinia";

import axios from "axios";
const url = import.meta.env.VITE_API_URL + "/api/v1";

interface Tag {
  id?: number;
  title?: string;
}

interface Tags {
  data: Tag[];
  meta: {
    rowsNumber: number;
    page: number;
    rowsPerPage: number;
  };
}
interface State {
  tags: Tags;
  tag: Tag;
  _loading: boolean;
}

export const useTagsStore = defineStore({
  id: "tags",
  state: () =>
    <State>{
      tags: {
        data: [],
        meta: {
          rowsPerPage: 5,
          page: 1,
          rowsNumber: 0,
        },
      },
      tag: {},
      _loading: false,
    },

  getters: {
    data: (state) => state.tags.data,
    meta: (state) => state.tags.meta,
    loading: (state) => state._loading,
  },
  // pagination.value.rowsNumber = 10;
  // pagination.value.page = page;
  // pagination.value.rowsPerPage = rowsPerPage;

  actions: {
    async fetchTags(page = 1, perPage = 5, orderBy = "id", descending = true) {
      this._loading = true;
      const res = await axios.get<any>(
        `${url}/tags?page=${page}&perPage=${perPage}&orderBy=${orderBy}&descending=${descending}`
      );
      // const data = res.data as Tags;
      this.tags.data = res.data.data;
      this.tags.meta = res.data.metaData;
      // const meta = res.data.meta;
      // this.tags.meta.rowsNumber = meta.total;
      // this.tags.meta.page = meta.current_page;
      // this.tags.meta.rowsPerPage = meta.per_page;
      this._loading = false;
      // console.log(this.tags);
    },
    async fetchTag(id: number) {
      this._loading = true;
      const res = await axios.get<Tag>(`${url}/tags/${id}`);
      const data = res.data as Tag;
      this.tag = data;
      this._loading = false;
    },
  },
});
