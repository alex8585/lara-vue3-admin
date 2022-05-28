<script setup lang="ts">
import { usePostsStore } from "@/stores/posts";
import { shorten } from "@/support/helpers";
import type { Col } from "@/types/data-table";
import { ref, onMounted } from "vue";
import usePagination from "@/composables/pagination";
import useCreateRecord from "@/composables/createRecord";
import useEditRecord from "@/composables/editRecord";
import useDeleteRecord from "@/composables/deleteRecord";
import CreateDialog from "./CreateDialog.vue";
import EditDialog from "./EditDialog.vue";
const posts = usePostsStore();
const tableRef = ref();
const url = import.meta.env.VITE_API_URL + "/api/v1/posts";

const { pagination, onRequest, loading, onFilterSend } = usePagination(
  posts,
  tableRef
);
const { editDialRef, editRow, editSendHandler } = useEditRecord(tableRef, url);
const { deleteConfirm } = useDeleteRecord(tableRef, url);
const { createDialRef, createDialog, createSendHandler } = useCreateRecord(
  tableRef,
  url
);

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
  {
    name: "actions",
    sortable: false,
    label: "Actions",
    field: "",
    align: "center",
  },
];

onMounted(async () => {
  //await cats.getAllCategories();
});
</script>

<template>
  <app-layout>
    <div class="mb-5">
      <div class="head-buttons">
        <div class="" style="width: 350px">
          <FilterForm @send="onFilterSend" />
        </div>
        <div>
          <!-- <q-input -->
          <!--   v-model="queryForm.filter.q" -->
          <!--   label="Search" -->
          <!--   @keyup.enter="onSearch" -->
          <!-- > -->
          <!--   <template #append> -->
          <!--     <q-icon name="search" class="cursor-pointer" @click="onSearch" /> -->
          <!--   </template> -->
          <!-- </q-input> -->
        </div>

        <div class="q-pa-md text-right">
          <q-btn color="primary" label="Create" @click="createDialog" />
        </div>
      </div>
    </div>
    <q-table
      ref="tableRef"
      :rows-per-page-options="[5, 10, 15, 20]"
      v-model:pagination="pagination"
      title="Posts"
      :loading="loading"
      :rows="posts.data"
      :columns="columns"
      row-key="id"
      @request="onRequest"
      :binary-state-sort="true"
    >
      <template #body-cell-thumb="params">
        <q-td :props="params">
          <img :src="params.row.thumb" />
        </q-td>
      </template>

      <template #body-cell-actions="params">
        <q-td :props="params">
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="edit"
            @click="editRow(params)"
          />
          <q-btn
            dense
            round
            flat
            color="grey"
            icon="delete"
            @click="deleteConfirm(params)"
          />
        </q-td>
      </template>
    </q-table>
    <CreateDialog ref="createDialRef" @send="createSendHandler" />
    <EditDialog ref="editDialRef" @send="editSendHandler" />
  </app-layout>
</template>

<style></style>
