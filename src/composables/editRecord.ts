import { ref } from "vue";
import type { Ref } from "vue";

import axiosClient from "@/support/axiosClient";
export default function useEditRecord(tableRef: Ref, url: string) {
  const editDialRef = ref();

  function editRow(params: any) {
    const { row } = params;
    editDialRef.value.clearErrors();
    editDialRef.value.set(row);
    editDialRef.value.show();
  }

  function editSendHandler(form: Ref) {
    axiosClient
      .post(`${url}/${form.value.id}`, form.value)
      .then(function (res) {
        const msg = res.data.message;
        console.log(msg);
        tableRef.value.requestServerInteraction();
        editDialRef.value.reset();
        editDialRef.value.hide();
      })
      .catch(function (error) {
        if (error.response.status == 403) {
          editDialRef.value.setErrors({ global: "Unauthorized action." });
        }

        if (error.response.data.errors) {
          editDialRef.value.setErrors(error.response.data.errors);
        }
      });
  }
  return { editDialRef, editRow, editSendHandler };
}
