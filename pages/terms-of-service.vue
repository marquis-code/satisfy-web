<template>
    <div class="min-h-screen bg-white">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-olg-blue">
        <!-- Animated background elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="animate-float-slow opacity-10 absolute -right-20 -top-20 w-64 h-64 rounded-full bg-olg-green"></div>
          <div class="animate-float-medium opacity-10 absolute -left-32 top-40 w-96 h-96 rounded-full bg-olg-cream"></div>
        </div>
        
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative">
          <div class="mx-auto max-w-2xl lg:mx-0 animate-fade-in">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Terms of Service</h1>
            <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
              Transparent Collaboration for Meaningful Impact
            </p>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <div class="prose prose-lg prose-olg max-w-none animate-fade-in">
            <p class="lead-paragraph">
              At OLGnova, we believe that clear expectations are the foundation of effective partnerships. 
              Our terms of service are designed to ensure transparency, accountability, and mutual understanding 
              throughout every phase of our work together.
            </p>
            <p>
              By engaging OLGnova, you acknowledge and agree to the following terms:
            </p>
            
            <div class="terms-section animate-slide-up mt-10" style="animation-delay: 200ms;">
              <div class="terms-card" @mouseenter="hoveredSection = 'scope'" @mouseleave="hoveredSection = null">
                <h2 class="flex items-center">
                  <document-text-icon class="h-6 w-6 mr-2 text-olg-blue" :class="{'animate-pulse': hoveredSection === 'scope'}" />
                  Scope of Work
                </h2>
                <p>
                  All services are delivered according to the details outlined in signed proposals. 
                  This includes project goals, timelines, deliverables, and methods. 
                  Any adjustments must be agreed upon in writing by both parties.
                </p>
              </div>
            </div>
            
            <div class="terms-section animate-slide-up" style="animation-delay: 300ms;">
              <div class="terms-card" @mouseenter="hoveredSection = 'client'" @mouseleave="hoveredSection = null">
                <h2 class="flex items-center">
                  <users-icon class="h-6 w-6 mr-2 text-olg-blue" :class="{'animate-pulse': hoveredSection === 'client'}" />
                  Client Responsibilities
                </h2>
                <p>
                  Clients are expected to provide timely feedback, grant access to relevant data and documentation, 
                  and maintain open communication throughout the duration of the project. 
                  Active collaboration ensures we can deliver the best possible outcomes.
                </p>
              </div>
            </div>
            
            <div class="terms-section animate-slide-up" style="animation-delay: 400ms;">
              <div class="terms-card" @mouseenter="hoveredSection = 'fees'" @mouseleave="hoveredSection = null">
                <h2 class="flex items-center">
                  <credit-card-icon class="h-6 w-6 mr-2 text-olg-blue" :class="{'animate-pulse': hoveredSection === 'fees'}" />
                  Fees and Payments
                </h2>
                <p>
                  All fees are clearly stated in our proposals. Invoices follow an agreed schedule and must be paid 
                  within the designated period. Delayed payments may incur additional charges or service interruptions.
                </p>
              </div>
            </div>
            
            <div class="terms-section animate-slide-up" style="animation-delay: 500ms;">
              <div class="terms-card" @mouseenter="hoveredSection = 'ip'" @mouseleave="hoveredSection = null">
                <h2 class="flex items-center">
                  <shield-check-icon class="h-6 w-6 mr-2 text-olg-blue" :class="{'animate-pulse': hoveredSection === 'ip'}" />
                  Intellectual Property
                </h2>
                <p>
                  Clients retain full rights to final deliverables. However, OLGnova maintains ownership of any 
                  pre-existing materials or methodologies used during the project. Any shared proprietary information 
                  is handled with confidentiality.
                </p>
              </div>
            </div>
            
            <div class="terms-section animate-slide-up" style="animation-delay: 600ms;">
              <div class="terms-card" @mouseenter="hoveredSection = 'liability'" @mouseleave="hoveredSection = null">
                <h2 class="flex items-center">
                  <scale-icon class="h-6 w-6 mr-2 text-olg-blue" :class="{'animate-pulse': hoveredSection === 'liability'}" />
                  Limitation of Liability
                </h2>
                <p>
                  OLGnova's liability is limited to the amount paid for services under the applicable project agreement. 
                  We are not liable for indirect or consequential damages that may arise from the use of our deliverables.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Contact CTA -->
          <div class="mt-16 text-center animate-fade-in" style="animation-delay: 700ms;">
            <div class="bg-olg-blue-50 rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <h3 class="text-xl font-semibold text-olg-blue mb-4">Have questions about our terms?</h3>
              <p class="text-gray-700 mb-6">
                Our team is ready to clarify any aspects of our terms of service.
              </p>
              <a 
                href="mailto:olgnovateam@gmail.com" 
                class="inline-flex items-center px-6 py-3 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow-md hover:shadow-lg"
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
    // DocumentText as DocumentTextIcon,
    Users as UsersIcon,
    CreditCard as CreditCardIcon,
    ShieldCheck as ShieldCheckIcon,
    Scale as ScaleIcon,
    Mail as MailIcon
  } from 'lucide-vue-next';
  
  const hoveredSection = ref<string | null>(null);
  </script>
  
  <style scoped>
  /* Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.bg-olg-blue-50) { background-color: #f0f4f8; }
  :deep(.bg-olg-blue-dark) { background-color: #2d5a83; }
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
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-15px) translateX(10px); }
    100% { transform: translateY(0) translateX(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
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
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  /* Custom Styling */
  .lead-paragraph {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #374151;
    margin-bottom: 2rem;
  }
  
  .terms-section {
    margin-bottom: 2rem;
  }
  
  .terms-card {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border-left: 4px solid #3A6E9F;
  }
  
  .terms-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
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