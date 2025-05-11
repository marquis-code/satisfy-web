<template>
    <div class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-olg-blue mb-4">
            Frequently Asked Questions
          </h1>
          <div class="w-24 h-1 bg-olg-blue mx-auto mb-6"></div>
          <p class="text-gray-700 max-w-2xl  mx-auto">
            Find answers to common questions about OLGnova's services, programs, and how we can help your organization achieve its goals.
          </p>
        </div>
  
        <!-- Search bar -->
        <div class="mb-8 mt-10">
          <div class="relative max-w-lg mx-auto">
            <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search questions..." 
              class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-olg-blue shadow-md"
            />
          </div>
        </div>
  
        <!-- FAQ Component -->
        <FaqAccordion :faqs="filteredFaqs" />
  
        <!-- No results message -->
        <div v-if="filteredFaqs.length === 0 && searchQuery" class="text-center py-10">
          <search-x-icon class="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-medium text-gray-700">No matching questions found</h3>
          <p class="text-gray-600 mt-2">Try adjusting your search terms</p>
        </div>
  
        <!-- Contact CTA -->
        <div class="mt-16 text-center bg-olg-blue-50 p-8 rounded-xl shadow-md">
          <h3 class="text-2xl font-bold text-olg-blue mb-3">Still have questions?</h3>
          <p class="text-gray-700 mb-6 max-w-lg mx-auto">
            Our team is ready to assist you with any inquiries about our services, programs, or how we can collaborate.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:olgnovateam@gmail.com" 
              class="inline-flex items-center px-6 py-3 bg-olg-blue hover:bg-olg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <mail-icon class="h-5 w-5 mr-2" />
              Email Us
            </a>
            <a 
              href="tel:+250788249545" 
              class="inline-flex items-center px-6 py-3 bg-olg-green hover:bg-olg-green-600 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <phone-icon class="h-5 w-5 mr-2" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { 
    Search as SearchIcon,
    SearchX as SearchXIcon,
    Mail as MailIcon,
    Phone as PhoneIcon
  } from 'lucide-vue-next'
  
  interface FAQ {
    question: string;
    answer: string;
  }
  
  // FAQ data
  const faqData = ref<FAQ[]>([
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
        <p>Reach out to us through our contact form or email us directly at <a href="mailto:olgnovateam@gmail.com">olgnovateam@gmail.com</a>.</p>
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
          <li>📧 Email: <a href="mailto:olgnovateam@gmail.com">olgnovateam@gmail.com</a></li>
          <li>📞 Phone: +250 788 249 545 | +44 7551 289858</li>
          <li>📬 Or fill out our online contact form — we're here to help!</li>
        </ul>
      `
    }
  ]);
  
  // Search state
  const searchQuery = ref('');
  
  // Computed properties
  const filteredFaqs = computed(() => {
    if (!searchQuery.value) return faqData.value;
    
    const query = searchQuery.value.toLowerCase();
    return faqData.value.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  });
  </script>
  
  <style>
  /* OLG Brand Colors */
  .text-olg-blue { color: #3A6E9F; }
  .bg-olg-blue { background-color: #3A6E9F; }
  .bg-olg-blue-50 { background-color: #f0f4f8; }
  .bg-olg-blue-700 { background-color: #2d5a83; }
  .focus\:ring-olg-blue:focus { --tw-ring-color: #3A6E9F; }
  .hover\:bg-olg-blue-700:hover { background-color: #2d5a83; }
  
  .bg-olg-green { background-color: #B5D89B; }
  .bg-olg-green-600 { background-color: #9bc47a; }
  .hover\:bg-olg-green-600:hover { background-color: #9bc47a; }
  </style>