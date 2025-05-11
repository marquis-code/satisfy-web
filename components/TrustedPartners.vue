<template>
    <div class="bg-white py-24 sm:py-32 overflow-hidden relative">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="animate-float-slow opacity-5 absolute -right-20 top-40 w-64 h-64 rounded-full bg-olg-blue"></div>
        <div class="animate-float-medium opacity-5 absolute -left-32 bottom-40 w-96 h-96 rounded-full bg-olg-green"></div>
      </div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <!-- Partners Section -->
        <div class="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div class="mx-auto w-full max-w-xl lg:mx-0 animate-fade-in">
            <h2 class="text-pretty text-4xl font-semibold tracking-tight text-olg-blue sm:text-5xl animate-slide-up">
              Trusted by the most innovative teams
            </h2>
            
            <!-- Testimonial Slider -->
            <div class="mt-6 relative h-48 sm:h-40 overflow-hidden">
              <transition-group 
                name="testimonial-slide" 
                tag="div" 
                class="absolute inset-0"
              >
                <div 
                  v-for="(testimonial, index) in testimonials" 
                  :key="testimonial.id"
                  v-show="currentTestimonial === index"
                  class="testimonial-item"
                >
                  <p class="text-lg/8 text-gray-600 italic">
                    "{{ testimonial.quote }}"
                  </p>
                  <div class="mt-4 flex items-center">
                    <div class="flex-shrink-0">
                      <img 
                        :src="testimonial.avatar" 
                        :alt="testimonial.author" 
                        class="h-10 w-10 rounded-full object-cover border-2 border-olg-blue"
                      >
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ testimonial.author }}</p>
                      <p class="text-xs text-gray-500">{{ testimonial.title }}</p>
                    </div>
                  </div>
                </div>
              </transition-group>
              
              <!-- Testimonial Navigation -->
              <div class="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
                <button 
                  v-for="(_, index) in testimonials" 
                  :key="index"
                  @click="currentTestimonial = index"
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="currentTestimonial === index ? 'bg-olg-blue w-4' : 'bg-gray-300'"
                  aria-label="View testimonial"
                ></button>
              </div>
            </div>
            
            <div class="mt-8 flex items-center gap-x-6 animate-slide-up" style="animation-delay: 300ms;">
              <a 
                href="#contact-us" 
                class="text-sm font-semibold text-olg-blue group flex items-center transition-all duration-300 hover:text-olg-blue-dark"
              >
                Contact us 
                <span aria-hidden="true" class="ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
          
          <!-- Partner Logos with Animation -->
          <div class="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <div 
              v-for="(logo, index) in partnerLogos" 
              :key="logo.name"
              class="partner-logo-container"
              :style="{ animationDelay: `${index * 150}ms` }"
              @mouseenter="hoveredLogo = logo.name"
              @mouseleave="hoveredLogo = null"
            >
              <img 
                :src="logo.src" 
                :alt="logo.name" 
                class="max-h-20 w-full object-contain rounded-lg object-left transition-all duration-500"
                :class="{ 'scale-110 shadow-lg': hoveredLogo === logo.name }"
              >
            </div>
          </div>
        </div>
        
        <!-- Metrics Section -->
        <div class="mt-24 animate-fade-in" style="animation-delay: 400ms;">
          <h2 class="text-center text-3xl font-bold tracking-tight text-olg-blue sm:text-4xl mb-16 animate-slide-up">
            Our Impact
          </h2>
          
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div 
              v-for="(metric, index) in metrics" 
              :key="metric.value"
              class="metric-card"
              :style="{ animationDelay: `${500 + index * 150}ms` }"
              @mouseenter="startCounter(index)"
            >
              <div class="relative h-20 w-20 mx-auto mb-4">
                <div class="absolute inset-0 bg-olg-blue/10 rounded-full"></div>
                <div 
                  class="absolute inset-0 rounded-full" 
                  :style="{
                    background: `conic-gradient(#3A6E9F ${counterValues[index]}%, transparent 0%)`,
                    transition: 'all 1.5s ease-out'
                  }"
                ></div>
                <div class="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <component :is="metric.icon" class="h-8 w-8 text-olg-blue" />
                </div>
              </div>
              
              <h3 class="text-2xl font-bold text-gray-900 text-center">
                <span v-if="metric.prefix">{{ metric.prefix }}</span>{{ displayValues[index] }}<span v-if="metric.suffix">{{ metric.suffix }}</span>
              </h3>
              <p class="mt-2 text-center text-gray-600">{{ metric.label }}</p>
            </div>
          </div>
        </div>
        
        <!-- Services Section -->
        <div id="our-services" class="mt-24 animate-fade-in" style="animation-delay: 600ms;">
          <h2 class="text-center text-3xl font-bold tracking-tight text-olg-blue sm:text-4xl mb-12 animate-slide-up">
            Our Expertise
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="(service, index) in services" 
              :key="service.title"
              class="service-card"
              :style="{ animationDelay: `${700 + index * 150}ms` }"
              @mouseenter="hoveredService = service.title"
              @mouseleave="hoveredService = null"
            >
              <div 
                class="service-icon-container"
                :class="{ 'active': hoveredService === service.title }"
              >
                <component :is="service.icon" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mt-4">{{ service.title }}</h3>
              <p class="mt-2 text-gray-600">{{ service.description }}</p>
              <div 
                class="service-indicator"
                :class="{ 'active': hoveredService === service.title }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import medlabconvo from "@/assets/img/medlab-logo.jpeg"
  import socialVoices from "@/assets/img/Social-Voices.jpg"
  import journoProject from "@/assets/img/the-journo-project.jpeg"
  import parFoundation from "@/assets/img/the-par-foundation.png"
  import lidesten from"@/assets/img/lifesten.png"
  import avatar from "@/assets/icons/avatar.svg"
  import { 
    ClipboardList, 
    MessageSquare, 
    Users, 
    BookOpen,
    BarChart,
    Globe,
    Award,
    ThumbsUp
  } from 'lucide-vue-next';
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "OLGNova's insights transformed the way we engage with our stakeholders. Their support was instrumental in aligning our strategy with real community needs.",
      author: "Peace Iraguha",
      title: "Chief Operations Officer, Lifesten Health Rwanda",
      avatar: avatar // Replace with actual avatar
    },
    {
      id: 2,
      quote: "OLGNova is supporting us in studying disinformation as we uncover how it is experienced, amplified, and internalised, particularly in communities often overlooked in global discourse. Through our collaboration with their team, we hope to empower platforms, policymakers, and the public with evidence that drives meaningful change.",
      author: "Seun Durojaiye",
      title: "Founder and Editor, Social Voices",
      avatar: avatar // Replace with actual avatar
    }
  ];
  
  // Partner logos
  const partnerLogos = [
    { name: "Medlab", src: medlabconvo },
    { name: "Social Voices", src: socialVoices },
    { name: "The Journo Project", src: journoProject },
    { name: "The PAR Foundation", src: parFoundation },
    { name: "Lifesten", src: lidesten }
  ];
  
  // Metrics data
  const metrics = [
    { value: 1500, label: "survey respondents engaged", icon: BarChart, prefix: "", suffix: "+" },
    { value: 6, label: "countries reached", icon: Globe, prefix: "", suffix: "" },
    { value: 5, label: "communication strategies delivered", icon: Award, prefix: "", suffix: "" },
    { value: 95, label: "satisfaction in recent client survey", icon: ThumbsUp, prefix: "", suffix: "%" }
  ];
  
  // Services data
  const services = [
    { 
      title: "Research and Evaluation", 
      icon: ClipboardList,
      description: "Data-driven insights to inform strategy and measure impact across diverse contexts and sectors."
    },
    { 
      title: "Strategic Communication", 
      icon: MessageSquare,
      description: "Crafting compelling narratives and communication plans that resonate with target audiences."
    },
    { 
      title: "Stakeholder Engagement", 
      icon: Users,
      description: "Building meaningful relationships with communities, partners, and decision-makers."
    },
    { 
      title: "Capacity Building", 
      icon: BookOpen,
      description: "Empowering organizations with the skills and knowledge to drive sustainable change."
    }
  ];
  
  // Interactive states
  const currentTestimonial = ref(0);
  const hoveredLogo = ref<string | null>(null);
  const hoveredService = ref<string | null>(null);
  
  // Animated counters
  const counterValues = ref(metrics.map(() => 0));
  const displayValues = ref(metrics.map(() => 0));
  const countersStarted = ref(metrics.map(() => false));
  
  // Auto-rotate testimonials
  let testimonialInterval: number | null = null;
  
  const startTestimonialRotation = () => {
    testimonialInterval = window.setInterval(() => {
      currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length;
    }, 8000);
  };
  
  // Counter animation
  const startCounter = (index: number) => {
    if (countersStarted.value[index]) return;
    
    countersStarted.value[index] = true;
    const targetValue = metrics[index].value;
    const duration = 1500; // ms
    const steps = 60;
    const stepValue = targetValue / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      if (currentStep <= steps) {
        displayValues.value[index] = Math.round(stepValue * currentStep);
        counterValues.value[index] = (displayValues.value[index] / targetValue) * 100;
      } else {
        displayValues.value[index] = targetValue;
        counterValues.value[index] = 100;
        clearInterval(interval);
      }
    }, stepDuration);
  };
  
  // Start animations on mount
  onMounted(() => {
    startTestimonialRotation();
    
    // Start counters when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          metrics.forEach((_, index) => startCounter(index));
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    
    const metricsSection = document.querySelector('.metric-card');
    if (metricsSection) observer.observe(metricsSection);
  });
  
  // Clean up on unmount
  onBeforeUnmount(() => {
    if (testimonialInterval) clearInterval(testimonialInterval);
  });
  </script>
  
  <style scoped>
  /* Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.text-olg-blue) { color: #3A6E9F; }
  :deep(.text-olg-blue-dark) { color: #2d5a83; }
  :deep(.bg-olg-green) { background-color: #B5D89B; }
  :deep(.bg-olg-cream) { background-color: #F0E6C9; }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes float {
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-15px) translateX(10px); }
    100% { transform: translateY(0) translateX(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }
  
  .animate-float-slow {
    animation: float 15s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float 12s ease-in-out infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  /* Testimonial Transitions */
  .testimonial-slide-enter-active,
  .testimonial-slide-leave-active {
    transition: all 0.5s ease;
  }
  
  .testimonial-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .testimonial-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  /* Partner Logos */
  .partner-logo-container {
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .partner-logo-container:hover {
    transform: translateY(-5px);
  }
  
  /* Metrics Cards */
  .metric-card {
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
    padding: 2rem;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
  
  .metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* Services Cards */
  .service-card {
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
    padding: 2rem;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .service-icon-container {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: #3A6E9F;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .service-icon-container.active {
    transform: scale(1.1) rotate(5deg);
    background-color: #2d5a83;
  }
  
  .service-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0;
    background-color: #3A6E9F;
    transition: width 0.3s ease;
  }
  
  .service-indicator.active {
    width: 100%;
  }
  </style>