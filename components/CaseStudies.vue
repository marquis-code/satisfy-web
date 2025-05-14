<template>
  <section class="py-16">
    <div class="text-center mb-12">
      <h2 class="text-sm uppercase font-semibold tracking-wider text-[#7C7C7C]">PROJECTS</h2>
      <h1 class="text-2xl lg:text-3xl font-bold text-[#222222]">Case Study</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
      <CaseStudyCard
        v-for="study in caseStudies"
        :key="study.id"
        :title="study.title"
        :urlPath="study.urlPath"
        :image="study.image"
        :categories="study.categories"
        :studyObj="study"
      />
    </div>

    <div class="text-center mt-20">
      <NuxtLink to="/projects" class="bg-[#444CE7] hover:bg-[#3A40C9] text-white px-8 py-3.5 rounded-full font-medium transition-colors duration-300">
        View more
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import storipod from '@/assets/img/covers/storipod.png'
import blackcountry from '@/assets/img/covers/blackcountry.png'
import iqly from '@/assets/img/covers/iqly.png'
import marketsquare from '@/assets/img/covers/marketsquare.png'
import novatoons from '@/assets/img/covers/novatoons.png'
import grabhub from '@/assets/img/covers/grabhub.png'
const caseStudies = ref([
  {
    id: '1',
    title: 'Simplifying Shared Living in Nigeria',
    name: "BlackCountry",
    urlPath: '/projects/black-country',
    image: blackcountry,
    categories: ['PropTech', 'Real Estate', 'Social Enterprise']
  },
  {
    id: '2',
    title: 'Revolutionizing Job Searches with an AI-Driven Career Platform',
    name: "IQly",
    urlPath: '/projects/iqly',
    subtitle: 'Career Development / EdTech / Artificial Intelligence',
    image: iqly,
    categories: ['Career Development', 'EdTech', 'Artificial Intelligence']
  },
  {
    id: '3',
    title: 'Addressing Food Waste with an Innovative Marketplace',
    name: "Grabhub",
    urlPath: '/projects/grabhub',
    subtitle: 'FoodTech / E-Commerce / Marketplaces',
    image: grabhub,
    categories: ['FoodTech', 'E-Commerce', 'Marketplaces']
  },
  {
    id: '4',
    title: 'Connecting Local Services with Ease',
    name: "Marketsquare",
    urlPath: '/projects/marketsquare',
    subtitle: 'E-Commerce / Marketplaces',
    image: marketsquare,
    categories: ['E-Commerce', 'Marketplaces']
  }
])
</script>