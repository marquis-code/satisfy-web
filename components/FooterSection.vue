<template>
  <footer class="relative overflow-hidden bg-olg-blue">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated circles -->
      <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-olg-green/10 animate-float-slow"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-olg-cream/10 animate-float-medium"></div>
      
      <!-- Animated grid pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B5D89B" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <!-- Animated particles -->
      <div v-for="i in 20" :key="i" 
           :class="`absolute rounded-full bg-olg-cream animate-particle opacity-${Math.random() > 0.5 ? '30' : '50'}`"
           :style="{
             width: `${Math.random() * 6 + 2}px`,
             height: `${Math.random() * 6 + 2}px`,
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             animationDuration: `${Math.random() * 10 + 10}s`,
             animationDelay: `${Math.random() * 5}s`
           }">
      </div>
      
      <!-- Animated wave -->
      <div class="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg class="absolute bottom-0 w-full h-40" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path class="animate-wave" fill="#B5D89B" fill-opacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>

    <div class="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-24 lg:px-8">
      <!-- Main content -->
      <div class="mx-auto max-w-2xl text-center">
        <div class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-olg-green/20 mb-4 animate-pulse-slow">
          <span class="text-sm font-medium text-olg-green">Get started</span>
        </div>
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl animate-slide-up">
          Boost your productivity.
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg text-olg-cream/90 animate-slide-up" style="animation-delay: 200ms;">
          Transform your workflow with our tailored services – designed to simplify complexity and deliver measurable impact
        </p>
        
        <!-- Animated button -->
        <div class="mt-10 flex justify-center animate-slide-up" style="animation-delay: 400ms;">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3Sz_FJo1iv5fu3GQJkK-tzhf7YNKDTYLgVdFSCueC7dUZrg/viewform" 
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-olg-green px-8 py-3 font-bold text-olg-blue transition duration-300 ease-out hover:bg-olg-blue-light"
          >
            <span class="absolute inset-0 flex h-full w-full -translate-y-full items-center justify-center bg-olg-blue-light text-white duration-300 group-hover:translate-y-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Explore Now
            </span>
            <span class="absolute flex h-full w-full translate-y-0 items-center justify-center text-olg-blue transition-all duration-300 group-hover:translate-y-full">Explore Our Services</span>
            <span class="invisible">Explore Our Services</span>
          </a>
        </div>
      </div>

      <!-- Animated divider with logo -->
      <div class="relative flex py-14 items-center">
        <div class="flex-grow border-t border-olg-cream/20"></div>
        <div class="flex-shrink mx-4 animate-float-slow">
          <div class="h-12 w-12 rounded-full bg-olg-blue-light/30 p-2 flex items-center justify-center">
            <svg class="h-full w-full text-olg-cream" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none" />
              <path d="M50 70 L50 90 M50 90 L35 75 M50 90 L65 75" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <div class="flex-grow border-t border-olg-cream/20"></div>
      </div>

      <!-- Footer links with animations and illustrations -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        <!-- Company section -->
        <div class="relative animate-fade-in" style="animation-delay: 600ms;">
          <!-- Decorative illustration -->
          <div class="absolute -top-10 -left-10 w-20 h-20 text-olg-green opacity-20 animate-float-medium">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21M5 21V7L13 3V21M13 21H21V9L13 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="inline-block w-8 h-8 mr-3 text-olg-green">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Company
          </h3>
          
          <ul class="space-y-4">
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/teams" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Teams
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/programs" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Programs
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/about" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  About
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/jobs" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Jobs
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Resources section -->
        <div class="relative animate-fade-in" style="animation-delay: 800ms;">
          <!-- Decorative illustration -->
          <div class="absolute -top-10 -left-10 w-20 h-20 text-olg-green opacity-20 animate-float-medium" style="animation-delay: 2s;">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="inline-block w-8 h-8 mr-3 text-olg-green">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Resources
          </h3>
          
          <ul class="space-y-4">
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/blogs" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Blogs
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/guides" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Guides
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/faq" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Faq
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Legal section -->
        <div class="relative animate-fade-in" style="animation-delay: 1000ms;">
          <!-- Decorative illustration -->
          <div class="absolute -top-10 -left-10 w-20 h-20 text-olg-cream opacity-20 animate-float-medium" style="animation-delay: 3s;">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 14L15 8M9.00001 8H9.01001M15 14H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="inline-block w-8 h-8 mr-3 text-olg-green">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Legal
          </h3>
          
          <ul class="space-y-4">
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/license" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  License
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/privacy-policy" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Privacy Policy
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
            <li class="transform transition-all duration-300 hover:translate-x-2">
              <NuxtLink to="/terms-of-service" class="group flex items-center text-olg-cream/80 hover:text-olg-green">
                <span class="mr-2 h-1.5 w-1.5 rounded-full bg-olg-green opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <span class="relative overflow-hidden">
                  Terms of Service
                  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-olg-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Newsletter section -->
      <div class="mt-16 rounded-2xl bg-olg-blue-light/20 backdrop-blur-sm p-8 shadow-lg animate-fade-in" style="animation-delay: 1200ms;">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white">Stay in the loop</h3>
            <p class="mt-2 text-olg-cream/90">Subscribe to our newsletter for the latest updates and insights.</p>
          </div>
          <div class="w-full md:w-auto">
            <div class="flex w-full max-w-md">
              <input type="email" placeholder="Enter your email" class="w-full min-w-0 flex-auto rounded-l-lg border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-olg-green sm:text-sm" />
              <button type="submit" class="flex-none rounded-r-lg bg-olg-green px-3.5 py-2.5 text-sm font-semibold text-olg-blue shadow-sm hover:bg-olg-green/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olg-green transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer bottom -->
      <div class="mt-16 border-t border-olg-cream/10 pt-8 md:flex md:items-center md:justify-between animate-fade-in" style="animation-delay: 1400ms;">
        <div class="flex gap-x-6 md:order-2">
          <!-- Twitter/X Icon with hover animation -->
          <a 
            href="https://x.com/olgnova62124?t=03MslucZ60QcfH3Dma8hMg&s=09" 
            class="group relative text-olg-cream/60 transition-colors duration-300 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="sr-only">X (Twitter)</span>
            <span class="absolute -inset-2 -z-10 rounded-full bg-olg-green opacity-0 blur-md transition-all duration-300 group-hover:opacity-20"></span>
            <svg class="size-6 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
            </svg>
          </a>
          
          <!-- LinkedIn Icon with hover animation -->
          <a 
            href="https://www.linkedin.com/in/olgnova-a4ab76356" 
            class="group relative text-olg-cream/60 transition-colors duration-300 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="sr-only">LinkedIn</span>
            <span class="absolute -inset-2 -z-10 rounded-full bg-olg-green opacity-0 blur-md transition-all duration-300 group-hover:opacity-20"></span>
            <svg class="size-6 transform transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        </div>
        
        <!-- Logo and copyright -->
        <div class="mt-8 md:order-1 md:mt-0 flex items-center">
          <div class="mr-4 animate-float-slow">
            <div class="flex items-center">
              <div class="h-8 w-8 text-olg-blue-light">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="40" r="30" fill="#3A6E9F" />
                  <path d="M30 50 L50 70 L70 50" stroke="#B5D89B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-2 text-lg font-bold text-olg-cream">OLG<span class="text-olg-green">nova</span></div>
            </div>
          </div>
          <p class="text-sm text-olg-cream/60 typing-animation">
            &copy; {{ currentYear }} OLGnova Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Get current year for copyright
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* OLGnova Brand Colors */
:deep(.bg-olg-blue) { background-color: #3A6E9F; }
:deep(.bg-olg-blue-light) { background-color: #4A7EAF; }
:deep(.bg-olg-green) { background-color: #B5D89B; }
:deep(.bg-olg-green-light) { background-color: #c5e2af; }
:deep(.bg-olg-cream) { background-color: #F0E6C9; }

:deep(.text-olg-blue) { color: #3A6E9F; }
:deep(.text-olg-blue-light) { color: #4A7EAF; }
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
  0% { transform: translateY(0) translateX(0) rotate(0); }
  50% { transform: translateY(-15px) translateX(10px) rotate(5deg); }
  100% { transform: translateY(0) translateX(0) rotate(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes wave {
  0% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(0) translateY(10px); }
  100% { transform: translateX(50%) translateY(0); }
}

@keyframes particle {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  50% { transform: translateY(-100px) translateX(100px); opacity: 1; }
  100% { transform: translateY(-200px) translateX(0); opacity: 0; }
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
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
  animation: float 10s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 7s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}

.animate-wave {
  animation: wave 10s ease-in-out infinite;
}

.animate-particle {
  animation: particle 10s linear infinite;
}

.typing-animation {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}

/* Hover effects */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:w-full {
  width: 100%;
}

.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
}

.group:hover .group-hover\:translate-y-full {
  transform: translateY(100%);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Custom opacity classes for particles */
.opacity-30 {
  opacity: 0.3;
}

.opacity-50 {
  opacity: 0.5;
}
</style>