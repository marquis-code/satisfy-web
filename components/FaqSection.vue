<template>
    <div class="min-h-screen bg-gradient-to-br from-light-green-50 to-light-green-100 dark:from-blue-950 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header with animation -->
        <div class="text-center mb-16 animate-fade-in">
          <h1 class="text-3xl md:text-5xl font-bold text-blue-700 dark:text-cream-300 mb-4">
            Frequently Asked Questions
          </h1>
          <div class="w-24 h-1 bg-blue-600 dark:bg-cream-400 mx-auto mb-6 animate-scale-in"></div>
          <p class="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Find answers to common questions about OLGnova's services, programs, and how we can help your organization achieve its goals.
          </p>
        </div>
  
        <!-- Search bar -->
        <div class="mb-8 animate-fade-in">
          <div class="relative max-w-lg mx-auto">
            <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search questions..." 
              class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
          </div>
        </div>
  
        <!-- FAQ Accordion -->
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in filteredFaqs" 
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 animate-fade-in"
            :class="{ 
              'shadow-lg ring-2 ring-blue-500 dark:ring-cream-500': activeIndex === index,
              'hover:shadow-lg': activeIndex !== index
            }"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none transition-colors duration-300"
              :class="{ 'bg-blue-50 dark:bg-blue-900/30': activeIndex === index }"
              :aria-expanded="activeIndex === index"
              :aria-controls="`faq-answer-${index}`"
            >
              <span class="font-medium text-lg text-gray-900 dark:text-white">{{ faq.question }}</span>
              <div 
                class="flex-shrink-0 ml-2 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-all duration-300"
                :class="{ 
                  'rotate-180 bg-blue-200 dark:bg-blue-800': activeIndex === index,
                  'hover:bg-blue-200 dark:hover:bg-blue-800': activeIndex !== index
                }"
              >
                <chevron-down-icon class="h-5 w-5 text-blue-700 dark:text-cream-300" />
              </div>
            </button>
            
            <div 
              :id="`faq-answer-${index}`"
              class="overflow-hidden transition-all duration-500 ease-in-out"
              :class="{ 'max-h-0': activeIndex !== index }"
              :style="{ maxHeight: activeIndex === index ? `${answerHeights[index]}px` : '0' }"
            >
              <div 
                ref="answerRefs"
                class="px-6 pb-6 prose dark:prose-invert prose-blue max-w-none animate-fade-in"
                v-html="faq.answer"
              ></div>
            </div>
          </div>
        </div>
  
        <!-- No results message -->
        <div v-if="filteredFaqs.length === 0 && searchQuery" class="text-center py-10 animate-fade-in">
          <search-x-icon class="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-medium text-gray-700 dark:text-gray-300">No matching questions found</h3>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search terms</p>
        </div>
  
        <!-- Contact CTA -->
        <div class="mt-16 text-center bg-blue-50 dark:bg-blue-900/30 p-8 rounded-xl shadow-md animate-fade-in">
          <h3 class="text-2xl font-bold text-blue-700 dark:text-cream-300 mb-3">Still have questions?</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6 max-w-lg mx-auto">
            Our team is ready to assist you with any inquiries about our services, programs, or how we can collaborate.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:olgnovateam@gmail.com" 
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <mail-icon class="h-5 w-5 mr-2" />
              Email Us
            </a>
            <a 
              href="tel:+250788249545" 
              class="inline-flex items-center px-6 py-3 bg-light-green-500 hover:bg-light-green-600 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <phone-icon class="h-5 w-5 mr-2" />
              Call Us
            </a>
          </div>
        </div>
  
        <!-- Location information -->
        <div class="mt-12 grid md:grid-cols-2 gap-6 animate-fade-in">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <map-pin-icon class="h-8 w-8 text-blue-600 dark:text-cream-400 mb-3" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kigali, Rwanda</h3>
            <p class="text-gray-700 dark:text-gray-300">1. KG 11 Ave</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <map-pin-icon class="h-8 w-8 text-blue-600 dark:text-cream-400 mb-3" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nigeria</h3>
            <p class="text-gray-700 dark:text-gray-300">Shop complex, Opp. Table Mannas Junction, Licksensation, University of Osun</p>
          </div>
        </div>
      </div>
  
      <!-- Dark mode toggle -->
      <button 
        @click="toggleDarkMode" 
        class="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        aria-label="Toggle dark mode"
      >
        <sun-icon v-if="isDarkMode" class="h-6 w-6 text-cream-500" />
        <moon-icon v-else class="h-6 w-6 text-blue-700" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, nextTick, watch } from 'vue'
  import { 
    ChevronDown as ChevronDownIcon,
    Mail as MailIcon,
    Phone as PhoneIcon,
    MapPin as MapPinIcon,
    Search as SearchIcon,
    SearchX as SearchXIcon,
    Sun as SunIcon,
    Moon as MoonIcon
  } from 'lucide-vue-next'
  
  interface FAQ {
    question: string;
    answer: string;
  }
  
  // FAQ data
  const faqs = ref<FAQ[]>([
    {
      question: "What services does OLGnova offer?",
      answer: `
        <p>We offer a comprehensive suite of services including:</p>
        <ul>
          <li>Research and publication support</li>
          <li>Surveys and stakeholder insights</li>
          <li>Strategic communication</li>
          <li>Project management</li>
          <li>Monitoring and evaluation</li>
          <li>Capacity building for organizations</li>
        </ul>
        <p>Our services are designed to drive data-informed strategies and sustainable impact.</p>
      `
    },
    {
      question: "Can OLGnova help determine if my research is suitable for publication or conferences?",
      answer: `
        <p>Yes! If you have completed research and are unsure about its readiness for publication or presentation at a scientific conference, we can review it and provide expert feedback.</p>
        <p>Reach out to us through our contact form or email us directly at <a href="mailto:olgnovateam@gmail.com" class="text-blue-600 dark:text-cream-400 hover:underline">olgnovateam@gmail.com</a>.</p>
      `
    },
    {
      question: "Who can benefit from your services?",
      answer: `
        <p>We work with:</p>
        <ul>
          <li>Nonprofits</li>
          <li>Development organizations</li>
          <li>Research institutions</li>
          <li>Startups</li>
          <li>Businesses</li>
        </ul>
        <p>Whether you're launching a new initiative or strengthening an existing one, we tailor our solutions to fit your goals.</p>
      `
    },
    {
      question: "Do you offer training or capacity-building programs?",
      answer: `
        <p>Yes. We provide research training and team capacity-building services to help organizations meet performance and social standards.</p>
        <p>We also offer the Emerging Researchers Program, a structured internship for recent graduates interested in research and consulting.</p>
      `
    },
    {
      question: "What is the Emerging Researchers Program?",
      answer: `
        <p>This is a 3–6 month internship aimed at developing recent university graduates. Interns gain hands-on experience in:</p>
        <ul>
          <li>Research</li>
          <li>Communication</li>
          <li>Strategic consulting</li>
        </ul>
        <p>They work on real-world challenges, receive mentorship, and contribute to meaningful projects in areas such as health tech and global development.</p>
      `
    },
    {
      question: "How does OLGnova ensure project accountability and transparency?",
      answer: `
        <p>Our approach to project management emphasizes:</p>
        <ul>
          <li>Clear planning</li>
          <li>Stakeholder engagement</li>
          <li>Continuous tracking</li>
          <li>Transparent reporting</li>
        </ul>
        <p>We implement strong monitoring and evaluation frameworks to ensure measurable outcomes and continuous learning.</p>
      `
    },
    {
      question: "How do you collect feedback from stakeholders?",
      answer: `
        <p>We design and administer customized surveys to gather feedback from communities, partners, and other stakeholders.</p>
        <p>This data helps refine strategies, align initiatives with real-world needs, and improve overall project efficiency.</p>
      `
    },
    {
      question: "Can OLGnova support my organization with publication and knowledge dissemination?",
      answer: `
        <p>Absolutely. We help craft high-quality:</p>
        <ul>
          <li>Reports</li>
          <li>Articles</li>
          <li>Policy briefs</li>
          <li>Other knowledge products</li>
        </ul>
        <p>We also provide support in editing, formatting, and submitting your work to scientific journals or conference organizers.</p>
      `
    },
    {
      question: "Where is OLGnova located?",
      answer: `
        <p>We operate from two locations:</p>
        <div class="space-y-2">
          <div>
            <strong>Kigali, Rwanda</strong>
            <p>1. KG 11 Ave</p>
          </div>
          <div>
            <strong>Nigeria</strong>
            <p>Shop complex, Opp. Table Mannas Junction, Licksensation, University of Osun</p>
          </div>
        </div>
      `
    },
    {
      question: "How can I contact OLGnova?",
      answer: `
        <p>You can reach us by:</p>
        <ul>
          <li>📧 Email: <a href="mailto:olgnovateam@gmail.com" class="text-blue-600 dark:text-cream-400 hover:underline">olgnovateam@gmail.com</a></li>
          <li>📞 Phone: +250 788 249 545 | +44 7551 289858</li>
          <li>📬 Or fill out our online contact form — we're here to help!</li>
        </ul>
      `
    }
  ]);
  
  // State
  const activeIndex = ref<number | null>(null);
  const answerRefs = ref<HTMLElement[]>([]);
  const answerHeights = ref<number[]>([]);
  const searchQuery = ref('');
  const isDarkMode = ref(false);
  
  // Computed properties
  const filteredFaqs = computed(() => {
    if (!searchQuery.value) return faqs.value;
    
    const query = searchQuery.value.toLowerCase();
    return faqs.value.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  });
  
  // Methods
  const toggleFaq = (index: number) => {
    // If clicking the currently active FAQ, close it
    if (activeIndex.value === index) {
      activeIndex.value = null;
      return;
    }
    
    // Otherwise, open the clicked FAQ and close any others
    activeIndex.value = index;
  };
  
  const calculateHeights = async () => {
    await nextTick();
    
    if (!answerRefs.value || answerRefs.value.length === 0) return;
    
    answerHeights.value = answerRefs.value.map(el => {
      return el ? el.scrollHeight : 0;
    });
  };
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Watch for changes in filtered FAQs to recalculate heights
  watch(filteredFaqs, async () => {
    activeIndex.value = null; // Close any open FAQ when filtering
    await nextTick();
    calculateHeights();
  }, { deep: true });
  
  // Lifecycle hooks
  onMounted(async () => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
      document.documentElement.classList.add('dark');
    }
    
    await calculateHeights();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateHeights);
  });
  </script>
  
  <style>
  /* Brand Colors */
  :root {
    --color-light-green: #B5D89B;
    --color-blue: #3A6E9F;
    --color-cream: #F0E6C9;
  }
  
  /* Tailwind CSS Custom Colors */
  .bg-light-green-50 { background-color: #f2f8ed; }
  .bg-light-green-100 { background-color: #e5f1db; }
  .bg-light-green-200 { background-color: #cce3b7; }
  .bg-light-green-300 { background-color: #b5d89b; } /* Main brand green */
  .bg-light-green-400 { background-color: #9ecb7b; }
  .bg-light-green-500 { background-color: #87be5b; }
  .bg-light-green-600 { background-color: #6ca347; }
  .bg-light-green-700 { background-color: #578339; }
  .bg-light-green-800 { background-color: #42632b; }
  .bg-light-green-900 { background-color: #2d421d; }
  
  .bg-blue-50 { background-color: #f0f4f8; }
  .bg-blue-100 { background-color: #d9e2ec; }
  .bg-blue-200 { background-color: #bcccdc; }
  .bg-blue-300 { background-color: #9fb3c8; }
  .bg-blue-400 { background-color: #829ab1; }
  .bg-blue-500 { background-color: #627d98; }
  .bg-blue-600 { background-color: #486581; }
  .bg-blue-700 { background-color: #3A6E9F; } /* Main brand blue */
  .bg-blue-800 { background-color: #2d3748; }
  .bg-blue-900 { background-color: #1a202c; }
  
  .bg-cream-50 { background-color: #fdfbf6; }
  .bg-cream-100 { background-color: #f8f4e8; }
  .bg-cream-200 { background-color: #f3edd9; }
  .bg-cream-300 { background-color: #F0E6C9; } /* Main brand cream */
  .bg-cream-400 { background-color: #e8dab0; }
  .bg-cream-500 { background-color: #e0ce97; }
  .bg-cream-600 { background-color: #d8c27e; }
  .bg-cream-700 { background-color: #c9b05c; }
  .bg-cream-800 { background-color: #b99e3b; }
  .bg-cream-900 { background-color: #8c7730; }
  
  .text-light-green-50 { color: #f2f8ed; }
  .text-light-green-100 { color: #e5f1db; }
  .text-light-green-200 { color: #cce3b7; }
  .text-light-green-300 { color: #b5d89b; } /* Main brand green */
  .text-light-green-400 { color: #9ecb7b; }
  .text-light-green-500 { color: #87be5b; }
  .text-light-green-600 { color: #6ca347; }
  .text-light-green-700 { color: #578339; }
  .text-light-green-800 { color: #42632b; }
  .text-light-green-900 { color: #2d421d; }
  
  .text-blue-50 { color: #f0f4f8; }
  .text-blue-100 { color: #d9e2ec; }
  .text-blue-200 { color: #bcccdc; }
  .text-blue-300 { color: #9fb3c8; }
  .text-blue-400 { color: #829ab1; }
  .text-blue-500 { color: #627d98; }
  .text-blue-600 { color: #486581; }
  .text-blue-700 { color: #3A6E9F; } /* Main brand blue */
  .text-blue-800 { color: #2d3748; }
  .text-blue-900 { color: #1a202c; }
  
  .text-cream-50 { color: #fdfbf6; }
  .text-cream-100 { color: #f8f4e8; }
  .text-cream-200 { color: #f3edd9; }
  .text-cream-300 { color: #F0E6C9; } /* Main brand cream */
  .text-cream-400 { color: #e8dab0; }
  .text-cream-500 { color: #e0ce97; }
  .text-cream-600 { color: #d8c27e; }
  .text-cream-700 { color: #c9b05c; }
  .text-cream-800 { color: #b99e3b; }
  .text-cream-900 { color: #8c7730; }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }
  
  .animate-slide-down {
    animation: slideDown 0.8s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.8s ease-out forwards;
    transform-origin: center;
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
  
  /* Ensure smooth transitions */
  .transition-all {
    transition-property: all;
  }
  
  .duration-300 {
    transition-duration: 300ms;
  }
  
  .duration-500 {
    transition-duration: 500ms;
  }
  
  .ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Prose styling */
  .prose ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  .prose li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
  
  .prose a {
    color: var(--color-blue);
    text-decoration: none;
  }
  
  .prose a:hover {
    text-decoration: underline;
  }
  
  .dark .prose a {
    color: var(--color-cream);
  }
  
  /* Dark mode transition */
  html.dark {
    transition: background-color 0.5s ease;
  }
  </style>