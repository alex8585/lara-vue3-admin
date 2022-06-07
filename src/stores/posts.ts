import { defineStore } from "pinia";

import { fetchMany } from "@/support/query";
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
    async fetchItems(...rest: [number, number, string, boolean, any]) {
      this._loading = true;
      const res = await fetchMany(url, ...rest);
      this.posts.data = res.data.data;
      this.posts.meta = res.data.metaData;
      this._loading = false;
    },
  },
});
