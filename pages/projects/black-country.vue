<template>
  <div class="min-h-screen bg-white">
    <WhiteNav />

    <main class="mx-auto   w-full max-w-7xl">
      <!-- Header Section -->
      <div class="px-4 md:px-8 lg:py-12 py-6">
        <div class="flex uppercase flex-wrap gap-2 text-[#7C7C7C] text-sm text-gray-600 mb-4">
          <span>BLACKCOUNTRY</span>
          <span>-</span>
          <span>PROPTECH</span>
          <span>/</span>
          <span>REAL ESTATE</span>
          <span>/</span>
          <span>SOCIAL ENTERPRISE</span>
        </div>

        <h1 class="text-xl lg:text-2xl font-semibold text-[#222222] mb-12">
          Simplifying Shared Living in Nigeria: The BlackCountry Case Study
        </h1>

        <!-- Hero Image -->
        <div class="bg-gray-900 rounded-2xl overflow-hidden mb-20">
          <img
            src="@/assets/img/cover-details5.png"
            alt="BlackCountry Dashboard"
            class="w-full h-full object-cover"
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
            <DetailsServiceBadge text="Maintenance & Support" color="red" />
          </div>
        </div>

        <!-- About Section -->
        <section class="lg:py-12 text-xl py-6  lg:px-44">
          <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">About BlackCountry</h2>
          <p class="text-gray-700 leading-relaxed text-[#222222]">
            BlackCountry is a digital platform redefining shared living by
            connecting tenants in Nigeria with affordable co-living spaces.
            Designed to address the high cost of housing in the region,
            BlackCountry offers an intuitive platform where tenants can browse
            and secure shared accommodations tailored to their preferences. It
            provides agents with tools to list and manage properties, ensuring
            real-time updates on availability, while also supporting seamless
            communication between all parties involved. With its focus on
            affordability, transparency, and ease of use, BlackCountry creates a
            win-win for tenants and landlords alike, fostering a
            community-driven approach to shared living.
          </p>
        </section>

        <!-- Challenge Section -->
        <section class="lg:py-12 text-xl py-6  lg:px-44">
          <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Challenge</h2>
          <p class="text-gray-700 leading-relaxed text-[#222222]">
             BlackCountry set out to tackle the rising cost of housing in
            Nigeria by making shared living spaces more accessible. They needed
            a user-friendly platform where tenants could quickly discover and
            secure co-living arrangements at affordable rates. However, building
            an all-in-one solution that catered to tenants, service providers,
            and agents—each with their own unique needs—posed a significant
            challenge.
          </p>
        </section>

        <!-- Solution Section with Images -->
        <section class="lg:py-12 text-xl py-6  lg:px-44">
          <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">Product Solution</h2>
          <p class="text-gray-700 leading-relaxed text-[#222222] mb-8">
            Our team collaborated with BlackCountry to architect and launch a
            platform that streamlined the entire housing process. We developed
            individual apps for tenants, service providers, and agents, ensuring
            each stakeholder had the right tools to list, manage, and secure
            living spaces. Through advanced matching and filtering, tenants
            could pinpoint shared housing options that fit their budget and
            location preferences. Meanwhile, service providers leveraged the
            platform for seamless property maintenance and support, and agents
            gained real-time visibility into property availability and tenant
            requirements—all synchronized through a single, integrated
            ecosystem.
          </p>

          <div class="space-y-2 pb-8">
          <img src="@/assets/img/bc02.png" alt="Property View" class="w-full" />
          <p class="text-sm text-center text-[#222222]">Left: Detailed view of properties, Right: Tenants Dashboard </p>
         </div>
         <div class="space-y-2">
          <img src="@/assets/img/bc01.jpg" alt="Property View" class="w-full" />
          <p class="text-sm text-center text-[#222222]">Left: Service provider’s dashboard, Right: Managing maintenance requests</p>
         </div>
        </section>

        <section class="lg:py-12 text-xl py-6  lg:px-44">
          <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Outcomes</h2>
          <p class="text-gray-700 leading-relaxed text-[#222222]">
            Upon launch, BlackCountry experienced rapid adoption as tenants
            praised the platform’s simplicity and cost-saving potential. Service
            providers found it easier to coordinate maintenance tasks, while
            agents benefitted from more efficient property listings and shorter
            vacancy periods. By focusing on affordability and ease of use,
            BlackCountry successfully addressed a critical need for accessible
            shared living in Nigeria.
          </p>
         <div>
          <img src="@/assets/img/bc05.jpg" class=" mt-6" alt="Property View" />
          <p class="text-sm text-center text-[#222222] pt-3">Left: Sign up, Right: Agent’s dashboard</p>
         </div>
        </section>


        <section class="lg:py-12 text-xl py-6  lg:px-44">
          <svg width="30" height="30" viewBox="0 0 44 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 22.23C0 13.26 5.07 5.07 12.22 0L18.33 5.07C14.17 7.54 9.88 12.87 8.97 17.29C9.36 17.16 10.4 16.9 11.18 16.9C15.6 16.9 18.98 20.28 18.98 25.09C18.98 30.03 14.95 34.06 10.14 34.06C4.81 34.06 0 29.77 0 22.23ZM24.05 22.23C24.05 13.26 29.12 5.07 36.27 0L42.38 5.07C38.22 7.54 33.93 12.87 33.02 17.29C33.41 17.16 34.45 16.9 35.23 16.9C39.65 16.9 43.03 20.28 43.03 25.09C43.03 30.03 39 34.06 34.19 34.06C28.86 34.06 24.05 29.77 24.05 22.23Z" fill="#222222"/>
            </svg>
          <p class="text-gray-700 leading-relaxed font-semibold text-[#222222]">Buildr delivered a platform that truly supports our mission of making housing more affordable for Nigerians. Their expertise in user-centric design and multi-stakeholder integration was a game-changer for us. ”</p>
        </section>
        <!-- More Case Studies -->
      </div>
    </main>
    <section class="mx-auto  w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
          <h2 class="lg:text-2xl text-xl text-[#222222] font-semibold mb-8">More case studies</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <DetailsCaseStudyCard
              name="Iqly"
               href="/projects/iqly"
              title="Revolutionizing Job Searches with an AI"
              :image="iqly"
              :tags="[
                'Career Development',
                'EdTech',
                'Artificial Intelligence',
              ]"
            />
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
              title="Connecting Local Services with Ease"
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
  title: "Buildr | BlackCountry",
  ogTitle: "Buildr | BlackCountry",
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
  title: "Buildr | BlackCountry",
  ogTitle: "Buildr | BlackCountry",
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
