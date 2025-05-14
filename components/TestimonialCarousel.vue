<template>
  <div class="pt-32  lg:px-8">
    <div class="text-center">
      <h4 class="text-sm font-semibold tracking-wide text-gray-500">TESTIMONIALS</h4>
      <h2 class="mt-2 text-3xl font-medium text-[#222222] text-gray-900 sm:text-4xl">What our clients are saying</h2>
    </div>
    <div class="relative mt-10 max-w-3xl mx-auto flex items-center">
      <!-- Carousel controls for desktop -->
      <button 
        @click="prevTestimonial" 
        class="absolute left-[-100px] hidden sm:block bg-[#444CE7] text-white p-2 rounded-full shadow hover:bg-[#444CE7] focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="relative w-full overflow-hidden">
        <transition-group name="testimonial" tag="div" class="flex">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index" 
            v-show="currentIndex === index" 
            class="flex-shrink-0 w-full relative overflow-hidden rounded-lg bg-[#161616] text-white shadow-lg px-6 lg:px-14 py-8 transition-all duration-700 ease-in-out">
            <svg width="40" height="40" viewBox="0 0 44 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 22.23C0 13.26 5.07 5.07 12.22 0L18.33 5.07C14.17 7.54 9.88 12.87 8.97 17.29C9.36 17.16 10.4 16.9 11.18 16.9C15.6 16.9 18.98 20.28 18.98 25.09C18.98 30.03 14.95 34.06 10.14 34.06C4.81 34.06 0 29.77 0 22.23ZM24.05 22.23C24.05 13.26 29.12 5.07 36.27 0L42.38 5.07C38.22 7.54 33.93 12.87 33.02 17.29C33.41 17.16 34.45 16.9 35.23 16.9C39.65 16.9 43.03 20.28 43.03 25.09C43.03 30.03 39 34.06 34.19 34.06C28.86 34.06 24.05 29.77 24.05 22.23Z" fill="white" fill-opacity="0.6"/>
            </svg>
            <div class="lg:text-lg leading-relaxed pt-2">&ldquo;{{ testimonial.message }}&rdquo;</div>
            <div class="mt-4 flex items-center">
              <img 
                :src="testimonial.image" 
                :alt="testimonial.name" 
                class="h-10 w-10 rounded-full border-2 border-white shadow"
              />
              <div class="ml-3">
                <p class="font-medium text-white text-sm">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-400">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Carousel controls for desktop -->
      <button 
        @click="nextTestimonial" 
        class="absolute right-[-100px] hidden sm:block bg-[#444CE7] text-white p-2 rounded-full shadow hover:bg-[#444CE7] focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Carousel dots for mobile -->
    <div class="mt-4 flex justify-center space-x-2 sm:hidden">
      <span 
        v-for="(testimonial, index) in testimonials" 
        :key="index" 
        @click="goToTestimonial(index)" 
        :class="{'bg-[#444CE7]': currentIndex === index, 'bg-gray-300': currentIndex !== index}" 
        class="h-2 w-2 rounded-full cursor-pointer"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import avatar from '@/assets/img/testimony-avatar.png'

const testimonials = ref([
  {
    message: "Buildr transformed our vision into reality, delivering a seamless app that's now essential to our operation. Their team nailed it from strategy to launch.",
    name: "Vivien",
    role: "Co-founder, Grabhub",
    image: avatar
  },
  {
    message: "Buildr transformed our vision into reality, delivering a seamless app that's now essential to our operation. Their team nailed it from strategy to launch.",
    name: "Vivien",
    role: "Co-founder, Grabhub",
    image: avatar
  },
  {
    message: "Buildr's expertise in app development propelled our project from an idea to a fully functional tool that's revolutionizing how we do business. Their approach was straightforward and effective.",
    name: "Winifred",
    role: "Business Developer, Homely",
    image: avatar
  },
  {
    message: "Working with Buildr was a game-changer. They took our initial concept and developed a platform that exceeded our expectations, setting us apart in the market.",
    name: "John",
    role: "CEO, Novatoons",
    image: avatar
  },
]);

const currentIndex = ref(0);
let autoSlideInterval: number;

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};

const prevTestimonial = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length;
};

const goToTestimonial = (index: number) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextTestimonial, 15000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

onMounted(startAutoSlide);
onUnmounted(stopAutoSlide);
</script>

<style scoped>
.testimonial-enter-active, .testimonial-leave-active {
  transition: transform 0.7s ease-in-out, opacity 0.7s;
}
.testimonial-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.testimonial-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.testimonial-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.testimonial-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
