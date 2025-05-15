<template>
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="isVisible" class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center" @click="closeOnBackdrop && close()">
          <!-- Backdrop with animated particles -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm">
            <!-- Animated particles -->
            <div v-for="i in 30" :key="`particle-${i}`" class="particle"></div>
          </div>
          
          <!-- Modal container with animations -->
          <div 
            class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform"
            @click.stop
            :class="[animationClass]"
          >
            <!-- Decorative top wave -->
            <div class="absolute top-0 left-0 right-0 h-2 wave-gradient"></div>
            
            <!-- Success checkmark animation -->
            <div class="pt-10 pb-6 px-6 flex flex-col items-center">
              <div class="success-checkmark mb-4">
                <div class="check-icon">
                  <span class="icon-line line-tip"></span>
                  <span class="icon-line line-long"></span>
                  <div class="icon-circle"></div>
                  <div class="icon-fix"></div>
                </div>
              </div>
              
              <!-- Confetti explosion -->
              <div class="confetti-container">
                <div v-for="i in 20" :key="`confetti-${i}`" class="confetti"></div>
              </div>
              
              <!-- Text content with animations -->
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 animate-title">
                {{ title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-center animate-text">
                {{ message }}
              </p>
              
              <!-- Copied content with highlight animation -->
              <div class="mt-4 w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 relative overflow-hidden">
                <div class="shine-effect"></div>
                <p class="text-gray-800 dark:text-gray-200 text-sm truncate font-mono">{{ copiedContent }}</p>
              </div>
              
              <!-- Animated button -->
              <button 
                @click="close"
                class="mt-6 px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-button"
              >
                <span class="relative z-10 flex items-center">
                  <CheckCircle class="w-4 h-4 mr-2" />
                  {{ buttonText }}
                  <span class="ml-1 button-sparkle">✨</span>
                </span>
              </button>
            </div>
            
            <!-- Decorative elements -->
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 dark:bg-orange-900/20 rounded-full opacity-50"></div>
            <div class="absolute -top-5 -left-5 w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full opacity-30"></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
  import { CheckCircle } from 'lucide-vue-next'
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Copied Successfully!'
    },
    message: {
      type: String,
      default: 'The URL has been copied to your clipboard'
    },
    copiedContent: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Awesome!'
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseTime: {
      type: Number,
      default: 4000
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: 'bounce' // bounce, zoom, slide
    }
  })
  
  const emit = defineEmits(['close'])
  
  // Animation class based on prop
  const animationClass = computed(() => {
    switch (props.animation) {
      case 'zoom':
        return 'animate-zoom-in'
      case 'slide':
        return 'animate-slide-up'
      case 'bounce':
      default:
        return 'animate-bounce-in'
    }
  })
  
  // Auto close timer
  let autoCloseTimer: number | null = null
  
  const close = () => {
    emit('close')
  }
  
  // Set up auto close timer when modal becomes visible
  watch(() => props.isVisible, (newVal) => {
    if (newVal && props.autoClose) {
      if (autoCloseTimer) clearTimeout(autoCloseTimer)
      autoCloseTimer = window.setTimeout(() => {
        close()
      }, props.autoCloseTime)
    }
  })
  
  // Clean up timer on component unmount
  onBeforeUnmount(() => {
    if (autoCloseTimer) clearTimeout(autoCloseTimer)
  })
  
  // Keyboard event handler for Escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isVisible) {
      close()
    }
  }
  
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
  </script>
  
  <style scoped>
  /* Modal transitions */
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  /* Animation classes */
  .animate-bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .animate-zoom-in {
    animation: zoomIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .animate-slide-up {
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Text animations */
  .animate-title {
    animation: fadeInDown 0.5s ease 0.3s both;
  }
  
  .animate-text {
    animation: fadeInUp 0.5s ease 0.5s both;
  }
  
  .animate-button {
    animation: fadeIn 0.5s ease 0.7s both;
  }
  
  /* Keyframes */
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    40% {
      opacity: 1;
      transform: scale(1.1);
    }
    60% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Success checkmark animation */
  .success-checkmark {
    width: 80px;
    height: 80px;
    position: relative;
  }
  
  .success-checkmark .check-icon {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid #4CAF50;
  }
  
  .success-checkmark .check-icon::before {
    content: "";
    position: absolute;
    top: 3px;
    left: -2px;
    width: 30px;
    height: 15px;
    border-radius: 10px;
    background: #FFFFFF;
    z-index: 1;
    transform: rotate(-45deg);
    transform-origin: 0% 100%;
    animation: checkmarkCircle 0.3s ease 0.2s forwards;
  }
  
  .success-checkmark .check-icon .icon-line {
    height: 5px;
    background-color: #4CAF50;
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 10;
  }
  
  .success-checkmark .check-icon .icon-line.line-tip {
    top: 46px;
    left: 14px;
    width: 25px;
    transform: rotate(45deg);
    animation: checkmarkLineTip 0.5s;
  }
  
  .success-checkmark .check-icon .icon-line.line-long {
    top: 38px;
    right: 8px;
    width: 47px;
    transform: rotate(-45deg);
    animation: checkmarkLineLong 0.5s;
  }
  
  .success-checkmark .check-icon .icon-circle {
    top: -4px;
    left: -4px;
    z-index: 10;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    box-sizing: content-box;
    border: 4px solid rgba(76, 175, 80, 0.5);
  }
  
  .success-checkmark .check-icon .icon-fix {
    top: 8px;
    width: 5px;
    left: 26px;
    z-index: 1;
    height: 85px;
    position: absolute;
    transform: rotate(-45deg);
    background-color: #FFFFFF;
  }
  
  @keyframes checkmarkLineTip {
    0% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 46px;
    }
  }
  
  @keyframes checkmarkLineLong {
    0% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0px;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }
  
  @keyframes checkmarkCircle {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Confetti animation */
  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #f97316;
    opacity: 0;
    animation: confetti-fall 4s ease-out forwards;
  }
  
  .confetti:nth-child(even) {
    background-color: #fb923c;
  }
  
  .confetti:nth-child(3n) {
    background-color: #fdba74;
  }
  
  .confetti:nth-child(4n) {
    background-color: #4ade80;
  }
  
  .confetti:nth-child(5n) {
    background-color: #60a5fa;
  }
  
  @keyframes confetti-fall {
    0% {
      opacity: 1;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      opacity: 0;
      top: 100%;
      left: calc(50% + var(--x, 0px));
      transform: translate(-50%, 0) rotate(var(--r, 0deg));
    }
  }
  
  /* Position confetti randomly */
  .confetti:nth-child(1) { --x: -100px; --r: 360deg; animation-delay: 0.1s; }
  .confetti:nth-child(2) { --x: 80px; --r: -180deg; animation-delay: 0.2s; }
  .confetti:nth-child(3) { --x: -60px; --r: 270deg; animation-delay: 0.3s; }
  .confetti:nth-child(4) { --x: 120px; --r: -90deg; animation-delay: 0.4s; }
  .confetti:nth-child(5) { --x: -80px; --r: 180deg; animation-delay: 0.5s; }
  .confetti:nth-child(6) { --x: 100px; --r: -270deg; animation-delay: 0.6s; }
  .confetti:nth-child(7) { --x: -120px; --r: 90deg; animation-delay: 0.7s; }
  .confetti:nth-child(8) { --x: 70px; --r: -360deg; animation-delay: 0.8s; }
  .confetti:nth-child(9) { --x: -90px; --r: 180deg; animation-delay: 0.9s; }
  .confetti:nth-child(10) { --x: 110px; --r: -180deg; animation-delay: 1.0s; }
  .confetti:nth-child(11) { --x: -70px; --r: 270deg; animation-delay: 0.2s; }
  .confetti:nth-child(12) { --x: 90px; --r: -270deg; animation-delay: 0.3s; }
  .confetti:nth-child(13) { --x: -110px; --r: 360deg; animation-delay: 0.4s; }
  .confetti:nth-child(14) { --x: 60px; --r: -90deg; animation-delay: 0.5s; }
  .confetti:nth-child(15) { --x: -130px; --r: 180deg; animation-delay: 0.6s; }
  .confetti:nth-child(16) { --x: 50px; --r: -180deg; animation-delay: 0.7s; }
  .confetti:nth-child(17) { --x: -50px; --r: 270deg; animation-delay: 0.8s; }
  .confetti:nth-child(18) { --x: 130px; --r: -270deg; animation-delay: 0.9s; }
  .confetti:nth-child(19) { --x: -40px; --r: 90deg; animation-delay: 1.0s; }
  .confetti:nth-child(20) { --x: 40px; --r: -90deg; animation-delay: 0.1s; }
  
  /* Particles animation */
  .particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    animation: particleFloat 4s ease-in infinite;
  }
  
  @keyframes particleFloat {
    0% {
      opacity: 0;
      transform: translate(0, 0);
    }
    10% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
      transform: translate(var(--x, 100px), var(--y, -100px));
    }
  }
  
  /* Position particles randomly */
  .particle:nth-child(1) { --x: 100px; --y: -150px; left: 10%; top: 50%; animation-delay: 0.2s; }
  .particle:nth-child(2) { --x: -120px; --y: -100px; left: 20%; top: 40%; animation-delay: 0.5s; }
  .particle:nth-child(3) { --x: 80px; --y: -80px; left: 30%; top: 60%; animation-delay: 0.1s; }
  .particle:nth-child(4) { --x: -90px; --y: -120px; left: 40%; top: 30%; animation-delay: 0.7s; }
  .particle:nth-child(5) { --x: 110px; --y: -90px; left: 50%; top: 70%; animation-delay: 0.3s; }
  .particle:nth-child(6) { --x: -100px; --y: -110px; left: 60%; top: 20%; animation-delay: 0.6s; }
  .particle:nth-child(7) { --x: 90px; --y: -130px; left: 70%; top: 80%; animation-delay: 0.4s; }
  .particle:nth-child(8) { --x: -110px; --y: -90px; left: 80%; top: 10%; animation-delay: 0.8s; }
  .particle:nth-child(9) { --x: 120px; --y: -100px; left: 90%; top: 90%; animation-delay: 0.2s; }
  .particle:nth-child(10) { --x: -80px; --y: -140px; left: 15%; top: 45%; animation-delay: 0.5s; }
  .particle:nth-child(11) { --x: 100px; --y: -150px; left: 25%; top: 55%; animation-delay: 0.3s; }
  .particle:nth-child(12) { --x: -120px; --y: -100px; left: 35%; top: 65%; animation-delay: 0.7s; }
  .particle:nth-child(13) { --x: 80px; --y: -80px; left: 45%; top: 75%; animation-delay: 0.1s; }
  .particle:nth-child(14) { --x: -90px; --y: -120px; left: 55%; top: 85%; animation-delay: 0.4s; }
  .particle:nth-child(15) { --x: 110px; --y: -90px; left: 65%; top: 25%; animation-delay: 0.6s; }
  .particle:nth-child(16) { --x: -100px; --y: -110px; left: 75%; top: 35%; animation-delay: 0.2s; }
  .particle:nth-child(17) { --x: 90px; --y: -130px; left: 85%; top: 45%; animation-delay: 0.5s; }
  .particle:nth-child(18) { --x: -110px; --y: -90px; left: 95%; top: 55%; animation-delay: 0.3s; }
  .particle:nth-child(19) { --x: 120px; --y: -100px; left: 5%; top: 65%; animation-delay: 0.7s; }
  .particle:nth-child(20) { --x: -80px; --y: -140px; left: 15%; top: 75%; animation-delay: 0.1s; }
  .particle:nth-child(21) { --x: 100px; --y: -150px; left: 25%; top: 85%; animation-delay: 0.4s; }
  .particle:nth-child(22) { --x: -120px; --y: -100px; left: 35%; top: 15%; animation-delay: 0.6s; }
  .particle:nth-child(23) { --x: 80px; --y: -80px; left: 45%; top: 25%; animation-delay: 0.2s; }
  .particle:nth-child(24) { --x: -90px; --y: -120px; left: 55%; top: 35%; animation-delay: 0.5s; }
  .particle:nth-child(25) { --x: 110px; --y: -90px; left: 65%; top: 45%; animation-delay: 0.3s; }
  .particle:nth-child(26) { --x: -100px; --y: -110px; left: 75%; top: 55%; animation-delay: 0.7s; }
  .particle:nth-child(27) { --x: 90px; --y: -130px; left: 85%; top: 65%; animation-delay: 0.1s; }
  .particle:nth-child(28) { --x: -110px; --y: -90px; left: 95%; top: 75%; animation-delay: 0.4s; }
  .particle:nth-child(29) { --x: 120px; --y: -100px; left: 5%; top: 85%; animation-delay: 0.6s; }
  .particle:nth-child(30) { --x: -80px; --y: -140px; left: 15%; top: 95%; animation-delay: 0.2s; }
  
  /* Wave gradient animation */
  .wave-gradient {
    background: linear-gradient(90deg, #f97316, #fb923c, #fdba74, #f97316);
    background-size: 300% 100%;
    animation: gradientWave 3s linear infinite;
  }
  
  @keyframes gradientWave {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 300% 0%;
    }
  }
  
  /* Shine effect for copied content */
  .shine-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shine 2s infinite;
  }
  
  @keyframes shine {
    0% {
      left: -100%;
    }
    20% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
  
  /* Button sparkle animation */
  .button-sparkle {
    display: inline-block;
    animation: sparkle 1.5s infinite;
  }
  
  @keyframes sparkle {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
  </style>