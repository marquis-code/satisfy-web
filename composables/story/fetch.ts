import { storyApiFactory } from "@/apiFactory/story";
import { ref, computed, watch } from "vue";

export const useFetchStories = () => {
  const storiesList = ref([]) as any;
  const loading = ref(false);
  const searchQuery = ref<string>("");
  const queryObj = ref({
    sortBy: "createdAt",
    orderBy: "desc",
  }) as any;

  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });

  const paginationOriginal = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });

  const isOriginal = ref<boolean | null>(null);

  const fetchStories = async () => {
    loading.value = true;
    try {
      const currentPagination = isOriginal.value
        ? paginationOriginal.value
        : pagination.value;

      const response = await storyApiFactory.getAllStories(
        queryObj.value,
        currentPagination,
        isOriginal.value
      );
      storiesList.value = response?.data?.result || [];

      if (isOriginal.value) {
        paginationOriginal.value = response.data.metadata;
      } else {
        pagination.value = response.data.metadata;
      }
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchOriginalStories = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory.getAllStories(
        queryObj.value,
        paginationOriginal.value,
        true
      );
      paginationOriginal.value = response.data.metadata;
      storiesList.value = response?.data?.result || [];
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    } finally {
      loading.value = false;
    }
  };

  const filteredStories = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return storiesList.value;

    return storiesList.value.filter(
      (story) =>
        story?.title.toLowerCase().includes(query) ||
        story?.tags.toLowerCase().includes(query) ||
        story?.user?.fname.toLowerCase().includes(query) ||
        story?.user?.lname.toLowerCase().includes(query)
    );
  });

  watch(
    () =>
      isOriginal.value ? paginationOriginal.value.page : pagination.value.page,
    (newPage) => {
      setPaginationObj(newPage);
      fetchStories();
    }
  );

  watch(
    () => queryObj.value.sortBy,
    (newSortBy, oldSortBy) => {
      if (newSortBy !== oldSortBy) {
        fetchStories();
      }
    }
  );

  watch(
    () => queryObj.value.orderBy,
    (newOrderBy, oldOrderBy) => {
      if (newOrderBy !== oldOrderBy) {
        fetchStories();
      }
    }
  );

  const setPaginationObj = (val: number) => {
    if (isOriginal.value) {
      paginationOriginal.value.page = val;
    } else {
      pagination.value.page = val;
    }
  };

  return {
    fetchStories,
    fetchOriginalStories,
    storiesList,
    loading,
    pagination,
    paginationOriginal,
    searchQuery,
    filteredStories,
    queryObj,
    isOriginal,
  };
};
