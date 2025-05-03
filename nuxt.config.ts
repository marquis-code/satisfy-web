export default {
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
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    }
  },
  build: {
    transpile: ['vuedraggable', 'marked', 'dompurify', 'lucide-vue-next']
  },
  modules: ["@nuxtjs/tailwindcss"],
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
  plugins: [],

  compatibilityDate: "2025-02-01",
};