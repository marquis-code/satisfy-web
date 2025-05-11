import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Force disable SSR since your original config had it as false
  // This will prevent the SSR rendering errors
  ssr: false,
  target: "static",

  app: {
    head: {
      title: "OLGnova",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "description", content: "OLGnova - Health research publications and resources for healthcare professionals in Africa" },
        { name: "keywords", content: "health research, publications, Africa, healthcare, medical research" },
        { name: "author", content: "OLGnova" },
        { property: "og:title", content: "OLGnova" },
        { property: "og:description", content: "Health research publications and resources for healthcare professionals in Africa" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://olgnova.com" },
        { property: "og:image", content: "https://olgnova.com/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "OLGnova" },
        { name: "twitter:description", content: "Health research publications and resources for healthcare professionals in Africa" },
        { name: "twitter:image", content: "https://olgnova.com/twitter-image.jpg" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        { rel: "canonical", href: "https://olgnova.com" },
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
  
  // Remove problematic modules and keep only essential ones
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
  
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  
  transpile: [
    '@vueuse/motion'
  ],

  axios: {
    timeout: 10000,
  },
  
  // Set public runtime config
  runtimeConfig: {
    public: {
      siteUrl: 'https://olgnova.com',
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