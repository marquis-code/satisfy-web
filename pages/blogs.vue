<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with Animated Particles -->
      <div class="relative overflow-hidden bg-olg-blue py-16 sm:py-24">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-br from-olg-blue to-olg-blue-dark"></div>
          
          <!-- Animated particles -->
          <div class="absolute inset-0">
            <div v-for="(particle, index) in particles" :key="index" 
                 class="absolute rounded-full bg-white opacity-20 animate-particle" 
                 :style="{
                   left: `${particle.x}%`, 
                   top: `${particle.y}%`,
                   width: `${particle.size}px`,
                   height: `${particle.size}px`,
                   animationDelay: `${particle.delay}s`,
                   animationDuration: `${particle.duration}s`
                 }">
            </div>
          </div>
        </div>
        
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Blogs</h1>
            <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
              Stay connected with the latest insights from OLGnova
            </p>
            
            <!-- Newsletter Subscription -->
            <div class="mt-10 animate-slide-up" style="animation-delay: 200ms;">
              <form @submit.prevent="subscribeToNewsletter" class="sm:flex sm:max-w-md mx-auto">
                <label for="email-address" class="sr-only">Email address</label>
                <input 
                  id="email-address" 
                  v-model="email" 
                  name="email" 
                  type="email" 
                  autocomplete="email" 
                  required 
                  placeholder="Enter your email" 
                  class="w-full min-w-0 px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-olg-blue"
                />
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <button 
                    type="submit" 
                    class="flex w-full items-center justify-center rounded-md bg-olg-green px-4 py-3 text-base font-medium text-olg-blue shadow-sm hover:bg-olg-green-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-olg-green-light"
                  >
                    <mail-icon class="h-5 w-5 mr-2" />
                    Subscribe
                  </button>
                </div>
              </form>
              <p class="mt-3 text-sm text-olg-cream/80">
                Receive monthly updates on research, sector trends, and opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Blog Posts with Animation -->
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <!-- Category Filter -->
        <div class="mb-12 animate-fade-in" style="animation-delay: 300ms;">
          <div class="flex flex-wrap justify-center gap-2">
            <button 
              @click="selectedCategory = 'all'" 
              class="category-button"
              :class="{ 'active': selectedCategory === 'all' }"
            >
              All
            </button>
            <button 
              v-for="category in categories" 
              :key="category" 
              @click="selectedCategory = category" 
              class="category-button"
              :class="{ 'active': selectedCategory === category }"
            >
              {{ category }}
            </button>
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="mb-12 max-w-md mx-auto animate-fade-in" style="animation-delay: 400ms;">
          <div class="relative">
            <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search articles..." 
              class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-olg-blue shadow-sm"
            />
          </div>
        </div>
        
        <!-- Blog Grid -->
        <div v-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(blog, index) in filteredBlogs" 
            :key="blog.id"
            class="blog-card animate-slide-up"
            :style="{ animationDelay: `${500 + index * 100}ms` }"
            @mouseenter="hoveredBlog = blog.id"
            @mouseleave="hoveredBlog = null"
          >
            <div class="relative overflow-hidden rounded-t-xl h-48">
              <img 
                :src="blog.image" 
                :alt="blog.title" 
                class="w-full h-full object-cover transition-transform duration-700"
                :class="{ 'scale-110': hoveredBlog === blog.id }"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full text-white bg-olg-blue">
                  {{ blog.category }}
                </span>
              </div>
            </div>
            <div class="p-6 bg-white rounded-b-xl shadow-md">
              <div class="flex items-center text-sm text-gray-500 mb-2">
                <calendar-icon class="h-4 w-4 mr-1" />
                {{ blog.date }}
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ blog.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ blog.excerpt }}</p>
              <a 
                href="#" 
                class="inline-flex items-center text-olg-blue font-medium hover:text-olg-blue-dark transition-colors"
              >
                Read more
                <arrow-right-icon class="h-4 w-4 ml-1 transition-transform duration-300" :class="{ 'translate-x-1': hoveredBlog === blog.id }" />
              </a>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div v-else class="text-center py-12 animate-fade-in">
          <search-x-icon class="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-medium text-gray-700">No matching articles found</h3>
          <p class="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
        </div>
        
        <!-- Load More Button -->
        <div v-if="filteredBlogs.length > 0" class="mt-12 text-center animate-fade-in" style="animation-delay: 800ms;">
          <button 
            @click="loadMorePosts" 
            class="inline-flex items-center px-6 py-3 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg"
          >
            <refresh-cw-icon class="h-5 w-5 mr-2" :class="{ 'animate-spin': isLoading }" />
            {{ isLoading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { 
    Mail as MailIcon,
    Search as SearchIcon,
    SearchX as SearchXIcon,
    Calendar as CalendarIcon,
    ArrowRight as ArrowRightIcon,
    RefreshCw as RefreshCwIcon
  } from 'lucide-vue-next';
  
  // Newsletter subscription
  const email = ref('');
  
  const subscribeToNewsletter = () => {
    alert(`Thank you for subscribing with ${email.value}!`);
    email.value = '';
  };
  
  // Animated particles
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));
  
  // Blog data
  const blogs = ref([
    {
      id: 1,
      title: 'The Future of Health Technology in Africa',
      excerpt: 'Exploring how emerging technologies are transforming healthcare delivery across the African continent.',
      date: 'May 10, 2025',
      category: 'Health Tech',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Effective Stakeholder Engagement Strategies',
      excerpt: 'Learn how to build meaningful relationships with stakeholders to drive project success and sustainability.',
      date: 'April 28, 2025',
      category: 'Project Management',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Data-Driven Decision Making for Nonprofits',
      excerpt: 'How organizations can leverage data analytics to improve program outcomes and demonstrate impact.',
      date: 'April 15, 2025',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Building Resilient Health Systems',
      excerpt: 'Strategies for strengthening healthcare infrastructure to withstand future pandemics and health crises.',
      date: 'April 3, 2025',
      category: 'Global Health',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Communicating Complex Research Findings',
      excerpt: 'Best practices for translating technical research into accessible content for diverse audiences.',
      date: 'March 22, 2025',
      category: 'Communication',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Sustainable Development Goals: Progress Report',
      excerpt: 'Analyzing global progress toward the SDGs and identifying areas requiring accelerated action.',
      date: 'March 10, 2025',
      category: 'Global Health',
      image: 'https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ]);
  
  // Blog filtering
  const categories = computed(() => {
    const allCategories = blogs.value.map(blog => blog.category);
    return [...new Set(allCategories)];
  });
  
  const selectedCategory = ref('all');
  const searchQuery = ref('');
  const hoveredBlog = ref<number | null>(null);
  
  const filteredBlogs = computed(() => {
    let filtered = [...blogs.value];
    
    // Filter by category
    if (selectedCategory.value !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory.value);
    }
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  });
  
  // Load more functionality
  const isLoading = ref(false);
  
  const loadMorePosts = async () => {
    isLoading.value = true;
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add more blog posts
    const newPosts = [
      {
        id: blogs.value.length + 1,
        title: 'Innovative Approaches to Community Engagement',
        excerpt: 'Case studies highlighting successful community-based initiatives and participatory research methods.',
        date: 'March 5, 2025',
        category: 'Research',
        image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: blogs.value.length + 2,
        title: 'The Role of AI in Global Health',
        excerpt: 'Exploring how artificial intelligence is transforming disease surveillance, diagnostics, and treatment.',
        date: 'February 28, 2025',
        category: 'Health Tech',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: blogs.value.length + 3,
        title: 'Measuring Social Impact: Beyond the Numbers',
        excerpt: 'How organizations can develop comprehensive frameworks for evaluating social impact and program effectiveness.',
        date: 'February 15, 2025',
        category: 'Project Management',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    blogs.value = [...blogs.value, ...newPosts];
    isLoading.value = false;
  };
  </script>
  
  <style scoped>
  /* Brand Colors */
  :deep(.bg-olg-blue) { background-color: #3A6E9F; }
  :deep(.bg-olg-blue-dark) { background-color: #2d5a83; }
  :deep(.bg-olg-blue-light) { background-color: #4d80b1; }
  :deep(.bg-olg-green) { background-color: #B5D89B; }
  :deep(.bg-olg-green-light) { background-color: #c5e2af; }
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
  
  @keyframes particleFloat {
    0% { transform: translateY(0) translateX(0); opacity: 0.2; }
    50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
    100% { transform: translateY(0) translateX(0); opacity: 0.2; }
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }
  
  .animate-particle {
    animation: particleFloat 15s ease-in-out infinite;
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Custom Styling */
  .blog-card {
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .category-button {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    background-color: #f3f4f6;
    transition: all 0.3s ease;
  }
  
  .category-button:hover {
    background-color: #e5e7eb;
  }
  
  .category-button.active {
    background-color: #3A6E9F;
    color: white;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>