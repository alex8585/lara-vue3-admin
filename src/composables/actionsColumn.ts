import type { Ref } from "vue";
import { onMounted } from "vue";

export default function useAddActionsColumn(columns: Ref, meta: Ref) {
  onMounted(async () => {
    if (meta.value.can_update || meta.value.can_delete) {
      columns.value.push({
        name: "actions",
        sortable: false,
        label: "Actions",
        field: "",
        align: "center",
      });
    }
  });
}
