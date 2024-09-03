import { userApiFactory } from "@/apiFactory/users";

export const useFetchReferalls = () => {
  const referralList = ref([]);
  const userId = useRoute().params.id;
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 100,
    pages: 0,
  });
  const fetchReferalls = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getRefferals(userId, pagination.value);
      referralList.value = response.data.result || [];
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
    () => {
      fetchReferalls();
    }
  );

  return { fetchReferalls, pagination, referralList, loading };
};
