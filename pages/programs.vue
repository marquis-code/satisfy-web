<!-- pages/programs.vue -->
<template>
<main>
  <NavbarSection class="bg-black" />
    <div class="programs-page bg-gradient-to-b 0 min-h-screen">
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute inset-0 bg-indigo-900/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Research Team" 
            class="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        
        <div class="container mx-auto px-6 py-24 lg:py-32">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="text-center md:text-left" v-motion-fade-visible>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our <span class="text-indigo-300">Programs</span>
              </h1>
              <p class="text-lg text-gray-200 max-w-xl mx-auto md:mx-0">
                Empowering individuals through specialized programs designed to foster growth, innovation, and expertise in research and consulting.
              </p>
            </div>
            <div class="flex justify-center md:justify-end" v-motion-slide-visible-right>
              <div class="relative w-full max-w-md aspect-square">
                <div class="absolute inset-0 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
                <div class="absolute inset-4 bg-indigo-600 rounded-full opacity-40"></div>
                <div class="absolute inset-8 bg-indigo-700 rounded-full opacity-60 flex items-center justify-center">
                  <span class="text-white text-4xl font-bold">{{ programs.length }}</span>
                </div>
                <div class="absolute -top-4 -right-4 bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold">NEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Wave Divider -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto">
            <path fill="#ffffff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,96C672,96,768,128,864,138.7C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
  
      <!-- Programs List -->
      <section class="py-16 px-6 container mx-auto relative -mt-10 z-10">
        <h2 class="sr-only">Our Programs</h2>
        
        <!-- Program Cards -->
        <div class="grid gap-12">
          <ProgramCard 
            v-for="(program, index) in programs" 
            :key="program.id"
            :program="program"
            :reverse="index % 2 !== 0"
          />
        </div>
  
        <!-- Coming Soon -->
        <div 
          class="mt-24 text-center bg-gray-100 rounded-2xl shadow-sm border border-gray-200 p-12 relative overflow-hidden"
          v-motion-fade-visible
        >
          <div class="absolute inset-0 bg-dots-pattern opacity-5"></div>
          <div class="relative z-10">
            <span class="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
              Coming Soon
            </span>
            <h3 class="text-3xl font-bold text-gray-800 mb-6">More Programs on the Horizon</h3>
            <p class="text-gray-600 max-w-xl mx-auto mb-8">
              We're developing additional programs to expand our offerings and create more opportunities for talented individuals. Sign up to be notified when new programs are announced.
            </p>
            <button class="btn-primary">
              Get Notified
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden opacity-20">
          <div class="grid grid-cols-8 grid-rows-6 gap-1 h-full w-full">
            <div v-for="i in 48" :key="i" 
              class="bg-white rounded-lg animate-pulse"
              :style="`animation-delay: ${i * 100}ms`">
            </div>
          </div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10 text-center">
          <div class="max-w-3xl mx-auto" v-motion-fade-visible>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
            <p class="text-lg text-indigo-100 mb-10">
              Take the first step towards enhancing your skills and making a meaningful impact through our specialized programs.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn-white">
                Apply Now
              </button>
              <button class="btn-transparent">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
</main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  // import { vMotionFadeVisible, vMotionSlideVisibleRight } from '@vueuse/motion'
  
  // Types
  interface BenefitItem {
    title: string
    description: string
    icon: string
  }
  
  interface ProgramStructure {
    title: string
    value: string
  }
  
  interface Program {
    id: string
    title: string
    subtitle: string
    description: string
    coverImage: string
    overview: string
    responsibilities: string[]
    structure: ProgramStructure[]
    benefits: BenefitItem[]
  }
  
  // Programs data
  const programs = ref<Program[]>([
    {
      id: 'emerging-researchers',
      title: 'Emerging Researchers Program',
      subtitle: 'Research & Innovation',
      description: 'Dedicated to nurturing future leaders who have recently graduated from university, this initiative offers hands-on experience in research, communication, and consulting. Participants collaborate on innovative projects, gaining practical skills while contributing to industry advancements.',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      overview: 'The Emerging Researchers Program is a structured internship where participants work on non-client projects aimed at solving real-world challenges in global health, social innovation, and sustainable development. Interns will conduct innovative research that advances our mission and contributes to thought leadership within our core focus areas.',
      responsibilities: [
        'Be paired with senior consultants for mentorship and guidance.',
        'Conduct in-depth research on emerging trends and best practices.',
        'Produce high-quality reports, publications, or white papers aligned with our mission.',
        'Present research findings internally to refine and enhance our service offerings.'
      ],
      structure: [
        { title: 'Duration', value: '3–6 months' },
        { title: 'Focus Areas', value: 'Health Tech, Harm Reduction, Medicine, Global Health' },
        { title: 'Outcomes', value: 'Research articles, policy briefs, innovative frameworks' }
      ],
      benefits: [
        {
          title: 'Mentorship',
          description: 'Gain insights and guidance from seasoned professionals in research, communication, and project management.',
          icon: 'mentor'
        },
        {
          title: 'Professional Development',
          description: 'Build valuable skills in research methodology, data analysis, and knowledge dissemination.',
          icon: 'growth'
        },
        {
          title: 'Career Growth',
          description: 'Enhance your portfolio with impactful projects and gain a competitive edge in the consulting and research sectors.',
          icon: 'career'
        },
        {
          title: 'Networking',
          description: 'Engage with industry leaders and expand your professional network while gaining exposure to cutting-edge developments in our focus areas.',
          icon: 'network'
        }
      ]
    }
  ])
  </script>
  
  <style scoped>
  /* Custom Background Pattern */
  .bg-dots-pattern {
    background-image: radial-gradient(currentColor 1px, transparent 1px);
    background-size: 24px 24px;
  }
  
  /* Button Styles */
  .btn-primary {
    @apply inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300;
  }
  
  .btn-white {
    @apply inline-flex items-center px-6 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300;
  }
  
  .btn-transparent {
    @apply inline-flex items-center px-6 py-3 rounded-full bg-transparent text-white font-medium border border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300;
  }
  </style>