<template>
    <div class="min-h-screen bg-gradient-to-b pt-20 from-white to-blue-50">
      <!-- Hero Section with Enhanced Animation -->
      <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <!-- Animated background elements -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse-slow"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 animate-pulse-slow"></div>
        
        <!-- Animated particles -->
        <div class="particles-container absolute inset-0 overflow-hidden">
          <div v-for="n in 20" :key="n" 
               class="particle absolute rounded-full"
               :class="[
                 n % 3 === 0 ? 'bg-blue-600' : n % 3 === 1 ? 'bg-blue-400' : 'bg-green-400',
                 `opacity-${Math.floor(Math.random() * 40) + 10}`
               ]"
               :style="{
                 width: `${Math.floor(Math.random() * 10) + 5}px`,
                 height: `${Math.floor(Math.random() * 10) + 5}px`,
                 top: `${Math.floor(Math.random() * 100)}%`,
                 left: `${Math.floor(Math.random() * 100)}%`,
                 animationDuration: `${Math.floor(Math.random() * 20) + 10}s`,
                 animationDelay: `${Math.floor(Math.random() * 5)}s`
               }">
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <h1 class="text-4xl md:text-6xl font-bold text-blue-700 mb-4 tracking-tight animate-title">
            <span class="inline-block transform hover:scale-105 transition-transform duration-300">Research</span>
            <span class="inline-block transform hover:scale-105 transition-transform duration-300 ml-3">Publications</span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-600 max-w-3xl animate-fade-in">
            Advancing healthcare knowledge through innovative research across Africa
          </p>
          
          <div class="mt-10 flex flex-wrap gap-4 animate-fade-in-up">
            <button 
              v-for="(category, index) in categories" 
              :key="index"
              @click="activeCategory = category === activeCategory ? 'All' : category"
              :class="[
                'px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium',
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
              ]"
              :style="{ animationDelay: `${index * 0.1 + 0.5}s` }"
            >
              {{ category }}
            </button>
          </div>
        </div>
        
        <!-- Floating illustrations with enhanced animation -->
        <div class="hidden md:block absolute top-20 right-10 w-32 h-32 z-0">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="text-blue-600 animate-float">
            <path fill="currentColor" d="M45.7,-58.2C59.1,-48.3,70,-33.5,74.9,-16.6C79.8,0.3,78.8,19.3,70.3,33.8C61.8,48.3,45.8,58.3,28.9,65.3C12,72.3,-5.9,76.3,-22.6,72.1C-39.3,67.9,-54.8,55.5,-65.2,39.5C-75.6,23.5,-80.9,3.9,-77.1,-13.7C-73.3,-31.3,-60.4,-46.9,-45.4,-56.5C-30.4,-66.1,-13.2,-69.7,2.2,-72.4C17.6,-75.1,32.3,-68.1,45.7,-58.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div class="hidden md:block absolute bottom-10 left-10 w-24 h-24 z-0">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="text-green-400 animate-float-delayed">
            <path fill="currentColor" d="M47.7,-51.2C61.3,-33.5,71.3,-16.8,71.1,-0.2C70.9,16.3,60.5,32.6,46.9,44.9C33.3,57.2,16.6,65.5,-1.9,67.4C-20.4,69.3,-40.8,64.8,-54.8,52.3C-68.8,39.8,-76.3,19.9,-74.6,1.7C-72.9,-16.5,-61.9,-33,-47.8,-50.7C-33.7,-68.4,-16.8,-87.3,0,-87.3C16.8,-87.3,33.7,-68.4,47.7,-51.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>
  
      <!-- Publications Grid with Enhanced Animation -->
      <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <transition-group 
          name="publication-list" 
          tag="div" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div 
            v-for="(publication, index) in filteredPublications" 
            :key="publication.id"
            class="publication-card bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="h-4 bg-blue-600"></div>
            <div class="p-6">
              <div class="flex items-start mb-4">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center animate-pulse-slow">
                    <component :is="getPublicationIcon(publication.category)" class="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ publication.category }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold text-blue-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                {{ publication.title }}
              </h3>
              
              <div class="flex items-center text-sm text-blue-500 mb-4">
                <CalendarIcon class="w-4 h-4 mr-1" />
                <span>{{ publication.year }}</span>
                <span class="mx-2">•</span>
                <UsersIcon class="w-4 h-4 mr-1" />
                <span>{{ publication.authors }}</span>
              </div>
              
              <p class="text-blue-700 mb-6 line-clamp-3">{{ publication.abstract }}</p>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-blue-600 font-medium">{{ publication.journal }}</span>
                <a :href="publication.link" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors group">
                  <ExternalLinkIcon class="w-4 h-4 mr-1 group-hover:animate-bounce" />
                  <span>Read More</span>
                </a>
              </div>
            </div>
          </div>
        </transition-group>
        
        <!-- Empty state with enhanced animation -->
        <div v-if="filteredPublications.length === 0" class="flex flex-col items-center justify-center py-20">
          <div class="w-48 h-48 mb-8 animate-spin-slow">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="text-blue-200">
              <path fill="currentColor" d="M47.5,-57.2C59.9,-45.3,67.3,-28.5,71.5,-9.9C75.7,8.7,76.8,29.1,67.1,42.1C57.4,55.1,37,60.6,17.5,65.2C-2,69.8,-20.5,73.4,-36.2,67.5C-51.8,61.6,-64.5,46.2,-70.3,28.7C-76.1,11.3,-75,-8.3,-67.9,-24.8C-60.8,-41.3,-47.7,-54.8,-33,-63.1C-18.3,-71.4,-2,-74.5,13.2,-71.1C28.5,-67.7,35.1,-69.1,47.5,-57.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-blue-700 mb-2 animate-bounce-slow">No publications found</h3>
          <p class="text-blue-600">Try selecting a different category</p>
        </div>
      </section>
      
      <!-- Statistics Section with Enhanced Animation -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 overflow-hidden">
          <div v-for="n in 10" :key="`stat-particle-${n}`" 
               class="absolute rounded-full bg-white opacity-10 animate-float-random"
               :style="{
                 width: `${Math.floor(Math.random() * 300) + 50}px`,
                 height: `${Math.floor(Math.random() * 300) + 50}px`,
                 top: `${Math.floor(Math.random() * 100)}%`,
                 left: `${Math.floor(Math.random() * 100)}%`,
                 animationDuration: `${Math.floor(Math.random() * 20) + 20}s`,
                 animationDelay: `${Math.floor(Math.random() * 5)}s`,
                 transform: `scale(${Math.random() * 0.5 + 0.5})`
               }"
               >
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <h2 class="text-3xl font-bold mb-12 text-center animate-title-delayed">Research Impact</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-all duration-500 hover:scale-105 hover:bg-white/20"
              :class="{'animate-bounce-subtle': stat.isHighlighted}"
            >
              <div class="text-4xl font-bold mb-2">
                <CountUp :end-val="stat.value" :duration="2.5" />{{ stat.suffix }}
              </div>
              <div class="text-lg">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Newsletter Section with Enhanced Animation -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 transform -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full opacity-50 transform translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>
        
        <div class="max-w-3xl mx-auto text-center relative z-10">
          <h2 class="text-3xl font-bold text-blue-700 mb-4 animate-title-delayed">Stay Updated</h2>
          <p class="text-blue-600 mb-8 animate-fade-in-delayed">Subscribe to our newsletter to receive the latest research publications</p>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-fade-in-up-delayed">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="flex-grow px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button 
              type="submit" 
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group hover:scale-105"
            >
              <MailIcon class="w-5 h-5 mr-2 group-hover:animate-ping" />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { 
    BookOpen as BookOpenIcon, 
    Users as UsersIcon, 
    Calendar as CalendarIcon, 
    ExternalLink as ExternalLinkIcon,
    Mail as MailIcon,
    Activity as ActivityIcon,
    Globe as GlobeIcon,
    Database as DatabaseIcon,
    FileText as FileTextIcon
  } from 'lucide-vue-next'
  
  interface Publication {
    id: number
    title: string
    authors: string
    year: number
    journal: string
    category: string
    abstract: string
    link: string
  }
  
  // Publications data
  const publications = ref<Publication[]>([
    {
      id: 1,
      title: "Understanding Health Inequality, Disparity and Inequity in Africa: A Rapid Review of Concepts, Root Causes, and Strategic Solutions",
      authors: "Oke et al.",
      year: 2025,
      journal: "Public Health Challenges - Wiley Online Library",
      category: "Health Inequality",
      link: 'https://onlinelibrary.wiley.com/doi/10.1002/puh2.70040',
      abstract: "This rapid review examines the concepts, root causes, and strategic solutions to health inequality, disparity, and inequity across Africa, providing a comprehensive framework for addressing these critical issues."
    },
    {
      id: 2,
      title: "Adoption of Digital Health Technology in Nigeria: A Scoping Review of Current Trends and Future Directions",
      authors: "Oke et al.",
      year: 2025,
      journal: "Advances in Public Health - Wiley Online Library",
      link: 'https://onlinelibrary.wiley.com/doi/10.1155/adph/4246285',
      category: "Digital Health",
      abstract: "This scoping review explores the current landscape of digital health technology adoption in Nigeria, identifying key trends, challenges, and opportunities for future development and implementation."
    },
    {
      id: 3,
      title: "Interdisciplinary cross-sectoral strategies to mitigate health workforce migration in Africa",
      authors: "Various Authors",
      year: 2024,
      journal: "ScienceDirect",
      link: 'https://www.sciencedirect.com/science/article/pii/S2949916X25000039',
      category: "Health Workforce",
      abstract: "This study presents interdisciplinary and cross-sectoral approaches to address the critical issue of health workforce migration in Africa, proposing sustainable strategies to retain healthcare professionals."
    },
    {
      id: 4,
      title: "Assessing the knowledge, attitudes, and perceptions toward smoking cessation among medical students in Rwanda",
      authors: "Various Authors",
      year: 2024,
      journal: "Research Square",
      link: 'https://www.researchsquare.com/article/rs-5891044/v1',
      category: "Public Health",
      abstract: "This research evaluates the knowledge, attitudes, and perceptions of medical students in Rwanda regarding smoking cessation, highlighting the importance of comprehensive education on tobacco control."
    },
    {
      id: 5,
      title: "Prevalence of post‐caesarean section surgical site infections in Rwanda: A systematic review and meta‐analysis",
      authors: "Sibomana et al.",
      link: 'https://onlinelibrary.wiley.com/doi/10.1111/iwj.14929',
      year: 2024,
      journal: "International Wound Journal - Wiley Online Library",
      category: "Maternal Health",
      abstract: "This systematic review and meta-analysis examines the prevalence of surgical site infections following caesarean sections in Rwanda, providing evidence to improve maternal healthcare outcomes."
    },
    {
      id: 6,
      title: "Experience of people living with leprosy at leprosy settlements in Nigeria",
      authors: "Oke et al.",
      year: 2024,
      journal: "Public Health Challenges - Wiley Online Library",
      category: "Infectious Diseases",
      link: 'https://onlinelibrary.wiley.com/doi/10.1002/puh2.171',
      abstract: "This study documents the lived experiences of people with leprosy in Nigerian settlements, highlighting social, economic, and healthcare challenges faced by this marginalized population."
    }
  ])
  
  // Categories derived from publications
  const categories = computed(() => {
    const allCategories = publications.value.map(pub => pub.category)
    return ['All', ...new Set(allCategories)]
  })
  
  // Active category filter
  const activeCategory = ref('All')
  
  // Filtered publications based on active category
  const filteredPublications = computed(() => {
    if (activeCategory.value === 'All') {
      return publications.value
    }
    return publications.value.filter(pub => pub.category === activeCategory.value)
  })
  
  // Stats for impact section with animation flag
  const stats = ref([
    { value: 25, suffix: '+', label: 'Publications', isHighlighted: true },
    { value: 12, suffix: '', label: 'Countries Covered', isHighlighted: false },
    { value: 45, suffix: 'K+', label: 'Citations', isHighlighted: true },
    { value: 18, suffix: '', label: 'Research Partners', isHighlighted: false }
  ])
  
  // Get icon based on publication category
  const getPublicationIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      'Health Inequality': ActivityIcon,
      'Digital Health': DatabaseIcon,
      'Health Workforce': UsersIcon,
      'Public Health': GlobeIcon,
      'Maternal Health': UsersIcon,
      'Infectious Diseases': ActivityIcon
    }
    
    return iconMap[category] || FileTextIcon
  }
  
  // Animate stats periodically
  onMounted(() => {
    setInterval(() => {
      stats.value = stats.value.map(stat => ({
        ...stat,
        isHighlighted: !stat.isHighlighted
      }))
    }, 3000)
  })
  
  // CountUp component for animated statistics
  const CountUp = {
    props: {
      endVal: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        currentValue: 0
      }
    },
    mounted() {
      const startTime = Date.now()
      const endTime = startTime + this.duration * 1000
      
      const updateValue = () => {
        const now = Date.now()
        if (now >= endTime) {
          this.currentValue = this.endVal
          return
        }
        
        const elapsed = now - startTime
        const progress = elapsed / (this.duration * 1000)
        this.currentValue = Math.floor(progress * this.endVal)
        
        requestAnimationFrame(updateValue)
      }
      
      updateValue()
    },
    render() {
      return this.$slots.default ? this.$slots.default(this.currentValue) : Math.floor(this.currentValue)
    }
  }
  </script>
  
  <style>
  /* Animation for publication cards */
  .publication-list-enter-active,
  .publication-list-leave-active {
    transition: all 0.5s ease;
  }
  
  .publication-list-enter-from,
  .publication-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .publication-card {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Floating animations for SVG shapes */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .animate-float-random {
    animation: floatRandom 15s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-spin-slow {
    animation: spin 15s linear infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce 2s ease infinite;
  }
  
  .animate-bounce-subtle {
    animation: bounceSubtle 2s ease-in-out infinite;
  }
  
  .animate-title {
    animation: slideInFromLeft 1s ease-out forwards;
  }
  
  .animate-title-delayed {
    animation: slideInFromLeft 1s ease-out 0.3s forwards;
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-fade-in-delayed {
    animation: fadeIn 1s ease-out 0.5s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }
  
  .animate-fade-in-up-delayed {
    animation: fadeInUp 1s ease-out 0.7s forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  
  /* Particle animation */
  .particle {
    animation: floatParticle 20s linear infinite;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
  
  @keyframes floatRandom {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -20px) rotate(10deg);
    }
    66% {
      transform: translate(-20px, 10px) rotate(-5deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
  
  @keyframes floatParticle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(-300px) translateX(100px);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  
  @keyframes bounceSubtle {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-5px) scale(1.03);
    }
  }
  
  @keyframes slideInFromLeft {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* Line clamp utilities */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>