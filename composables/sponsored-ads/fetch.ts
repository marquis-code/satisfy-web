import { adsApiFactory } from "@/apiFactory/ads";

export const useGetAllSponsoredAds = () => {
  const loading = ref(false);
  const ads = ref([
    {
      id: 1,
      client_name: "Storipod",
      file_upload:
        "https://img.freepik.com/free-photo/front-view-young-woman-posing-with-confetti_23-2150402964.jpg?t=st=1718420568~exp=1718424168~hmac=ee731e48c2399579b32467e08b69825e46a7cb55f4213572397ed1661aa6d5ac&w=2000",
      target_link: "https://www.tfp.is/",
      start_date: "22-56-2024",
      end_date: "25-23-2025",
    },
  ]) as any;
  const getAllSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_fetch_ads();
      ads.value = response.data;
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

  return { getAllSponsoredAds, ads, loading };
};
