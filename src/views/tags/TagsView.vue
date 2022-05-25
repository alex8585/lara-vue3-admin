<script setup lang="ts">
import { useTagsStore } from "@/stores/tags";
import { shorten } from "@/support/helpers";
import { Col } from "@/types/data-table";

import { ref } from "vue";
import { usePagination } from "@/composables/pagination.ts";
const tags = useTagsStore();
const { pagination, onRequest, loading, filter } = usePagination(tags);
const tableRef = ref();

function onFilterSend(form) {
  filter.value = form.value;
  pagination.value.page = 1;
  tableRef.value.requestServerInteraction();
}
const columns: Array<Col> = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    format: (val) => shorten(val, 3, ""),
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
</script>

<template>
  <div class="mb-5">
    <div class="head-buttons">
      <div class="" style="width: 350px">
        <Filter @send="onFilterSend" />
      </div>
    </div>
  </div>
  <q-table
    ref="tableRef"
    :rows-per-page-options="[5, 10, 15, 20]"
    v-model:pagination="pagination"
    title="Tags"
    :loading="loading"
    :rows="tags.data"
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
</template>

<style></style>
