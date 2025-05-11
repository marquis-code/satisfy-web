<template>
  <div class="bg-white">
    <!-- Header -->
 <NavbarSection />

    <main>
      <!-- Hero section -->
       <HeroCarousel />

      <!-- Feature section -->
      <div class="mt-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl sm:text-center">
            <!-- <h2 class="text-base/7 font-semibold text-indigo-600">Everything you need</h2> -->
            <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl">Welcome to OLGnova.</p>
            <p class="mt-6 text-lg/8 text-gray-600">We transform insights into impact by combining research, communication, and consulting to help organizations grow and create meaningful change.</p>
          </div>
        </div>
        <div class="relative overflow-hidden pt-16">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <video 
              class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10" width="2432" height="1442"
              autoplay 
              muted 
              loop 
              playsinline
            >
              <source :src="currentVideo" type="video/mp4">
            </video>
            <!-- <img src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png" alt="App screenshot" class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10" width="2432" height="1442" /> -->
             <!-- <video src="./company-profile.mp4" /> -->
            <div class="relative" aria-hidden="true">
              <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
            </div>
          </div>
        </div>

        <TrustedPartners />
      </div>

    </main>

    <div id="contact-us" class="relative isolate bg-white">
  <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
    <div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
          <svg class="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" stroke-width="0" fill="white" />
            <svg x="100%" y="-1" class="overflow-visible fill-gray-50">
              <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
          </svg>
        </div>
        <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Get in touch</h2>
        <p class="mt-6 text-lg/8 text-gray-600">
          We're here to help! For personalized assistance, contact us directly or fill out our simple online form to get the answers you need <a class="font-medium underline text-green-700" href="https://forms.gle/zMUkbgP56JNvt4hE8">https://forms.gle/zMUkbgP56JNvt4hE8</a>
        </p>
        <dl class="mt-10 space-y-4 text-base/7 text-gray-600">
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Address</span>
              <svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </dt>
            <div class="space-y-3">
              <dd class="text-sm">KG 11 Ave, Kigali, Rwanda</dd>
              <!-- <dd class="text-sm">Shop complex, Opp. Table mannas junction, Licksensation, University of Osun, Nigeria</dd> -->
            </div>
          </div>
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Telephone</span>
              <svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </dt>
            <dd>
             <div class="space-y-3">
              <a class="hover:text-gray-900 text-sm block" href="tel:+250788249545">+250 788 249 545</a>
              <a class="hover:text-gray-900 text-sm block" href="tel:+447551289858">+447 551 289 858</a>
             </div>
            </dd>
          </div>
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Email</span>
              <svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </dt>
            <dd><a class="hover:text-gray-900" href="mailto:olgnovateam@gmail.com">olgnovateam@gmail.com</a></dd>
          </div>
        </dl>
      </div>
    </div>
    <form action="#" method="POST" class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label for="first-name" class="block text-sm/6 font-semibold text-gray-900">First name</label>
            <div class="mt-2.5">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
            </div>
          </div>
          <div>
            <label for="last-name" class="block text-sm/6 font-semibold text-gray-900">Last name</label>
            <div class="mt-2.5">
              <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-olg-blue">
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm/6 font-semibold text-gray-900">Email</label>
            <div class="mt-2.5">
              <input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-olg-blue">
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="phone-number" class="block text-sm/6 font-semibold text-gray-900">Phone number</label>
            <div class="mt-2.5">
              <input type="tel" name="phone-number" id="phone-number" autocomplete="tel" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-olg-blue">
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm/6 font-semibold text-gray-900">Message</label>
            <div class="mt-2.5">
              <textarea name="message" id="message" rows="4" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-olg-blue"></textarea>
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-end">
          <button type="submit" class="rounded-md w-full bg-olg-blue px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-olg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olg-blue">Send message</button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- <FaqSection /> -->


    <!-- Footer -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import {
  ArrowPathIcon,
  CheckIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/vue/20/solid'
import NavbarSection from '../components/NavbarSection.vue'
import FaqSection from '../components/FaqSection.vue'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const videos = [
    '/company-profile.mp4',
    '/company-profile.mp4',
    '/company-profile.mp4'
  ]

const currentIndex = ref(0);
const currentVideo = ref(videos[0]);
    // Auto-advance slides
    onMounted(() => {
    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length;
      currentVideo.value = videos[currentIndex.value % videos.length];
    }, 5000);
  });

const features = [
  {
    name: 'Push to deploy.',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security.',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Powerful API.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
    icon: ServerIcon,
  },
]
const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$19',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$49',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
]
const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
]
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
}

const mobileMenuOpen = ref(false)

</script>