<script lang="ts" setup>
import { ref } from "vue";

import axiosClient from "@/support/axiosClient";

const props = defineProps<{
  url: string;
}>();

const emit = defineEmits(["deleted"]);

const delConfirmShow = ref(false);
const deleteId = ref<any>(null);
const deleteTxt = ref("");
const deleteError = ref<any>(null);

function deleteConfirm(id: number, txt = "") {
  deleteError.value = null;
  delConfirmShow.value = true;
  deleteId.value = id;
  deleteTxt.value = `Are you sure you want to delete '${txt}' ?`;
}

function deleteRow() {
  axiosClient
    .delete(`${props.url}/${deleteId.value}`)
    .then(function (res) {
      //      tableRef.value.requestServerInteraction();
      emit("deleted");
      const msg = res.data.message;
      delConfirmShow.value = false;

      console.log(msg);
    })
    .catch(function (error) {
      if (error.response.status == 403) {
        deleteError.value = "Unauthorized action";
      }

      if (error.response.data.errors) {
        console.log(error.response.data.errors);
        //  deleteError.value = error.response.data.errors;
      }
    });
}

defineExpose({
  deleteConfirm,
});
</script>

<template>
  <q-dialog v-model="delConfirmShow">
    <q-card>
      <q-banner
        v-if="deleteError"
        class="text-center text-lg mt-5 rounded text-white bg-red mr-4 ml-4 mb-4"
      >
        <div class="text-lg">
          {{ deleteError }}
        </div>
      </q-banner>
      <q-card-section class="row items-center"> {{ deleteTxt }}</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Ok" color="primary" @click="deleteRow" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
