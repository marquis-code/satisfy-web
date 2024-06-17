import { axiosInstance, storipodAxiosInstance } from "./axios.config";

export const storyApiFactory = {
  getAllStories(queryObj: {sortBy: string, orderBy: string}, metadata: { page: number; perPage: number }) {
    return axiosInstance.get(
      `/story?sortBy=${queryObj.sortBy}&page=${Number(metadata.page)}&perPage=${Number(metadata.perPage)}&userId=&orderBy=${queryObj.orderBy}&limit=`
    );
  },
  getStoryByUserId(userId: string | number) {
    return axiosInstance.get(`/story?userId=${userId}`);
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
  createUserStory(payload: any) {
    return axiosInstance.post('/story', payload);
  },
  deleteUserStory(id: string | number) {
    return storipodAxiosInstance.delete(`/stories/${id}`);
  },
};
