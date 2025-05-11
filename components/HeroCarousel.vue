<template>
  <div class="hero-section">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="wave-container">
        <div v-for="i in 3" :key="`wave-${i}`" class="wave" :class="`wave-${i}`"></div>
      </div>
      
      <!-- Floating elements -->
      <div v-for="i in 20" :key="`particle-${i}`" class="floating-particle"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.2
        }">
      </div>
      
      <!-- Animated grid pattern -->
      <div class="grid-pattern"></div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Logo Animation -->
      <div class="logo-animation">
        <div class="logo-circle">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="45" class="logo-circle-path" />
            <path d="M30 50 L50 70 L70 50" class="logo-arrow-path" />
          </svg>
        </div>
        <div class="logo-text">
          <span class="olg">OLG</span><span class="nova">nova</span>
        </div>
      </div>

      <!-- Announcement Banner -->
      <div class="announcement-banner">
        <div class="glow-effect"></div>
        <span>Announcing our annual pro-bono initiative</span>
        <NuxtLink to="/pro-bono" class="banner-link">
          Learn more
          <span class="arrow-icon">→</span>
        </NuxtLink>
      </div>

      <!-- Main Heading with 3D Effect -->
      <h1 class="main-heading">
        <div class="heading-line">Transforming</div>
        <div class="heading-line"><span class="highlight-text">Research</span></div>
        <div class="heading-line">Into <span class="highlight-text">Impact</span></div>
      </h1>

      <!-- Dynamic Typing Text -->
      <div class="typing-container">
        <span class="typing-text">{{ displayText }}</span>
        <span class="typing-cursor" :class="{ 'blink': isCursorBlinking }">|</span>
      </div>

      <!-- Description with Animated Border -->
      <div class="description-container">
        <div class="description-border"></div>
        <p>
          We specialize in driving positive change through expert research, strategic
          communication, and tailored solutions. We empower organizations to reach their full
          potential and create lasting, sustainable impact.
        </p>
      </div>

      <!-- Interactive Image Carousel -->
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
          <div v-for="(image, index) in carouselImages" :key="`carousel-${index}`" class="carousel-slide">
            <div class="image-container" :class="{ 'active': currentImageIndex === index }">
              <img :src="image" :alt="`Carousel image ${index + 1}`" />
              <div class="image-overlay"></div>
            </div>
          </div>
        </div>
        
        <!-- Custom Navigation -->
        <div class="carousel-nav">
          <button 
            v-for="(_, index) in carouselImages" 
            :key="`nav-${index}`"
            @click="setActiveImage(index)"
            class="nav-dot"
            :class="{ 'active': currentImageIndex === index }"
            :aria-label="`View image ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="cta-container">
        <a href="#our-services" class="cta-button primary" @mouseenter="playButtonHover">
          <span>Explore Our Services</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#contact-us" class="cta-button secondary" @mouseenter="playButtonHover">
          <span>Contact Us</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="mouse-wheel"></div>
        </div>
        <div class="scroll-text">Scroll to explore</div>
      </div>
    </div>

    <!-- Animated Shapes -->
    <div class="animated-shapes">
      <div class="shape circle" style="top: 15%; left: 5%;"></div>
      <div class="shape triangle" style="top: 70%; left: 10%;"></div>
      <div class="shape square" style="top: 30%; right: 8%;"></div>
      <div class="shape hexagon" style="bottom: 20%; right: 15%;"></div>
    </div>

    <!-- 3D Rotating Elements -->
    <div class="rotating-elements">
      <div class="rotating-cube">
        <div class="cube-face front"></div>
        <div class="cube-face back"></div>
        <div class="cube-face right"></div>
        <div class="cube-face left"></div>
        <div class="cube-face top"></div>
        <div class="cube-face bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import image1 from "@/assets/img/founder2.jpg"
  import image2 from "@/assets/img/founder4.jpg"
  import image3 from "@/assets/img/founder5.jpg"
  import image4 from "@/assets/img/founder6.png"
  import image5 from "@/assets/img/founder10.png"
    import image6 from "@/assets/img/others7.jpg"
      import image7 from "@/assets/img/others1.jpg"
        import image8 from "@/assets/img/others2.jpg"
          import image9 from "@/assets/img/others3.png"
            import image10 from "@/assets/img/others4.jpg"
              import image11 from "@/assets/img/others5.jpg"
                import image12 from "@/assets/img/others6.jpg"

