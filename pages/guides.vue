<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with Animated Illustrations -->
      <div class="relative overflow-hidden bg-olg-blue py-16 sm:py-24">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-br from-olg-blue-dark to-olg-blue"></div>
          
          <!-- Animated illustrations -->
          <div class="absolute inset-0 overflow-hidden">
            <svg class="absolute left-full transform -translate-x-1/2 -translate-y-1/4 lg:left-auto lg:right-full lg:translate-x-1/2 lg:translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
              <defs>
                <pattern id="guide-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-olg-cream" fill="currentColor" fill-opacity="0.1" />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#guide-pattern)" />
            </svg>
            
            <div class="absolute top-1/4 right-1/4 animate-float-slow">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#B5D89B" fill-opacity="0.2" />
                <circle cx="40" cy="40" r="30" stroke="#B5D89B" stroke-opacity="0.4" stroke-width="2" />
                <circle cx="40" cy="40" r="20" fill="#B5D89B" fill-opacity="0.2" />
              </svg>
            </div>
            
            <div class="absolute bottom-1/4 left-1/4 animate-float-medium">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="10" fill="#F0E6C9" fill-opacity="0.2" />
                <rect x="10" y="10" width="40" height="40" rx="5" stroke="#F0E6C9" stroke-opacity="0.4" stroke-width="2" />
                <rect x="20" y="20" width="20" height="20" fill="#F0E6C9" fill-opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Guide</h1>
            <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
              How to Work With OLGnova
            </p>
            <p class="mt-4 text-base text-olg-cream/80 animate-slide-up" style="animation-delay: 200ms;">
              A Step-by-Step Guide to Our Collaborative Process
            </p>
          </div>
        </div>
      </div>
  
      <!-- Main Content with Interactive Steps -->
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <div class="prose prose-lg prose-olg max-w-none animate-fade-in">
            <p class="lead-paragraph">
              Whether you're discovering OLGnova for the first time or have worked with us before, this guide outlines how we partner with organizations to create meaningful, measurable impact. From your first inquiry to post-project optimization, we ensure a transparent and results-driven experience.
            </p>
            
            <!-- Interactive Steps -->
            <div class="mt-12 space-y-16">
              <div 
                class="step-container animate-slide-up" 
                style="animation-delay: 300ms;"
                @mouseenter="activeStep = 1"
                @mouseleave="activeStep = null"
              >
                <div class="step-number" :class="{ 'active': activeStep === 1 }">1</div>
                <div class="step-content">
                  <h2 class="step-title">Discovery Phase</h2>
                  <div class="step-description">
                    <p>
                      We begin with a conversation. You share your goals, challenges, and context—we listen, ask the right questions, and assess how we can add value.
                    </p>
                    <div class="step-outcome">
                      <strong>Outcome:</strong> A clear understanding of your needs and our recommended approach.
                    </div>
                  </div>
                  <div class="step-icon">
                    <search-icon class="h-8 w-8 text-olg-blue transition-all duration-300" :class="{ 'scale-125': activeStep === 1 }" />
                  </div>
                </div>
              </div>
              
              <div 
                class="step-container animate-slide-up" 
                style="animation-delay: 400ms;"
                @mouseenter="activeStep = 2"
                @mouseleave="activeStep = null"
              >
                <div class="step-number" :class="{ 'active': activeStep === 2 }">2</div>
                <div class="step-content">
                  <h2 class="step-title">Tailored Proposal</h2>
                  <div class="step-description">
                    <p>
                      Based on the discovery session, we craft a detailed proposal that outlines scope, methodology, timeline, and transparent pricing.
                    </p>
                    <div class="step-outcome">
                      <strong>Outcome:</strong> A customized plan aligned with your goals, with no surprises.
                    </div>
                  </div>
                  <div class="step-icon">
                    <clipboard-list-icon class="h-8 w-8 text-olg-blue transition-all duration-300" :class="{ 'scale-125': activeStep === 2 }" />
                  </div>
                </div>
              </div>
              
              <div 
                class="step-container animate-slide-up" 
                style="animation-delay: 500ms;"
                @mouseenter="activeStep = 3"
                @mouseleave="activeStep = null"
              >
                <div class="step-number" :class="{ 'active': activeStep === 3 }">3</div>
                <div class="step-content">
                  <h2 class="step-title">Implementation</h2>
                  <div class="step-description">
                    <p>
                      Our team gets to work, managing every aspect of the project while keeping you in the loop through regular check-ins and progress updates.
                    </p>
                    <div class="step-outcome">
                      <strong>Outcome:</strong> Efficient execution and clear communication from start to finish.
                    </div>
                  </div>
                  <div class="step-icon">
                    <play-icon class="h-8 w-8 text-olg-blue transition-all duration-300" :class="{ 'scale-125': activeStep === 3 }" />
                  </div>
                </div>
              </div>
              
              <div 
                class="step-container animate-slide-up" 
                style="animation-delay: 600ms;"
                @mouseenter="activeStep = 4"
                @mouseleave="activeStep = null"
              >
                <div class="step-number" :class="{ 'active': activeStep === 4 }">4</div>
                <div class="step-content">
                  <h2 class="step-title">Review and Optimize</h2>
                  <div class="step-description">
                    <p>
                      We don't stop at delivery. Once the project concludes, we provide post-project support, gather feedback, and offer recommendations for future improvements.
                    </p>
                    <div class="step-outcome">
                      <strong>Outcome:</strong> Continuous learning and long-term value.
                    </div>
                  </div>
                  <div class="step-icon">
                    <refresh-cw-icon class="h-8 w-8 text-olg-blue transition-all duration-300" :class="{ 'scale-125': activeStep === 4 }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Interactive Process Visualization -->
          <div class="mt-20 animate-fade-in" style="animation-delay: 700ms;">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="p-6 md:p-8">
                <h3 class="text-xl font-semibold text-olg-blue mb-6 text-center">Our Process Visualization</h3>
                
                <div class="process-visualization">
                  <div class="process-timeline">
                    <div 
                      v-for="step in 4" 
                      :key="step" 
                      class="process-node"
                      :class="{ 'active': visualStep >= step }"
                      @click="visualStep = step"
                    >
                      {{ step }}
                    </div>
                    <div 
                      class="process-progress"
                      :style="{ width: `${(visualStep - 1) * 33.33}%` }"
                    ></div>
                  </div>
                  
                  <div class="process-content mt-8">
                    <div v-if="visualStep === 1" class="process-detail animate-fade-in">
                      <h4 class="font-semibold text-lg mb-2">Discovery Phase</h4>
                      <p class="text-gray-600">
                        During this initial phase, we conduct stakeholder interviews, review existing documentation, and analyze your current challenges and opportunities.
                      </p>
                      <div class="mt-4 flex justify-end">
                        <button 
                          @click="visualStep = 2" 
                          class="inline-flex items-center text-olg-blue hover:text-olg-blue-dark"
                        >
                          Next step
                          <arrow-right-icon class="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <div v-if="visualStep === 2" class="process-detail animate-fade-in">
                      <h4 class="font-semibold text-lg mb-2">Tailored Proposal</h4>
                      <p class="text-gray-600">
                        We develop a comprehensive proposal with detailed deliverables, timelines, and resource requirements based on your specific needs and objectives.
                      </p>
                      <div class="mt-4 flex justify-between">
                        <button 
                          @click="visualStep = 1" 
                          class="inline-flex items-center text-olg-blue hover:text-olg-blue-dark"
                        >
                          <arrow-left-icon class="h-4 w-4 mr-1" />
                          Previous step
                        </button>
                        <button 
                          @click="visualStep = 3" 
                          class="inline-flex items-center text-olg-blue hover:text-olg-blue-dark"
                        >
                          Next step
                          <arrow-right-icon class="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <div v-if="visualStep === 3" class="process-detail animate-fade-in">
                      <h4 class="font-semibold text-lg mb-2">Implementation</h4>
                      <p class="text-gray-600">
                        Our expert team executes the project plan, providing regular updates through scheduled check-ins and progress reports to ensure alignment and transparency.
                      </p>
                      <div class="mt-4 flex justify-between">
                        <button 
                          @click="visualStep = 2" 
                          class="inline-flex items-center text-olg-blue hover:text-olg-blue-dark"
                        >
                          <arrow-left-icon class="h-4 w-4 mr-1" />
                          Previous step
                        </button>
                        <button 
                          @click="visualStep = 4" 
                          class="inline-flex items-center text-olg-blue hover:text-olg-blue-dark"
                        >
                          Next step
                          <arrow-right-icon class="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <div v-if="visualStep === 4" class="process-detail animate-fade-in">
                      <h4 class="font-semibold text-lg mb-2">Review and Optimize</h4>
                      <p class="text-gray-600">
                        We conduct a thorough evaluation of project outcomes, gather stakeholder feedback, and provide recommendations for continuous improvement and future initiatives.
                      </p>
                      <div class="mt-4 flex justify-start">
                        <button 
                          @click="visualStep = 3" 
                          class="inline-flex items-center text-olg-blue hover:text-olg-blue-dark"
                        >
                          <arrow-left-icon class="h-4 w-4 mr-1" />
                          Previous step
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- CTA Section -->
          <div class="mt-16 text-center animate-fade-in" style="animation-delay: 800ms;">
            <div class="bg-olg-blue-50 rounded-xl p-8 shadow-lg">
              <h3 class="text-xl font-semibold text-olg-blue mb-4">Ready to get started?</h3>
              <p class="text-gray-700 mb-6">
                Let's begin the conversation about how OLGnova can support your organization's goals.
              </p>
              <a 
                href="mailto:olgnovateam@gmail.com" 
                class="inline-flex items-center px-6 py-3 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg transform hover:scale-105"
              >
                <mail-icon class="h-5 w-5 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    Search as SearchIcon,
    ClipboardList as ClipboardListIcon,
    Play as PlayIcon,
    RefreshCw as RefreshCwIcon,
    Mail as MailIcon,
    ArrowRight as ArrowRightIcon,
    ArrowLeft as ArrowLeftIcon
  } from 'lucide-vue-next';
  
  // Interactive elements
  const activeStep = ref<number | null>(null);
  const visualStep = ref(1);
  </script>
  
  <style scoped>
  /* Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.bg-olg-blue-dark) { background-color: #2d5a83; }
  :deep(.bg-olg-blue-50) { background-color: #f0f4f8; }
  :deep(.bg-olg-green) { background-color: #B5D89B; }
  :deep(.bg-olg-cream) { background-color: #F0E6C9; }
  
  :deep(.text-olg-blue) { color: #3A6E9F; }
  :deep(.text-olg-blue-dark) { color: #2d5a83; }
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
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-15px) translateX(10px); }
    100% { transform: translateY(0) translateX(0); }
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
  
  /* Custom Styling */
  .lead-paragraph {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #374151;
    margin-bottom: 2rem;
  }
  
  /* Step Styling */
  .step-container {
    display: flex;
    position: relative;
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f4f8;
    color: #3A6E9F;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
    z-index: 10;
  }
  
  .step-number.active {
    background-color: #3A6E9F;
    color: white;
    transform: scale(1.1);
  }
  
  .step-content {
    margin-left: 1.5rem;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
  
  .step-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #3A6E9F;
    margin-bottom: 0.5rem;
    width: 100%;
  }
  
  .step-description {
    flex: 1;
  }
  
  .step-outcome {
    margin-top: 1rem;
    padding: 0.75rem;
    background-color: #f0f4f8;
    border-left: 3px solid #3A6E9F;
    border-radius: 0.25rem;
  }
  
  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1.5rem;
  }
  
  /* Process Visualization */
  .process-visualization {
    padding: 1rem 0;
  }
  
  .process-timeline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0 1rem;
  }
  
  .process-node {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f0f4f8;
    color: #3A6E9F;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .process-node.active {
    background-color: #3A6E9F;
    color: white;
  }
  
  .process-progress {
    position: absolute;
    top: 50%;
    left: 0;
    height: 4px;
    background-color: #3A6E9F;
    transform: translateY(-50%);
    transition: width 0.5s ease;
    z-index: 5;
  }
  
  .process-timeline::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #f0f4f8;
    transform: translateY(-50%);
  }
  
  .process-detail {
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    min-height: 150px;
  }
  
  /* Prose Styling */
  :deep(.prose-olg) {
    --tw-prose-headings: #3A6E9F;
    --tw-prose-links: #3A6E9F;
  }
  
  :deep(.prose-olg h2) {
    color: #3A6E9F;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 2rem;
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
