import { computed, ref } from 'vue';

export function useDateRange() {
  const dateRange = ref<[string, string] | null>(null);

  const differenceInDays = computed(() => {
    if (!dateRange.value) return 0;

    const [start, end] = dateRange.value;
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    if (isNaN(startDate) || isNaN(endDate) || endDate < startDate) return 0;

    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  });

  return { dateRange, differenceInDays };
}
