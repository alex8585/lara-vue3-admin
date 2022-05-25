import { ref, onMounted } from "vue";

interface PaginationProos {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}

export function usePagination(items: any, defaultPerPage = 5) {
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
    await items.fetchTags(1, defaultPerPage);
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

    await items.fetchTags(page, rowsPerPage, sortBy, descending, filter);

    pagination.value.page = page;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.rowsNumber = items.meta.rowsNumber;
    loading.value = false;
  }
  return { pagination, onRequest, loading, filter };
}
