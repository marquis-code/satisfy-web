<template>
    <div class="olg-faq-component">
      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-white rounded-lg shadow-md border-[0.5px] border-gray-50 overflow-hidden transition-all duration-300 animate-fade-in"
          :class="{ 
            'shadow-lg ring-2 ring-olg-blue': activeIndex === index,
            'hover:shadow-lg': activeIndex !== index
          }"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <button 
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none transition-colors duration-300"
            :class="{ 'bg-olg-blue-50': activeIndex === index }"
            :aria-expanded="activeIndex === index"
            :aria-controls="`faq-answer-${index}`"
          >
            <span class="font-medium text-lg text-gray-900">{{ faq.question }}</span>
            <div 
              class="flex-shrink-0 ml-2 w-8 h-8 rounded-full bg-olg-blue-100 flex items-center justify-center transition-all duration-300"
              :class="{ 
                'rotate-180 bg-olg-blue-200': activeIndex === index,
                'hover:bg-olg-blue-200': activeIndex !== index
              }"
            >
              <chevron-down-icon class="h-5 w-5 text-olg-blue" />
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
              class="px-6 pb-6 olg-prose max-w-none animate-fade-in"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, nextTick, watch } from 'vue'
  import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
  
  interface FAQ {
    question: string;
    answer: string;
  }
  
  // Props
  const props = defineProps<{
    faqs: FAQ[]
  }>();
  
  // State
  const activeIndex = ref<number | null>(null);
  const answerRefs = ref<HTMLElement[]>([]);
  const answerHeights = ref<number[]>([]);
  
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
  
  // Watch for changes in faqs to recalculate heights
  watch(() => props.faqs, async () => {
    activeIndex.value = null; // Close any open FAQ when faqs change
    await nextTick();
    calculateHeights();
  }, { deep: true });
  
  // Lifecycle hooks
  onMounted(async () => {
    await calculateHeights();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateHeights);
  });
  </script>
  
  <style scoped>
  .olg-faq-component {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  /* OLG Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.bg-olg-blue-50) { background-color: #f0f4f8; }
  :deep(.bg-olg-blue-100) { background-color: #d9e2ec; }
  :deep(.bg-olg-blue-200) { background-color: #bcccdc; }
  :deep(.text-olg-blue) { color: #3A6E9F; }
  :deep(.ring-olg-blue) { --tw-ring-color: #3A6E9F; }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  /* Prose styling for FAQ content */
  :deep(.olg-prose) {
    color: #374151;
    max-width: 65ch;
    line-height: 1.6;
  }
  
  :deep(.olg-prose p) {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  
  :deep(.olg-prose a) {
    color: #3A6E9F;
    text-decoration: none;
  }
  
  :deep(.olg-prose a:hover) {
    text-decoration: underline;
  }
  
  :deep(.olg-prose strong) {
    font-weight: 600;
    color: #111827;
  }
  
  :deep(.olg-prose ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  
  :deep(.olg-prose li) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
  </style>