<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories";
import { shorten } from "@/support/helpers";
import type { Col } from "@/types/data-table";
import { ref } from "vue";
import usePagination from "@/composables/pagination";
import useCreateRecord from "@/composables/createRecord";
import useEditRecord from "@/composables/editRecord";

import useAddActionsColumn from "@/composables/actionsColumn";
import DeleteDialog from "@/components/DeleteDialog.vue";
import CreateDialog from "./CreateDialog.vue";
import EditDialog from "./EditDialog.vue";
const categories = useCategoriesStore();

const tableRef = ref();

const deleteDialogRef = ref();
const url = import.meta.env.VITE_API_URL + "/api/v1/categories";

const { meta, pagination, onRequest, loading, onFilterSend } =
  await usePagination(categories, tableRef);
const { editDialRef, editRow, editSendHandler } = useEditRecord(tableRef, url);
const { createDialRef, createDialog, createSendHandler } = useCreateRecord(
  tableRef,
  url
);

const cols: Array<Col> = [
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
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    format: (val: "string") => shorten(val, 3, ""),
    sortable: true,
  },
];

let columns = useAddActionsColumn(cols, meta);

function onDeletedHandler() {
  tableRef.value.requestServerInteraction();
}
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
          <q-btn
            v-if="meta.can_create"
            color="primary"
            label="Create"
            @click="createDialog"
          />
        </div>
      </div>
    </div>
    <q-table
      ref="tableRef"
      :rows-per-page-options="[5, 10, 15, 20]"
      v-model:pagination="pagination"
      title="Categories"
      :loading="loading"
      :rows="categories.data"
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
            v-if="meta.can_update"
            dense
            round
            flat
            color="grey"
            icon="edit"
            @click="editRow(params)"
          />
          <q-btn
            v-if="meta.can_delete"
            dense
            round
            flat
            color="grey"
            icon="delete"
            @click="
              deleteDialogRef.deleteConfirm(params.row.id, params.row.name)
            "
          />
        </q-td>
      </template>
    </q-table>
    <CreateDialog ref="createDialRef" @send="createSendHandler" />
    <EditDialog ref="editDialRef" @send="editSendHandler" />
    <DeleteDialog
      :url="url"
      ref="deleteDialogRef"
      @deleted="onDeletedHandler"
    />
  </app-layout>
</template>

<style></style>
