<template>
    <main class="bg-[#DDDEE6]">
        <section class="py-16 px-4 md:px-8">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16 space-y-4">
                    <p data-aos="fade-up"
                        class="text-lg md:text-xl font-medium text-gray-800 max-w-lg mx-auto leading-loose"
                    >We deliver tailored solutions, seamless collaboration, and unwavering support to bring your vision to life with excellence</p>
    
                    <div data-aos="fade-up" class="pt-28">
                        <h6 class="text-sm uppercase font-semibold tracking-wider text-[#7C7C7C]">Why Choose Us</h6>
                        <h2
                            class="text-2xl md:text-3xl font-medium text-[#EA4335] mt-2"
                        >Reasons why you can trust us</h2>
                    </div>
                </div>
    
                <!-- <section> -->
                    <section class="py-3 px-4 md:px-8">
                        <div class="max-w-6xl mx-auto space-y-16 lg:space-y-24">
                            <!-- Card -->
                            <div data-aos="fade-up"
                                v-for="(reason, idx) in reasonsArray"
                                :key="idx"
                                class="max-w-4xl mx-auto"
                            >
                                <div class="lg:flex space-y-3 lg:space-y-0 gap-10 justify-between">
                                    <!-- Number and Title -->
                                    <div class="lg:w-1/4 flex gap-3 lg:pl-10">
                                        <span class="text-[#FF5757] text-sm font-medium">0{{ idx + 1 }}</span>
                                        <h3
                                            class="text-2xl font-medium text-[#161616]"
                                        >{{ reason?.title ?? 'Nil' }}</h3>
                                    </div>
    
                                    <!-- Description -->
                                    <div class="lg:w-3/4 lg:pl-44">
                                        <p
                                            class="text-gray-600 text-left leading-loose text-[#161616]"
                                        >{{ reason?.content ?? 'Nil' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <!-- </section> -->
            </div>
        </section>
    </main>
    </template>
    
    <script setup lang="ts">
    const reasonsArray = ref([
        {
            "title": "Tailored Solutions",
            "content": "We believe every project is unique, and we take the time to understand your specific needs. By crafting custom strategies and solutions, we ensure that what we deliver perfectly aligns with your goals and exceeds your expectations."
        },
        {
            "title": "Expert Team",
            "content": "Our team is made up of highly skilled professionals with deep expertise in design, development, and quality assurance. With creativity and precision, we approach every project with innovative solutions that solve real-world challenges."
        },
        {
            "title": "End-to-End Support",
            "content": "We’re here for you at every stage of your project. From initial brainstorming to final deployment and beyond, our continuous guidance and support ensure a seamless process and long-term success."
        },
        {
            "title": "Sustainable Solutions",
            "content": "We design and develop solutions that are not only effective today but also scalable and future-proof for long-term success."
        }
    ])
    </script>
    