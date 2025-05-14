<template>
    <div class="min-h-screen bg-white">
      <WhiteNav />
  
      <main class="mx-auto   w-full max-w-7xl">
        <!-- Header Section -->
        <div class="px-4 md:px-8 lg:py-12 py-6">
          <div class="flex uppercase flex-wrap gap-2 text-[#7C7C7C] text-sm text-gray-600 mb-4">
            <span>marketsquare</span>
            <span>-</span>
            <span>E-Commerce</span>
            <span>/</span>
            <span>Marketplaces</span>
          </div>
          <h1 class="text-xl lg:text-2xl font-semibold text-[#222222] mb-12">
            Addressing Food Waste with an Innovative Marketplace
          </h1>
  
          <!-- Hero Image -->
          <div class="bg-gray-900 rounded-2xl overflow-hidden mb-20">
            <img
              src="@/assets/img/cover-details1.png"
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
              <!-- <DetailsServiceBadge text="Project Management" color="purple" /> -->
              <DetailsServiceBadge text="Product Design" color="orange" />
              <!-- <DetailsServiceBadge text="Software Development" color="blue" />
              <DetailsServiceBadge text="Maintenance & Support" color="red" /> -->
            </div>
          </div>
  
          <!-- About Section -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">About Marketsquare</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
                MarketSquare aims to transform the way people find and book local services. It is a digital marketplace designed to bridge the gap between service providers and users, making it easier than ever to connect, communicate, and complete tasks. MarketSquare believes in the power of local, and are committed to supporting local professionals by providing a platform where they can showcase their skills, expand their customer base, and grow their business. From plumbers and painters to electricians and personal trainers, the platform welcomes a wide range of service providers. For users, MarketSquare offers unparalleled convenience. No more endless searching, no more uncertainty. With MarketSquare, users can browse through a list of pre-vetted professionals, read reviews, and book services with just a few clicks.
                <!-- Grabhub is a platform dedicated to tackling food waste by connecting retailers with consumers in search of affordable, high-quality groceries and home essentials. Retailers list near-expiry or overstocked items at discounted prices, giving consumers the opportunity to save money while reducing environmental waste. Designed with sustainability at its core, Grabhub addresses one of the world’s pressing issues—food waste—by transforming surplus goods into valuable resources. -->
              <!-- IQly is an AI-powered career advancement platform designed to help job seekers sharpen their skills, boost their confidence, and land their dream roles. The platform offers lifelike mock interviews tailored to users’ fields, an AI-driven resume builder to craft compelling career narratives, and a comprehensive resource library packed with expert advice and industry insights. IQly’s real-time feedback system provides users with targeted insights to improve their performance, while its intuitive design ensures preparation is efficient and effective. With a mission to make career readiness accessible and transformative, IQly empowers individuals to excel in competitive job markets, equipping them with the tools they need to stand out and succeed. -->
            </p>
          </section>
  
          <!-- Challenge Section -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Challenge</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
                 MarketSquare wanted to create an easy-to-use platform that connects local service providers with people who need their services. They needed a reliable website and app where users could find and book services like plumbing, painting, and personal training without hassle. Additionally, MarketSquare aimed to support local professionals by helping them reach more customers and grow their businesses.
                <!-- Grabhub, an Ontario-based company, was determined to combat the significant issue of food waste while also addressing the financial strain it places on both retailers and consumers. Retailers often found themselves with surplus food items and home essentials nearing their best-by dates, leading to considerable losses and contributing to environmental degradation through increased landfill waste.  -->
              <!--  IQly set out to develop a comprehensive, AI-powered platform that would help job seekers refine their interview skills, craft standout resumes, and access real-time performance insights. They needed a solution that could deliver realistic mock interviews, instant feedback, and personalized resources—all while remaining simple enough for anyone to use. However, building an intelligent system capable of seamlessly integrating these features posed a significant technical and UX challenge. -->
            </p>
            <p class="text-gray-700 leading-relaxed text-[#222222]">On the other side, consumers were seeking affordable options for quality groceries and essentials but lacked access to discounted products that were still perfectly usable. Grabhub needed a solution that could bridge this gap, ensuring that excess inventory was efficiently moved while providing cost-effective options for shoppers.</p>
          </section>
  
          <!-- Solution Section with Images -->
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">Product Solution</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222] mb-8">
                The team at Buildr develop a simple and effective digital marketplace. We built a user-friendly website and mobile app where users can browse through a variety of local services, read reviews, and book appointments with just a few clicks.
                <!-- Buildr’s team partnered with Grabhub to develop a comprehensive online marketplace tailored to reduce food waste and offer savings to consumers. We designed and built a user-friendly platform that seamlessly connects retailers with consumers, enabling the easy listing and discovery of near-expiry food items, groceries, and home essentials. The platform features intuitive browsing capabilities, secure payment processing, and streamlined logistics management to facilitate smooth transactions.  -->
              <!-- We stepped in to architect and develop the platform from the ground up. Leveraging our expertise in machine learning, we created an AI engine capable of simulating diverse interview scenarios and providing immediate, targeted feedback. Our front-end specialists designed an intuitive user interface that guided job seekers through every step—from setting up a mock interview session to polishing their résumés with AI-driven suggestions. Simultaneously, we integrated an extensive resource library that automatically tailored its recommendations based on each user’s progress and performance gaps. -->
            </p>
            <p class="text-gray-700 leading-relaxed text-[#222222] mb-8">
                For service providers, we created an easy onboarding process to list their services, manage bookings, and communicate directly with customers through the platform. We also implemented a secure payment system and a reliable review feature to build trust between users and providers.
                <!-- By creating an accessible and efficient marketplace, Buildr ensured that retailers could quickly offload surplus inventory and consumers could effortlessly find and purchase discounted, quality products. -->
            </p>
           <div class="space-y-2">
            <img src="@/assets/img/market02.jpg" alt="Property View" class="w-full" />
            <p class="text-sm text-center text-[#222222]">User can find near by stores</p>
           </div>
          </section>
  
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <h2 class="lg:text-2xl text-xl font-semibold mb-6 text-[#222222]">The Outcomes</h2>
            <p class="text-gray-700 leading-relaxed text-[#222222]">
                After launching the MarketSquare platform, it quickly became a popular choice for both users and service providers. Users appreciated the straightforward way to find and book trusted local services, leading to high satisfaction and repeat bookings. Service providers saw an increase in their customer base and business growth thanks to the platform’s visibility and easy management tools. The seamless connection between users and providers helped build a strong community, making MarketSquare a trusted name in local services.
                <!--  Since launching the Grabhub platform, the collaboration with Buildr has yielded impressive results. Grabhub successfully diverted thousands of pounds of food from landfills, significantly contributing to environmental sustainability efforts in Ontario. Retailers experienced a notable reduction in waste and financial losses, while consumers enjoyed substantial savings on essential items, enhancing their purchasing power. The platform's ease of use and reliability led to high user engagement and repeat transactions, fostering a thriving community committed to reducing food waste and promoting sustainable consumption. Grabhub’s innovative approach not only addressed immediate economic and environmental challenges but also established a scalable model for ongoing impact. -->
            </p>
           <div>
            <img src="@/assets/img/market01.jpg" class=" mt-6" alt="Property View" />
            <p class="text-sm text-center text-[#222222] pt-3">Search screen</p>
           </div>
          </section>
  
  
          <section class="lg:py-12 text-xl py-6  lg:px-44">
            <svg width="30" height="30" viewBox="0 0 44 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 22.23C0 13.26 5.07 5.07 12.22 0L18.33 5.07C14.17 7.54 9.88 12.87 8.97 17.29C9.36 17.16 10.4 16.9 11.18 16.9C15.6 16.9 18.98 20.28 18.98 25.09C18.98 30.03 14.95 34.06 10.14 34.06C4.81 34.06 0 29.77 0 22.23ZM24.05 22.23C24.05 13.26 29.12 5.07 36.27 0L42.38 5.07C38.22 7.54 33.93 12.87 33.02 17.29C33.41 17.16 34.45 16.9 35.23 16.9C39.65 16.9 43.03 20.28 43.03 25.09C43.03 30.03 39 34.06 34.19 34.06C28.86 34.06 24.05 29.77 24.05 22.23Z" fill="#222222"/>
              </svg>
            <p class="text-gray-700 leading-relaxed font-semibold text-[#222222]">
                Buildr made it easy for us to launch MarketSquare. Their team understood our needs and created a platform that truly connects local service providers with customers. We’re seeing great results and building a strong community thanks to their support. ”
                <!-- Buildr’s expertise and dedication were crucial in bringing Grabhub to life. Their ability to create a seamless and efficient platform has allowed us to effectively reduce food waste and provide great value to our customers. ” -->
            </p>
          </section>
          <!-- More Case Studies -->
        </div>
      </main>
      <section class="mx-auto  w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
            <h2 class="lg:text-2xl text-xl text-[#222222] font-semibold mb-8">More case studies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
              <DetailsCaseStudyCard
                name="BlackCountry"
                 href="/projects/black-country"
                title="Simplifying Shared Living in Nigeria: The BlackCountry Case Study"
                :image="blackcountry"
                :tags="['PropTech', 'Real Estate', 'Social Enterprise']"
              />
              <!-- PropTech / Real Estate / Social Enterprise -->
              <DetailsCaseStudyCard
                name="Iqly"
                 href="/projects/iqly"
                title="Revolutionizing Job Searches with an AI"
                :image="iqly"
                :tags="['Career Development', 'EdTech', 'Artificial Intelligence']"
              />
              <!-- Career Development / EdTech / Artificial Intelligence -->
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
  title: "Buildr | Marketsquare",
  ogTitle: "Buildr | Marketsquare",
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
  title: "Buildr | Marketsquare",
  ogTitle: "Buildr | Marketsquare",
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
  