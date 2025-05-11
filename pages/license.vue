<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with Animated License Elements -->
      <div class="relative overflow-hidden bg-olg-blue py-16 sm:py-24">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-r from-olg-blue-dark to-olg-blue"></div>
          
          <!-- Animated license elements -->
          <div class="absolute inset-0">
            <svg class="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"></path>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-pattern)"></rect>
            </svg>
            
            <div v-for="(item, index) in licenseElements" :key="index" 
                 class="absolute animate-float opacity-10" 
                 :style="{
                   left: `${item.x}%`, 
                   top: `${item.y}%`, 
                   animationDelay: `${item.delay}s`,
                   animationDuration: `${item.duration}s`
                 }">
              <component :is="item.component" class="text-white h-10 w-10 md:h-16 md:w-16" />
            </div>
          </div>
        </div>
        
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">License</h1>
            <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
              Usage Rights for OLGnova Materials
            </p>
          </div>
        </div>
      </div>
  
      <!-- Main Content with 3D Card Effect -->
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <!-- 3D License Card -->
          <div 
            class="license-card bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in perspective"
            @mousemove="handleMouseMove"
            @mouseleave="resetCardTransform"
          >
            <div 
              class="p-8 md:p-12 transform-3d transition-transform duration-200"
              :style="cardTransformStyle"
            >
              <div class="prose prose-lg prose-olg max-w-none">
                <p class="lead-paragraph">
                  Clients receive full rights to use, modify, and distribute the final deliverables provided by OLGnova 
                  once all project payments have been completed.
                </p>
                
                <div class="license-section animate-slide-up" style="animation-delay: 200ms;">
                  <h2 class="flex items-center">
                    <file-check-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Deliverable Rights
                  </h2>
                  <p>
                    These rights apply to custom reports, communications materials, training content, and other agreed outputs.
                  </p>
                </div>
                
                <div class="license-section animate-slide-up" style="animation-delay: 300ms;">
                  <h2 class="flex items-center">
                    <globe-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Public Distribution
                  </h2>
                  <p>
                    For public distribution of materials such as whitepapers, templates, or published content, 
                    attribution to OLGnova is required. Clients are welcome to adapt these materials for internal use 
                    without attribution, but public use must clearly acknowledge the source.
                  </p>
                </div>
                
                <div class="license-section animate-slide-up" style="animation-delay: 400ms;">
                  <h2 class="flex items-center">
                    <share-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    OLGnova Rights
                  </h2>
                  <p>
                    OLGnova retains the right to use anonymized elements of project work, such as case examples or process insights, 
                    in future knowledge-sharing efforts, including training and research.
                  </p>
                </div>
                
                <div class="license-section animate-slide-up" style="animation-delay: 500ms;">
                  <h2 class="flex items-center">
                    <package-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Third-Party Tools
                  </h2>
                  <p>
                    Proprietary tools or software used in projects, such as platforms provided by Salesforce or AWS, 
                    remain subject to the licensing terms of those third parties. We are committed to transparency and 
                    will clearly communicate when such tools are involved.
                  </p>
                </div>
                
                <div class="license-section animate-slide-up" style="animation-delay: 600ms;">
                  <p class="text-center text-gray-700 italic">
                    These licensing terms ensure fair use, shared learning, and respect for intellectual property on all sides.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Interactive License Selector -->
          <div class="mt-16 animate-fade-in" style="animation-delay: 700ms;">
            <div class="bg-olg-blue-50 rounded-xl p-8 shadow-lg">
              <h3 class="text-xl font-semibold text-olg-blue mb-6 text-center">Explore License Options</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  class="license-option-card" 
                  :class="{ 'active': selectedLicense === 'standard' }"
                  @click="selectedLicense = 'standard'"
                >
                  <div class="p-4">
                    <file-icon class="h-8 w-8 text-olg-blue mb-2" />
                    <h4 class="font-semibold text-gray-900">Standard License</h4>
                    <p class="text-sm text-gray-600">For most client projects</p>
                  </div>
                </div>
                
                <div 
                  class="license-option-card" 
                  :class="{ 'active': selectedLicense === 'extended' }"
                  @click="selectedLicense = 'extended'"
                >
                  <div class="p-4">
                    <file-plus-icon class="h-8 w-8 text-olg-blue mb-2" />
                    <h4 class="font-semibold text-gray-900">Extended License</h4>
                    <p class="text-sm text-gray-600">For commercial distribution</p>
                  </div>
                </div>
                
                <div 
                  class="license-option-card" 
                  :class="{ 'active': selectedLicense === 'custom' }"
                  @click="selectedLicense = 'custom'"
                >
                  <div class="p-4">
                    <settings-icon class="h-8 w-8 text-olg-blue mb-2" />
                    <h4 class="font-semibold text-gray-900">Custom License</h4>
                    <p class="text-sm text-gray-600">Tailored to your needs</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 text-center">
                <a 
                  href="mailto:olgnovateam@gmail.com" 
                  class="inline-flex items-center px-6 py-3 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg transform hover:scale-105"
                >
                  <mail-icon class="h-5 w-5 mr-2" />
                  Discuss License Options
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { 
    FileCheck as FileCheckIcon,
    Globe as GlobeIcon,
    Share as ShareIcon,
    Package as PackageIcon,
    Mail as MailIcon,
    File as FileIcon,
    FilePlus as FilePlusIcon,
    Settings as SettingsIcon,
    Copyright as CopyrightIcon,
    FileText as FileTextIcon,
    Award as AwardIcon,
    Briefcase as BriefcaseIcon,
    BookOpen as BookOpenIcon
  } from 'lucide-vue-next';
  
  // License elements for animated background
  const licenseElements = [
    { component: CopyrightIcon, x: 15, y: 25, delay: 0, duration: 15 },
    { component: FileTextIcon, x: 30, y: 65, delay: 2, duration: 18 },
    { component: AwardIcon, x: 50, y: 35, delay: 1, duration: 12 },
    { component: BriefcaseIcon, x: 70, y: 55, delay: 3, duration: 20 },
    { component: BookOpenIcon, x: 85, y: 30, delay: 2.5, duration: 16 }
  ];
  
  // 3D card effect
  const cardRotation = ref({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Convert to rotation degrees (limited range)
    const maxRotation = 5;
    cardRotation.value = {
      x: -(y / rect.height * maxRotation * 2),
      y: (x / rect.width * maxRotation * 2)
    };
  };
  
  const resetCardTransform = () => {
    cardRotation.value = { x: 0, y: 0 };
  };
  
  const cardTransformStyle = computed(() => {
    return {
      transform: `rotateX(${cardRotation.value.x}deg) rotateY(${cardRotation.value.y}deg)`
    };
  });
  
  // License selector
  const selectedLicense = ref('standard');
  </script>
  
  <style scoped>
  /* Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.bg-olg-blue-dark) { background-color: #2d5a83; }
  :deep(.bg-olg-blue-50) { background-color: #f0f4f8; }
  :deep(.bg-olg-green) { background-color: #B5D89B; }
  :deep(.bg-olg-cream) { background-color: #F0E6C9; }
  
  :deep(.text-olg-blue) { color: #3A6E9F; }
  :deep(.text-olg-green) { color: #B5D89B; }
  :deep(.text-olg-cream) { color: #F0E6C9; }
  
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
    0% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(10px, -10px) rotate(5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }
  
  .animate-float {
    animation: float 15s ease-in-out infinite;
  }
  
  /* 3D Card Effect */
  .perspective {
    perspective: 1000px;
  }
  
  .transform-3d {
    transform-style: preserve-3d;
  }
  
  /* Custom Styling */
  .lead-paragraph {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #374151;
    margin-bottom: 2rem;
  }
  
  .license-section {
    margin-bottom: 2rem;
  }
  
  .license-section h2 {
    display: flex;
    align-items: center;
    color: #3A6E9F;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  .license-option-card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
  }
  
  .license-option-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .license-option-card.active {
    border-color: #3A6E9F;
    box-shadow: 0 4px 6px rgba(58, 110, 159, 0.2);
  }
  
  /* Prose Styling */
  :deep(.prose-olg) {
    --tw-prose-headings: #3A6E9F;
    --tw-prose-links: #3A6E9F;
  }
  
  :deep(.prose-olg a) {
    color: #3A6E9F;
    text-decoration: none;
    font-weight: 500;
  }
  
  :deep(.prose-olg a:hover) {
    text-decoration: underline;
  }
  </style>