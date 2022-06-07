import { defineStore } from "pinia";
const url = "/api/v1/tags";
import { fetchAll, fetchMany, fetchUrl } from "@/support/query";
interface Tag {
  id?: number;
  name?: string;
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
  _allTags: Tag[];
  tags: Tags;
  tag: Tag;
  _loading: boolean;
}

export const useTagsStore = defineStore({
  id: "tags",
  state: () =>
    <State>{
      _allTags: [],
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
    allTags: (state) => state._allTags,
  },

  actions: {
    async getAllTags() {
      this._loading = true;
      const res = await fetchAll(url);
      this._allTags = [...res.data];
      this._loading = false;
    },

    async fetchItems(...rest: [number, number, string, boolean, any]) {
      this._loading = true;
      const res = await fetchMany(url, ...rest);
      this.tags.data = res.data.data;
      this.tags.meta = res.data.metaData;
      this._loading = false;
    },

    async fetchTag(id: number) {
      this._loading = true;
      const res = await fetchUrl(`${url}/tags/${id}`);
      this.tag = res.data;
      this._loading = false;
    },
  },
});
