import type { Ref } from "vue";
import axios from "axios";

import { useQuasar } from "quasar";
export default function useDeleteRecord(tableRef: Ref, url: string) {
  const $q = useQuasar();

  function deleteConfirm(params: any) {
    $q.dialog({
      title: "Delete confirmation",
      message: "Are you sure you want to delete this item?",
      cancel: true,
    }).onOk(() => {
      deleteRow(params);
    });
  }

  function deleteRow(params: any) {
    const { row } = params;
    axios
      .delete(`${url}/${row.id}`)
      .then(function (res) {
        tableRef.value.requestServerInteraction();
        const msg = res.data.message;
        console.log(msg);
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          console.log(error.response.data.errors);
        }
      });
  }

  return { deleteConfirm, deleteRow };
}