// Define carousel images
const carouselImages = [
  image1, image2, image3, image4,image5, image6, image7, image8, image9, image10,
  // image11, image12
]

// Carousel state
const currentImageIndex = ref(0)
let carouselInterval: NodeJS.Timeout | null = null

// Typing animation state
const phrases = [
  'Driving positive change',
  'Empowering organizations',
  'Creating sustainable impact',
  'Delivering strategic insights',
  'Fostering global success'
]
const currentPhraseIndex = ref(0)
const displayText = ref('')
const isCursorBlinking = ref(true)
let typingInterval: NodeJS.Timeout | null = null

// Set active image
const setActiveImage = (index: number) => {
  currentImageIndex.value = index
  resetCarouselInterval()
}

// Reset carousel interval
const resetCarouselInterval = () => {
  if (carouselInterval) clearInterval(carouselInterval)
  carouselInterval = setInterval(advanceCarousel, 5000)
}

// Advance carousel
const advanceCarousel = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % carouselImages.length
}

// Button hover sound effect
const playButtonHover = () => {
  // In a real implementation, you would uncomment this
  // const hoverSound = new Audio('/sounds/hover.mp3')
  // hoverSound.volume = 0.2
  // hoverSound.play()
}

// Handle typing animation
const typeText = () => {
  const currentPhrase = phrases[currentPhraseIndex.value]
  const currentTextLength = displayText.value.length
  
  if (currentTextLength < currentPhrase.length) {
    // Still typing current phrase
    displayText.value = currentPhrase.substring(0, currentTextLength + 1)
    isCursorBlinking.value = false
  } else {
    // Finished typing current phrase
    isCursorBlinking.value = true
    
    // Wait before erasing
    setTimeout(() => {
      eraseText()
    }, 2000)
  }
}

// Handle erasing animation
const eraseText = () => {
  const currentTextLength = displayText.value.length
  
  if (currentTextLength > 0) {
    // Still erasing
    displayText.value = displayText.value.substring(0, currentTextLength - 1)
    isCursorBlinking.value = false
  } else {
    // Finished erasing, move to next phrase
    isCursorBlinking.value = true
    currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length
    
    // Wait before typing next phrase
    setTimeout(() => {
      startTypingAnimation()
    }, 500)
  }
}

// Start typing animation
const startTypingAnimation = () => {
  if (typingInterval) clearInterval(typingInterval)
  
  typingInterval = setInterval(() => {
    typeText()
  }, 100)
}

// Initialize parallax effect
const initParallax = () => {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight
    
    // Apply parallax to shapes
    const shapes = document.querySelectorAll('.shape')
    shapes.forEach((shape) => {
      const speed = 20
      const x = (mouseX - 0.5) * speed
      const y = (mouseY - 0.5) * speed
      
      const el = shape as HTMLElement
      el.style.transform = `translate(${x}px, ${y}px)`
    })
    
    // Apply parallax to heading
    const heading = document.querySelector('.main-heading') as HTMLElement
    if (heading) {
      const headingSpeed = 10
      const headingX = (mouseX - 0.5) * headingSpeed
      const headingY = (mouseY - 0.5) * headingSpeed
      
      heading.style.transform = `translate(${headingX}px, ${headingY}px)`
    }
  })
}

// Lifecycle hooks
onMounted(() => {
  // Start typing animation
  startTypingAnimation()
  
  // Start carousel autoplay
  resetCarouselInterval()
  
  // Initialize parallax effect
  initParallax()
  
  // Animate heading on load
  const headingLines = document.querySelectorAll('.heading-line')
  headingLines.forEach((line, index) => {
    setTimeout(() => {
      (line as HTMLElement).style.opacity = '1'
      ;(line as HTMLElement).style.transform = 'translateY(0)'
    }, 300 * index)
  })
})

