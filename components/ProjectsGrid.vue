<template>
  <ProductsHeroSection  />
  <section class="mx-auto w-full container px-4 sm:px-6 lg:px-8 py-12">
  <!-- Filter Categories -->
  <div
    class="flex justify-center gap-4 mb-12 z-10 overflow-x-auto scrollbar-hidden px-4"
  >
    <button
      v-for="category in categories"
      :key="category"
      @click="activeCategory = category"
      :class="[
        'shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-all',
        activeCategory === category
          ? 'bg-[#222222] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ]"
    >
      {{ category }}
    </button>
  </div>
</section>

  <!-- <section class="mx-auto w-full container px-4 sm:px-6 lg:px-8 py-12">
  <div
    class="flex justify-center gap-4 mb-12 z-10 overflow-x-auto scrollbar-hidden"
  >
    <button
      v-for="category in categories"
      :key="category"
      @click="activeCategory = category"
      :class="[
        'shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-all',
        activeCategory === category
          ? 'bg-[#222222] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ]"
    >
      {{ category }}
    </button>
  </div>
</section> -->


    <!-- <section class="mx-auto w-full container px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-center items-center flex-wrap gap-4 mb-12 z-10">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-all',
            activeCategory === category 
              ? 'bg-[#222222] text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </section> -->

      <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CaseStudyCard
        v-for="project in filteredProjects" 
        :key="project.id"
        :title="project.title"
        :urlPath="project.urlPath"
        :image="project.image"
        :categories="project.categories"
        :studyObj="project"
      />
      </div> -->
    <section class="mb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-10 gap-4 max-w-7xl" style="margin-left: 8vw; margin-right: 8vw;">
      <NuxtLink
        v-for="(card, index) in filteredProjects"
        :key="index"
        :to="card.urlPath"
        class="relative group rounded-lg overflow-hidden shadow-lg"
      >
        <img
          :src="card.image"
          alt="Image"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-70 group-hover:bg-opacity-30 transition-opacity duration-300"
        ></div>
        <div
          class="absolute top-8 left-4 text-white text-lg font-bold z-10"
        >
          {{ card.name }}
        </div>
        <div
          class="absolute bottom-8 left-4 text-white md:text-lg lg:text-2xl z-10"
        >
          {{ card.title }}
        </div>
      </NuxtLink>
    </div>
    </section>

      <!-- <AllCaseStudies :limit="6" /> -->
  </template>
  
  <script setup lang="ts">
  import storipod from '@/assets/img/covers/storipod.png'
  import blackcountry from '@/assets/img/covers/blackcountry.png'
  import iqly from '@/assets/img/covers/iqly.png'
  import marketsquare from '@/assets/img/covers/marketsquare.png'
  import novatoons from '@/assets/img/covers/novatoons.png'
  import grabhub from '@/assets/img/covers/grabhub.png'
  interface Project {
    id: number;
    title: string;
    name: string;
    image: string;
    urlPath: string;
    tags: string[];
    categories: string[];
  }
  
  const categories = ref([
    'All',
    'E-Commerce',
    'Real Estate',
    'Artificial Intelligence',
    'Entertainment',
    'Marketplaces'
  ]);
  
  const activeCategory = ref('All');
  
  const projects: Project[] = [
    {
      id: 1,
      name: 'BlackCountry',
      title: 'Simplifying Shared Living in Nigeria',
      image: blackcountry,
       urlPath: '/projects/black-country',
      tags: ['PropTech', 'Real Estate', 'Social Enterprise'],
      categories: ['Real Estate']
    },
    {
      id: 2,
      name: 'IQly',
      title: 'Revolutionizing Job Searches with an AI-Driven Career Platform',
      image: iqly,
       urlPath: '/projects/iqly',
      tags: ['Career Development', 'EdTech', 'Artificial Intelligence'],
      categories: ['Artificial Intelligence']
    },
    {
      id: 3,
      name: 'Grabhub',
      title: 'Addressing Food Waste with an Innovative Marketplace',
      image: grabhub,
      urlPath: '/projects/grabhub',
      tags: ['FoodTech', 'E-Commerce', 'Marketplaces'],
      categories: ['E-Commerce', 'Marketplaces']
    },
    {
      id: 4,
      name: 'Marketsquare',
      title: 'Connecting Local Services with Ease',
      image: marketsquare,
      urlPath: '/projects/marketsquare',
      tags: ['E-Commerce', 'Marketplaces'],
      categories: ['E-Commerce', 'Marketplaces']
    },
    {
      id: 5,
      name: 'Novatoons',
      title: 'Championing Diverse Narratives: The Novatoons Case Study',
       image: novatoons,
       urlPath: '/projects/novatoons',
      tags: ['Entertainment', 'Digital Media'],
      categories: ['Entertainment']
    },
    {
      id: 6,
      name: 'Storipod',
      title: 'Revolutionizing Microblogging for Storytellers',
     image: storipod,
      urlPath: '/projects/storipod',
      tags: ['Entertainment', 'Social Media', 'Digital Media'],
      categories: ['Entertainment']
    }
  ];
  
  const filteredProjects = computed(() => {
    if (activeCategory.value === 'All') {
      return projects;
    }
    return projects.filter(project => 
      project.categories.includes(activeCategory.value)
    );
  });
  </script>

  <style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
.scrollbar-hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>