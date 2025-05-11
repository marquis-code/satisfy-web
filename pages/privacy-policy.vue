<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with Animated Background -->
      <div class="relative bg-olg-blue py-16 sm:py-24">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-olg-blue to-olg-blue-dark"></div>
          <!-- Animated privacy icons -->
          <div class="absolute inset-0 opacity-10">
            <div v-for="(icon, index) in privacyIcons" :key="index" 
                 class="absolute animate-float" 
                 :style="{
                   left: `${icon.x}%`, 
                   top: `${icon.y}%`, 
                   animationDelay: `${icon.delay}s`,
                   animationDuration: `${icon.duration}s`
                 }">
              <component :is="icon.component" class="text-white h-8 w-8 md:h-12 md:w-12" />
            </div>
          </div>
        </div>
        
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Privacy Policy</h1>
            <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
              Your Data Protected
            </p>
          </div>
        </div>
      </div>
  
      <!-- Main Content with Card Animation -->
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <div class="bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in">
            <div class="p-8 md:p-12">
              <div class="prose prose-lg prose-olg max-w-none">
                <p class="lead-paragraph">
                  At OLGnova, protecting your personal and project information is a core part of our values and responsibility.
                </p>
                
                <div class="privacy-card animate-slide-up" style="animation-delay: 200ms;">
                  <h2 class="flex items-center">
                    <database-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Data Collection
                  </h2>
                  <p>
                    We collect only the information necessary to support our work with you. This typically includes your name, 
                    contact details, organization information, and project-related files.
                  </p>
                </div>
                
                <div class="privacy-card animate-slide-up" style="animation-delay: 300ms;">
                  <h2 class="flex items-center">
                    <file-search-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    How We Use Your Data
                  </h2>
                  <p>
                    We use this data only to deliver our services, maintain secure communication, and improve our internal 
                    processes through general analytics. We do not sell or share your information with any third parties.
                  </p>
                </div>
                
                <div class="privacy-card animate-slide-up" style="animation-delay: 400ms;">
                  <h2 class="flex items-center">
                    <cookie-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Cookies
                  </h2>
                  <p>
                    Cookies used on our website serve essential functions such as login access and basic usage analytics. 
                    You can choose to opt out of non-essential analytics at any time.
                  </p>
                </div>
                
                <div class="privacy-card animate-slide-up" style="animation-delay: 500ms;">
                  <h2 class="flex items-center">
                    <user-cog-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Your Rights
                  </h2>
                  <p>
                    You have full control over your personal data. You may request access to your information, ask for corrections, 
                    or request that your data be deleted by contacting us at 
                    <a href="mailto:olgnovateam@gmail.com">olgnovateam@gmail.com</a>.
                  </p>
                </div>
                
                <div class="privacy-card animate-slide-up" style="animation-delay: 600ms;">
                  <h2 class="flex items-center">
                    <shield-icon class="h-6 w-6 mr-2 text-olg-blue" />
                    Compliance
                  </h2>
                  <p>
                    OLGnova complies with global data protection laws including the General Data Protection Regulation and 
                    the California Consumer Privacy Act. We are committed to following industry best practices and to maintaining 
                    the confidentiality, security, and integrity of your information at every step.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Interactive Privacy Controls -->
            <div class="bg-olg-blue-50 p-8 border-t border-gray-200 animate-fade-in" style="animation-delay: 700ms;">
              <h3 class="text-xl font-semibold text-olg-blue mb-4">Privacy Preferences</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gray-900">Essential Cookies</h4>
                    <p class="text-sm text-gray-600">Required for basic website functionality</p>
                  </div>
                  <div class="relative">
                    <div class="w-12 h-6 bg-olg-blue rounded-full shadow-inner flex items-center pl-0.5">
                      <div class="w-5 h-5 rounded-full bg-white shadow transform translate-x-6"></div>
                    </div>
                    <span class="ml-2 text-xs text-gray-500">Always on</span>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gray-900">Analytics Cookies</h4>
                    <p class="text-sm text-gray-600">Help us improve our website</p>
                  </div>
                  <div class="relative">
                    <button 
                      @click="toggleAnalytics" 
                      class="w-12 h-6 rounded-full shadow-inner flex items-center pl-0.5 transition-colors duration-300"
                      :class="analyticsEnabled ? 'bg-olg-blue' : 'bg-gray-300'"
                    >
                      <div 
                        class="w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
                        :class="analyticsEnabled ? 'transform translate-x-6' : ''"
                      ></div>
                    </button>
                    <span class="ml-2 text-xs text-gray-500">{{ analyticsEnabled ? 'Enabled' : 'Disabled' }}</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 text-center">
                <button 
                  @click="savePreferences" 
                  class="inline-flex items-center px-4 py-2 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg transform hover:scale-105"
                >
                  <save-icon class="h-4 w-4 mr-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
          
          <!-- Contact Section -->
          <div class="mt-12 text-center animate-fade-in" style="animation-delay: 800ms;">
            <p class="text-gray-700 mb-4">
              Have questions about our privacy practices?
            </p>
            <a 
              href="mailto:olgnovateam@gmail.com" 
              class="inline-flex items-center px-6 py-3 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg"
            >
              <mail-icon class="h-5 w-5 mr-2" />
              Contact Our Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    Database as DatabaseIcon,
    FileSearch as FileSearchIcon,
    Cookie as CookieIcon,
    UserCog as UserCogIcon,
    Shield as ShieldIcon,
    Save as SaveIcon,
    Mail as MailIcon,
    Lock as LockIcon,
    Eye as EyeIcon,
    FileText as FileTextIcon,
    Key as KeyIcon,
    Server as ServerIcon
  } from 'lucide-vue-next';
  
  // Privacy icons for animated background
  const privacyIcons = [
    { component: LockIcon, x: 10, y: 20, delay: 0, duration: 15 },
    { component: ShieldIcon, x: 25, y: 70, delay: 2, duration: 18 },
    { component: EyeIcon, x: 45, y: 30, delay: 1, duration: 12 },
    { component: FileTextIcon, x: 65, y: 60, delay: 3, duration: 20 },
    { component: KeyIcon, x: 80, y: 25, delay: 2.5, duration: 16 },
    { component: ServerIcon, x: 90, y: 80, delay: 1.5, duration: 14 }
  ];
  
  // Interactive elements
  const analyticsEnabled = ref(true);
  
  const toggleAnalytics = () => {
    analyticsEnabled.value = !analyticsEnabled.value;
  };
  
  const savePreferences = () => {
    // Show success message
    alert('Your privacy preferences have been saved!');
  };
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
    0% { transform: translate(0, 0); }
    50% { transform: translate(10px, -10px); }
    100% { transform: translate(0, 0); }
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
  
  /* Custom Styling */
  .lead-paragraph {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #374151;
    margin-bottom: 2rem;
  }
  
  .privacy-card {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #f9fafb;
    border-left: 4px solid #3A6E9F;
    transition: all 0.3s ease;
  }
  
  .privacy-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: white;
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