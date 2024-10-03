import { adsApiFactory } from "@/apiFactory/ads";
import { generateUUID } from "@/utils/generateUUID";

export const useCreateSponsoredAds = () => {
  const loading = ref(false);
  const payload = ref({
    clientName: "",
    email: "",
    phone: "",
    imageUrl: "",
    targetLink: "",
    startDate: "",
    endDate: "",
    status: "active",
    // status: "",
    // userId: "",
    // userId: generateUUID(),
    audience: "auto",
    amountPaid: 0,
    countryCode: "NG",
    sponsoredAdCategories: [],
  });
  const createSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_create_ads(payload.value);
      useNuxtApp().$toast.success("Ad was created successfully", {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return response;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      console.log('hhbb', error)
      return error;
    } finally {
      loading.value = false;
    }
  };

  const setSponsoredAds = (data: any) => {
    payload.value.clientName = data.clientName;
    payload.value.email = data.email;
    payload.value.phone = data.phone;
    payload.value.imageUrl = data.imageUrl;
    payload.value.targetLink = data.targetLink;
    payload.value.startDate = data.startDate;
    payload.value.endDate = data.endDate;
    payload.value.status  = data.status
    // payload.value.userId = data.userId ;
    payload.value.audience = data.audience || "auto";
    payload.value.amountPaid = data.amountPaid;
    payload.value.countryCode = data.countryCode || payload.value.countryCode;
    payload.value.sponsoredAdCategories = data.sponsoredAdCategories || [];
  };

  return { createSponsoredAds, payload, loading, setSponsoredAds };
};
