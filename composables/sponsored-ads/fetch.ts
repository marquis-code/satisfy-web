import { adsApiFactory } from "@/apiFactory/ads";

export const useGetAllSponsoredAds = () => {
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });
  const queryObj = ref({
    sortBy: 'createdAt',
    orderBy: 'desc'
  }) as any
  const ads = ref([]);
  const getAllSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_fetch_ads(queryObj.value, pagination.value); 
      ads.value = response?.data?.result  || [];
      console.log('ads value:', response);
      pagination.value = response.data.metadata;
      return response;
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
  watch([() => pagination.value.page, () => queryObj.value], () => {
    getAllSponsoredAds();
  });
  return { getAllSponsoredAds, ads, loading, pagination, queryObj, totalAds: computed(() => pagination.value.total)};
};
 