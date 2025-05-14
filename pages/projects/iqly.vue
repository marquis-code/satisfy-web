<template>
    <div class="min-h-screen bg-white">
      <WhiteNav />
  
      <main class="mx-auto   w-full max-w-7xl">
        <!-- Header Section -->
        <div class="px-4  md:px-8 lg:py-12 py-6">
          <div class="flex uppercase flex-wrap gap-2 text-[#7C7C7C] text-sm text-gray-600 mb-4">
            <span>iqly</span>
            <span>-</span>
            <span>Career Development</span>
            <span>/</span>
            <span>EdTech</span>
            <span>/</span>
            <span>Artificial Intelligence</span>
          </div>
  
          <h1 class="text-xl lg:text-2xl font-semibold text-[#222222] mb-12">
            Revolutionizing Job Searches with an AI-Driven Career Platform
          </h1>
  
          <!-- Hero Image -->
          <div class="bg-gray-900 rounded-2xl overflow-hidden mb-20">
            <img
              src="@/assets/img/cover-details7.png"
              alt="BlackCountry Dashboard"
              class="w-full object-cover"
            />
          </div>
  
          <!-- Services Section -->
          <div class="lg:py-12 pb-6 lg:px-44">
            <h2 class="text-2xl font-semibold mb-8 text-center">
              Service Provided
            </h2>
            <div class="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
              <DetailsServiceBadge text="Product Management" color="green" />
              <DetailsServiceBadge text="Project Management" color="purple" />
              <DetailsServiceBadge text="Product Design" color="orange" />
              <DetailsServiceBadge text="Software Development" color="blue" />
            </div>
          </div>
  
          <!-- About Section -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">About IQly</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
              IQly is an AI-powered career advancement platform designed to help job seekers sharpen their skills, boost their confidence, and land their dream roles. The platform offers lifelike mock interviews tailored to users’ fields, an AI-driven resume builder to craft compelling career narratives, and a comprehensive resource library packed with expert advice and industry insights. IQly’s real-time feedback system provides users with targeted insights to improve their performance, while its intuitive design ensures preparation is efficient and effective. With a mission to make career readiness accessible and transformative, IQly empowers individuals to excel in competitive job markets, equipping them with the tools they need to stand out and succeed.
            </p>
          </section>
  
          <!-- Challenge Section -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Challenge</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
               IQly set out to develop a comprehensive, AI-powered platform that would help job seekers refine their interview skills, craft standout resumes, and access real-time performance insights. They needed a solution that could deliver realistic mock interviews, instant feedback, and personalized resources—all while remaining simple enough for anyone to use. However, building an intelligent system capable of seamlessly integrating these features posed a significant technical and UX challenge.
            </p>
          </section>
  
          <!-- Solution Section with Images -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">Product Solution</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222] mb-8">
              We stepped in to architect and develop the platform from the ground up. Leveraging our expertise in machine learning, we created an AI engine capable of simulating diverse interview scenarios and providing immediate, targeted feedback. Our front-end specialists designed an intuitive user interface that guided job seekers through every step—from setting up a mock interview session to polishing their résumés with AI-driven suggestions. Simultaneously, we integrated an extensive resource library that automatically tailored its recommendations based on each user’s progress and performance gaps.
              <!-- We stepped in to architect and develop the platform from the ground up. Leveraging our expertise in machine learning, we created an AI engine capable of simulating diverse interview scenarios and providing immediate, targeted feedback. Our front-end specialists designed an intuitive user interface that guided job seekers through every step—from setting up a mock interview session to polishing their résumés with AI-driven suggestions. Simultaneously, we integrated an extensive resource library that automatically tailored its recommendations based on each user’s progress and performance gaps. -->
            </p>
           <div class="space-y-2">
            <img src="@/assets/img/iqly01.jpg" alt="Property View" class="w-full" />
            <p class="text-sm text-center text-[#222222]">IQly website</p>
           </div>
          </section>
  
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Outcomes</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
              IQly has gained traction with early adopters who praised the platform’s user-friendly design and practical insights. Job seekers reported feeling more confident and prepared for real-world interviews after using the AI-based mock interview tool. The AI-powered resume builder accelerated the job application process, allowing candidates to craft compelling résumés in minutes. Overall, the synergy between Buildr’s robust technical foundation and IQly’s vision helped create a transformative platform that empowers users to land their dream jobs.
            </p>
           <div>
            <img src="@/assets/img/iqly02.png" class=" mt-6" alt="Property View" />
            <p class="text-sm text-center text-[#222222] pt-3">Bottom left: Mock Interview session</p>
           </div>
          </section>
  
  
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <svg width="30" height="30" viewBox="0 0 44 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 22.23C0 13.26 5.07 5.07 12.22 0L18.33 5.07C14.17 7.54 9.88 12.87 8.97 17.29C9.36 17.16 10.4 16.9 11.18 16.9C15.6 16.9 18.98 20.28 18.98 25.09C18.98 30.03 14.95 34.06 10.14 34.06C4.81 34.06 0 29.77 0 22.23ZM24.05 22.23C24.05 13.26 29.12 5.07 36.27 0L42.38 5.07C38.22 7.54 33.93 12.87 33.02 17.29C33.41 17.16 34.45 16.9 35.23 16.9C39.65 16.9 43.03 20.28 43.03 25.09C43.03 30.03 39 34.06 34.19 34.06C28.86 34.06 24.05 29.77 24.05 22.23Z" fill="#222222"/>
              </svg>
            <p class="text-gray-700 leading-relaxed font-semibold text-[#222222]">Buildr’s thorough approach and deep expertise in AI made the vision for IQly a reality. The platform they delivered is not only powerful but also intuitive, giving our users the confidence and skills they need to succeed in today’s competitive job market. ”</p>
          </section>
          <!-- More Case Studies -->
        </div>
      </main>
      <section class="mx-auto  w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
            <h2 class="lg:text-2xl text-xl text-[#222222] font-semibold mb-8">More case studies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <DetailsCaseStudyCard
                name="Grabhub"
                 href="/projects/grabhub"
                title="Addressing Food Waste with an Innovative Marketplace"
                :image="grabhub"
                :tags="['FoodTech', 'E-Commerce', 'Marketplaces']"
              />
              <DetailsCaseStudyCard
                name="Marketsquare"
                 href="/projects/marketsquare"
                title="Addressing Food Waste with an Innovative Marketplace"
                :image="marketsquare"
                :tags="['FoodTech', 'E-Commerce', 'Marketplaces']"
              />
              <DetailsCaseStudyCard
                name="Novatoons Inc"
                 href="/projects/novatoons"
                title="Championing Diverse Narratives: The Novatoons Case Study"
                :image="novatoons"
                :tags="['FoodTech', 'E-Commerce', 'Marketplaces']"
              />
              <DetailsCaseStudyCard
                name="Storipod"
                 href="/projects/storipod"
                title="Revolutionizing Microblogging for Storytellers"
                :image="storipod"
                :tags="[
                  'Entertainment',
                  'Social Media',
                  'Digital Media',
                ]"
              />
            </div>
          </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import storipod from '@/assets/img/covers/storipod.png'
