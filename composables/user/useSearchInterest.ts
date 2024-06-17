import { userApiFactory } from "@/apiFactory/users";

export const useFetchSearchInterest = () => {
  const interestList = ref<any[]>([]);
  const loading = ref(false);
  const pagination = ref({ page: 1, perPage: 10 }) as any;
  const payload = ref({ search: '' });

  const fetchInterest = async (searchTerm: string) => {
    loading.value = true;
    payload.value.search = searchTerm;
    try {
      const response = await userApiFactory.getUserInterestsBySearch({...pagination.value, search: payload.value.search });
      interestList.value = response.data || [];
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

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };

  return { fetchInterest, interestList, loading, pagination };
};
