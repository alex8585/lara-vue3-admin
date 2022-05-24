<script setup lang="ts">
import { useTagsStore } from "@/stores/tags";
import { ref, onMounted, onUpdated } from "vue";
import { shorten } from "@/support/helpers";
//import { useRouter } from "vue-router";
import { Col } from "@/types/data-table";

const tags = useTagsStore();
//const router = useRouter();
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
const defaultPerPage = 5;

const pagination = ref({
  sortBy: "id",
  descending: true,
  page: 1,
  rowsPerPage: defaultPerPage,
  rowsNumber: tags.meta.rowsNumber,
});

//onUpdated(() => {});

const loading = ref(false);

onMounted(async () => {
  await tags.fetchTags(1, defaultPerPage);
  pagination.value.rowsNumber = tags.meta.rowsNumber;
});

async function onRequest(props) {
  loading.value = true;
  let { page, rowsPerPage, sortBy, descending } = props.pagination;

  if (
    sortBy != pagination.value.sortBy ||
    descending != pagination.value.descending
  ) {
    page = pagination.value.page;
  }

  await tags.fetchTags(page, rowsPerPage, sortBy, descending);

  pagination.value.page = page;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.rowsNumber = tags.meta.rowsNumber;
  loading.value = false;
}
</script>

<template>
  <q-table
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
