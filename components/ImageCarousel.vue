<template>
    <main class="bg-white dark:bg-gray-900">
        <section class="container px-6 py-10 mx-auto space-y-6">
            <div class="text-center">
                <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
                    data-aos="flip-left">Innovation in Action</h1>

                <p class="max-w-lg mx-auto mt-4 text-gray-500" data-aos="flip-left">
                    Browse our portfolio to see how we've transformed challenges into technological triumphs. Each
                    project is a testament to our innovative solutions and strategic foresight, driving real results
                    across industries.
                </p>
            </div>

            <div class="carousel-container overflow-hidden relative">
                <div class="carousel-track flex gap-x-5" :style="{ transform: `translateX(-${offset}px)` }">
                    <div class="image-item flex-none w-full" v-for="(image, index) in allImages" :key="index">
                        <img :src="image" class="h-full w-full object-cover rounded-xl object-center" alt="">
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import carousel1 from '@/assets/img/grabhub.png'
import carousel2 from '@/assets/img/homely.png'
import carousel3 from '@/assets/img/iqly.png'
import carousel5 from '@/assets/img/MSQ.png'
import carousel6 from '@/assets/img/ttp.png'
// import carousel7 from '@/assets/img/MSQ2.png'
import carousel8 from '@/assets/img/novatoons.png'
export default defineComponent({
    name: 'ContinuousCarousel',
    setup() {
        const images = ref([
            carousel1, carousel2, carousel3, carousel5, carousel6, carousel8
        ]);

        // Duplicate the images to simulate infinite loop
        const allImages = ref([...images.value, ...images.value]);

        const offset = ref(0);
        const itemWidth = 400; // width of each image
        const scrollSpeed = 1; // speed in pixels

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
    height: 610px;
    /* Adjust as needed */
}

.carousel-track {
    will-change: transform;
    min-width: max-content;
}

.image-item {
    width: 400px;
    /* Ensure this matches `itemWidth` in script */
    flex-shrink: 0;
}
</style>