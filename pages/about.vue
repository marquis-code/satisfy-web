<template>
  <main class="overflow-hidden">
    <NavbarSection class="bg-black" />
    <div class="bg-white">
      <!-- Hero section with animated elements -->
      <section class="relative isolate overflow-hidden">
        <!-- Animated background patterns -->
        <div class="absolute inset-0 -z-10 opacity-30">
          <svg class="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3A6E9F" stroke-width="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        <!-- Animated gradient blob -->
        <div class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
          <div class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#3A6E9F] to-[#6A9AC9] opacity-30 animate-pulse" 
               style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"></div>
        </div>
        
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl" 
                 v-motion
                 :initial="{ opacity: 0, y: 100 }"
                 :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }">
              <h1 class="text-pretty text-5xl font-bold tracking-tight text-[#3A6E9F] sm:text-6xl">
                Empowering organizations in achieving their highest potential
              </h1>
              <p class="mt-8 text-pretty text-lg text-gray-600 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                At OLGnova, we specialize in driving positive change through expert research, strategic communication, and tailored solutions. We empower organizations to reach their full potential and create lasting, sustainable impact.
              </p>
              <div class="mt-10 flex items-center gap-x-6">
                <a href="#services" class="rounded-md bg-[#3A6E9F] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#2A5D8E] transition-all duration-300 transform hover:scale-105">
                  Our Services
                </a>
                <a href="#about" class="text-lg font-semibold text-[#3A6E9F] hover:text-[#2A5D8E] transition-all duration-300">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            
            <!-- Animated team photo gallery -->
            <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
                 v-motion
                 :initial="{ opacity: 0, x: 100 }"
                 :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 800 } }">
              <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div class="relative overflow-hidden rounded-xl group">
                  <img src="@/assets/img/others4.jpg" alt="" class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                </div>
              </div>
              <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div class="relative overflow-hidden rounded-xl group">
                  <img src="@/assets/img/founder4.jpg" alt="" class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                </div>
                <div class="relative overflow-hidden rounded-xl group">
                  <img src="@/assets/img/founder5.jpg" alt="" class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                </div>
              </div>
              <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div class="relative overflow-hidden rounded-xl group">
                  <img src="@/assets/img/founder6.png" alt="" class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                </div>
                <div class="relative overflow-hidden rounded-xl group">
                  <img src="@/assets/img/others6.jpg" alt="" class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Aim section with animated elements -->
      <section id="about" class="relative py-24 sm:py-32">
        <div class="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <!-- Image with floating animation -->
            <div class="relative col-span-5"
                 v-motion
                 :initial="{ opacity: 0, x: -100 }"
                 :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
              <div class="aspect-[4/3] overflow-hidden rounded-2xl">
                <img class="h-full w-full object-cover shadow-2xl" src="@/assets/img/founder4.jpg" alt="Team member">
              </div>
              
              <!-- Decorative elements -->
              <div class="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#3A6E9F]/10 animate-pulse"></div>
              <div class="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-[#3A6E9F]/20 animate-pulse" style="animation-delay: 1s"></div>
              
              <!-- Floating card with stats -->
              <div class="absolute -right-8 bottom-16 rounded-lg bg-white p-4 shadow-xl animate-float">
                <div class="flex items-center gap-4">
                  <div class="rounded-full bg-[#3A6E9F]/10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#3A6E9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Impact</p>
                    <p class="text-xl font-bold text-[#3A6E9F]">100%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="relative col-span-7 mt-10 lg:mt-0 lg:pl-8"
                 v-motion
                 :initial="{ opacity: 0, x: 100 }"
                 :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
              <div class="relative rounded-3xl bg-[#3A6E9F] px-8 py-12 shadow-xl sm:px-12 sm:py-16">
                <div class="relative">
                  <div class="flex items-center">
                    <div class="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 class="ml-4 text-3xl font-bold tracking-tight text-white">Our Aim</h2>
                  </div>
                  
                  <p class="mt-6 text-lg leading-8 text-white/90">
                    To empower organizations in achieving their highest potential by providing comprehensive, data-driven insights, strategic communication, and operational expertise for meaningful local and global impact.
                  </p>
                  
                  <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="ml-2 font-medium text-white">Data-Driven</span>
                      </div>
                    </div>
                    <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="ml-2 font-medium text-white">Strategic</span>
                      </div>
                    </div>
                    <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="ml-2 font-medium text-white">Impactful</span>
                      </div>
                    </div>
                    <div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="ml-2 font-medium text-white">Global</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Decorative elements -->
                <div class="absolute -top-10 -right-10 h-40 w-40">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-[#5A8EBF] opacity-20">
                    <path fill="currentColor" d="M47.1,-57.8C59.9,-47.4,68.9,-31.8,73.5,-14.2C78.1,3.4,78.4,22.9,70.1,37.5C61.8,52.1,45,61.7,27.4,68.5C9.9,75.3,-8.3,79.3,-24.9,74.9C-41.5,70.5,-56.5,57.7,-65.2,41.7C-73.9,25.7,-76.3,6.4,-72.6,-11.1C-68.9,-28.6,-59.1,-44.3,-45.6,-54.8C-32.1,-65.3,-16.1,-70.6,0.6,-71.3C17.2,-72,34.4,-68.1,47.1,-57.8Z" transform="translate(100 100)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Services section with animated cards -->
      <section id="services" class="relative py-24 sm:py-32 overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1000 1000">
            <g clip-path="url(#clip0_1_2)" opacity="0.05">
              <path d="M1000 0H0V1000H1000V0Z" fill="white"></path>
              <path d="M0 500C0 224.9 224.9 0 500 0C775.1 0 1000 224.9 1000 500C1000 775.1 775.1 1000 500 1000C224.9 1000 0 775.1 0 500Z" stroke="#3A6E9F" stroke-width="2"></path>
              <path d="M100 500C100 279.4 279.4 100 500 100C720.6 100 900 279.4 900 500C900 720.6 720.6 900 500 900C279.4 900 100 720.6 100 500Z" stroke="#3A6E9F" stroke-width="2"></path>
              <path d="M200 500C200 334 334 200 500 200C666 200 800 334 800 500C800 666 666 800 500 800C334 800 200 666 200 500Z" stroke="#3A6E9F" stroke-width="2"></path>
              <path d="M300 500C300 388.5 388.5 300 500 300C611.5 300 700 388.5 700 500C700 611.5 611.5 700 500 700C388.5 700 300 611.5 300 500Z" stroke="#3A6E9F" stroke-width="2"></path>
              <path d="M400 500C400 443.1 443.1 400 500 400C556.9 400 600 443.1 600 500C600 556.9 556.9 600 500 600C443.1 600 400 556.9 400 500Z" stroke="#3A6E9F" stroke-width="2"></path>
            </g>
            <defs>
              <clipPath id="clip0_1_2">
                <rect width="1000" height="1000" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-[#3A6E9F] sm:text-5xl"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
              Our Services
            </h2>
            <p class="mt-6 text-xl/8 text-gray-700"
               v-motion
               :initial="{ opacity: 0, y: 50 }"
               :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }">
              At OLGnova, we offer a comprehensive suite of services designed to provide organizations with data-driven insights, expert project management, and strategic guidance. Our goal is to help your organization create sustainable, impactful outcomes.
            </p>
          </div>
          
          <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <div class="lg:col-span-4"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }">
              <div class="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#3A6E9F]/5"></div>
                
                <div class="relative">
                  <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#3A6E9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gray-900">Research, Publication & Reporting</h3>
                  
                  <p class="mt-4 text-gray-600">
                    We provide end-to-end research services tailored to your organization's goals, from feasibility studies and market analysis to project evaluations.
                  </p>
                  
                  <div class="mt-6 flex items-center">
                    <a href="#" class="text-sm font-medium text-[#3A6E9F] hover:text-[#2A5D8E]">
                      Learn more
                      <span aria-hidden="true" class="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-4"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }">
              <div class="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#3A6E9F]/5"></div>
                
                <div class="relative">
                  <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#3A6E9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gray-900">Surveys & Stakeholder Insights</h3>
                  
                  <p class="mt-4 text-gray-600">
                    Through targeted surveys, we collect data to align your initiatives with community needs and stakeholder expectations.
                  </p>
                  
                  <div class="mt-6 flex items-center">
                    <a href="#" class="text-sm font-medium text-[#3A6E9F] hover:text-[#2A5D8E]">
                      Learn more
                      <span aria-hidden="true" class="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-4"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { delay: 800, duration: 800 } }">
              <div class="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#3A6E9F]/5"></div>
                
                <div class="relative">
                  <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#3A6E9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gray-900">Knowledge Management</h3>
                  
                  <p class="mt-4 text-gray-600">
                    Leveraging deep industry expertise, we deliver insights into trends, societal dynamics, and innovative strategies.
                  </p>
                  
                  <div class="mt-6 flex items-center">
                    <a href="#" class="text-sm font-medium text-[#3A6E9F] hover:text-[#2A5D8E]">
                      Learn more
                      <span aria-hidden="true" class="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-6"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { delay: 1000, duration: 800 } }">
              <div class="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#3A6E9F]/5"></div>
                
                <div class="relative">
                  <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#3A6E9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gray-900">Strategic Communication</h3>
                  
                  <p class="mt-4 text-gray-600">
                    We craft compelling narratives that elevate your brand, engage audiences, and strengthen stakeholder relationships. Our tailored communication strategies ensure your message is clear, impactful, and aligned with your mission.
                  </p>
                  
                  <div class="mt-6 flex items-center">
                    <a href="#" class="text-sm font-medium text-[#3A6E9F] hover:text-[#2A5D8E]">
                      Learn more
                      <span aria-hidden="true" class="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-6"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { delay: 1200, duration: 800 } }">
              <div class="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#3A6E9F]/5"></div>
                
                <div class="relative">
                  <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F]/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#3A6E9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gray-900">Project Management & Oversight</h3>
                  
                  <p class="mt-4 text-gray-600">
                    From inception to completion, we ensure seamless project execution with a focus on transparency, accountability, and stakeholder alignment. We provide rigorous progress tracking and evaluation to keep projects on course.
                  </p>
                  
                  <div class="mt-6 flex items-center">
                    <a href="#" class="text-sm font-medium text-[#3A6E9F] hover:text-[#2A5D8E]">
                      Learn more
                      <span aria-hidden="true" class="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Testimonial -->
          <div class="mt-16 lg:mt-24"
               v-motion
               :initial="{ opacity: 0, y: 50 }"
               :enter="{ opacity: 1, y: 0, transition: { delay: 1400, duration: 800 } }">
            <div class="relative rounded-3xl bg-[#3A6E9F]/5 p-8 lg:p-12">
              <div class="absolute top-0 right-0 -mt-4 -mr-4">
                <svg class="h-16 w-16 text-[#3A6E9F]/20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <blockquote class="text-xl/8 font-medium text-gray-900 italic">
                "OLGnova's strategic insights and data-driven approach transformed our organization's outreach efforts. Their team delivered exceptional results that exceeded our expectations."
              </blockquote>
              
              <div class="mt-8 flex items-center gap-x-4">
                <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-12 w-12 rounded-full object-cover">
                <div>
                  <div class="font-semibold text-gray-900">Gabriel Oke</div>
                  <div class="text-sm text-gray-600">CEO, TechInnovate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Work With Us section -->
      <section class="relative py-24 sm:py-32 overflow-hidden bg-gray-50">
        <div class="absolute inset-y-0 right-0 -z-10 w-[50%] skew-x-[-10deg] bg-white"></div>
        
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 lg:items-start">
            <div class="lg:pr-4 lg:pt-4"
                 v-motion
                 :initial="{ opacity: 0, x: -100 }"
                 :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
              <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 class="text-3xl font-bold tracking-tight text-[#3A6E9F] sm:text-4xl">Why Work With Us?</h2>
                
                <div class="mt-10 max-w-xl space-y-8">
                  <div class="relative">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F] text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div class="mt-4">
                      <h3 class="text-xl font-semibold text-gray-900">Expertise</h3>
                      <p class="mt-2 text-gray-600">
                        Our team brings extensive experience in research, communication, and sustainability strategies across various sectors.
                      </p>
                    </div>
                  </div>
                  
                  <div class="relative">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F] text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div class="mt-4">
                      <h3 class="text-xl font-semibold text-gray-900">Impact-Driven</h3>
                      <p class="mt-2 text-gray-600">
                        We are committed to making a positive impact through every project we undertake.
                      </p>
                    </div>
                  </div>
                  
                  <div class="relative">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6E9F] text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </div>
                    <div class="mt-4">
                      <h3 class="text-xl font-semibold text-gray-900">Custom Solutions</h3>
                      <p class="mt-2 text-gray-600">
                        We deliver tailored strategies to meet the specific goals and needs of each client.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Team gallery with hover effects -->
            <div class="relative"
                 v-motion
                 :initial="{ opacity: 0, x: 100 }"
                 :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-6">
                  <div class="overflow-hidden rounded-2xl group">
                    <img src="@/assets/img/others1.jpg" alt="" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
                  </div>
                  <div class="overflow-hidden rounded-2xl group">
                    <img src="@/assets/img/others2.jpg" alt="" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
                  </div>
                </div>
                <div class="mt-10 space-y-6">
                  <div class="overflow-hidden rounded-2xl group">
                    <img src="@/assets/img/others3.png" alt="" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
                  </div>
                  <div class="overflow-hidden rounded-2xl group">
                    <img src="@/assets/img/others4.jpg" alt="" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
                  </div>
                </div>
              </div>
              
              <!-- Floating badge -->
              <div class="absolute -bottom-6 -left-6 rounded-xl bg-[#3A6E9F] p-4 shadow-xl animate-float">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm font-medium text-white">Expert Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Objectives section with animated checkmarks -->
      <section class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <div class="col-span-2"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
              <h2 class="text-3xl font-bold tracking-tight text-[#3A6E9F] sm:text-5xl">Our Objectives</h2>
              <p class="mt-6 text-lg text-gray-600">
                We are committed to delivering exceptional value through these key objectives that guide our work.
              </p>
              
              <!-- Animated illustration -->
              <div class="mt-10 relative h-64 w-full">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute h-full w-full text-[#3A6E9F] opacity-10">
                  <path fill="currentColor" d="M47.1,-57.8C59.9,-47.4,68.9,-31.8,73.5,-14.2C78.1,3.4,78.4,22.9,70.1,37.5C61.8,52.1,45,61.7,27.4,68.5C9.9,75.3,-8.3,79.3,-24.9,74.9C-41.5,70.5,-56.5,57.7,-65.2,41.7C-73.9,25.7,-76.3,6.4,-72.6,-11.1C-68.9,-28.6,-59.1,-44.3,-45.6,-54.8C-32.1,-65.3,-16.1,-70.6,0.6,-71.3C17.2,-72,34.4,-68.1,47.1,-57.8Z" transform="translate(100 100)" />
                </svg>
                
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-5xl font-bold text-[#3A6E9F]">100%</div>
                    <div class="mt-2 text-lg font-medium text-gray-600">Commitment to Excellence</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-span-3 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
              <div class="relative pl-12"
                   v-motion
                   :initial="{ opacity: 0, x: 50 }"
                   :enter="{ opacity: 1, x: 0, transition: { delay: 200, duration: 800 } }">
                <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#3A6E9F] animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Conduct in-depth research for strategic innovation</h3>
              </div>
              
              <div class="relative pl-12"
                   v-motion
                   :initial="{ opacity: 0, x: 50 }"
                   :enter="{ opacity: 1, x: 0, transition: { delay: 400, duration: 800 } }">
                <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#3A6E9F] animate-pulse" style="animation-delay: 0.2s">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Develop communication strategies that enhance engagement</h3>
              </div>
              
              <div class="relative pl-12"
                   v-motion
                   :initial="{ opacity: 0, x: 50 }"
                   :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 800 } }">
                <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#3A6E9F] animate-pulse" style="animation-delay: 0.4s">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Implement efficient project management systems</h3>
              </div>
              
              <div class="relative pl-12"
                   v-motion
                   :initial="{ opacity: 0, x: 50 }"
                   :enter="{ opacity: 1, x: 0, transition: { delay: 800, duration: 800 } }">
                <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#3A6E9F] animate-pulse" style="animation-delay: 0.6s">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Provide meticulous monitoring and evaluation</h3>
              </div>
              
              <div class="relative pl-12"
                   v-motion
                   :initial="{ opacity: 0, x: 50 }"
                   :enter="{ opacity: 1, x: 0, transition: { delay: 1000, duration: 800 } }">
                <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#3A6E9F] animate-pulse" style="animation-delay: 0.8s">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Facilitate surveys to collect critical feedback</h3>
              </div>
              
              <div class="relative pl-12"
                   v-motion
                   :initial="{ opacity: 0, x: 50 }"
                   :enter="{ opacity: 1, x: 0, transition: { delay: 1200, duration: 800 } }">
                <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#3A6E9F] animate-pulse" style="animation-delay: 1s">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Guide companies through social and performance standards</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA section -->
      <section class="relative isolate overflow-hidden bg-[#3A6E9F] py-16 sm:py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div class="max-w-xl lg:max-w-lg"
                 v-motion
                 :initial="{ opacity: 0, y: 50 }"
                 :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
              <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to transform your organization?</h2>
              <p class="mt-4 text-lg leading-8 text-white/80">
                Let's work together to create sustainable impact and drive positive change for your organization.
              </p>
              <div class="mt-6 flex max-w-md gap-x-4">
                <input type="email" placeholder="Enter your email" class="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder:text-white/60" />
                <button type="submit" class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#3A6E9F] shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105">
                  Contact Us
                </button>
              </div>
            </div>
            <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }">
              <div class="flex flex-col items-start">
                <div class="rounded-md bg-white/10 p-2 ring-1 ring-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <dt class="mt-4 font-semibold text-white">Email us</dt>
                <dd class="mt-2 leading-7 text-white/80">info@olgnova.com</dd>
              </div>
              <div class="flex flex-col items-start">
                <div class="rounded-md bg-white/10 p-2 ring-1 ring-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <dt class="mt-4 font-semibold text-white">Call us</dt>
                <dd class="mt-2 leading-7 text-white/80">+250 788 249 545</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#6A9AC9] to-[#3A6E9F] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'