onUnmounted(() => {
  // Clean up intervals
  if (typingInterval) clearInterval(typingInterval)
  if (carouselInterval) clearInterval(carouselInterval)
})
</script>

<style scoped>
/* Brand Colors */
:root {
  --olg-blue: #3A6E9F;
  --olg-blue-light: #4A7EAF;
  --olg-blue-dark: #2A5E8F;
  --olg-green: #B5D89B;
  --olg-cream: #F0E6C9;
}

/* Base Styles */
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #3A6E9F;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat-x;
  background-position: 0 bottom;
  transform-origin: center bottom;
}

.wave-1 {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' fill='%234A7EAF' opacity='.3'/%3E%3C/svg%3E");
  background-size: 1200px 100px;
  height: 100px;
  animation: wave-animation 12s linear infinite;
}

.wave-2 {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' fill='%232A5E8F' opacity='.2'/%3E%3C/svg%3E");
  background-size: 1200px 120px;
  height: 120px;
  animation: wave-animation 18s linear infinite reverse;
}

.wave-3 {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' fill='%23B5D89B' opacity='.1'/%3E%3C/svg%3E");
  background-size: 1200px 140px;
  height: 140px;
  animation: wave-animation 24s linear infinite;
}

@keyframes wave-animation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.floating-particle {
  position: absolute;
  background-color: var(--olg-cream);
  border-radius: 50%;
  animation: float-animation 20s ease-in-out infinite;
}

@keyframes float-animation {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(40px, -30px);
  }
  50% {
    transform: translate(80px, 0);
  }
  75% {
    transform: translate(40px, 30px);
  }
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

/* Logo Animation */
.logo-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-circle {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.logo-circle-path {
  fill: none;
  stroke: var(--olg-blue-light);
  stroke-width: 5;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: draw-circle 2s ease forwards;
}

.logo-arrow-path {
  fill: none;
  stroke: var(--olg-green);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-arrow 2s ease forwards 0.5s;
}

@keyframes draw-circle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-arrow {
  to {
    stroke-dashoffset: 0;
  }
}

.logo-text {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.olg {
  color: white;
}

.nova {
  color: var(--olg-green);
}

/* Announcement Banner */
.announcement-banner {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  margin-bottom: 3rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.875rem;
  color: var(--olg-cream);
  transition: all 0.3s ease;
}

.announcement-banner:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.glow-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(181, 216, 155, 0.3) 0%, rgba(181, 216, 155, 0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.announcement-banner:hover .glow-effect {
  opacity: 1;
}

.banner-link {
  margin-left: 0.5rem;
  font-weight: 600;
  color: white;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.banner-link:hover {
  color: var(--olg-green);
}

.arrow-icon {
  display: inline-block;
  margin-left: 0.25rem;
  transition: transform 0.3s ease;
}

.banner-link:hover .arrow-icon {
  transform: translateX(4px);
}

/* Main Heading */
.main-heading {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  text-align: center;
  margin-bottom: 1.5rem;
  perspective: 1000px;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .main-heading {
    font-size: 2.5rem;
  }
}

.heading-line {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.highlight-text {
  position: relative;
  display: inline-block;
  color: var(--olg-green);
  text-shadow: 0 0 10px rgba(181, 216, 155, 0.5);
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--olg-green);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease;
}

.main-heading:hover .highlight-text::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Typing Animation */
.typing-container {
  height: 2rem;
  margin: 1.5rem 0;
  font-size: 1.25rem;
  color: var(--olg-cream);
  text-align: center;
}

.typing-cursor {
  display: inline-block;
  margin-left: 2px;
  font-weight: bold;
}

.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Description Container */
.description-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.6;
  overflow: hidden;
}

.description-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: 1rem;
  overflow: hidden;
}

.description-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: linear-gradient(90deg, transparent, var(--olg-green), transparent);
  animation: border-animation 4s linear infinite;
}

@keyframes border-animation {
  0% {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}

/* Carousel */
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 300px;
  margin: 2rem 0;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease;
}

.image-container.active {
  transform: scale(1.05);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.image-container:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(42, 94, 143, 0.2), rgba(42, 94, 143, 0.6));
}

