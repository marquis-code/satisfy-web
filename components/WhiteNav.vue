<!-- <template>
  <nav
  :class="[
      isScrolled ? 'bg-white shadow-lg' : 'from-blue-300 to-blue-600',
      'fixed w-full z-[1000] transition-all duration-300 py-6'
    ]"
  >
    <div class="mx-auto container px-6">
      <div class="flex items-center justify-between">

        <button @click="router.push('/')" class="flex items-center space-x-2">
          <img src="@/assets/icons/black-logo.svg" alt="Logo" />
        </button>


        <div class="hidden md:flex items-center">
          <NuxtLink
          v-for="link in navigationLinks"
            :key="link.name"
            :to="link.href"
            class="text-sm rounded-full px-4 py-2.5 font-semibold transition-colors duration-200"
            :class="{
              'text-[#222222] bg-gray-50 mx-1 hover:text-[#222222]':
                isScrolled || shade === 'default',
              'text-[#222222] hover:text-[#222222]': !isScrolled && shade === 'coloured',
              'font-medium': link.name === 'Projects',
            }"
          >
            {{ link.name }}
          </NuxtLink>
          <button onclick="document.getElementById('contact-us').scrollIntoView({ behavior: 'smooth' });" class="px-4 py-2 text-sm text-[#222222] rounded-full font-semibold transition-colors duration-200">Contact Us</button>
        </div>


        <button
           v-if="!isMenuOpen"
          class="md:hidden p-2 rounded-lg z-[1001]"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Open menu</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="lg:hidden z-50" role="dialog" aria-modal="true">
          <div class="fixed inset-0 z-50"></div>
          <div
            class="fixed inset-y-0 right-0 z-50 w-full z-50 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="@/assets/icons/black-logo.svg" alt="">
              </a>
              <button @click="isMenuOpen = !isMenuOpen" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span class="sr-only">Close menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <NuxtLink v-for="(item, idx) in navigationLinks" @click="isMenuOpen = false" :key="idx" :to="item.href"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {{ item.name }}</NuxtLink>
                    <button onclick="handleContactClick()" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900">Contact Us</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  </nav>

  <main class="pt-[96px]">
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  // Change this threshold to match the end of your hero section
  const scrollThreshold = window.innerHeight / 2;
  isScrolled.value = window.scrollY > scrollThreshold;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const isMenuOpen = ref(false);
const router = useRouter();

const props = defineProps({
  shade: {
    type: String,
    default: "default",
  },
});

 // Function to handle button click

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
];

const handleContactClick = () => {
    // Scroll to the bottom of the page
    document.getElementById('contact-us').scrollIntoView({ behavior: 'smooth' });
    // Set isOpen to false
    isMenuOpen.value = false;
  }
</script>


<style scoped>
/* Ensure spacing below the navbar */
main {
  padding-top: 96px; /* Adjust to match navbar height */
}
.router-link-exact-active {
  background-color: #222222;
  color: white;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
}
</style> -->


<template>
  <nav
    :class="[
      isScrolled ? 'bg-white shadow-lg' : 'from-blue-300 to-blue-600',
      'fixed w-full z-[1000] transition-all duration-300 py-6'
    ]"
  >
    <div class="mx-auto container px-6">
      <div class="flex items-center justify-between">
        <button @click="router.push('/')" class="flex items-center space-x-2">
          <img src="@/assets/icons/black-logo.svg" alt="Logo" />
        </button>

        <div class="hidden md:flex items-center">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.name"
            :to="link.href"
            class="text-sm rounded-full px-4 py-2.5 font-semibold transition-colors duration-200"
            :class="{
              'text-[#222222] bg-gray-50 mx-1 hover:text-[#222222]':
                isScrolled || shade === 'default',
              'text-[#222222] hover:text-[#222222]': !isScrolled && shade === 'coloured',
              'font-medium': link.name === 'Projects',
            }"
          >
            {{ link.name }}
          </NuxtLink>
          <button @click="handleContactClick" class="px-4 py-2 text-sm text-[#222222] rounded-full font-semibold transition-colors duration-200">
            Contact Us
          </button>
        </div>

        <button
          v-if="!isMenuOpen"
          class="md:hidden p-2 rounded-lg z-[1001]"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Open menu</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="lg:hidden z-50" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50"></div>
      <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="@/assets/icons/black-logo.svg" alt="">
          </a>
          <button @click="isMenuOpen = !isMenuOpen" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                v-for="(item, idx) in navigationLinks"
                @click="isMenuOpen = false"
                :key="idx"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                {{ item.name }}
              </NuxtLink>
              <button @click="handleContactClick" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main class="pt-[96px]">
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const router = useRouter();

const handleScroll = () => {
  const scrollThreshold = window.innerHeight / 2;
  isScrolled.value = window.scrollY > scrollThreshold;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
];

const handleContactClick = () => {
  const contactSection = document.getElementById('contact-us');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
  isMenuOpen.value = false;
};
</script>

<style scoped>
main {
  padding-top: 96px;
}
.router-link-exact-active {
  background-color: #222222;
  color: white;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
}
</style>
