<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
            <div class="mt-6 md:flex md:items-center md:justify-between">
                <div>
                    <h1 data-aos="flip-left"
                        class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        What our clients are saying
                    </h1>

                    <div class="flex mx-auto mt-6" data-aos="flip-left">
                        <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                        <span class="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                        <span class="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                    </div>
                </div>

                <div class="flex justify-between mt-8 md:mt-0">
                    <button title="left arrow" data-aos="flip-left"
                        class="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button title="right arrow" data-aos="flip-left"
                        class="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <section class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                <div class="p-8 border rounded-lg dark:border-gray-700" data-aos="flip-left">
                    <p class="leading-loose text-gray-500 dark:text-gray-400" data-aos="flip-left">
                        “Buildr transformed our vision into reality, delivering a seamless app that's now essential to
                        our operation. Their team nailed it from strategy to launch.”.
                    </p>

                    <div class="flex items-center mt-8 -mx-2">
                        <img class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                            data-aos="flip-left"
                            src="https://mb.cision.com/Public/21928/3921068/a7e7fb7c294704a3_400x400ar.jpg"
                            alt="">

                        <div class="mx-2">
                            <h1 class="font-semibold text-gray-800 dark:text-white" data-aos="flip-left">Vivien</h1>
                            <span class="text-sm text-gray-500 dark:text-gray-400" data-aos="flip-left">Co-founder,
                                Grabhub</span>
                        </div>
                    </div>
                </div>

                <div class="p-8 bg-blue-500 border border-transparent rounded-lg dark:bg-blue-600" data-aos="flip-left">
                    <p class="leading-loose text-white" data-aos="flip-left">
                        “Working with Buildr was a game-changer. They took our initial concept and developed a platform
                        that exceeded our expectations, setting us apart in the market”.
                    </p>

                    <div class="flex items-center mt-8 -mx-2">
                        <img class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200"
                            data-aos="flip-left"
                            src="https://media.licdn.com/dms/image/D4D03AQG9sbxYGN3jnA/profile-displayphoto-shrink_800_800/0/1664056589345?e=1719446400&v=beta&t=dqI8H0DlEachAfausYWOWWmWmoslOFGgQgZDIZN4VSM"
                            alt="">

                        <div class="mx-2">
                            <h1 class="font-semibold text-white" data-aos="flip-left">John</h1>
                            <span class="text-sm text-blue-200" data-aos="flip-left">CEO, Novatoons</span>
                        </div>
                    </div>
                </div>

                <div class="p-8 border rounded-lg dark:border-gray-700" data-aos="flip-left">
                    <p class="leading-loose text-gray-500 dark:text-gray-400" data-aos="flip-left">
                        “Buildr's expertise in app development propelled our project from an idea to a fully functional
                        tool that's revolutionizing how we do business. Their approach was straightforward and
                        effective.”.
                    </p>

                    <div class="flex items-center mt-8 -mx-2">
                        <img class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                            data-aos="flip-left"
                            src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="">

                        <div class="mx-2">
                            <h1 class="font-semibold text-gray-800 dark:text-white" data-aos="flip-left">Winifred
                            </h1>
                            <span class="text-sm text-gray-500 dark:text-gray-400" data-aos="flip-left">Business
                                Developer,
                                Homely</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
