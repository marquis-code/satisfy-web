<template>
  <main class="bg-[#DDDEE6]">
    <section class="py-16 px-4 md:px-8">
      <div class="max-w-6xl mx-auto">

        <div class="text-center mb-16 space-y-4">
          <div data-aos="fade-up" class="pt-8">
            <h6 class="text-sm uppercase font-semibold tracking-wider text-[#7C7C7C]">
              our approach
            </h6>
            <h2 class="text-2xl md:text-3xl font-medium text-[#EA4335] mt-2">
              Seamless Product Lifecycle
            </h2>
          </div>
        </div>

        <section>
          <section class="pb-16 px-4 md:px-8">
            <div class="max-w-5xl mx-auto space-y-10 lg:space-y-32">

              <div
                data-aos="fade-up"
                v-for="(reason, idx) in reasonsArray"
                :key="idx"
                class="max-w-4xl mx-auto"
              >
                <div class="lg:flex gap-10 space-y-3 lg:space-y-0 justify-between">

                  <div class="lg:w-1/3 flex gap-3 lg:pl-20 items-start">
                    <span class="text-[#FF5757] text-sm font-medium">
                      0{{ idx + 1 }}
                    </span>
                    <h3 class="text-2xl font-medium text-[#161616]">
                      {{ reason?.title ?? "Nil" }}
                    </h3>
                  </div>


                  <div class="lg:w-2/3 lg:pl-44">
                    <p
                      class="text-gray-600 text-left leading-relaxed text-[#161616] max-w-xl"
                    >
                      {{ reason?.content ?? "Nil" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const reasonsArray = ref([
  {
    title: "Discovery & Strategy",
    content:
      "Our approach begins with Discovery and strategy, where we work closely with stakeholders to define goals, conduct market research, and develop a strategic product roadmap that aligns with business objectives and user needs.",
  },
  {
    title: "User-Centered Design",
    content:
      "In the User-Centered Design phase, we focus on crafting intuitive and visually appealing designs by creating prototypes, mapping user journeys, and refining based on feedback to ensure accessibility and inclusivity.",
  },
  {
    title: "Agile Development",
    content:
      "During Agile development, we build scalable and robust software through iterative sprints, ensuring seamless collaboration between teams while leveraging modern tools for efficient deployment and integration.",
  },
  {
    title: "Testing & Validation",
    content:
      "We perform manual and automated tests to validate functionality, usability, performance, and security, ensuring the product meets the highest standards before launch.",
  },
  {
    title: "Launch & Deployment",
    content:
      "We ensure a smooth launch by preparing a comprehensive go-to-market strategy. From final performance checks to deployment, we handle every detail to ensure the product is delivered seamlessly and is fully optimized for end-users.",
  },
  {
    title: "Collaboration & Communication",
    content:
      "Transparency and teamwork are at the core of our approach. We use advanced project management tools and maintain regular updates through meetings and progress reports, ensuring all stakeholders remain informed and aligned throughout the project.",
  },
]);
</script>
