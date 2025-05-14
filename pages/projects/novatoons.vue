<template>
    <div class="min-h-screen bg-white">
      <WhiteNav />
  
      <main class="mx-auto   w-full max-w-7xl">
        <!-- Header Section -->
        <div class="px-4 md:px-8 lg:py-12 py-6">
          <div class="flex uppercase flex-wrap gap-2 text-[#7C7C7C] text-sm text-gray-600 mb-4">
            <span>novatoons</span>
            <span>-</span>
            <span>Entertainment</span>
            <span>/</span>
            <span>Digital Media</span>
            <!-- <span>/</span> -->
            <!-- <span>SOCIAL ENTERPRISE</span> -->
          </div>
          <!-- novatoons - Entertainment / Digital Media -->
  
          <h1 class="text-xl lg:text-2xl font-semibold text-[#222222] mb-12">
            Championing Diverse Narratives: The Novatoons Case Study
            <!-- Simplifying Shared Living in Nigeria: The BlackCountry Case Study -->
          </h1>
  
          <!-- Hero Image -->
          <div class="bg-gray-900 rounded-2xl overflow-hidden mb-20">
            <img
              src="@/assets/img/cover-details2.png"
              alt="BlackCountry Dashboard"
              class="w-full object-cover"
            />
          </div>
  
          <!-- Services Section -->
          <div class="lg:py-12 pb-6 lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-8 text-center">
              Service Provided
            </h2>
            <div class="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
              <DetailsServiceBadge text="Product Management" color="green" />
              <!-- <DetailsServiceBadge text="Project Management" color="purple" /> -->
              <DetailsServiceBadge text="Product Design" color="orange" />
              <!-- <DetailsServiceBadge text="Software Development" color="blue" /> -->
              <!-- <DetailsServiceBadge text="Maintenance & Support" color="red" /> -->
            </div>
          </div>
  
          <!-- About Section -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">About Novatoons</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
                Novatoons is a digital marketplace designed to celebrate diversity in storytelling by connecting comic creators with readers who value representation. Focused on comics featuring Black and people of color characters, the platform offers creators the tools to sell their work, merchandise, and engage with their fan base. For readers, Novatoons provides an immersive browsing experience where they can discover unique stories, connect with like-minded enthusiasts, and support underrepresented artists.
            </p>
          </section>
  
          <!-- Challenge Section -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Challenge</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
                Novatoons identified a significant void in the digital comics landscape: the underrepresentation of Black creators and characters of color. Comic artists faced difficulties finding platforms that not only showcased their work but also connected them with an audience eager for diverse storytelling. Simultaneously, readers interested in comics featuring Black and people of color characters struggled to find a centralized marketplace where they could discover, purchase, and engage with content that resonated with their cultural experiences. Existing platforms did not adequately address these specific needs, making it challenging for both creators and readers to thrive in this niche market.
            </p>
          </section>
  
          <!-- Solution Section with Images -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">Product Solution</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222] mb-8">
                To bridge this gap, Buildr partnered with Novatoons to develop an innovative digital marketplace tailored specifically for diverse comic creators and their audiences. Our team meticulously designed a user-friendly platform that seamlessly connects creators with readers, fostering a vibrant community centered around inclusivity and representation. We built robust features that enable creators to easily upload and sell their comics and merchandise, manage their storefronts, and engage directly with their fans through interactive tools.
            </p>
            <p class="text-gray-700 leading-relaxed text-[#222222] mb-8">For readers, the platform offers intuitive navigation, advanced search capabilities, and personalized recommendations, making it effortless to discover and purchase comics that celebrate diverse characters and stories. Additionally, we integrated social features that facilitate connections among comic enthusiasts, allowing them to share feedback, participate in discussions, and build a supportive network within the Novatoons community. By focusing on both functionality and user experience, Buildr ensured that Novatoons became a go-to destination for diverse comic content.</p>
  
            <div class="space-y-2 pb-8">
            <img src="@/assets/img/novatoons01.jpg" alt="Property View" class="w-full" />
            <p class="text-sm text-center text-[#222222]">User can find near by stores</p>
           </div>
           <div class="space-y-2">
            <img src="@/assets/img/novatoons01.jpg" alt="Property View" class="w-full" />
           </div>
          </section>
  
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Outcomes</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
                 The collaboration between Buildr and Novatoons resulted in the successful launch of a dynamic marketplace that has quickly gained traction among both creators and readers. Novatoons has empowered numerous Black and people of color creators to showcase and monetize their work, significantly increasing their visibility and sales. Readers have embraced the platform for its diverse content offerings and the ease with which they can connect with like-minded enthusiasts.
            </p>
            <p class="text-gray-700 leading-relaxed text-[#222222]">The intuitive design and seamless user experience have led to high engagement rates, with users returning frequently to explore new releases and participate in community activities. As a result, Novatoons is well on its way to becoming a leading marketplace for comics that celebrate diversity, fostering an inclusive environment where diverse voices can flourish and audiences can enjoy rich, culturally resonant storytelling.</p>
          </section>
  
  
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <svg width="30" height="30" viewBox="0 0 44 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 22.23C0 13.26 5.07 5.07 12.22 0L18.33 5.07C14.17 7.54 9.88 12.87 8.97 17.29C9.36 17.16 10.4 16.9 11.18 16.9C15.6 16.9 18.98 20.28 18.98 25.09C18.98 30.03 14.95 34.06 10.14 34.06C4.81 34.06 0 29.77 0 22.23ZM24.05 22.23C24.05 13.26 29.12 5.07 36.27 0L42.38 5.07C38.22 7.54 33.93 12.87 33.02 17.29C33.41 17.16 34.45 16.9 35.23 16.9C39.65 16.9 43.03 20.28 43.03 25.09C43.03 30.03 39 34.06 34.19 34.06C28.86 34.06 24.05 29.77 24.05 22.23Z" fill="#222222"/>
              </svg>
            <p class="text-gray-700 leading-relaxed font-semibold text-[#222222]">Buildr’s UX expertise transformed our platform into a delightful user experience. The intuitive design has not only retained our existing audience but also attracted new users to Novatoons. ”</p>
          </section>
          <!-- More Case Studies -->
        </div>
      </main>
      <section class="mx-auto  w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
            <h2 class="lg:text-2xl text-xl text-[#222222] font-semibold mb-8">More case studies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
              <DetailsCaseStudyCard
                name="BlackCountry"
                 href="/projects/black-country"
                title="Simplifying Shared Living in Nigeria: The BlackCountry Case Study"
                :image="blackcountry"
                :tags="['PropTech', 'Real Estate', 'Social Enterprise']"
              />
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
  title: "Buildr | Novatoons",
  ogTitle: "Buildr | Novatoons",
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
  title: "Buildr | Novatoons",
  ogTitle: "Buildr | Novatoons",
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
  