<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with Animated Wave Background -->
      <div class="relative overflow-hidden bg-olg-blue py-16 sm:py-24">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-br from-olg-blue-dark to-olg-blue"></div>
          
          <!-- Animated wave background -->
          <div class="absolute inset-0 overflow-hidden">
            <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path 
                class="wave-1" 
                fill="#B5D89B" 
                fill-opacity="0.1" 
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
              <path 
                class="wave-2" 
                fill="#F0E6C9" 
                fill-opacity="0.1" 
                d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,176C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
        
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Pro-Bono Program</h1>
            <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
              At OLGnova, we're committed to giving back through our annual pro-bono initiative.
            </p>
          </div>
        </div>
      </div>
  
      <!-- Main Content with Interactive Elements -->
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <!-- How It Works Section -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <div class="p-8 md:p-12">
              <h2 class="text-2xl font-bold text-olg-blue mb-8 text-center">How It Works</h2>
              
              <!-- Interactive Steps -->
              <div class="relative">
                <!-- Progress Line -->
                <div class="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>
                
                <!-- Step 1 -->
                <div 
                  class="pro-bono-step animate-slide-up" 
                  style="animation-delay: 200ms;"
                  @mouseenter="activeProBonoStep = 1"
                  @mouseleave="activeProBonoStep = null"
                >
                  <div 
                    class="pro-bono-step-number"
                    :class="{ 'active': activeProBonoStep === 1 }"
                  >
                    1
                  </div>
                  <div class="pro-bono-step-content">
                    <h3 class="text-xl font-semibold text-gray-900">Express Interest</h3>
                    <div class="mt-2 text-gray-600">
                      <ul class="list-disc list-inside space-y-2">
                        <li>Submit your details anytime to join our pro-bono database</li>
                        <li>We'll notify you when our April application window opens</li>
                      </ul>
                      <div class="mt-4">
                        <button 
                          @click="showInterestForm = true" 
                          class="inline-flex items-center px-4 py-2 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg transform hover:scale-105"
                        >
                          <user-plus-icon class="h-4 w-4 mr-2" />
                          Express interest now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Step 2 -->
                <div 
                  class="pro-bono-step animate-slide-up" 
                  style="animation-delay: 300ms;"
                  @mouseenter="activeProBonoStep = 2"
                  @mouseleave="activeProBonoStep = null"
                >
                  <div 
                    class="pro-bono-step-number"
                    :class="{ 'active': activeProBonoStep === 2 }"
                  >
                    2
                  </div>
                  <div class="pro-bono-step-content">
                    <h3 class="text-xl font-semibold text-gray-900">Annual Selection Process</h3>
                    <div class="mt-2 text-gray-600">
                      <ul class="list-disc list-inside space-y-2">
                        <li>Each April, we review all expressions of interest</li>
                        <li>Selected projects receive our full pro-bono services</li>
                        <li>Focus areas for 2026: Social Justice, Health Equity, and Maternal Health</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Interest Form Modal -->
          <div v-if="showInterestForm" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <!-- Background overlay -->
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showInterestForm = false"></div>
              
              <!-- Modal panel -->
              <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-up">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-olg-blue-50 sm:mx-0 sm:h-10 sm:w-10">
                      <heart-icon class="h-6 w-6 text-olg-blue" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Express Interest in Pro-Bono Support
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Please provide your information to be considered for our pro-bono program. We'll notify you when the application window opens.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-6">
                    <form @submit.prevent="submitProBonoInterest" class="space-y-4">
                      <div>
                        <label for="organization" class="block text-sm font-medium text-gray-700">Organization name</label>
                        <input 
                          type="text" 
                          id="organization" 
                          v-model="proBonoForm.organization"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                          required
                        />
                      </div>
                      
                      <div>
                        <label for="contact-name" class="block text-sm font-medium text-gray-700">Contact name</label>
                        <input 
                          type="text" 
                          id="contact-name" 
                          v-model="proBonoForm.contactName"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                          required
                        />
                      </div>
                      
                      <div>
                        <label for="contact-email" class="block text-sm font-medium text-gray-700">Contact email</label>
                        <input 
                          type="email" 
                          id="contact-email" 
                          v-model="proBonoForm.contactEmail"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                          required
                        />
                      </div>
                      
                      <div>
                        <label for="focus-area" class="block text-sm font-medium text-gray-700">Focus area</label>
                        <select 
                          id="focus-area" 
                          v-model="proBonoForm.focusArea"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="social-justice">Social Justice</option>
                          <option value="health-equity">Health Equity</option>
                          <option value="maternal-health">Maternal Health</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div v-if="proBonoForm.focusArea === 'other'">
                        <label for="other-focus" class="block text-sm font-medium text-gray-700">Please specify</label>
                        <input 
                          type="text" 
                          id="other-focus" 
                          v-model="proBonoForm.otherFocus"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                        />
                      </div>
                      
                      <div>
                        <label for="brief-description" class="block text-sm font-medium text-gray-700">Brief description of your organization</label>
                        <textarea 
                          id="brief-description" 
                          v-model="proBonoForm.description"
                          rows="3" 
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                          required
                        ></textarea>
                      </div>
                      
                      <div class="flex items-center">
                        <input 
                          id="newsletter" 
                          v-model="proBonoForm.newsletter"
                          type="checkbox" 
                          class="h-4 w-4 text-olg-blue focus:ring-olg-blue border-gray-300 rounded"
                        />
                        <label for="newsletter" class="ml-2 block text-sm text-gray-700">
                          Subscribe to our newsletter for updates
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    type="button" 
                    @click="submitProBonoInterest"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-olg-blue text-base font-medium text-white hover:bg-olg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olg-blue sm:ml-3 sm:w-auto sm:text-sm"
                    :disabled="isSubmittingProBono"
                  >
                    <loader-icon v-if="isSubmittingProBono" class="h-4 w-4 mr-2 animate-spin" />
                    {{ isSubmittingProBono ? 'Submitting...' : 'Submit' }}
                  </button>
                  <button 
                    type="button" 
                    @click="showInterestForm = false"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olg-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Newsletter Subscription -->
          <div class="mt-16 animate-fade-in" style="animation-delay: 400ms;">
            <div class="bg-olg-blue rounded-xl p-8 shadow-lg text-white">
              <div class="text-center mb-6">
                <h3 class="text-xl font-semibold mb-2">Stay Connected</h3>
                <p class="text-olg-cream/90">
                  Want to be first to know about our pro-bono opportunities and other updates?
                </p>
              </div>
              
              <form @submit.prevent="subscribeToNewsletter" class="max-w-md mx-auto">
                <div class="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    v-model="newsletterEmail"
                    placeholder="Enter your email" 
                    class="flex-grow px-4 py-2 rounded-md border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-olg-green"
                    required
                  />
                  <button 
                    type="submit" 
                    class="inline-flex items-center justify-center px-4 py-2 bg-olg-green text-olg-blue font-medium rounded-md transition-all duration-300 hover:bg-olg-green-light shadow hover:shadow-lg"
                  >
                    <mail-icon class="h-5 w-5 mr-2" />
                    Subscribe
                  </button>
                </div>
                <p class="mt-3 text-sm text-center text-olg-cream/80">
                  Subscribe to our newsletter: Let the subscription confirmation go to: olgnovateam@gmail.com
                </p>
              </form>
            </div>
          </div>
          
          <!-- Past Pro-Bono Projects -->
          <div class="mt-16 animate-fade-in" style="animation-delay: 500ms;">
            <h2 class="text-2xl font-bold text-olg-blue mb-8 text-center">Past Pro-Bono Projects</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                @mouseenter="hoveredProject = 1"
                @mouseleave="hoveredProject = null"
              >
                <div class="h-40 bg-olg-blue-50 flex items-center justify-center">
                  <heart-pulse-icon class="h-16 w-16 text-olg-blue" :class="{ 'animate-pulse': hoveredProject === 1 }" />
                </div>
                <div class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Health Access Initiative</h3>
                  <p class="text-gray-600 mb-4">
                    Supported a community health organization in developing a monitoring and evaluation framework for their rural outreach program.
                  </p>
                  <span class="inline-block px-3 py-1 text-xs font-medium rounded-full text-olg-blue bg-olg-blue-50">
                    2025 Project
                  </span>
                </div>
              </div>
              
              <div 
                class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                @mouseenter="hoveredProject = 2"
                @mouseleave="hoveredProject = null"
              >
                <div class="h-40 bg-olg-green-50 flex items-center justify-center">
                  <book-open-icon class="h-16 w-16 text-olg-green" :class="{ 'animate-pulse': hoveredProject === 2 }" />
                </div>
                <div class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Education Equity Research</h3>
                  <p class="text-gray-600 mb-4">
                    Conducted research on educational disparities and developed policy recommendations for a nonprofit focused on equal access to quality education.
                  </p>
                  <span class="inline-block px-3 py-1 text-xs font-medium rounded-full text-olg-green bg-olg-green-50">
                    2024 Project
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- FAQ Section -->
          <div class="mt-16 animate-fade-in" style="animation-delay: 600ms;">
            <h2 class="text-2xl font-bold text-olg-blue mb-8 text-center">Frequently Asked Questions</h2>
            
            <div class="space-y-4">
              <div 
                class="bg-white rounded-lg shadow-md overflow-hidden"
                :class="{ 'ring-2 ring-olg-blue': activeFaq === 1 }"
              >
                <button 
                  @click="activeFaq = activeFaq === 1 ? null : 1"
                  class="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <span class="font-medium text-gray-900">Who is eligible for the pro-bono program?</span>
                  <chevron-down-icon 
                    class="h-5 w-5 text-olg-blue transition-transform duration-300"
                    :class="{ 'transform rotate-180': activeFaq === 1 }"
                  />
                </button>
                <div 
                  class="overflow-hidden transition-all duration-300"
                  :class="{ 'max-h-0': activeFaq !== 1, 'max-h-96': activeFaq === 1 }"
                >
                  <div class="px-6 pb-4 text-gray-600">
                    <p>
                      Our pro-bono program is open to registered nonprofit organizations, community initiatives, and social enterprises working in our focus areas. Priority is given to organizations with limited resources that demonstrate potential for significant social impact.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                class="bg-white rounded-lg shadow-md overflow-hidden"
                :class="{ 'ring-2 ring-olg-blue': activeFaq === 2 }"
              >
                <button 
                  @click="activeFaq = activeFaq === 2 ? null : 2"
                  class="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <span class="font-medium text-gray-900">What services are included in the pro-bono support?</span>
                  <chevron-down-icon 
                    class="h-5 w-5 text-olg-blue transition-transform duration-300"
                    :class="{ 'transform rotate-180': activeFaq === 2 }"
                  />
                </button>
                <div 
                  class="overflow-hidden transition-all duration-300"
                  :class="{ 'max-h-0': activeFaq !== 2, 'max-h-96': activeFaq === 2 }"
                >
                  <div class="px-6 pb-4 text-gray-600">
                    <p>
                      Selected organizations receive the same high-quality services we provide to our paying clients, including research support, strategic communication, project management, and capacity building. The specific scope is determined based on your organization's needs and our available resources.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                class="bg-white rounded-lg shadow-md overflow-hidden"
                :class="{ 'ring-2 ring-olg-blue': activeFaq === 3 }"
              >
                <button 
                  @click="activeFaq = activeFaq === 3 ? null : 3"
                  class="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <span class="font-medium text-gray-900">How long does the pro-bono engagement last?</span>
                  <chevron-down-icon 
                    class="h-5 w-5 text-olg-blue transition-transform duration-300"
                    :class="{ 'transform rotate-180': activeFaq === 3 }"
                  />
                </button>
                <div 
                  class="overflow-hidden transition-all duration-300"
                  :class="{ 'max-h-0': activeFaq !== 3, 'max-h-96': activeFaq === 3 }"
                >
                  <div class="px-6 pb-4 text-gray-600">
                    <p>
                      Pro-bono engagements typically last 3-6 months, depending on the project scope and complexity. We work with selected organizations to define clear objectives and timelines at the outset of the partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    UserPlus as UserPlusIcon,
    Heart as HeartIcon,
    Loader as LoaderIcon,
    Mail as MailIcon,
    HeartPulse as HeartPulseIcon,
    BookOpen as BookOpenIcon,
    ChevronDown as ChevronDownIcon
  } from 'lucide-vue-next';
  
  // Interactive elements
  const activeProBonoStep = ref<number | null>(null);
  const hoveredProject = ref<number | null>(null);
  const activeFaq = ref<number | null>(null);
  
  // Interest form
  const showInterestForm = ref(false);
  const isSubmittingProBono = ref(false);
  const proBonoForm = ref({
    organization: '',
    contactName: '',
    contactEmail: '',
    focusArea: '',
    otherFocus: '',
    description: '',
    newsletter: false
  });
  
  const submitProBonoInterest = async () => {
    isSubmittingProBono.value = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    alert('Thank you for your interest in our pro-bono program! We will notify you when the application window opens.');
    
    // Reset form and close modal
    proBonoForm.value = {
      organization: '',
      contactName: '',
      contactEmail: '',
      focusArea: '',
      otherFocus: '',
      description: '',
      newsletter: false
    };
    
    showInterestForm.value = false;
    isSubmittingProBono.value = false;
  };
  
  // Newsletter subscription
  const newsletterEmail = ref('');
  
  const subscribeToNewsletter = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success message
    alert(`Thank you for subscribing with ${newsletterEmail.value}! A confirmation has been sent to olgnovateam@gmail.com.`);
    
    // Reset form
    newsletterEmail.value = '';
  };
  </script>
  
  <style scoped>
  /* Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.bg-olg-blue-dark) { background-color: #2d5a83; }
  :deep(.bg-olg-blue-50) { background-color: #f0f4f8; }
  :deep(.bg-olg-green) { background-color: #B5D89B; }
  :deep(.bg-olg-green-light) { background-color: #c5e2af; }
  :deep(.bg-olg-green-50) { background-color: #f2f9ed; }
  :deep(.bg-olg-cream) { background-color: #F0E6C9; }
  
  :deep(.text-olg-blue) { color: #3A6E9F; }
  :deep(.text-olg-blue-dark) { color: #2d5a83; }
  :deep(.text-olg-green) { color: #B5D89B; }
  :deep(.text-olg-cream) { color: #F0E6C9; }
  
  :deep(.focus\:border-olg-blue:focus) { border-color: #3A6E9F; }
  :deep(.focus\:ring-olg-blue:focus) { --tw-ring-color: #3A6E9F; }
  :deep(.focus\:ring-olg-green:focus) { --tw-ring-color: #B5D89B; }
  :deep(.ring-olg-blue) { --tw-ring-color: #3A6E9F; }
  
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
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes waveAnimation {
    0% { transform: translateX(0) translateY(0); }
    50% { transform: translateX(-2%) translateY(2%); }
    100% { transform: translateX(0) translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }
  
  .animate-scale-up {
    animation: scaleUp 0.3s ease-out forwards;
  }
  
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .wave-1 {
    animation: waveAnimation 15s ease-in-out infinite;
    transform-origin: center bottom;
  }
  
  .wave-2 {
    animation: waveAnimation 10s ease-in-out infinite reverse;
    transform-origin: center bottom;
    animation-delay: 0.5s;
  }
  
  /* Pro Bono Step Styling */
  .pro-bono-step {
    display: flex;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .pro-bono-step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f0f4f8;
    color: #3A6E9F;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
    transition: all 0.3s ease;
    border: 2px solid #f0f4f8;
  }
  
  .pro-bono-step-number.active {
    background-color: #3A6E9F;
    color: white;
    transform: scale(1.1);
    border-color: #3A6E9F;
  }
  
  .pro-bono-step-content {
    margin-left: 1.5rem;
    flex: 1;
  }
  
  /* FAQ Accordion Styling */
  .max-h-0 {
    max-height: 0;
  }
  
  .max-h-96 {
    max-height: 24rem;
  }
  </style>