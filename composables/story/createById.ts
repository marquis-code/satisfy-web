import { storyApiFactory } from "@/apiFactory/story";
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const loading = ref(false);
const router = useRouter()
const payload = ref({
  isPublished: true,
  title: "",
  tags: "",
  userId: '',
  coverImage: '',
  storyCategories: [],
  slides: [],
}) as any;
const descriptionLength = ref(700) as any;

export const useCreateUserStory = () => {
  const route = useRoute()
  const createUserStory = async () => {
    loading.value = true;
    try {
      console.log(payload.value, 'value here')
      const response = await storyApiFactory.createUserStory(payload.value);
      router.push(`/dashboard/users/${route.params.id}`)
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

  const disabled = computed(() => {
    return !(payload.value.title && payload.value.slides.length);
  });

  const setPayload = (data: any) => {
    payload.value.isPublished = data.isPublished;
    payload.value.title = data.title;
    payload.value.tags = data.tags;
    payload.value.userId = data.userId;
    payload.value.storyCategories = data.storyCategories;
    payload.value.slides = data.slides;
    payload.value.coverImage = data.coverImage;
  };

  return { createUserStory, payload, loading, disabled, descriptionLength, setPayload };
};
