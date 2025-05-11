<template>
  <div class="min-h-screen bg-gray-50">
    <div class="relative overflow-hidden bg-olg-blue py-16 sm:py-24">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-olg-blue to-olg-blue-dark"></div>
        
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-olg-green rounded-full opacity-10 animate-float-slow"></div>
          <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-olg-cream rounded-full opacity-10 animate-float-medium"></div>
          
          <div class="absolute inset-0">
            <div v-for="(icon, index) in jobIcons" :key="index" 
                class="absolute animate-float" 
                :style="{
                  left: `${icon.x}%`, 
                  top: `${icon.y}%`, 
                  animationDelay: `${icon.delay}s`,
                  animationDuration: `${icon.duration}s`
                }">
              <component :is="icon.component" class="text-white h-8 w-8 md:h-12 md:w-12 opacity-10" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center animate-fade-in">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Jobs</h1>
          <p class="mt-6 text-lg leading-8 text-olg-cream animate-slide-up">
            Join our team of passionate professionals
          </p>
        </div>
      </div>
    </div>


    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="mx-auto max-w-3xl">

        <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div class="p-8 md:p-12 text-center">
            <div class="mb-8 mx-auto w-24 h-24 rounded-full bg-olg-blue-50 flex items-center justify-center animate-pulse-slow">
              <briefcase-icon class="h-12 w-12 text-olg-blue" />
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4 animate-slide-up" style="animation-delay: 200ms;">
              No Current Openings
            </h2>
            
            <p class="text-lg text-gray-600 mb-8 animate-slide-up" style="animation-delay: 300ms;">
              Thank you for your interest in joining OLGnova.
            </p>
            
            <div class="max-w-2xl mx-auto prose prose-lg prose-olg animate-slide-up" style="animation-delay: 400ms;">
              <p>
                At the moment, there are no active job vacancies.
              </p>
              <p>
                We're always looking for passionate and talented individuals who share our commitment to creating meaningful impact through research, communication, and innovation. Feel free to check back soon or follow us on our social media channels for future opportunities.
              </p>
            </div>
            

            <div class="mt-12 animate-slide-up" style="animation-delay: 500ms;">
              <h3 class="text-xl font-semibold text-olg-blue mb-6">
                Interested in Future Opportunities?
              </h3>
              
              <div class="bg-olg-blue-50 rounded-lg p-6 max-w-xl mx-auto">
                <p class="text-gray-700 mb-6">
                  If you'd like to be considered for upcoming roles, you can share your CV and a short introduction with us.
                </p>
                
                <form @submit.prevent="submitInterest" class="space-y-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                      <input 
                        type="text" 
                        id="first-name" 
                        v-model="form.firstName"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                      />
                    </div>
                    <div>
                      <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                      <input 
                        type="text" 
                        id="last-name" 
                        v-model="form.lastName"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="form.email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                    />
                  </div>
                  
                  <div>
                    <label for="expertise" class="block text-sm font-medium text-gray-700">Area of expertise</label>
                    <select 
                      id="expertise" 
                      v-model="form.expertise"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                    >
                      <option value="">Select an option</option>
                      <option value="research">Research</option>
                      <option value="communication">Communication</option>
                      <option value="project-management">Project Management</option>
                      <option value="data-analysis">Data Analysis</option>
                      <option value="health-tech">Health Technology</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Brief introduction</label>
                    <textarea 
                      id="message" 
                      v-model="form.message"
                      rows="4" 
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olg-blue focus:ring-olg-blue"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Upload your CV</label>
                    <div 
                      class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      :class="{ 'border-olg-blue bg-olg-blue-50': isDragging }"
                      @dragover.prevent="isDragging = true"
                      @dragleave.prevent="isDragging = false"
                      @drop.prevent="handleFileDrop"
                    >
                      <div class="space-y-1 text-center">
                        <upload-icon class="mx-auto h-12 w-12 text-gray-400" />
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-olg-blue hover:text-olg-blue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-olg-blue">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange" />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                      </div>
                    </div>
                    <div v-if="form.file" class="mt-2 text-sm text-gray-600 flex items-center">
                      <file-icon class="h-4 w-4 mr-1 text-olg-blue" />
                      {{ form.file.name }}
                      <button 
                        @click="form.file = null" 
                        class="ml-2 text-red-600 hover:text-red-800"
                      >
                        <x-icon class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div class="flex items-center">
                    <input 
                      id="privacy-policy" 
                      v-model="form.privacyPolicy"
                      type="checkbox" 
                      class="h-4 w-4 text-olg-blue focus:ring-olg-blue border-gray-300 rounded"
                    />
                    <label for="privacy-policy" class="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="/privacy-policy" class="text-olg-blue hover:underline">privacy policy</a>
                    </label>
                  </div>
                  
                  <div class="text-center">
                    <button 
                      type="submit" 
                      class="inline-flex items-center px-6 py-3 bg-olg-blue text-white font-medium rounded-lg transition-all duration-300 hover:bg-olg-blue-dark shadow hover:shadow-lg transform hover:scale-105"
                      :disabled="isSubmitting"
                    >
                      <mail-icon v-if="!isSubmitting" class="h-5 w-5 mr-2" />
                      <loader-icon v-else class="h-5 w-5 mr-2 animate-spin" />
                      {{ isSubmitting ? 'Submitting...' : 'Submit Interest' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        

        <div class="mt-12 text-center animate-fade-in" style="animation-delay: 600ms;">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Follow us for future opportunities</h3>
          <div class="flex justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/olgnova-a4ab76356" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-olg-blue hover:text-olg-blue-dark transition-colors"
            >
              <span class="sr-only">LinkedIn</span>
              <linkedin-icon class="h-8 w-8" />
            </a>
            <a 
              href="https://x.com/olgnova62124?t=03MslucZ60QcfH3Dma8hMg&s=09" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-olg-blue hover:text-olg-blue-dark transition-colors"
            >
              <span class="sr-only">Twitter</span>
              <twitter-icon class="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  Briefcase as BriefcaseIcon,
  Upload as UploadIcon,
  File as FileIcon,
  X as XIcon,
  Mail as MailIcon,
  Loader as LoaderIcon,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
  Users as UsersIcon,
  Award as AwardIcon,
  Lightbulb as LightbulbIcon,
  GraduationCap as GraduationCapIcon,
  Globe as GlobeIcon
} from 'lucide-vue-next';

// Job icons for animated background
const jobIcons = [
  { component: UsersIcon, x: 15, y: 25, delay: 0, duration: 15 },
  { component: AwardIcon, x: 30, y: 65, delay: 2, duration: 18 },
  { component: LightbulbIcon, x: 50, y: 35, delay: 1, duration: 12 },
  { component: GraduationCapIcon, x: 70, y: 55, delay: 3, duration: 20 },
  { component: GlobeIcon, x: 85, y: 30, delay: 2.5, duration: 16 }
];

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  expertise: '',
  message: '',
  file: null as File | null,
  privacyPolicy: false
});

