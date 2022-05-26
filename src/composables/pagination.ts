import { ref, onMounted } from "vue";

import type { Ref } from "vue";
interface PaginationProos {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}

export default function usePagination(
  items: any,
  tableRef: Ref,
  defaultPerPage = 5
) {
  const loading = ref(false);
  const filter = ref({});

  const pagination = ref({
    sortBy: "id",
    descending: true,
    page: 1,
    rowsPerPage: defaultPerPage,
    rowsNumber: items.meta.rowsNumber,
  });

  onMounted(async () => {
    await items.fetchItems(1, defaultPerPage);
    pagination.value.rowsNumber = items.meta.rowsNumber;
  });

  async function onRequest(props: PaginationProos) {
    loading.value = true;
    const { rowsPerPage, sortBy, descending } = props.pagination;
    let page = props.pagination.page;
    if (
      sortBy != pagination.value.sortBy ||
      descending != pagination.value.descending
    ) {
      page = pagination.value.page;
    }

    await items.fetchItems(page, rowsPerPage, sortBy, descending, filter);

    pagination.value.page = page;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.rowsNumber = items.meta.rowsNumber;
    loading.value = false;
  }
  function onFilterSend(form: any) {
    filter.value = form.value;
    pagination.value.page = 1;
    tableRef.value.requestServerInteraction();
  }

  return { pagination, onRequest, loading, filter, onFilterSend };
}
