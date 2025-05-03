// plugins/motion.client.ts
import { defineNuxtPlugin } from '#app'
import { MotionPlugin } from '@vueuse/motion'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MotionPlugin, {
    directives: {
      // Default animations
      'motion-fade-visible': {
        initial: {
          opacity: 0
        },
        visible: {
          opacity: 1,
          transition: {
            duration: 800
          }
        }
      },
      'motion-slide-visible-right': {
        initial: {
          opacity: 0,
          x: 100
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 800
          }
        }
      },
      'motion-slide-visible-left': {
        initial: {
          opacity: 0,
          x: -100
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 800
          }
        }
      },
      'motion-slide-visible-up': {
        initial: {
          opacity: 0,
          y: 100
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 800
          }
        }
      }
    }
  })
})