const isDragging = ref(false);
const isSubmitting = ref(false);

// File handling
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    form.value.file = input.files[0];
  }
};

const handleFileDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    form.value.file = event.dataTransfer.files[0];
  }
};

// Form submission
const submitInterest = async () => {
  isSubmitting.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Show success message
  alert('Thank you for your interest! We will keep your information on file for future opportunities.');
  
  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    expertise: '',
    message: '',
    file: null,
    privacyPolicy: false
  };
  
  isSubmitting.value = false;
};
</script>

<style scoped>
/* Brand Colors */
:deep(.bg-olg-blue) { background-color: #3A6E9F; }
:deep(.bg-olg-blue-dark) { background-color: #2d5a83; }
:deep(.bg-olg-blue-50) { background-color: #f0f4f8; }
:deep(.bg-olg-green) { background-color: #B5D89B; }
:deep(.bg-olg-cream) { background-color: #F0E6C9; }

:deep(.text-olg-blue) { color: #3A6E9F; }
:deep(.text-olg-blue-dark) { color: #2d5a83; }
:deep(.text-olg-green) { color: #B5D89B; }
:deep(.text-olg-cream) { color: #F0E6C9; }

:deep(.focus\:border-olg-blue:focus) { border-color: #3A6E9F; }
:deep(.focus\:ring-olg-blue:focus) { --tw-ring-color: #3A6E9F; }

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes float {
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-15px) translateX(10px) rotate(5deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-float-slow {
  animation: float 15s ease-in-out infinite;
}

.animate-float-medium {
  animation: float 12s ease-in-out infinite;
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Prose Styling */
:deep(.prose-olg) {
  --tw-prose-headings: #3A6E9F;
  --tw-prose-links: #3A6E9F;
}

:deep(.prose-olg a) {
  color: #3A6E9F;
  text-decoration: none;
  font-weight: 500;
}

:deep(.prose-olg a:hover) {
  text-decoration: underline;
}
</style>