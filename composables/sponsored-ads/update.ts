import { adsApiFactory } from "@/apiFactory/ads";

export const useUpdateSponsoredAds = () => {
  const loading = ref(false);
  const payload = ref({
    id: "",
    client_name: "",
    file: "",
    target_link: "",
    start_date: "",
    end_date: "",
  });
  const updateSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_update_ads(payload.value.id, payload.value);
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

  return { updateSponsoredAds, payload, loading };
};
