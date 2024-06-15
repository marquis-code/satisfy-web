import { axiosInstance } from "./axios.config";

export const adsApiFactory = {
  $_create_ads(payload: Record<string, any>) {
    return axiosInstance.post("/sponsored-ads", payload);
  },

  $_update_ads(id: string | number, payload: Record<string, any>) {
    return axiosInstance.patch(`/sponsored-ads/${id}`, payload);
  },

  $_fetch_ads() {
    return axiosInstance.get("/sponsored-ads");
  },

  $_fetch_ads_by_id(id: string | number) {
    return axiosInstance.get(`/sponsored-ads/${id}`);
  },

  $_delete_ads(id: string | number) {
    return axiosInstance.delete(`/sponsored-ads/${id}`);
  },
};
