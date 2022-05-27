import { defineStore } from "pinia";
import { filterArrToFilterStr } from "@/support/helpers";
import axios from "axios";
const url = import.meta.env.VITE_API_URL + "/api/v1/posts";
// "id": 82,
//      "user_id": 1,
//      "title": "I've seen that.",
//      "description": "Dolor accusantium autem eveniet voluptate. Qui est ullam quaerat ut laborum. Velit ducimus dolor est perferendis pariatur dicta.",
//      "created_at_str": "2022-05-22 15:48:06",
//      "updated_at_str": "2022-05-22 15:48:07",
//      "created_at": 1653234486,
//      "updated_at": 1653234487,
//      "tags": [
//        {
//          "id": 82,
//          "name": "Majesty!'."
//        },
//        {
//          "id": 83,
//          "name": "Sir, With."
//        },
//        {
//          "id": 84,
//          "name": "Queen say."
//        }
//      ],
//      "category": {
//        "id": 42,
//        "name": "March Hare took."
//      }
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
      const res = await axios.get<any>(itemsUrl);
      this.posts.data = res.data.data;
      this.posts.meta = res.data.metaData;
      this._loading = false;
    },
  },
});
