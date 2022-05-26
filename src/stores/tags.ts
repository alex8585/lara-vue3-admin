import { defineStore } from "pinia";
import { filterArrToFilterStr } from "@/support/helpers";
import axios from "axios";
const url = import.meta.env.VITE_API_URL + "/api/v1/tags";

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
      let tagsUrl = `${url}/?page=${page}&perPage=${perPage}&orderBy=${orderBy}&descending=${descending}`;

      if (filterStr) {
        tagsUrl = `${tagsUrl}${filterStr}`;
      }
      const res = await axios.get<any>(tagsUrl);
      this.tags.data = res.data.data;
      this.tags.meta = res.data.metaData;
      this._loading = false;
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
