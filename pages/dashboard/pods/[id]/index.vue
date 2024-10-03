v<template>
    <main>
        <div class="px-2 sm:px-4 lg:px-6 space-y-4">
            <div>
                <button @click="goBack" class="text-xs font-semibold rounded-full bg-gray-600 text-white px-3 py-2">Go
                    Back</button>
            </div>
            <div v-if="!loading && Object.keys(story).length"
                class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div class="lg:col-start-3 lg:row-end-1 lg:sticky lg:top-20">
                    <h2 class="sr-only">Summary</h2>
                    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                        <dl class="flex flex-wrap">
                            <div class="flex-auto pl-6 pt-6">
                                <dt class="text-sm font-semibold leading-6 text-gray-900">Author Details</dt>
                                <dd class="mt-1 text-am font-semibold leading-6 text-gray-900">
                                    <DashboardImageZoom v-if="story?.user?.profilePicture" class="h-10 w-10"
                                        :src="story?.user?.profilePicture" />
                                    <div v-else
                                        class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                                        {{ generateInitials(story?.user?.fname, story?.user?.lname) }}
                                    </div>
                                </dd>
                            </div>
                            <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Name</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm font-medium leading-6 text-gray-900">
                                    <NuxtLink :to="`/dashboard/users/${story.user.id}`" class="underline"> {{
                                        story?.user?.fname }}
                                        {{ story?.user?.lname }}</NuxtLink>
                                </dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Email</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path
                                            d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                                        <path fill-rule="evenodd"
                                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">
                                    <NuxtLink v-if="story?.user?.email" :to="`/dashboard/users/${story.user.id}`"
                                        class="underline">{{ story?.user?.email }}</NuxtLink>
                                    <span v-else>Nil</span>
                                </dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Status</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">
                                    {{ story?.user?.handle }}
                                    <!-- <img :src="story?.user?.profilePicture" class="h-10 w-10 rounded-full object-cover object-center" alt="avatar" /> -->
                                </dd>
                            </div>
                        </dl>
                        <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
                            <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Download receipt <span aria-hidden="true">&rarr;</span></a> -->
                        </div>
                    </div>
                </div>
                <div v-if="Object.keys(selectedSlide).length"
                    class="lg:col-start-3 lg:row-end-1 lg:sticky lg:top-[490px]">
                    <h2 class="sr-only">Summary</h2>
                    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                        <dl class="flex flex-wrap">
                            <div class="flex-auto pl-6 pt-6">
                                <dt class="text-sm font-semibold leading-6 text-gray-900">Slide Details</dt>
                                <dd class="mt-1 text-am font-semibold leading-6 text-gray-900">
                                    <img :src="selectedSlide?.coverImage"
                                        class="h-10 w-10 rounded-full object-cover object-center" alt="avatar" />
                                </dd>
                            </div>
                            <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Title</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm font-medium leading-6 text-gray-900">{{ selectedSlide.title || 'Nil'
                                    }}</dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Content</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path
                                            d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                                        <path fill-rule="evenodd"
                                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">
                                    <time datetime="2023-01-31">{{ selectedSlide?.content || 'Nil' }}</time>
                                </dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Views Count</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">
                                    {{ selectedSlide?.viewsCount || 'Nil' }}
                                </dd>
                            </div>
                            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                                <dt class="flex-none">
                                    <span class="sr-only">Created At</span>
                                    <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </dt>
                                <dd class="text-sm leading-6 text-gray-500">
                                    {{ selectedSlide?.createdAt || 'Nil' }}
                                </dd>
                            </div>
                        </dl>
                        <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
                            <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Download receipt <span aria-hidden="true">&rarr;</span></a> -->
                        </div>
                    </div>
                </div>
                <div
                    class="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                    <div class="flex items-center justify-between">
                        <h2 class="text-base font-semibold leading-6 text-gray-900">Story Details</h2>
                        <div>
                            <button @click="toggleDropdown"
                                class="inline-flex items-center text-sm font-medium text-[#667185] hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"
                                    fill="none" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="12" cy="5" r="1"></circle>
                                    <circle cx="12" cy="19" r="1"></circle>
                                </svg>
                            </button>

                            <div  v-if="isDropdownOpen"
                                class="absolute z-50  bg-white border border-gray-200 rounded-md shadow-lg">
                                <ul class="py-1 text-sm text-gray-700">
                                    <li>
                                        <a @click.prevent="handleSwitchToOriginal(story)" href="#"
                                            class="flex items-center gap-x-2 font-medium px-4 py-2 hover:bg-gray-100 text-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                                                viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M17 2.1l4 4-4 4" />
                                                <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
                                                <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
                                            </svg>
                                            {{ story?.isOriginal ? 'Remove From storipod originals' : 'Make storipod original' }} </a>
                                    </li>
                                    <li>
                                        <a @click.prevent="handleDeleteStory(story.id)" href="#"
                                            class="flex items-center gap-x-2 font-medium text-red-600 px-4 py-2 hover:bg-gray-100 text-start">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.25 4.58301L15.9152 10.0048M3.75 4.58301L4.25384 12.937C4.38287 15.0765 4.4474 16.1463 4.98223 16.9155C5.24667 17.2958 5.58733 17.6169 5.98254 17.8582C6.54196 18.1997 7.23423 18.3023 8.33333 18.333"
                                                    stroke="#326543" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M16.6654 12.5L10.832 18.3329M16.6654 18.3333L10.832 12.5004"
                                                    stroke="#326543" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                                <path
                                                    d="M2.5 4.58366H17.5M13.3797 4.58366L12.8109 3.4101C12.433 2.63054 12.244 2.24076 11.9181 1.99767C11.8458 1.94374 11.7693 1.89578 11.6892 1.85424C11.3283 1.66699 10.8951 1.66699 10.0287 1.66699C9.14067 1.66699 8.69667 1.66699 8.32973 1.86209C8.24842 1.90533 8.17082 1.95524 8.09774 2.0113C7.76803 2.26424 7.58386 2.66828 7.21551 3.47638L6.71077 4.58366"
                                                    stroke="#326543" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                            Delete pod</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                        <div class="sm:pr-4">
                            <dt class="inline text-gray-500">Title:</dt>
                            <dd class="inline text-gray-700 ml-2"><time datetime="2023-23-01">{{ story?.title || 'Nil'
                                    }}</time>
                            </dd>
                        </div>
                        <div class="mt-2 sm:mt-0 sm:pl-4">
                            <dt class="inline text-gray-500">Tags:</dt>
                            <dd class="inline text-gray-700 ml-2">
                                <div class="flex flex-wrap">
                                    <p class="bg-black text-white text-xs m-1 flex justify-center items-center rounded-full px-2 py-1"
                                        v-for="item in story?.tags.split(',')" :key="item">{{ item
                                        }}</p>
                                </div>
                            </dd>
                        </div>
                    </dl>
                    <dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                        <div class="sm:pr-4">
                            <dt class="inline text-gray-500">Comments Count:</dt>
                            <dd class="inline text-gray-700 ml-2"><time datetime="2023-23-01">{{ story?.commentsCount ||
                                'Nil'
                                    }}</time></dd>
                        </div>
                        <div class="mt-2 sm:mt-0 sm:pl-4">
                            <dt class="inline text-gray-500">Total Views Count:</dt>
                            <dd class="inline text-gray-700 ml-2"><time datetime="2023-31-01">{{ story?.totalViewsCount
                                || 'Nil'
                                    }}</time></dd>
                        </div>
                    </dl>
                    <dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                        <div class="sm:pr-4">
                            <dt class="inline text-gray-500">Reactions count:</dt>
                            <dd class="inline text-gray-700 ml-2"><time datetime="2023-23-01">{{ story?.reactionsCount
                                || 'Nil'
                                    }}</time></dd>
                        </div>
                        <div class="mt-2 sm:mt-0 sm:pl-4">
                            <dt class="inline text-gray-500">Created At:</dt>
                            <dd class="inline text-gray-700 ml-2"><time datetime="2023-31-01">{{ story?.createdAt ||
                                'Nil'
                                    }}</time></dd>
                        </div>
                    </dl>
                    <dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                        <div class="sm:pr-4">
                            <dt class="inline text-gray-500">Cover Image:</dt>
                            <dd class="inline text-gray-700 ml-2">
                                <!-- <img :src="story?.coverImage" class="h-10 w-10 rounded-full object-cover object-center"
                                    alt="avatar" /> -->
                                <DashboardImageZoom v-if="story.coverImage" class="h-10 w-10" :src="story.coverImage" />
                                <div v-else
                                    class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                                    {{ generateInitials(story?.user?.fname, story?.user?.lname) }}
                                </div>
                            </dd>
                        </div>
                        <div class="mt-2 sm:mt-0 sm:pl-4">
                            <dt class="inline text-gray-500">Slides Count:</dt>
                            <dd class="inline text-gray-700 ml-2"><time datetime="2023-31-01">{{ story?.slidesCount ||
                                'Nil'
                                    }}</time></dd>
                        </div>
                    </dl>
                    <div class="sm:flex sm:items-center pt-4">
                        <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">Slides</h1>
                            <!-- <p class="mt-2 text-sm text-gray-700">A list of all the stori slides.</p> -->
                            <p class="mt-2 text-sm text-gray-700">Stori slides.</p>
                        </div>
                    </div>

                    <!-- <div class="border border-gray-300 rounded-lg bg-white shadow mt-3">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Slides #
                                    </th>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                        Cover
                                        Image
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Content
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Views
                                    </th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="even:bg-gray-50" v-for="(item, idx) in story.slides" :key="idx">
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        {{ idx + 1 }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        <DashboardImageZoom v-if="item.coverImage" class="h-10 w-10" :src="item.coverImage" />
                                        <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                                            {{ generateInitials(story?.user?.fname, story?.user?.lname) }}
                                          </div>
                                        <img :src="item.coverImage"
                                            class="h-10 w-10 rounded-full object-cover object-center" alt="avatar" />
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div class="truncate font-medium text-gray-900">{{ `${item.title.slice(0,
                    20)}...` }}</div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div class="truncate text-gray-500">{{ `${item.content.slice(0, 20)}...` }}
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div class="truncate text-gray-500">{{ item.viewsCount ?? 'Nil' }}</div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <a href.prevent="#" @click="previewSlideDetails(item)"
                                            class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->


                    <swiper class="mt-4 shadow-lg rounded-sm  bg-gray-50 border-gray-600 p-4" :modules="modules"
                        :slides-per-view="1" navigation @slideChange="handleSlideChange">
                        <swiper-slide v-for="(item, idx) in story.slides" :key="idx">
                            <StoriSlides :item="item" :story="story" :is-active="activeSlide === idx" />
                        </swiper-slide>
                    </swiper>

                </div>
            </div>
            <LoadingSpinner v-if="loading && !Object.keys(story).length" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import StoriSlides from '@/components/users/StoriSlides.vue';
import { useFetchStoryById } from '@/composables/story/getStoryById';
import { useDeleteStory } from "@/composables/story/deleteUserStory";
import { useFetchSlideComments } from '@/composables/story/getStorySlideComments';
import { useSetOriginal } from '@/composables/story/setOriginal'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
const { fetchStory, story, loading } = useFetchStoryById()
const { deleteStory } = useDeleteStory();
const { setOriginal, setPayloadObj} = useSetOriginal()



definePageMeta({
    layout: 'dashboard'
})

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const handleDeleteStory = (id: any) => {
  deleteStory(id);
};

const handleSwitchToOriginal = (payloadObj: any) => {
  const payload = ref({
    isOriginal: !payloadObj.isOriginal,
    storyId: payloadObj.id
  });
  setPayloadObj(payload)
  setOriginal()
}


const activeSlide = ref(0);

const handleSlideChange = (swiper) => {
    activeSlide.value = swiper.activeIndex;
};

const modules = [Navigation, Pagination, Scrollbar, A11y];

const selectedSlide = ref({}) as Record<string, any>

const router = useRouter();

const goBack = () => {
    router.back();
};

fetchStory()

const previewSlideDetails = (data: any) => {
    selectedSlide.value = data
}

const computedTagList = computed(() => {
    return story.value.tags.split(',')
})

const generateInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
    color: #000 !important;
    height: auto !important;
    width: auto !important;
    border: none !important;
    outline: none !important;
}

.swiper-button-prev::after {
    content: '<';
    font-size: 30px;
    font-weight: 700;
}

.swiper-button-next::after {
    content: '>';
    font-size: 30px;
    font-weight: 700;
}

@media (max-width: 1024px) {
    .lg\:sticky {
        position: static !important;
    }
}
</style>
