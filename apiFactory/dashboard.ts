import { axiosInstance } from "./axios.config";

export const dashboardApiFactory = {
  getDashboardSummary(metaObj: any) {
    return axiosInstance.get(`/user/dashboard-totals?showAll=${metaObj.showAll}&startDate=${metaObj.startDate}&endDate=${metaObj.endDate}`);
  },
};
