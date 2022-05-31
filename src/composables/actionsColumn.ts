import type { Ref } from "vue";
import { computed } from "vue";

export default function useAddActionsColumn(cols: any, meta: Ref) {
  const columns = computed(() => {
    const columns = [...cols];
    if (meta.value.can_update || meta.value.can_delete) {
      columns.push({
        name: "actions",
        sortable: false,
        label: "Actions",
        field: "",
        align: "center",
      });
    }
    return columns;
  });

  return columns;
}
