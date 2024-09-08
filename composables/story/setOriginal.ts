import { storyApiFactory } from "@/apiFactory/story";
import { useFetchStories } from "@/composables/story/fetch";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { ref } from "vue";
const { fetchStories } = useFetchStories();

export const useSetOriginal = () => {
  const payload = ref({
    IsOriginal: true,
    storyId: "",
  });
  const loading = ref(false);
  const setOriginal = async () => {
    Swal.fire({
      icon: "question",
      title: "Please Confirm",
      text: `${
        payload.value.IsOriginal
          ? "Are you sure you want to set pod as Storipod original"
          : "Are you sure you want to remove pod from Storipod original"
      }`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Continue.",
      cancelButtonText: "Nah, Just kidding",
      preConfirm: async () => {
        return await storyApiFactory
          .setOriginal(payload.value)
          .then(async (response) => {
            if (typeof response !== "undefined") {
              await fetchStories();
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Action successful!",
                showCloseButton: true,
              });
            }
          })
          .catch((error: any) => {
            const msg =
              error.response && error.response.data
                ? error.response.data.message
                : "An error occurred, please try again.";
            Swal().showValidationMessage(msg);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      console.log(result, "result");
      // if (result.isConfirmed) {
      //   await fetchStories()
      //   Swal.fire({
      //     icon: "success",
      //     title: "Success",
      //     text: "Action successful!",
      //     showCloseButton: true,
      //   });
      // }
    });
  };

  const setPayloadObj = (data) => {
    payload.value.IsOriginal = data.value.isOriginal;
    payload.value.storyId = data.value.storyId;
  };

  return { setOriginal, payload, loading, setPayloadObj };
};
