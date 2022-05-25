<script setup lang="ts">
import { useTagsStore } from "@/stores/tags";
import { shorten } from "@/support/helpers";
import { Col } from "@/types/data-table";

import axios from "axios";
import { ref } from "vue";
import { usePagination } from "@/composables/pagination.ts";
const tags = useTagsStore();
const { pagination, onRequest, loading, filter } = usePagination(tags);
const tableRef = ref();
const createDialRef = ref();
const editDialRef = ref();

const url = import.meta.env.VITE_API_URL + "/api/v1";
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

function onFilterSend(form) {
  filter.value = form.value;
  pagination.value.page = 1;
  tableRef.value.requestServerInteraction();
}

function createDialog() {
  createDialRef.value.reset();
  createDialRef.value.show();
}

function createSendHandler(form) {
  axios
    .post(`${url}/tags/`, form.value)
    .then(function (res) {
      let msg = res.data.message;
      console.log(msg);
      createDialRef.value.reset();
      createDialRef.value.hide();
    })
    .catch(function (error) {
      if (error.response.data.errors) {
        createDialRef.value.setErrors(error.response.data.errors);
      }
    });
}
</script>

<template>
  <div class="mb-5">
    <div class="head-buttons">
      <div class="" style="width: 350px">
        <Filter @send="onFilterSend" />
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
  <CreateDialog ref="createDialRef" @send="createSendHandler" />
  <!-- <EditDialog ref="editDialRef" @send="editSendHandler" /> -->
</template>

<style></style>
