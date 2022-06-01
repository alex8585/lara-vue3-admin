<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { shorten } from "@/support/helpers";
import type { Col } from "@/types/data-table";
import CreateDialog from "./CreateDialog.vue";
import EditDialog from "./EditDialog.vue";
import FilterForm from "./FilterForm.vue";

import AdminTable from "@/components/AdminTable.vue";
const users = useUsersStore();
const url = import.meta.env.VITE_API_URL + "/api/v1/users";

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
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    format: (val: "string") => shorten(val, 3, ""),
    sortable: true,
  },
];
</script>

<template>
  <app-layout>
    <div class="mb-5">
      <AdminTable
        tableName="Users"
        :FilterForm="FilterForm"
        :CreateDialog="CreateDialog"
        :EditDialog="EditDialog"
        :url="url"
        :columns="columns"
        :items="users"
      >
      </AdminTable>
    </div>
  </app-layout>
</template>

<style></style>
