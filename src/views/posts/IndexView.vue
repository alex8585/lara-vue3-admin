<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { shorten } from "@/support/helpers";
import type { Col } from "@/types/data-table";
import { onMounted } from "vue";
import CreateDialog from "./CreateDialog.vue";
import EditDialog from "./EditDialog.vue";
import FilterForm from "./FilterForm.vue";

import { useTagsStore } from "@/stores/tags";
import { useCategoriesStore } from "@/stores/categories";
import AdminTable from "@/components/AdminTable.vue";

const posts = usePostsStore();
const url = import.meta.env.VITE_API_URL + "/api/v1/posts";

const columns: Array<Col> = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row: { id: "string" }) => row.id,
    format: (val: "string") => `${val}`,
    sortable: true,
  },
  {
    name: "title",
    align: "left",
    label: "Title",
    field: "title",
    format: (val: "string") => shorten(val, 3, ""),
    sortable: true,
  },
];

const tags = useTagsStore();
const cats = useCategoriesStore();
onMounted(async () => {
  await tags.getAllTags();
  await cats.getAllCategories();
});
</script>

<template>
  <app-layout>
    <div class="mb-5">
      <AdminTable
        tableName="Posts"
        :FilterForm="FilterForm"
        :CreateDialog="CreateDialog"
        :EditDialog="EditDialog"
        :url="url"
        :columns="columns"
        :items="posts"
      >
      </AdminTable>
    </div>
  </app-layout>
</template>

<style></style>
