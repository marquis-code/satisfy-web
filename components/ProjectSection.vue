<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
            <div class="text-center">
                <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
                    data-aos="flip-left">Innovation in Action</h1>

                <p class="max-w-lg mx-auto mt-4 text-gray-500" data-aos="flip-left">
                    Browse our portfolio to see how we've transformed challenges into technological triumphs. Each
                    project is a testament to our innovative solutions and strategic foresight, driving real results
                    across industries.
                </p>
            </div>

            <div :style="{ transform: `translateX(-${offset}px)` }" class="flex">
                <div  v-for="(image, index) in allImages" :key="index">
                    <img class="relative z-10 object-cover w-full rounded-md h-96" data-aos="flip-left"
                    :src="image"
                        alt="">

                    <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                        <a href="#" class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            data-aos="flip-left">
                            All the features you want to know
                        </a>

                        <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm" data-aos="flip-left">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                            laudantium quia tempore delect
                        </p>

                        <p class="mt-3 text-sm text-blue-500" data-aos="flip-left">21 October 2019</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import carousel1 from '@/assets/img/business1.jpeg'
import carousel2 from '@/assets/img/business2.jpeg'
import carousel3 from '@/assets/img/business3.jpeg'
import carousel4 from '@/assets/img/business4.jpeg'
import carousel5 from '@/assets/img/business5.jpeg'
export default defineComponent({
    name: 'ContinuousCarousel',
    setup() {
        const images = ref([
            carousel1, carousel2, carousel3, carousel4, carousel5
        ]);

        // Duplicate the images to simulate infinite loop
        const allImages = ref([...images.value, ...images.value]);

        const offset = ref(0);
        const itemWidth = 300; // width of each image
        const scrollSpeed = 2; // speed in pixels

        let interval: number | undefined;

        function startScrolling() {
            interval = window.setInterval(() => {
                if (offset.value >= itemWidth * images.value.length) {
                    offset.value = 0; // Reset to start when end is reached
                } else {
                    offset.value += scrollSpeed;
                }
            }, 20);
        }

        onMounted(() => {
            startScrolling();
        });

        onUnmounted(() => {
            if (interval) {
                clearInterval(interval);
            }
        });

        return { allImages, offset };
    }
});
</script>

<style scoped>
.carousel-container {
    width: 100%;
    height: 300px;
    /* Adjust as needed */
}

.carousel-track {
    will-change: transform;
    min-width: max-content;
}

.image-item {
    width: 300px;
    /* Ensure this matches `itemWidth` in script */
    flex-shrink: 0;
}
</style>