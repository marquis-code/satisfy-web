<template>
    <transition name="loader">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center" :class="[
        backgroundClass,
        backdropBlur ? 'backdrop-blur-sm' : ''
      ]">
        <div class="relative w-full max-w-md p-8">
          <!-- Main Loader Container -->
          <div class="relative flex flex-col items-center">
            <!-- Animated Food Orbit -->
            <div v-if="showOrbit" class="food-orbit">
              <div v-for="(icon, index) in orbitIcons" :key="index" 
                class="food-item"
                :style="{
                  '--rotation': `${index * (360 / orbitIcons.length)}deg`,
                  '--delay': `${index * 0.1}s`
                }"
              >
                <component :is="icon" class="w-8 h-8 text-white" />
              </div>
            </div>
            
            <!-- Center Pulsing Logo -->
            <div class="relative z-10 mb-6">
              <div class="rounded-full flex items-center justify-center pulse-shadow"
                :class="[
                  centerIconBgClass,
                  centerIconSize
                ]"
              >
                <component 
                  :is="centerIcon" 
                  class="text-white animate-bounce-slow"
                  :class="centerIconClass"
                />
              </div>
            </div>
            
            <!-- Loading Text -->
            <div v-if="title || message" class="text-center mt-6">
              <h3 v-if="title" class="text-xl font-bold text-white mb-2 tracking-wide">
                <span class="loading-text">
                  <span v-for="(char, idx) in title" :key="idx" :style="{ '--i': idx }">{{ char }}</span>
                </span>
              </h3>
              <p v-if="message" class="text-gray-300 text-sm">{{ message }}</p>
            </div>
            
            <!-- Progress Bar -->
            <div v-if="showProgress" class="w-full h-1.5 bg-gray-700 rounded-full mt-6 overflow-hidden">
              <div class="h-full rounded-full animate-progress" :class="progressBarClass"></div>
            </div>
            
            <!-- Floating Elements -->
            <div v-if="showParticles" class="absolute inset-0 pointer-events-none">
              <div v-for="i in particleCount" :key="`particle-${i}`" 
                class="absolute rounded-full floating-particle"
                :class="particleClass"
                :style="{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.max(2, Math.random() * 4)}px`,
                  height: `${Math.max(2, Math.random() * 4)}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  // Define props with TypeScript interface
  interface Props {
    show: boolean;
    title?: string;
    message?: string;
    centerIcon?: any; // Icon component
    orbitIcons?: any[]; // Array of icon components
    showOrbit?: boolean;
    showProgress?: boolean;
    showParticles?: boolean;
    particleCount?: number;
    backdropBlur?: boolean;
    backgroundClass?: string;
    centerIconBgClass?: string;
    centerIconClass?: string;
    centerIconSize?: string;
    progressBarClass?: string;
    particleClass?: string;
  }
  
  // Define props with defaults
  const props = withDefaults(defineProps<Props>(), {
    show: false,
    title: '',
    message: '',
    centerIcon: undefined,
    orbitIcons: () => [],
    showOrbit: true,
    showProgress: true,
    showParticles: true,
    particleCount: 10,
    backdropBlur: true,
    backgroundClass: 'bg-black/80',
    centerIconBgClass: 'bg-gradient-to-r from-primary to-primary-dark',
    centerIconClass: 'w-12 h-12',
    centerIconSize: 'w-24 h-24',
    progressBarClass: 'bg-gradient-to-r from-primary via-primary-light to-primary',
    particleClass: 'bg-white/30'
  });
  </script>
  
  <style scoped>
  .animate-bounce-slow {
    animation: bounceSlow 2s infinite;
  }
  
  /* Loader animation */
  .loader-enter-active,
  .loader-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .loader-enter-from,
  .loader-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
  
  /* Food orbit animation */
  .food-orbit {
    @apply relative w-40 h-40 mb-4;
    animation: rotate 10s linear infinite;
  }
  
  .food-item {
    @apply absolute w-10 h-10 flex items-center justify-center;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    transform: rotate(var(--rotation)) translateX(60px) rotate(calc(var(--rotation) * -1));
    animation: foodPulse 2s ease-in-out infinite;
    animation-delay: var(--delay);
  }
  
  /* Pulsing shadow for center logo */
  .pulse-shadow {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
  }
  
  /* Loading text animation */
  .loading-text span {
    display: inline-block;
    animation: wave 1.5s infinite;
    animation-delay: calc(0.1s * var(--i));
  }
  
  /* Floating particles */
  .floating-particle {
    animation: float-particle 3s ease-in-out infinite;
  }
  
  /* Progress bar animation */
  .animate-progress {
    animation: progress 2s ease-in-out infinite;
    width: 100%;
  }
  
  /* Keyframes */
  @keyframes bounceSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes foodPulse {
    0%, 100% { transform: rotate(var(--rotation)) translateX(60px) rotate(calc(var(--rotation) * -1)) scale(1); }
    50% { transform: rotate(var(--rotation)) translateX(60px) rotate(calc(var(--rotation) * -1)) scale(1.2); }
  }
  
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
    70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
  }
  
  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes float-particle {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
    50% { transform: translateY(-20px) scale(1.5); opacity: 0.7; }
  }
  
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  </style>