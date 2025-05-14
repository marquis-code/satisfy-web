<template>
    <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""> -->
                        <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="">
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button type="button" @click="openSidebar = true"
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <a href="#about-section" class="text-sm font-semibold leading-6 text-gray-900">About us</a>
                    <a href="#services-section" class="text-sm font-semibold leading-6 text-gray-900">Services</a>
                    <a href="#projects" class="text-sm font-semibold leading-6 text-gray-900">Projects</a>
                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#contact-section" class="text-sm font-semibold leading-6 text-gray-900">Contact us<span
                            aria-hidden="true">&rarr;</span></a>
                </div>
            </nav>
            <!-- Mobile menu, show/hide based on menu open state. -->
            <div class="lg:hidden" role="dialog" aria-modal="true" v-if="openSidebar">
                <!-- Background backdrop, show/hide based on slide-over state. -->
                <div class="fixed inset-0 z-50"></div>
                <div
                    class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="">
                        </a>
                        <button @click="openSidebar = false" type="button"
                            class="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="space-y-2 py-6">
                                <a @click.native="openSidebar = false" href="#about-section"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About
                                    us</a>
                                <a @click.native="openSidebar = false" href="#services-section"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Services</a>
                                    <a @click.native="openSidebar = false" href="#projects"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Projects</a>
                            </div>
                            <div class="py-6">
                                <a @click.native="openSidebar = false" href="#contact-section"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact
                                    us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="relative isolate">
                <svg class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                    aria-hidden="true">
                    <defs>
                        <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1"
                            patternUnits="userSpaceOnUse">
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            stroke-width="0" />
                    </svg>
                    <rect width="100%" height="100%" stroke-width="0"
                        fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                </svg>
                <div class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                    aria-hidden="true">
                    <div class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)">
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                        <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                            <div class="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                                    data-aos="flip-left">Accelerate your
                                    digital growth with Buildr.</h1>
                                <p class="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none"
                                    data-aos="flip-left">We
                                    specialize in software development, product
                                    design, and bespoke solutions to help businesses innovate and thrive in the digital
                                    age.</p>
                            </div>
                            <div
                                class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
                                    data-aos="flip-left">
                                    <div class="relative">
                                        <img src="@/assets/img/hero1.jpg" alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            data-aos="flip-left">
                                        <div
                                            class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10">
                                        </div>
                                    </div>
                                </div>
                                <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                    <div class="relative" data-aos="flip-left">
                                        <img src="@/assets/img/hero2.jpg" alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            data-aos="flip-left">
                                        <div
                                            class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10">
                                        </div>
                                    </div>
                                    <div class="relative" data-aos="flip-left">
                                        <img src="@/assets/img/hero3.jpg" alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            data-aos="flip-left">
                                        <div
                                            class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10">
                                        </div>
                                    </div>
                                </div>
                                <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                    <div class="relative" data-aos="flip-left">
                                        <img src="@/assets/img/hero4.jpg" alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            data-aos="flip-left">
                                        <div
                                            class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10">
                                        </div>
                                    </div>
                                    <div class="relative" data-aos="flip-left">
                                        <img src="@/assets/img/hero5.jpg" alt=""
                                            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            data-aos="flip-left">
                                        <div
                                            class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="">
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button type="button" @click="openSidebar = true"
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <a href="#about-section" class="text-sm font-semibold leading-6 text-gray-900">About us</a>
                    <a href="#services-section" class="text-sm font-semibold leading-6 text-gray-900">Services</a>
                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#contact-section" class="text-sm font-semibold leading-6 text-gray-900">Contact us <span
                            aria-hidden="true">&rarr;</span></a>
                </div>
            </nav>
            <div class="lg:hidden" role="dialog" aria-modal="true" v-if="openSidebar">
                <div class="fixed inset-0 z-50"></div>
                <div
                    class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="">
                        </a>
                        <button @click="openSidebar = false" type="button"
                            class="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="space-y-2 py-6">
                                <a href="#about-section"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About
                                    us</a>
                                <a href="#services-section"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Services</a>
                            </div>
                            <div class="py-6">
                                <a href="#contact-section"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact
                                    us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                aria-hidden="true"></div>
            <div class="mx-auto max-w-7xl px-6 py-14 sm:py-40 lg:px-8">
                <div
                    class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                    <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto"
                        data-aos="fade-up">
                        Accelerate your digital growth with Buildr</h1>
                    <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                        <p class="text-lg leading-8 text-gray-600" data-aos="fade-up" data-aos-delay="100">We
                            specialize in software development, product
                            design, and bespoke solutions to help businesses innovate and thrive in the digital age.</p>
                        <div class="mt-10 flex items-center gap-x-6">
                            <a href="#contact-section"
                                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Learn
                                More</a>
                        </div>
                    </div>
                    <img src="@/assets/img/hero1.jpg" alt="" data-aos="fade-up"
                        class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
                </div>
            </div>
            <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div>
        </div>
    </div> -->

</template>

<script>
export default {
    data() {
        return {
            openSidebar: false
        }
    }
}
</script>
