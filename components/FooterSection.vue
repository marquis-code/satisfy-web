<template>
  <footer class="bg-gray-100">
    <div class="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
      <div class="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
        <a @click.prevent="scrollToTop"
          class="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
          href="#MainContent">
          <span class="sr-only">Back to top</span>

          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clip-rule="evenodd" />
          </svg>
        </a>
      </div>

      <div class="lg:flex lg:items-end lg:justify-between">
        <div>
          <div class="flex justify-center text-teal-600 lg:justify-start">
            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="">
          </div>

          <p class="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
            Accelerate your
            digital growth with Buildr.
          </p>
        </div>

        <ul class="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#about-section"> About </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#services-section"> Services </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#projects"> Projects </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#contact-section"> Contact us </a>
          </li>
        </ul>
      </div>

      <p class="mt-12 text-center text-sm text-gray-500 lg:text-right">
        Copyright &copy; Buildr 2022. All rights reserved.
      </p>
    </div>
  </footer>
</template>


<script setup lang="ts">
const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>