import blackcountry from '@/assets/img/covers/blackcountry.png'
import iqly from '@/assets/img/covers/iqly.png'
import marketsquare from '@/assets/img/covers/marketsquare.png'
import novatoons from '@/assets/img/covers/novatoons.png'
import grabhub from '@/assets/img/covers/grabhub.png'

useServerSeoMeta({
  title: "Buildr | Iqly",
  ogTitle: "Buildr | Iqly",
  description: "Your Vision, Our Mission — Together, We’ll Build Exceptional Software. We turn ambitious ideas into high-performing digital products through innovative tech and agile development.",
  ogDescription: "Your Vision, Our Mission — Together, We’ll Build Exceptional Software. We turn ambitious ideas into high-performing digital products through innovative tech and agile development.",
  ogImage: "https://gobuildr.io/og-image.jpg",
  ogImageUrl: "https://gobuildr.io/og-image.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Build the Future of Your Business | Buildr",
  twitterDescription: "Your Vision, Our Mission — Together, We’ll Build Exceptional Software. We turn ambitious ideas into high-performing digital products through innovative tech and agile development.",
  twitterImage: "https://gobuildr.io/og-image.jpg"
})

useSeoMeta({
  title: "Buildr | Iqly",
  ogTitle: "Buildr | Iqly",
  description: "Your Vision, Our Mission — Together, We’ll Build Exceptional Software. We turn ambitious ideas into high-performing digital products through innovative tech and agile development.",
  ogDescription: "Your Vision, Our Mission — Together, We’ll Build Exceptional Software. We turn ambitious ideas into high-performing digital products through innovative tech and agile development.",
  ogImage: "https://gobuildr.io/og-image.jpg",
  ogImageUrl: "https://gobuildr.io/og-image.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Build the Future of Your Business | Buildr",
  twitterDescription: "Your Vision, Our Mission — Together, We’ll Build Exceptional Software. We turn ambitious ideas into high-performing digital products through innovative tech and agile development.",
  twitterImage: "https://gobuildr.io/og-image.jpg"
  });
  </script>
  