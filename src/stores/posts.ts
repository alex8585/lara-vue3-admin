import { defineStore } from "pinia";
import { filterArrToFilterStr } from "@/support/helpers";
// import axios from "axios";
import axiosClient from "@/support/axiosClient";

const url = "/api/v1/posts";
interface Post {
  id?: number;
  title?: string;
}

interface Posts {
  data: Post[];
  meta: {
    rowsNumber: number;
    page: number;
    rowsPerPage: number;
  };
}
interface State {
  posts: Posts;
  post: Post;
  _loading: boolean;
}

export const usePostsStore = defineStore({
  id: "posts",
  state: () =>
    <State>{
      posts: {
        data: [],
        meta: {
          rowsPerPage: 5,
          page: 1,
          rowsNumber: 0,
        },
      },
      post: {},
      _loading: false,
    },

  getters: {
    data: (state) => state.posts.data,
    meta: (state) => state.posts.meta,
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
      this.posts.data = res.data.data;
      this.posts.meta = res.data.metaData;
      this._loading = false;
    },
  },
});