const servicesList = ref([
  {
    "title": "Research, Publication & Reporting",
    "description": "We provide end-to-end research services tailored to your organization's goals, from feasibility studies and market analysis to project evaluations. Our team manages every phase—planning, execution, tracking, and reporting—ensuring rigorous methodology and actionable insights."
  },
  {
    "title": "Surveys & Stakeholder Insights",
    "description": "Through targeted surveys, we collect data to align your initiatives with community needs and stakeholder expectations. Our evidence-based approach helps organizations refine strategies, maximize relevance, and achieve sustainable impact."
  },
  {
    "title": "Knowledge Management & Research",
    "description": "Leveraging deep industry expertise, we deliver insights into trends, societal dynamics, and innovative strategies. Our knowledge management services help you capture, organize, and share critical information to inform decision-making and drive progress."
  },
  {
    "title": "Strategic Communication",
    "description": "We craft compelling narratives that elevate your brand, engage audiences, and strengthen stakeholder relationships. Our tailored communication strategies ensure your message is clear, impactful, and aligned with your mission."
  },
  {
    "title": "Project Management",
    "description": "From inception to completion, we ensure seamless project execution with a focus on transparency, accountability, and stakeholder alignment. Our services include risk mitigation, adaptive planning, and performance reporting to deliver measurable results."
  },
  {
    "title": "Oversight & Monitoring",
    "description": "We provide rigorous progress tracking and evaluation to keep projects on course. Our monitoring frameworks foster learning, accountability, and continuous improvement, ensuring long-term success and impact."
  }
])
</script>

<style>
/* Animation keyframes */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.duration-800 {
  transition-duration: 800ms;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Group hover effects for image cards */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>