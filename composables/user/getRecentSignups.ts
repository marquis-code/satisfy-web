// composables/user/getRecentSignups.ts
import { useFetchUsers } from '@/composables/user/fetch'
export function useRecentSignups() {
  const { fetchUsers, usersList, loading } = useFetchUsers();
  
  const recentSignups = computed(() => {
    return usersList.value
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  });

  // Fetch the users when the composable is used
  fetchUsers();

  return {
    recentSignups,
    loading
  };
}
