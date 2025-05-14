<template>
    <section class="bg-white pt-10">
      <div class="">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 lg:p-0">
          <!-- Service Cards -->
          <div 
           data-aos="fade-up"
            v-for="service in services" 
            :key="service.title"
            class="bg-gray-25 rounded-2xl p-6 lg:p-8  transition-shadow duration-300"
          >
            <!-- Icon Container -->
            <div class="bg-white rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <!-- <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" stroke-width="2"/>
                <path d="M17 12H12M12 12L7 12M12 12V17M12 12V7" stroke="black" stroke-width="2" stroke-linecap="round"/>
              </svg> -->
              <img src="@/assets/icons/service.svg" />
            </div>
  
            <!-- Content -->
            <h3 class="text-lg font-semibold text-[#222222] mb-4">
              {{ service.title }}
            </h3>
            <p class="text-[#222222] leading-snug">
              {{ service.description }}
            </p>
          </div>
        </div>
  
        <!-- Bottom Two Cards (Wider) -->
        <div class="grid md:grid-cols-2 gap-8 mt-8 p-5 lg:p-0">
          <div  data-aos="fade-up"
            v-for="service in bottomServices" 
            :key="service.title"
            class="bg-[#F8F8F8] rounded-2xl p-8  transition-shadow duration-300"
          >
            <!-- Icon Container -->
            <div class="bg-white rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <img src="@/assets/icons/service.svg" />
            </div>
  
            <!-- Content -->
            <h3 class="text-xl font-semibold text-[#222222] mb-4">
              {{ service.title }}
            </h3>
            <p class="text-[#222222] leading-relaxed">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  interface Service {
    title: string;
    description: string;
  }
  
  const services = ref<Service[]>([
    {
      title: "Custom software development",
      description: "We follow a meticulous product management process to create innovative solutions that address the specific needs of our users. From ideation to launch, we prioritize user research, design thinking, and agile development to build products that make a difference."
    },
    {
      title: "UI/UX design and product strategy",
      description: "We understand the importance of a seamless user experience, where we focuses on creating user-friendly navigation, engaging UX/UI design, and optimizing conversions through relevant content and consistent branding."
    },
    {
      title: "Cloud & infrastructure consulting",
      description: "We offer cutting-edge software development services that drive business growth and innovation. Our team of experts specializes in creating robust web and mobile applications tailored to meet the unique needs of your business"
    },
    {
      title: "Product & project management",
      description: "Keep projects on track and products aligned with business goals through strategic planning, effective communication, and agile methodologies. We handle everything from defining scope and timelines to collaborating across teams for successful deliverables."
    },
    {
      title: "Digital transformation & consulting",
      description: "Identify inefficiencies, automate workflows, and embrace new technologies to reinvent how your business operates. We provide data-driven insights, process improvements, and strategic guidance for sustainable growth."
    },
    {
      title: "E-Commerce development",
      description: "Launch a seamless online store or upgrade an existing platform to reach more customers. We integrate payment gateways, custom APIs, and optimize performance, ensuring a user-friendly shopping experience that drives conversions."
    }
  ]);
  
  const bottomServices = ref<Service[]>([
    {
      title: "Maintenance & support",
      description: "Stay ahead of potential issues with ongoing monitoring, proactive troubleshooting, and continuous updates. Our dedicated support team ensures your software runs smoothly and scales alongside your growing business."
    },
    {
      title: "Growth & marketing support",
      description: "Boost your online visibility and customer engagement through targeted marketing strategies. From SEO and paid advertising to social media campaigns and content creation, we help you attract, convert, and retain loyal users."
    }
  ]);
  </script>