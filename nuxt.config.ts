import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Force disable SSR since your original config had it as false
  // This will prevent the SSR rendering errors
  ssr: false,
  target: "static",
  app: {
    head: {
      title: "Buildr - Build the future of your business",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { 
          name: "description", 
          content: "Product development agency specializing in UI/UX design and software development for startups. We build MVPs, mobile apps, and web applications with expert remote teams." 
        },
        { name: "author", content: "Buildr" },
        
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://gobuildr.io/' },
        { property: 'og:title', content: 'Buildr - Build the future of your business' },
        { 
          property: 'og:description', 
          content: 'Product development agency specializing in UI/UX design and software development for startups.' 
        },
        { property: 'og:image', content: 'https://gobuildr.io/icon.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://gobuildr.io/' },
        { property: 'twitter:title', content: 'Buildr - Build the future of your business' },
        { 
          property: 'twitter:description', 
          content: 'Product development agency specializing in UI/UX design and software development for startups.' 
        },
        { property: 'twitter:image', content: 'https://gobuildr.io/icon.png' }
      ],
      link: [
        { rel: 'canonical', href: 'https://gobuildr.io/' },
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
      siteUrl: 'https://OLGNova.com',
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