<template>
  <div class="flex justify-center items-center">
    <transition name="fade" mode="out-in">
      <div :key="currentImage">
        <img
          v-if="currentImage === 1"
          class="lg:h-60"
          src="@/assets/img/first-iteration.png"
          alt="First Iteration"
        />
        <img
          v-if="currentImage === 2"
          class="lg:h-60"
          src="@/assets/img/second-iteration.png"
          alt="Second Iteration"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentImage = ref(1); // Keeps track of the current image
let intervalId: NodeJS.Timeout;

onMounted(() => {
  intervalId = setInterval(() => {
    // Switch between images 1 and 2
    currentImage.value = currentImage.value === 1 ? 2 : 1;
  }, 3000); // Change image every 3 seconds
});

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-in;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
