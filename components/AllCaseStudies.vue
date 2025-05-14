<template>
    <main class="mb-20">
      <!-- {{ projects }} -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-10 gap-4 max-w-7xl" style="margin-left: 8vw; margin-right: 8vw;">
      <NuxtLink
        v-for="(card, index) in computedCards"
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
          {{ card.title }}
        </div>
        <div
          class="absolute bottom-8 left-4 text-white md:text-lg lg:text-2xl z-10"
        >
          {{ card.description }}
        </div>
      </NuxtLink>
    </div>
    </main>
</template>

<script setup lang="ts">
  import storipod from '@/assets/img/covers/storipod.png'
  import blackcountry from '@/assets/img/covers/blackcountry.png'
  import iqly from '@/assets/img/covers/iqly.png'
  import marketsquare from '@/assets/img/covers/marketsquare.png'
  import novatoons from '@/assets/img/covers/novatoons.png'
  import grabhub from '@/assets/img/covers/grabhub.png'

  const props = defineProps({
    limit: {
      type: Number,
      default: 4
    },
    projects: {
       type: Array,
       default: () => []
    }
  })

const cards = ref([
  {
    title: "BlackCountry",
    description: "Simplifying Shared Living in Nigeria",
    urlPath: '/projects/black-country',
    image: blackcountry
  },
  {
    title: "IQly",
    description: "Revolutionizing Job Searches with an AI-Driven Career Platform",
    urlPath: '/projects/iqly',
    image: iqly
  },
  {
    title: "Grabhub",
    urlPath: '/projects/grabhub',
    description: "Addressing Food Waste with an Innovative Marketplace",
    image: grabhub
  },
  {
    title: "Marketsquare",
    urlPath: '/projects/marketsquare',
    description: "Connecting Local Services with Ease",
    image: marketsquare
  },
  {
    title: "Novatoons",
    description: 'Championing Diverse Narratives: The Novatoons Case Study',
    urlPath: '/projects/novatoons',
    image: novatoons
  },
  {
    title: "Storipod",
    urlPath: '/projects/storipod',
    description: "Revolutionizing Microblogging for Storytellers",
    image: storipod
  },
])

const computedCards = computed(() => {
  return props.projects.length ? props.projects.length : cards.value.slice(0, props.limit)
})
</script>