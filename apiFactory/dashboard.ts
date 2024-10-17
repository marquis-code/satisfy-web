import { axiosInstance } from "./axios.config";

export const dashboardApiFactory = {
  getDashboardSummary(metaObj: any) {
    return axiosInstance.get(`/user/dashboard-totals?showAll=${metaObj.showAll}&startDate=${metaObj.startDate}&endDate=${metaObj.endDate}`);
  },
  getDashboardDetailedSummary(metaObj: any) {
    return axiosInstance.get(`/user/dashboard-summary?range=${metaObj.range}`);
  },
  getAndroidStat() {
    return axiosInstance.get('/app-stat/andriod');
  },
  getIosStat() {
    return axiosInstance.get('/app-stat/ios');
  },
};
