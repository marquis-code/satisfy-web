// import { userApiFactory } from "@/apiFactory/users";

// function debounce(fn: Function, delay: number) {
//   let timeoutId: number | undefined;
//   return function (...args: any) {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// }


// export const useFetchUsers = () => {
//   const usersList = ref([]) as any;
//   const loading = ref(false);
//   const searchQuery = ref<string>("");
//   const pagination = ref({
//     page: 1,
//     perPage: 10,
//     total: 0,
//     pages: 0,
//   });
//   const fetchUsers = async () => {
//     loading.value = true;
//     try {
//       const response = await userApiFactory.getUsersList(pagination.value, searchQuery.value);
//       usersList.value = response.data.result;
//       pagination.value = response.data.metadata;
//     } catch (error: any) {
//       useNuxtApp().$toast.error(error.message, {
//         autoClose: 5000,
//         dangerouslyHTMLString: true,
//       });
//       return error;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const filteredUsers = computed(() => {
//     const query = searchQuery.value.trim().toLowerCase();
//     if (!query) return usersList.value;

//     return usersList.value.filter(
//       (user) =>
//         user.fname.toLowerCase().includes(query) ||
//         user.lname.toLowerCase().includes(query)
//     );
//   });

//   const debouncedFetchUsers = debounce(fetchUsers, 300);

//   watch(searchQuery, (newQuery) => {
//     if (newQuery) {
//       setPaginationObj(1); // Reset to the first page when search query changes
//       debouncedFetchUsers();
//     }
//   });


//   // watch(
//   //   searchQuery,
//   //   (newPage) => {
//   //     setPaginationObj(newPage);
//   //     fetchUsers();
//   //   }
//   // );

//   watch(
//     () => pagination.value.page,
//     (newPage) => {
//       setPaginationObj(newPage);
//       fetchUsers();
//     }
//   );

//   const setPaginationObj = (val: any) => {
//     pagination.value.page = val;
//   };

//   return {
//     fetchUsers,
//     usersList,
//     loading,
//     pagination,
//     searchQuery,
//     filteredUsers,
//   };
// };

// import { userApiFactory } from "@/apiFactory/users";
// // import { ref, computed, watch } from "vue";
// // import { useNuxtApp } from "#app";

// // Debounce function to limit the rate at which a function can be called
// function debounce(fn: Function, delay: number) {
//   let timeoutId: number | undefined;
//   return function (...args: any) {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// }

// export const useFetchUsers = () => {
//   const usersList = ref([]) as any;
//   const loading = ref(false);
//   const searchQuery = ref<string>("");
//   const pagination = ref({
//     page: 1,
//     perPage: 10,
//     total: 0,
//     pages: 0,
//   });

//   const fetchUsers = async () => {
//     loading.value = true;
//     try {
//       const response = await userApiFactory.getUsersList(pagination.value, searchQuery.value);
//       console.log(response, 'response here');
//       usersList.value = response.data.result;
//       pagination.value = response.data.metadata;
//     } catch (error: any) {
//       useNuxtApp().$toast.error(error.message, {
//         autoClose: 5000,
//         dangerouslyHTMLString: true,
//       });
//       return error;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const filteredUsers = computed(() => {
//     const query = searchQuery.value.trim().toLowerCase();
//     if (!query) return usersList.value;

//     return usersList.value.filter(
//       (user) =>
//         user.fname.toLowerCase().includes(query) ||
//         user.lname.toLowerCase().includes(query)
//     );
//   });

//   const debouncedFetchUsers = debounce(fetchUsers, 300);

//   watch(searchQuery, (newQuery) => {
//     if (newQuery) {
//       setPaginationObj(1); // Reset to the first page when search query changes
//       debouncedFetchUsers();
//     }
//   });

//   watch(
//     () => pagination.value.page,
//     (newPage) => {
//       fetchUsers();
//     }
//   );

//   const setPaginationObj = (val: any) => {
//     pagination.value.page = val;
//   };

//   return {
//     fetchUsers,
//     usersList,
//     loading,
//     pagination,
//     searchQuery,
//     filteredUsers,
//   };
// };


import { userApiFactory } from "@/apiFactory/users";
import { ref, watch } from "vue";
import { useNuxtApp } from "#app";

// Debounce function to limit the rate at which a function can be called
function debounce(fn: Function, delay: number) {
  let timeoutId: number | undefined;
  return function (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const useFetchUsers = () => {
  const usersList = ref([]) as any;
  const loading = ref(false);
  const searchQuery = ref<string>("");
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUsersList(pagination.value, searchQuery.value);
      usersList.value = response.data.result;
      pagination.value = response.data.metadata;
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

  const debouncedFetchUsers = debounce(fetchUsers, 300);

  watch(searchQuery, (newQuery) => {
    setPaginationObj(1); // Reset to the first page when search query changes
    debouncedFetchUsers();
  });

  watch(
    () => pagination.value.page,
    () => {
      fetchUsers();
    }
  );

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };

  return {
    fetchUsers,
    usersList,
    loading,
    pagination,
    searchQuery,
  };
};
