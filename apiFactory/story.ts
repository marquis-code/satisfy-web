import { axiosInstance } from "./axios.config";

export const storyApiFactory = {
  getAllStories() {
    return axiosInstance.get(
      "/story?sortBy=date&reported=true&page=1&limit=25"
    );
  },
  getAllStoryById(id: string) {
    return axiosInstance.get(`/story/${id}`);
  },
  getAllStorySummary() {
    return axiosInstance.get("/story/summary");
  },
  getAllStoryEngagementSummary() {
    return axiosInstance.get("/story/engagement-summary");
  },
  getStorySideComments(slideId: string) {
    return axiosInstance.get(
      `/slide-comment?page=1&limit=10&slideId=${slideId}&search=`
    );
  },
};
