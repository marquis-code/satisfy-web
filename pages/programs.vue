<template>
  <main class="programs-page">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-10 bg-gradient-to-br from-olg-blue-dark via-olg-blue to-olg-blue-dark">
      <div class="absolute inset-0 overflow-hidden opacity-10">
        <!-- Animated particles -->
        <div v-for="i in 50" :key="i" class="particle"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            animationDuration: `${Math.random() * 20 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.3
          }">
        </div>
      </div>
    </div>

    <NavbarSection class="bg-transparent absolute top-0 left-0 right-0 z-50" />

    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">
      <div class="container mx-auto px-6 py-24 lg:py-32 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left" v-motion-fade-visible>
            <div class="mb-6 inline-block">
              <span class="text-sm font-medium px-4 py-1.5 rounded-full bg-olg-green/20 text-olg-green backdrop-blur-sm">
                Discover Our Programs
              </span>
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Elevate Your <span class="text-gradient">Research</span> Journey
            </h1>
            <p class="text-xl text-olg-cream/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Join our specialized programs designed to foster innovation, expertise, and meaningful impact in research and consulting.
            </p>
            <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button class="btn-primary group">
                <span>Explore Programs</span>
                <ArrowDown class="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </button>
              <button class="btn-outline">
                <Play class="w-4 h-4 mr-2" />
                <span>Watch Overview</span>
              </button>
            </div>
          </div>
          
          <div class="relative hidden lg:block" v-motion-slide-visible-right>
            <div class="relative z-10 programs-hero-image">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Research Team Collaboration" 
                class="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              <!-- Floating elements -->
              <div class="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-xl animate-float">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-olg-blue flex items-center justify-center">
                    <Users class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Active Programs</div>
                    <div class="text-2xl font-bold text-olg-blue">{{ programs.length }}</div>
                  </div>
                </div>
              </div>
              
              <div class="absolute -bottom-8 -left-8 bg-gradient-to-br from-olg-blue to-olg-blue-light p-4 rounded-xl shadow-xl animate-float-slow">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <TrendingUp class="w-6 h-6 text-white" />
                  </div>
                  <div class="text-white">
                    <div class="text-sm font-medium">Success Rate</div>
                    <div class="text-2xl font-bold">94%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Background decorative elements -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
              <div class="absolute inset-0 bg-gradient-to-r from-olg-blue to-olg-blue-light rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronsDown class="w-8 h-8 text-olg-cream/50" />
      </div>
    </section>

    <!-- Programs Overview -->
    <section class="py-24 relative" id="programs">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16" v-motion-fade-visible>
          <span class="text-sm font-medium px-4 py-1.5 rounded-full bg-olg-green/20 text-olg-green backdrop-blur-sm">
            Our Offerings
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Transformative Programs</h2>
          <p class="text-xl text-olg-cream/70">
            Discover opportunities tailored to different career stages and research interests, designed to accelerate your professional growth.
          </p>
        </div>
        
        <!-- Program Cards -->
        <div class="space-y-32">
          <div v-for="(program, index) in programs" :key="program.id" 
               class="program-card" 
               :class="{'program-card-reverse': index % 2 !== 0}"
               v-motion-slide-visible>
            <div class="program-card-content">
              <div class="program-card-badge">
                <span>{{ program.subtitle }}</span>
              </div>
              <h3 class="program-card-title">{{ program.title }}</h3>
              <p class="program-card-description">{{ program.description }}</p>
              
              <!-- Program Structure -->
              <div class="program-structure">
                <div v-for="(item, i) in program.structure" :key="i" class="program-structure-item">
                  <div class="program-structure-title">{{ item.title }}</div>
                  <div class="program-structure-value">{{ item.value }}</div>
                </div>
              </div>
              
              <!-- Key Responsibilities -->
              <div class="mt-8">
                <h4 class="text-lg font-semibold text-white mb-4">Key Responsibilities</h4>
                <ul class="space-y-3">
                  <li v-for="(item, i) in program.responsibilities" :key="i" class="flex items-start">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-olg-green/20 flex items-center justify-center mt-0.5">
                      <Check class="w-3.5 h-3.5 text-olg-green" />
                    </div>
                    <span class="ml-3 text-olg-cream/80">{{ item }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="mt-8 flex flex-wrap gap-4">
                <a :href="`https://forms.gle/43tP3Cx2jDD9wAhYA`" target="_blank" class="btn-primary group">
                  <span>Apply Now</span>
                  <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <button class="btn-outline" @click="openProgramDetails(program)">
                  <span>Learn More</span>
                  <Plus class="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            
            <div class="program-card-media">
              <div class="program-card-image-wrapper">
                <img :src="program.coverImage" :alt="program.title" class="program-card-image" />
                
                <!-- Benefits floating cards -->
                <div v-for="(benefit, i) in program.benefits.slice(0, 2)" :key="i"
                     class="benefit-card"
                     :class="i === 0 ? 'top-4 -right-4' : '-bottom-4 -left-4'">
                  <div class="benefit-card-icon">
                    <component :is="getBenefitIconComponent(benefit.icon)" class="w-5 h-5 text-olg-blue" />
                  </div>
                  <div>
                    <div class="benefit-card-title">{{ benefit.title }}</div>
                    <div class="benefit-card-description">{{ benefit.description.substring(0, 60) }}...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon Section -->
    <section class="py-24 px-6 relative">
      <div class="container mx-auto">
        <div class="coming-soon-card" v-motion-fade-visible>
          <div class="coming-soon-pattern"></div>
          
          <div class="relative z-10">
            <span class="coming-soon-badge">Coming Soon</span>
            <h3 class="coming-soon-title">More Programs on the Horizon</h3>
            <p class="coming-soon-description">
              We're developing additional programs to expand our offerings and create more opportunities for talented individuals. Sign up to be notified when new programs are announced.
            </p>
            
            <!-- Email Subscription Form -->
            <form @submit.prevent="subscribeToUpdates" class="mt-10 max-w-md mx-auto">
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-grow">
                  <input 
                    type="email" 
                    v-model="subscriptionEmail" 
                    placeholder="Enter your email" 
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-olg-blue focus:border-olg-blue"
                  />
                </div>
                <button type="submit" class="btn-primary whitespace-nowrap">
                  Get Notified
                  <Bell class="w-5 h-5 ml-2" />
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2 text-center sm:text-left">
                We'll never share your email with anyone else.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-24 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16" v-motion-fade-visible>
          <span class="text-sm font-medium px-4 py-1.5 rounded-full bg-olg-green/20 text-olg-green backdrop-blur-sm">
            Why Join Us
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Program Benefits</h2>
          <p class="text-xl text-olg-cream/70">
            Our programs are designed to provide comprehensive support and opportunities for growth in your research journey.
          </p>
        </div>
        
        <!-- Benefits Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div v-for="(benefit, index) in allBenefits" :key="index" 
               class="benefit-grid-card"
               v-motion-slide-visible-bottom
               :style="{ animationDelay: `${index * 100}ms` }">
            <div class="benefit-grid-icon">
              <component :is="getBenefitIconComponent(benefit.icon)" class="w-6 h-6 text-olg-green" />
            </div>
            <h3 class="benefit-grid-title">{{ benefit.title }}</h3>
            <p class="benefit-grid-description">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-olg-blue to-olg-blue-light opacity-90"></div>
      
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div v-for="i in 20" :key="i" 
             class="absolute rounded-full bg-white/10"
             :style="{
               width: `${Math.random() * 300 + 50}px`,
               height: `${Math.random() * 300 + 50}px`,
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               animationDuration: `${Math.random() * 20 + 10}s`,
               animationDelay: `${Math.random() * 5}s`,
             }"
             :class="i % 2 === 0 ? 'animate-float-slow' : 'animate-float'">
        </div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center" v-motion-fade-visible>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Research Career?</h2>
          <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Take the first step towards enhancing your skills and making a meaningful impact through our specialized programs.
          </p>
          <div class="flex flex-wrap gap-6 justify-center">
            <a href="https://forms.gle/43tP3Cx2jDD9wAhYA" target="_blank" class="btn-white group">
              <span>Apply Now</span>
              <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <button class="btn-transparent" @click="scrollToPrograms">
              <span>View Programs</span>
              <ChevronUp class="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Program Details Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showModal = false"></div>
          
          <div class="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button @click="showModal = false" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X class="w-5 h-5 text-gray-700" />
            </button>
            
            <div v-if="activeProgramDetails" class="overflow-y-auto max-h-[90vh]">
              <div class="aspect-video w-full relative">
                <img :src="activeProgramDetails.coverImage" :alt="activeProgramDetails.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <span class="text-sm font-medium px-3 py-1 rounded-full bg-olg-blue/80 text-white w-fit mb-4">
                    {{ activeProgramDetails.subtitle }}
                  </span>
                  <h3 class="text-3xl font-bold text-white">{{ activeProgramDetails.title }}</h3>
                </div>
              </div>
              
              <div class="p-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Program Overview</h4>
                <p class="text-gray-700 mb-8">{{ activeProgramDetails.overview }}</p>
                
                <div class="grid md:grid-cols-3 gap-4 mb-8">
                  <div v-for="(item, i) in activeProgramDetails.structure" :key="i" 
                       class="bg-gray-50 p-4 rounded-xl">
                    <div class="text-sm text-gray-500">{{ item.title }}</div>
                    <div class="text-lg font-semibold text-gray-900">{{ item.value }}</div>
                  </div>
                </div>
                
                <h4 class="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h4>
                <ul class="space-y-3 mb-8">
                  <li v-for="(item, i) in activeProgramDetails.responsibilities" :key="i" class="flex items-start">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-olg-blue/10 flex items-center justify-center mt-0.5">
                      <Check class="w-3.5 h-3.5 text-olg-blue" />
                    </div>
                    <span class="ml-3 text-gray-700">{{ item }}</span>
                  </li>
                </ul>
                
                <h4 class="text-xl font-bold text-gray-900 mb-4">Program Benefits</h4>
                <div class="grid md:grid-cols-2 gap-6">
                  <div v-for="(benefit, i) in activeProgramDetails.benefits" :key="i" 
                       class="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-olg-blue/10 flex items-center justify-center">
                      <component :is="getBenefitIconComponent(benefit.icon)" class="w-6 h-6 text-olg-blue" />
                    </div>
                    <div>
                      <h5 class="font-semibold text-gray-900">{{ benefit.title }}</h5>
                      <p class="text-gray-600 text-sm mt-1">{{ benefit.description }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8 flex justify-center">
                  <a href="https://forms.gle/43tP3Cx2jDD9wAhYA" target="_blank" class="btn-primary-dark group">
                    <span>Apply for this Program</span>
                    <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Success Notification -->
    <Transition name="notification">
      <div v-if="showNotification" class="fixed bottom-4 right-4 bg-olg-green text-olg-blue-dark px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
        <CheckCircle class="w-6 h-6" />
        <span>Thank you! You'll be notified about new programs.</span>
        <button @click="showNotification = false" class="ml-2 text-olg-blue-dark/80 hover:text-olg-blue-dark">
          <X class="w-5 h-5" />
        </button>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ArrowDown, 
  ArrowRight, 
  Bell, 
  Briefcase, 
  Check, 
  CheckCircle, 
  ChevronsDown, 
  ChevronUp, 
  Globe, 
  Play, 
  Plus, 
  TrendingUp, 
  Users, 
  X,
  Award,
  BookOpen,
  BarChart,
  Star
} from 'lucide-vue-next'

