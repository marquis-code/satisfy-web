import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true, // Changed from false to true for better SEO
  target: "static",

  app: {
    head: {
      title: "OLGnova",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        // Added SEO meta tags
        { name: "description", content: "OLGnova - Health research publications and resources for healthcare professionals in Africa" },
        { name: "keywords", content: "health research, publications, Africa, healthcare, medical research" },
        { name: "author", content: "OLGnova" },
        // Open Graph tags for social sharing
        { property: "og:title", content: "OLGnova" },
        { property: "og:description", content: "Health research publications and resources for healthcare professionals in Africa" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://olgnova.com" }, // Replace with your actual URL
        { property: "og:image", content: "https://olgnova.com/og-image.jpg" }, // Replace with your actual image
        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "OLGnova" },
        { name: "twitter:description", content: "Health research publications and resources for healthcare professionals in Africa" },
        { name: "twitter:image", content: "https://olgnova.com/twitter-image.jpg" }, // Replace with your actual image
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        { rel: "canonical", href: "https://olgnova.com" }, // Replace with your actual URL
      ],
    },
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    }
  },
  
  build: {
    transpile: ['vuedraggable', 'marked', 'dompurify', 'lucide-vue-next']
  },
  
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots", // Added for robots.txt
    "nuxt-simple-sitemap", // Added for sitemap generation
    "@nuxtjs/seo", // Added for SEO optimization
    "@vueuse/nuxt", // Added for Vue Use utilities
  ],
  
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  
  transpile: [
    '@vueuse/motion'
  ],

  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },
  
  plugins: [
    // Add any SEO-related plugins here
  ],

  // Robots.txt configuration
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://olgnova.com/sitemap.xml' // Replace with your actual URL
  },
  
  // Sitemap configuration
  sitemap: {
    hostname: 'https://olgnova.com', // Replace with your actual URL
    gzip: true,
    exclude: [
      '/admin/**' // Exclude admin pages from sitemap
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    }
  },
  
  // SEO module configuration
  seo: {
    baseUrl: 'https://olgnova.com', // Replace with your actual URL
    name: 'OLGnova',
    templateTitle: '%s - OLGnova',
    description: 'Health research publications and resources for healthcare professionals in Africa',
  },

  // Added for better performance and SEO
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/publications',
        '/about',
        '/contact'
      ]
    }
  },

  compatibilityDate: "2025-02-01",
});