import { defineStore } from "pinia";

import { fetchAll, fetchMany } from "@/support/query";
const url = "/api/v1/categories";

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
    async fetchItems(...rest: [number, number, string, boolean, any]) {
      this._loading = true;
      const res = await fetchMany(url, ...rest);
      this.categories.data = res.data.data;
      this.categories.meta = res.data.metaData;
      this._loading = false;
    },

    async getAllCategories() {
      this._loading = true;
      const res = await fetchAll(url);
      this._allCategories = res.data;
      this._loading = false;
    },
  },
});
