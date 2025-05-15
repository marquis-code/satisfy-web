import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  target: "static",
  app: {
    head: {
      title: "Satisfy | Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB.",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { 
          name: "description", 
          content: "Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB." 
        },
        { name: "author", content: "Satisfy" },
        
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://satisfy.africa/' },
        { property: 'og:title', content: 'Satisfy | Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB.' },
        { 
          property: 'og:description', 
          content: 'Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB.' 
        },
        { property: 'og:image', content: 'https://satisfy.africa/icon.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://satisfy.africa/' },
        { property: 'twitter:title', content: 'Satisfy | Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB.' },
        { 
          property: 'twitter:description', 
          content: 'Your favorite food, delivered fast to your door. Discover the best food vendors in FUNAAB.' 
        },
        { property: 'twitter:image', content: 'https://satisfy.africa/icon.png' }
      ],
      link: [
        { rel: 'canonical', href: 'https://satisfy.africa/' },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@100..900&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap'
        }
      ]
    },
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    }
  },
  
  build: {
    transpile: ['vuedraggable', 'marked', 'dompurify', 'lucide-vue-next']
  },
  
  // Remove problematic modules and keep only essential ones
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
  
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },

    plugins: ["@/plugins/aos.client.ts"],
  
  transpile: [
    '@vueuse/motion'
  ],

  axios: {
    timeout: 10000,
  },
  
  // Set public runtime config
  runtimeConfig: {
    public: {
      siteUrl: 'https://satisfy.africa',
    }
  },

  // Disable prerendering to avoid the SSR errors
  nitro: {
    prerender: {
      enabled: false
    }
  },

  compatibilityDate: "2025-02-01",
});