import { defineStore } from "pinia";
import { filterArrToFilterStr } from "@/support/helpers";
import axios from "axios";
const url = import.meta.env.VITE_API_URL + "/api/v1/categories";

interface Category {
  id?: number;
  name?: string;
}

interface Categories {
  data: Category[];
  meta: {
    rowsNumber: number;
    page: number;
    rowsPerPage: number;
  };
}
interface State {
  _allCategories: Category[];
  categories: Categories;
  category: Category;
  _loading: boolean;
}

export const useCategoriesStore = defineStore({
  id: "categories",
  state: () =>
    <State>{
      _allCategories: [],
      categories: {
        data: [],
        meta: {
          rowsPerPage: 5,
          page: 1,
          rowsNumber: 0,
        },
      },
      category: {},
      _loading: false,
    },

  getters: {
    allCats: (state) => state._allCategories,
    data: (state) => state.categories.data,
    meta: (state) => state.categories.meta,
    loading: (state) => state._loading,
  },

  actions: {
    async getAllCategories() {
      const catsUrl = `${url}?perPage=-1`;
      const res = await axios.get<any>(catsUrl);
      this._allCategories = res.data;
    },

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
      this.categories.data = res.data.data;
      this.categories.meta = res.data.metaData;
      this._loading = false;
    },
  },
});