.carousel-nav {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 20;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.nav-dot.active {
  background-color: white;
  transform: scale(1.2);
}

/* CTA Buttons */
.cta-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  z-index: -1;
}

.cta-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  transform: rotate(30deg);
  z-index: -1;
}

.cta-button:hover::after {
  opacity: 1;
}

.primary {
  background-color: var(--olg-green);
  color: var(--olg-blue-dark);
  box-shadow: 0 4px 14px rgba(181, 216, 155, 0.4);
}

.primary:hover {
  background-color: #c5e2af;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(181, 216, 155, 0.5);
}

.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid var(--olg-cream);
  box-shadow: 0 4px 14px rgba(240, 230, 201, 0.2);
}

.secondary:hover {
  background-color: rgba(240, 230, 201, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240, 230, 201, 0.3);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: fade-in 1s ease-out 2s forwards;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  position: relative;
  margin-bottom: 0.5rem;
}

.mouse-wheel {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 4px;
  height: 8px;
  background-color: white;
  border-radius: 2px;
  transform: translateX(-50%);
  animation: scroll-down 2s infinite;
}

.scroll-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@keyframes scroll-down {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(15px);
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* Animated Shapes */
.animated-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.shape {
  position: absolute;
  transition: transform 0.3s ease-out;
}

.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(181, 216, 155, 0.3);
  animation: pulse 8s infinite alternate;
}

.square {
  width: 60px;
  height: 60px;
  border: 2px solid rgba(240, 230, 201, 0.3);
  transform: rotate(45deg);
  animation: rotate 15s linear infinite;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid rgba(58, 110, 159, 0.2);
  animation: float-up-down 10s ease-in-out infinite;
}

.hexagon {
  width: 60px;
  height: 35px;
  background-color: rgba(74, 126, 175, 0.2);
  position: relative;
  animation: rotate-reverse 20s linear infinite;
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
}

.hexagon:before {
  bottom: 100%;
  border-bottom: 17.5px solid rgba(74, 126, 175, 0.2);
}

.hexagon:after {
  top: 100%;
  border-top: 17.5px solid rgba(74, 126, 175, 0.2);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes float-up-down {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

/* 3D Rotating Elements */
.rotating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  perspective: 1000px;
  z-index: 1;
}

.rotating-cube {
  position: absolute;
  top: 70%;
  right: 10%;
  width: 80px;
  height: 80px;
  transform-style: preserve-3d;
  animation: rotate-cube 20s linear infinite;
}

.cube-face {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: rgba(58, 110, 159, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backface-visibility: visible;
}

.front {
  transform: translateZ(40px);
}

.back {
  transform: rotateY(180deg) translateZ(40px);
}

.right {
  transform: rotateY(90deg) translateZ(40px);
}

.left {
  transform: rotateY(-90deg) translateZ(40px);
}

.top {
  transform: rotateX(90deg) translateZ(40px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(40px);
}

@keyframes rotate-cube {
  0% {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .main-heading {
    font-size: 2.5rem;
  }
  
  .typing-container {
    font-size: 1rem;
  }
  
  .description-container {
    padding: 1.5rem;
    font-size: 1rem;
  }
  
  .carousel-container {
    height: 200px;
  }
  
  .cta-container {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
  }
}

/* For larger screens */
@media (min-width: 1280px) {
  .main-heading {
    font-size: 5rem;
  }
  
  .typing-container {
    font-size: 1.5rem;
  }
  
  .description-container {
    padding: 2.5rem;
  }
  
  .carousel-container {
    height: 400px;
  }
}
</style>