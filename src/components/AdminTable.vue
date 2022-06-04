<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import usePagination from "@/composables/pagination";

import useCreateRecord from "@/composables/createRecord";
import useEditRecord from "@/composables/editRecord";
import useAddActionsColumn from "@/composables/actionsColumn";
import DeleteDialog from "@/components/DeleteDialog.vue";

const props = defineProps<{
  tableName: string;
  columns: Array;
  items: any;
  url: string;
  CreateDialog: any;
  EditDialog: any;
  FilterForm: any;
}>();

const tableRef = ref();
const { editDialRef, editRow, editSendHandler } = useEditRecord(
  tableRef,
  props.url
);

const { createDialRef, createDialog, createSendHandler } = useCreateRecord(
  tableRef,
  props.url
);
const deleteDialogRef = ref();
const { meta, pagination, onRequest, loading, onFilterSend } =
  await usePagination(props.items, tableRef);

function onDeletedHandler() {
  tableRef.value.requestServerInteraction();
}
let cols = useAddActionsColumn(props.columns, meta);
</script>
<template>
  <div class="flex justify-between mb-5">
    <div class="" style="width: 350px">
      <component :is="FilterForm" @send="onFilterSend" />
    </div>
    <div class="">
      <q-btn
        v-if="meta.can_create"
        color="primary"
        label="Create"
        @click="createDialog"
      />
    </div>
  </div>
  <component :is="CreateDialog" ref="createDialRef" @send="createSendHandler" />
  <component :is="EditDialog" ref="editDialRef" @send="editSendHandler" />
  <q-table
    ref="tableRef"
    :rows-per-page-options="[5, 10, 15, 20]"
    v-model:pagination="pagination"
    :title="tableName"
    :loading="loading"
    :rows="items.data"
    :columns="cols"
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
          @click="deleteDialogRef.deleteConfirm(params.row.id, params.row.name)"
        />
      </q-td>

      <DeleteDialog
        :url="url"
        ref="deleteDialogRef"
        @deleted="onDeletedHandler"
      />
    </template>
  </q-table>
</template>
