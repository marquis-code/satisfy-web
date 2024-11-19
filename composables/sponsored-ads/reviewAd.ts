import { adsApiFactory } from "@/apiFactory/ads";

export const useReviewAd = () => {
    const loading = ref(false);
    const payload = ref({
        status: "false",
        comment: ''
    })
    const adId = ref('')
    const reviewAd = async () => {
        try {
            const response = await adsApiFactory.$_review_ad(adId.value, payload.value);
            console.log(adId.value, payload.value)
            console.log(response);
            useNuxtApp().$toast.success('Ad updated successfully!', {
                autoClose: 5000,
                dangerouslyHTMLString: true,
              });
            return response
        } catch (error : any) {
            useNuxtApp().$toast.error(error.message, {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            return error;
        } finally {
            loading.value = false;
        }
    }
    return {reviewAd, loading, payload, adId};
}