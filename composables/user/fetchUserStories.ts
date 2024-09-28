import { storyApiFactory } from "@/apiFactory/story";

export const useFetchUserStories = () => {
  const userStoriesList = ref([]) as any;
  const queryObj = ref({
    sortBy: 'createdAt',
    orderBy: 'desc'
  }) as any

  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });
  const route = useRoute();
  const loading = ref(false);
  const selectedUserId = ref('') as any
  const fetchUserStories = async (userId?: string) => {
    selectedUserId.value = userId
    loading.value = true;
    try {
      const response = await storyApiFactory.getStoryByUserId(route.params.id || userId, queryObj.value, pagination.value);
      userStoriesList.value = response?.data?.result ?? [];
      pagination.value = response.data.metadata;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

 
  watch(
    () => pagination.value.page,
    (newPage) => {
      setPaginationObj(newPage);
      fetchUserStories(selectedUserId.value);
    }
  );

  watch(
    () => queryObj.value.sortBy,
    (newSortBy, oldSortBy) => {
      if (newSortBy !== oldSortBy) {
        fetchUserStories(selectedUserId.value);
      }
    }
  );

  watch(
    () => queryObj.value.orderBy,
    (newOrderBy, oldOrderBy) => {
      if (newOrderBy !== oldOrderBy) {
        fetchUserStories(selectedUserId.value);
      }
    }
  );

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };


  return { fetchUserStories, userStoriesList, loading, pagination, queryObj };
};