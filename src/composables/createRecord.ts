import { ref } from "vue";
import type { Ref } from "vue";
import axiosClient from "@/support/axiosClient";

export default function useCreateRecord(tableRef: Ref, url: string) {
  const createDialRef = ref();

  function createDialog() {
    createDialRef.value.reset();
    createDialRef.value.show();
  }

  function createSendHandler(form: any) {
    axiosClient
      .post(`${url}/`, form.value)
      .then(function (res) {
        const msg = res.data.message;
        console.log(msg);
        tableRef.value.requestServerInteraction();
        createDialRef.value.reset();
        createDialRef.value.hide();
      })
      .catch(function (error) {
        if (error.response.status == 403) {
          createDialRef.value.setErrors({ global: "Unauthorized action." });
        }
        if (error.response.data.errors) {
          createDialRef.value.setErrors(error.response.data.errors);
        }
      });
  }

  return { createDialRef, createDialog, createSendHandler };
}
