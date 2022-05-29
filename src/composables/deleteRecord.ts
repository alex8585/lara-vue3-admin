import type { Ref } from "vue";
import { ref } from "vue";

import axiosClient from "@/support/axiosClient";

export default function useDeleteRecord(tableRef: Ref, url: string) {
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
      .delete(`${url}/${deleteId.value}`)
      .then(function (res) {
        tableRef.value.requestServerInteraction();
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

  return { delConfirmShow, deleteConfirm, deleteRow, deleteTxt, deleteError };
}
