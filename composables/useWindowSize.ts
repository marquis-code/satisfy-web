import { ref, onMounted, onUnmounted } from 'vue';

export function useWindowSize() {
  const width = ref(0);
  const height = ref(0);

  if (process.client) {
    // Set initial values on client side
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    
    // Update on resize
    function handleResize() {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  }

  return { width, height };
}