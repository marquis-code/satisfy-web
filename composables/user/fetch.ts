import { userApiFactory } from "@/apiFactory/users";

export const useFetchUsers = () => {
  const usersList = ref([]) as any;
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });
  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUsersList(pagination.value);
      usersList.value = response.data.result;
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
      fetchUsers();
    }
  );

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };

  return { fetchUsers, usersList, loading, pagination };
};