// Types
interface BenefitItem {
  title: string
  description: string
  icon: string
}

interface ProgramStructure {
  title: string
  value: string
}

interface Program {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  overview: string
  responsibilities: string[]
  structure: ProgramStructure[]
  benefits: BenefitItem[]
}

// Programs data
const programs = ref<Program[]>([
  {
    id: 'emerging-researchers',
    title: 'Emerging Researchers Program',
    subtitle: 'Research & Innovation',
    description: 'Dedicated to nurturing future leaders who have recently graduated from university, this initiative offers hands-on training and experience in research, communication, and consulting. Participants collaborate on innovative projects, gaining practical skills while contributing to industry advancements.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    overview: 'The Emerging Researchers Program is a structured internship where participants work on non-client projects aimed at solving real-world challenges in global health, social innovation, and sustainable development. Interns will conduct innovative research that advances our mission and contributes to thought leadership within our core focus areas.',
    responsibilities: [
      'Be paired with senior consultants for mentorship and guidance.',
      'Conduct in-depth research on emerging trends and best practices.',
      'Produce high-quality reports, publications, or white papers aligned with our mission.',
      'Present research findings internally to refine and enhance our service offerings.'
    ],
    structure: [
      { title: 'Duration', value: '3–6 months' },
      { title: 'Focus Areas', value: 'Health Tech, Harm Reduction, Medicine, Global Health' },
      { title: 'Outcomes', value: 'Research articles, policy briefs, innovative frameworks' }
    ],
    benefits: [
      {
        title: 'Mentorship',
        description: 'Gain insights and guidance from seasoned professionals in research, communication, and project management.',
        icon: 'mentor'
      },
      {
        title: 'Professional Development',
        description: 'Build valuable skills in research methodology, data analysis, and knowledge dissemination.',
        icon: 'growth'
      },
      {
        title: 'Career Growth',
        description: 'Enhance your portfolio with impactful projects and gain a competitive edge in the consulting and research sectors.',
        icon: 'career'
      },
      {
        title: 'Networking',
        description: 'Engage with industry leaders and expand your professional network while gaining exposure to cutting-edge developments in our focus areas.',
        icon: 'network'
      }
    ]
  },
  {
    id: 'research-fellowship',
    title: 'Advanced Research Fellowship',
    subtitle: 'Leadership & Expertise',
    description: 'Designed for experienced researchers and professionals, this fellowship provides a platform to lead groundbreaking research initiatives and mentor emerging talent. Fellows contribute their expertise to complex projects while further developing their leadership capabilities.',
    coverImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    overview: 'The Advanced Research Fellowship is our premier program for established researchers looking to make significant contributions to their field. Fellows lead research teams, develop innovative methodologies, and produce influential publications that shape industry practices and policy decisions.',
    responsibilities: [
      'Lead research teams and provide strategic direction for complex projects.',
      'Develop and implement innovative research methodologies.',
      'Author high-impact publications and present at industry conferences.',
      'Mentor emerging researchers and contribute to organizational knowledge.'
    ],
    structure: [
      { title: 'Duration', value: '12–24 months' },
      { title: 'Focus Areas', value: 'Policy Development, Systems Change, Global Health Innovation' },
      { title: 'Outcomes', value: 'Published research, conference presentations, policy influence' }
    ],
    benefits: [
      {
        title: 'Leadership Development',
        description: 'Enhance your leadership capabilities through directing research teams and strategic initiatives.',
        icon: 'leadership'
      },
      {
        title: 'Publication Support',
        description: 'Receive resources and support for publishing in high-impact journals and presenting at prestigious conferences.',
        icon: 'publication'
      },
      {
        title: 'Industry Influence',
        description: 'Shape industry practices and policy decisions through your research and thought leadership.',
        icon: 'influence'
      },
      {
        title: 'Global Network',
        description: 'Connect with a global network of researchers, policymakers, and industry leaders.',
        icon: 'globe'
      }
    ]
  }
])

