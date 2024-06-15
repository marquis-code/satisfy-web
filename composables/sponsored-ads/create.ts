import { adsApiFactory } from "@/apiFactory/ads";

export const useCreateSponsoredAds = () => {
  const loading = ref(false);
  const payload = ref({
    client_name: "",
    file: "",
    target_link: "",
    start_date: "",
    end_date: "",
  });
  const createSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_create_ads(payload);
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

  return { createSponsoredAds, payload, loading };
};