// Combine all benefits for the benefits section
const allBenefits = computed(() => {
  const benefits: BenefitItem[] = []
  programs.value.forEach(program => {
    program.benefits.forEach(benefit => {
      if (!benefits.some(b => b.title === benefit.title)) {
        benefits.push(benefit)
      }
    })
  })
  return benefits
})

// Modal state
const showModal = ref(false)
const activeProgramDetails = ref<Program | null>(null)

// Subscription form
const subscriptionEmail = ref('')
const showNotification = ref(false)

// Methods
const getBenefitIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    mentor: Users,
    growth: TrendingUp,
    career: Briefcase,
    network: Globe,
    leadership: Award,
    publication: BookOpen,
    influence: BarChart,
    globe: Globe
  }
  
  return iconMap[iconName] || Star
}

const openProgramDetails = (program: Program) => {
  activeProgramDetails.value = program
  showModal.value = true
}

const subscribeToUpdates = () => {
  // Here you would typically send the email to your backend
  console.log('Subscribing email:', subscriptionEmail.value)
  
  // For demo purposes, just show success notification
  showNotification.value = true
  subscriptionEmail.value = ''
  
  // Hide notification after 5 seconds
  setTimeout(() => {
    showNotification.value = false
  }, 5000)
}

const scrollToPrograms = () => {
  const programsSection = document.getElementById('programs')
  if (programsSection) {
    programsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* OLGnova Brand Colors */
.bg-olg-blue { background-color: #3A6E9F; }
.bg-olg-blue-light { background-color: #4A7EAF; }
.bg-olg-blue-dark { background-color: #2A5E8F; }
.bg-olg-green { background-color: #B5D89B; }
.bg-olg-cream { background-color: #F0E6C9; }

.text-olg-blue { color: #3A6E9F; }
.text-olg-blue-light { color: #4A7EAF; }
.text-olg-blue-dark { color: #2A5E8F; }
.text-olg-green { color: #B5D89B; }
.text-olg-cream { color: #F0E6C9; }

/* Base Styles */
.programs-page {
  color: white;
  min-height: 100vh;
}

/* Text Gradient */
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #B5D89B, #F0E6C9);
}

/* Animated Particles */
.particle {
  position: absolute;
  border-radius: 9999px;
  background-color: #F0E6C9;
  animation: float 20s infinite ease-in-out;
}

/* Button Styles */
.btn-primary {
  display: inline-flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 9999px;
  background-image: linear-gradient(to right, #3A6E9F, #4A7EAF);
  color: white;
  font-weight: 500;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition-property: all;
  transition-duration: 300ms;
}

.btn-primary:hover {
  box-shadow: 0 20px 25px -5px rgba(58, 110, 159, 0.2), 0 10px 10px -5px rgba(58, 110, 159, 0.1);
}

.btn-primary:focus {
  outline: none;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: #3A6E9F;
  --tw-ring-offset-width: 2px;
  --tw-ring-offset-color: #2A5E8F;
}

.btn-primary-dark {
  display: inline-flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 9999px;
  background-image: linear-gradient(to right, #3A6E9F, #4A7EAF);
  color: white;
  font-weight: 500;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition-property: all;
  transition-duration: 300ms;
}

.btn-primary-dark:hover {
  box-shadow: 0 20px 25px -5px rgba(58, 110, 159, 0.2), 0 10px 10px -5px rgba(58, 110, 159, 0.1);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  color: white;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition-property: all;
  transition-duration: 300ms;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.btn-outline:focus {
  outline: none;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: rgba(255, 255, 255, 0.3);
}

.btn-white {
  display: inline-flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 9999px;
  background-color: white;
  color: #3A6E9F;
  font-weight: 500;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition-property: all;
  transition-duration: 300ms;
}

.btn-white:hover {
  box-shadow: 0 20px 25px -5px rgba(255, 255, 255, 0.2), 0 10px 10px -5px rgba(255, 255, 255, 0.1);
}

.btn-white:focus {
  outline: none;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: white;
  --tw-ring-offset-width: 2px;
  --tw-ring-offset-color: #3A6E9F;
}

.btn-transparent {
  display: inline-flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 9999px;
  background-color: transparent;
  color: white;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition-property: all;
  transition-duration: 300ms;
}

.btn-transparent:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-transparent:focus {
  outline: none;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: rgba(255, 255, 255, 0.3);
}

/* Program Card Styles */
.program-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .program-card {
    grid-template-columns: 1fr 1fr;
  }
}

/* .program-card-reverse {
  grid-flow-row;
} */

@media (min-width: 1024px) {
  /* .program-card-reverse {
    grid-flow-col;
    grid-template-columns: 1fr 1fr;
  }
   */
  .program-card-reverse .program-card-content {
    order: 2;
  }
  
  .program-card-reverse .program-card-media {
    order: 1;
  }
}

.program-card-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.program-card-badge {
  display: inline-block;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  border-radius: 9999px;
  background-color: rgba(181, 216, 155, 0.2);
  color: #B5D89B;
  backdrop-filter: blur(4px);
  font-size: 0.875rem;
  font-weight: 500;
}

.program-card-title {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: white;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .program-card-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}

.program-card-description {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: rgba(240, 230, 201, 0.7);
  margin-top: 1rem;
}

.program-card-media {
  position: relative;
}

.program-card-image-wrapper {
  position: relative;
}

.program-card-image {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Program Structure */
.program-structure {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .program-structure {
    grid-template-columns: repeat(3, 1fr);
  }
}

.program-structure-item {
  background-color: rgba(74, 126, 175, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 1rem;
}

.program-structure-title {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(181, 216, 155, 0.8);
}

.program-structure-value {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: white;
  margin-top: 0.25rem;
}

/* Benefit Cards */
.benefit-card {
  position: absolute;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 20rem;
  animation: float 6s ease-in-out infinite;
}

.benefit-card-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: rgba(58, 110, 159, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.benefit-card-title {
  font-weight: 600;
  color: #1f2937;
}

.benefit-card-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b5563;
  margin-top: 0.25rem;
}

/* Benefits Grid */
.benefit-grid-card {
  background-color: rgba(74, 126, 175, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition-property: background-color;
  transition-duration: 300ms;
}

.benefit-grid-card:hover {
  background-color: rgba(74, 126, 175, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.benefit-grid-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: rgba(181, 216, 155, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.benefit-grid-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.benefit-grid-description {
  color: rgba(240, 230, 201, 0.7);
}

/* Coming Soon Card */
.coming-soon-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.coming-soon-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.coming-soon-badge {
  display: inline-block;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 9999px;
  background-color: rgba(58, 110, 159, 0.1);
  color: #3A6E9F;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.coming-soon-title {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.coming-soon-description {
  color: #4b5563;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
}

/* Hero Image Animation */
.programs-hero-image {
  transition-property: all;
  transition-duration: 700ms;
}

.programs-hero-image:hover {
  transform: scale(1.05);
}

/* Animation Classes */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Notification Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>