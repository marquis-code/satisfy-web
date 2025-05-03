<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-900 dark:text-white">
      <!-- Header -->
      <header class="py-8 px-4 md:px-8 text-center">
        <h1 class="text-3xl md:text-5xl font-bold mb-2 text-emerald-700 dark:text-emerald-300 animate-fade-in">
          Meet Our Team
        </h1>
        <p class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-6 animate-slide-up">
          400+ Studies Published
        </p>
        <p class="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 animate-fade-in">
          At OLGnova, our leadership team brings a wealth of expertise in research, communication, and project management.
        </p>
      </header>
  
      <!-- Team Navigation -->
      <div class="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-3 px-4 mb-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Team Members</h2>
            <div class="flex items-center gap-2">
              <button 
                @click="toggleDarkMode" 
                class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                <sun-icon v-if="isDarkMode" class="h-5 w-5" />
                <moon-icon v-else class="h-5 w-5" />
              </button>
              <button 
                @click="isSearchOpen = !isSearchOpen" 
                class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Search publications"
              >
                <search-icon class="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div v-if="isSearchOpen" class="mb-4 animate-fade-in">
            <div class="relative">
              <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search publications or team members..." 
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
  
          <div class="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            <button 
              v-for="letter in alphabetLetters" 
              :key="letter"
              @click="scrollToLetter(letter)"
              class="min-w-[2rem] h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors"
              :class="[
                activeLetterFilter === letter 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900'
              ]"
            >
              {{ letter }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Search Results -->
      <div v-if="searchQuery && filteredTeamMembers.length === 0" class="px-4 py-8 text-center animate-fade-in">
        <search-x-icon class="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p class="text-gray-600 dark:text-gray-400">No results found for "{{ searchQuery }}"</p>
      </div>
  
      <!-- Team Members List -->
      <div v-else class="max-w-7xl mx-auto px-4 pb-20">
        <div v-for="(group, letter) in groupedTeamMembers" :key="letter" :id="`letter-${letter}`" class="mb-12">
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center text-white text-xl font-bold">
              {{ letter }}
            </div>
            <div class="ml-4 h-px flex-grow bg-emerald-200 dark:bg-emerald-800"></div>
          </div>
  
          <div class="space-y-12">
            <div 
              v-for="member in group" 
              :key="member.id" 
              class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg animate-fade-in"
            >
              <div class="p-6 md:p-8">
                <div class="md:flex md:items-start">
                  <div class="md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-800 dark:text-emerald-200 text-2xl font-bold border-4 border-emerald-500 dark:border-emerald-600">
                      {{ member.initials }}
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ member.name }}</h3>
                    <p class="text-emerald-600 dark:text-emerald-400 font-medium mb-3">{{ member.title }}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                      <a 
                        v-for="profile in member.profiles" 
                        :key="profile.type"
                        :href="profile.url" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors"
                        :class="getProfileButtonClass(profile.type)"
                      >
                        <component :is="getProfileIcon(profile.type)" class="h-4 w-4 mr-1" />
                        {{ profile.type }}
                      </a>
                    </div>
                    
                    <div class="prose dark:prose-invert prose-emerald max-w-none mb-6" v-html="member.bio"></div>
                    
                    <div class="mb-4">
                      <h4 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Methods:</h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="(method, index) in member.methods"
                          :key="index"
                          class="inline-block px-3 py-1 rounded-full text-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
                        >
                          {{ method }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="mt-6">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Research Publications</h4>
                    <button 
                      @click="togglePublications(member.id)"
                      class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center text-sm font-medium"
                    >
                      {{ expandedMembers.includes(member.id) ? 'Hide' : 'Show' }} {{ member.publications.length }} Publications
                      <chevron-down-icon 
                        class="ml-1 h-4 w-4 transition-transform" 
                        :class="{ 'transform rotate-180': expandedMembers.includes(member.id) }"
                      />
                    </button>
                  </div>
  
                  <div 
                    v-if="expandedMembers.includes(member.id)"
                    class="space-y-4 animate-fade-in"
                  >
                    <div 
                      v-for="(pub, index) in member.publications" 
                      :key="index"
                      class="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                    >
                      <h5 class="font-semibold text-gray-900 dark:text-white mb-2">{{ pub.title }}</h5>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ pub.authors }}</p>
                      <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-500 dark:text-gray-500">{{ pub.year }}</span>
                        <a 
                          v-if="pub.doi" 
                          :href="`https://doi.org/${pub.doi}`" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
                        >
                          <external-link-icon class="h-3 w-3 mr-1" />
                          View Publication
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Back to Top Button -->
      <button 
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Back to top"
      >
        <chevron-up-icon class="h-6 w-6" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { 
    Search as SearchIcon, 
    ChevronDown as ChevronDownIcon, 
    ChevronUp as ChevronUpIcon,
    ExternalLink as ExternalLinkIcon,
    Linkedin as LinkedinIcon,
    BookOpen as GoogleScholarIcon,
    FileText as ResearchGateIcon,
    Hash as OrcidIcon,
    SearchX as SearchXIcon,
    Sun as SunIcon,
    Moon as MoonIcon
  } from 'lucide-vue-next'
  
  // Team members data
  interface Profile {
    type: string;
    url: string;
  }
  
  interface Publication {
    title: string;
    authors: string;
    year: string;
    doi?: string;
  }
  
  interface TeamMember {
    id: string;
    name: string;
    initials: string;
    title: string;
    profiles: Profile[];
    bio: string;
    methods: string[];
    publications: Publication[];
  }
  
  // State
  const teamMembers = ref<TeamMember[]>([
    {
      id: 'gabriel-oke',
      name: 'Gabriel Oke',
      initials: 'GO',
      title: 'Director and Lead (Health Tech Portfolio)',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/gabriel-oke/' },
        { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Gabriel-Oke' },
        { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=gabriel-oke' },
        { type: 'ORCID', url: 'https://orcid.org/gabriel-oke' }
      ],
      bio: `Gabriel Oke is a public health researcher who combines his passion for evidence-based research and global health equity to empower organizations in creating lasting, sustainable impact. He holds a Master of Science in Healthcare Management from the University of Global Health Equity in Rwanda and is currently pursuing an MBA at Chester Business School, UK.
      <br><br>
      With over six years of experience leading health initiatives, managing grant portfolios, and turning complex data into actionable strategies, Gabriel embodies OLGnova's mission to drive systemic change through innovation and collaboration.`,
      methods: [
        'Systematic Reviews & Meta-Analyses',
        'Mixed-Methods Research',
        'Cross-Sectional Surveys',
        'Policy Analysis'
      ],
      publications: [
        {
          title: 'Prevalence of post-caesarean section surgical site infections in Rwanda: A systematic review and meta-analysis',
          authors: 'Sibomana, O., Bugenimana, A., Oke, G., & Ndayambaje, E.',
          year: '2024',
          doi: '10.1111/iwj.14929'
        },
        {
          title: 'Navigating the digital frontier during the COVID-19 pandemic and EVALI epidemic: The impact of social media on public health',
          authors: 'Ngoma, C., Matatiyo, A., Oke, G., Adebisi, Y., & Shomuyiwa, D.',
          year: '2024',
          doi: '10.1002/puh2.173'
        },
        {
          title: 'Experience of people living with leprosy at leprosy settlements in Nigeria',
          authors: 'Oke, G., Nsofor, I., Abubakar, B., Lucero-Prisno, D., Sunday, A., Dibia, E., Okpokpo, O., Obeta, O. K., Babatunde, A., Adeyemi, A., Adeoye, P., & Utaka, E.',
          year: '2024',
          doi: '10.1002/puh2.171'
        },
        {
          title: 'Knowledge, perception, and willingness of emerging Public Health Advocates to effectively communicate about smoking cessation and Tobacco Harm Reduction in Africa',
          authors: 'Oke, G., Ademola, P., Utaka, E., John, E., Adam, M., Okereke, B., Onyia, I., & Adebisi, Y.',
          year: '2024',
          doi: '10.1007/s44202-023-00102-5'
        },
        {
          title: 'Portrayal of electronic cigarettes in the news',
          authors: 'Ngoma, C., Alhaj, S., Imo, U., Oke, G., & Adebisi, Y.',
          year: '2023',
          doi: '10.1002/puh2.84'
        }
      ]
    },
    {
      id: 'uzairue-leonard',
      name: 'Uzairue Leonard Ighodalo',
      initials: 'UL',
      title: 'Director of Operations',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/uzairue-leonard-ighodalo/' },
        { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Uzairue-Leonard-Ighodalo' },
        { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=uzairue-leonard-ighodalo' },
        { type: 'ORCID', url: 'https://orcid.org/uzairue-leonard-ighodalo' }
      ],
      bio: `Uzairue Leonard Ighodalo is a distinguished academic and researcher specializing in medical microbiology, antimicrobial resistance (AMR), and infectious disease epidemiology. With a PhD in Medical Microbiology and Public Health at the Federal University of Agriculture, Abeokuta, Leonard is a recipient of the prestigious NIHR & RSTMH grant for his groundbreaking research on COVID-19's impact on AMR in Nigeria.
      <br><br>
      Leonard's extensive research portfolio includes publications on Salmonella transmission dynamics, colistin resistance in Klebsiella pneumoniae, and surveillance systems for AMR in Africa.`,
      methods: [
        'Molecular Studies',
        'Systematic Reviews/Meta-Analyses',
        'Retrospective Cohort Studies',
        'Surveillance Data Analysis'
      ],
      publications: [
        {
          title: 'Systematic Review Seroprevalence, Risk Factors and Maternal-Fetal Outcomes of Toxoplasma gondii in Pregnant Women from WHO Eastern Mediterranean Region: Systematic Review and Meta-Analysis',
          authors: 'Rabaan, A., Uzairue, L., Alfaraj, A., Halwani, M., Muzaheed, A., Alawfi, A., et al.',
          year: '2023',
          doi: '10.3390/pathogens12091157'
        },
        {
          title: 'Detection of Multidrug resistant cariogenic bacteria among Diabetic Patients attending a Tertiary Hospital in Ado Ekiti, South-Western, Nigeria',
          authors: 'Adewumi, F., Adegoke, A., Ojerinde, O., Uzairue, L., Okiki, A., & Ibeh, I.',
          year: '2023',
          doi: '10.53982/aijnas.2023.0302.09-j'
        },
        {
          title: 'Antimicrobial resistance and virulence genes of invasive Salmonella enterica from children with bacteremia in north-central Nigeria',
          authors: 'Uzairue, L., Shittu, O., Ojo, O., Obuotor, T., Olanipekun, G., Ajose, T., et al.',
          year: '2023',
          doi: '10.1177/20503121231175322'
        },
        {
          title: 'HIV Patients\' Satisfaction with Pharmaceutical Care at a Nigerian Tertiary Healthcare Facility During the Covid-19 Pandemic',
          authors: 'Dalhatu Muhammad, A., Emmanuel, A., Ugwuonah, J., Okon, P., Aliyu, S., Uzairue, L., & Lucero-Prisno, D.',
          year: '2023',
          doi: '10.1177/23259582231159093'
        },
        {
          title: 'The potential impact of the COVID-19 pandemic on global antimicrobial and biocide resistance: an AMR Insights global perspective',
          authors: 'Hays, J., Kemp, A., Okechukwu, R., Murugaiyan, J., Ekwanzala, M., Alvarez, M., et al.',
          year: '2023'
        }
      ]
    },
    {
      id: 'olivier-sibomana',
      name: 'Olivier Sibomana',
      initials: 'OS',
      title: 'Research and Publications Manager',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/olivier-sibomana/' },
        { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Olivier-Sibomana' },
        { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=olivier-sibomana' },
        { type: 'ORCID', url: 'https://orcid.org/olivier-sibomana' }
      ],
      bio: `Olivier Sibomana is a medical doctor candidate at the University of Rwanda, with a burgeoning career as a researcher in the fields of public health, health technology, molecular medicine, and translational research. He possesses strong leadership and research skills, demonstrated through his leadership roles such as serving as the Student Executive Committee Leader at the Foresight Institute of Research and Translation (FIRAT Rwanda), and as the Director of Research and Medical Content for both Meditechy Rwanda and the AMR Initiative Rwanda.
      <br><br>
      Sibomana has contributed to major research projects, including his roles as a research assistant and collaborator in initiatives such as the Assessing Genomic Diversity in Africa (AgenDA) project and Newborn Hearing Screening and Genetic Screening in Rwanda (NBHS-Rwanda).`,
      methods: [
        'Diagnostic Accuracy Studies',
        'Scoping Reviews',
        'Retrospective Hospital-Based Studies',
        'Perspective/Policy Papers'
      ],
      publications: [
        {
          title: 'Understanding Health Inequality, Disparity and Inequity in Africa: A Rapid Review of Concepts, Root Causes, and Strategic Solutions',
          authors: 'Oke, G., & Sibomana, O.',
          year: '2025',
          doi: '10.1002/puh2.70040'
        },
        {
          title: 'Adoption of Digital Health Technology in Nigeria: A Scoping Review of Current Trends and Future Directions',
          authors: 'Oke, G., & Sibomana, O.',
          year: '2025',
          doi: '10.1155/adph/4246285'
        },
        {
          title: 'Diagnostic accuracy of ECG smart chest patches versus PPG smartwatches for atrial fibrillation detection: a systematic review and meta-analysis',
          authors: 'Sibomana, O., Hakayuwa, C. M., Gahire, H., Munyantore, J., & Chilala, M.',
          year: '2025',
          doi: '10.1186/s12872-025-04582-2'
        },
        {
          title: 'The Prevalence and Management of Aerodigestive Foreign Bodies at Rwanda Military Hospital: A Six-years Retrospective Study',
          authors: 'Bukuru, J., Ngirinshuti, A., Kamanda, P., Kananga, W., Mukomeza, C., & Sibomana, O.',
          year: '2025',
          doi: '10.2147/OAEM.S493458'
        },
        {
          title: 'Assessing the knowledge, attitudes, and perceptions toward smoking cessation among medical students in Rwanda',
          authors: 'Oke, G., Sibomana, O., Ainebyona, A., Utaka, E., & Adebisi, Y.',
          year: '2025',
          doi: '10.21203/rs.3.rs-5891044/v1'
        }
      ]
    },
    {
      id: 'sherifat-oriza',
      name: 'Sherifat Oriza',
      initials: 'SO',
      title: 'Director of Communications',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/sherifat-oriza/' }
      ],
      bio: `Sherifat Oriza is a Communications expert and dedicated Medical Laboratory Scientist, a graduate of Kwara State University, Malete, who seamlessly blends her scientific expertise with a passion for impactful communication. Initially torn between her love for life-saving science and the art of communication, she discovered the powerful intersection of these fields in health communications.
      <br><br>
      Her interests extend beyond the lab, encompassing global health, with a focus on research into infectious diseases and antimicrobial resistance, alongside molecular biology, health system strengthening, and infection prevention and control (IPC).`,
      methods: [],
      publications: []
    },
    {
      id: 'fadele-precious',
      name: 'Fadele Precious Kehinde',
      initials: 'FP',
      title: 'Research Manager',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/fadele-precious-kehinde/' },
        { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Fadele-Precious-Kehinde' },
        { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=fadele-precious-kehinde' },
        { type: 'ORCID', url: 'https://orcid.org/fadele-precious-kehinde' }
      ],
      bio: `Kehinde Precious Fadele is an undergraduate medical student at the University of Nigeria, Enugu State, with a remarkable record of early-career research. Her scholarly pursuits are rooted in neurosurgery, neuro-oncology, neuro-infections, neurology, and global and public health. Notably, she has authored and co-authored over 30 peer-reviewed publications, encompassing original research, literature reviews, commentaries, and case reports, in reputable international journals.
      <br><br>
      Precious serves as the Editor-in-Chief for Wiley journal in the United States and contributes as a reviewer for the Annals of Medicine and Surgery Journal (UK), where she has evaluated over 81 manuscripts.`,
      methods: [
        'Case Reports & Series',
        'Literature Reviews',
        'Editorials/Perspectives',
        'Survey Research'
      ],
      publications: [
        {
          title: `Revolutionizing aneurysm risk prediction: artificial intelligence's promise and challenges`,
          authors: 'Okon, I., Fadele, K., Chaurasia, B., Mbong, E., John, O. O., Kankam, S., Akpan, U., & III, D.',
          year: '2025',
          doi: '10.1097/MS9.0000000000002917'
        },
        {
          title: 'Neurotrauma in sports: concussion and chronic traumatic encephalopathy (CTE)',
          authors: 'Fadele, K., Igwe, S., Egbo, K., Ernest, A., Somto, O., III, D., & Chaurasia, B.',
          year: '2025',
          doi: '10.1007/s44337-025-00206-y'
        },
        {
          title: `December Editor's choice article "The Evolving Role of Palliative Care in Older People with Glioblastoma`,
          authors: 'Okon, I., Osama, M., Akpan, A., Paleare, L. F., Ferreira, M. Y., Shafqat, M. D., et al.',
          year: '2024',
          doi: '10.1016/S1878-8750(24)01857-6'
        },
        {
          title: 'Addressing Mental Health in Africa: Integrating Mental Health First Aid Initiatives',
          authors: 'Fadele, K., Ayuba, D., Igwe, S., Kolawole, E., Bianca, N., Owhor, G., Ogaya, J., & Lucero-Prisno, D. E.',
          year: '2024',
          doi: '10.22541/au.173217242.26089066/v1'
        },
        {
          title: 'The Current State of Spina Bifida in Low- and Middle-Income Countries: Where Does Africa Stand?',
          authors: 'Okon, I., Temitope, A., Ogundele, I., Akpan, U., Mbong, E., Kasimieh, O., et al.',
          year: '2024',
          doi: '10.1016/j.neuchi.2024.101616'
        }
      ]
    },
    {
      id: 'goodness-odey',
      name: 'Goodness Odey',
      initials: 'GO',
      title: 'Director of Research and Director (Global Health Portfolio)',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/goodness-ogeyi-odey/' },
        { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Goodness-Ogeyi-Odey' },
        { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=goodness-ogeyi-odey' },
        { type: 'ORCID', url: 'https://orcid.org/goodness-ogeyi-odey' }
      ],
      bio: `Goodness Ogeyi Odey is a Global Public Health Practitioner committed to strengthening health systems and promoting equitable engagement to achieve sustainable development and universal health coverage, particularly in resource-constrained settings. She holds an MSc in Health Policy, Planning, and Financing from the London School of Hygiene and Tropical Medicine (LSHTM) and the London School of Economics and Political Science (LSE).
      <br><br>
      At the age of 24, Goodness was honored with the prestigious 2022 Princesa Diana Award, the highest accolade for young people's social action, recognizing her significant contributions to health equity in Africa.`,
      methods: [
        'Cross-Country Comparative Studies',
        'Qualitative Case Studies',
        'Literature Synthesis',
        'Survey Research'
      ],
      publications: [
        {
          title: 'Top 10 Public Health Challenges for 2024: Charting a New Direction for Global Health Security',
          authors: 'III, D., Shomuyiwa, D., Kouwenhoven, M. B. N., Dorji, T., Adebisi, Y., Odey, G., et al.',
          year: '2024',
          doi: '10.1002/puh2.70022'
        },
        {
          title: 'Public Health Word of the Year 2023 — Conflict',
          authors: 'Lucero-Prisno, D., Ogaya, J., Shomuyiwa, D., Adebisi, Y., Kouwenhoven, M. B. N., Ogunkola, I., Odey, G., et al.',
          year: '2024',
          doi: '10.1002/puh2.220'
        },
        {
          title: 'Transforming adolescent menstrual health through policy: the role of value added tax exemptions in improving access to sanitary products',
          authors: 'Shomuyiwa, D., Odey, G., Ndep, A., Ekerin, O., Amesho, J., Luvindao, E., Manirambona, E., & III, D.',
          year: '2024',
          doi: '10.1186/s41256-024-00358-x'
        },
        {
          title: 'Reusable Pads: A Sustainable and Affordable Solution to Addressing Period Poverty in Nigeria',
          authors: 'Kuponiyi, S., Egwu, K., Ezema, M., Amusile, O., Victor, C., Ogochukwu Onukansi, F., Sunday, B., & Odey, G.',
          year: '2024',
          doi: '10.22541/au.171051556.60017362/v1'
        },
        {
          title: 'Gender Dimension of Disasters in Africa',
          authors: 'Odey, G., Sarah, O., Alhaj, S., & Lucero-Prisno, D.',
          year: '2023',
          doi: '10.4324/9781003140245-10'
        }
      ]
    },
    {
      id: 'adebisi-yusuf',
      name: 'Adebisi Yusuf',
      initials: 'AY',
      title: 'Research Consultant and Publications Manager',
      profiles: [
        { type: 'LinkedIn', url: 'https://www.linkedin.com/in/yusuff-adebayo-adebisi/' },
        { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Yusuff-Adebayo-Adebisi' },
        { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=yusuff-adebayo-adebisi' },
        { type: 'ORCID', url: 'https://orcid.org/yusuff-adebayo-adebisi' }
      ],
      bio: `Yusuff Adebayo Adebisi is a distinguished global health professional, pharmacist, epidemiologist, and health systems researcher dedicated to advancing public health through research, innovative solutions, and impactful advocacy. He holds a pharmacy degree from the University of Ibadan and an MSc in Global Health Science and Epidemiology from the University of Oxford, where he was a Commonwealth Shared Scholar.
      <br><br>
      A prolific researcher, Yusuff has authored over 250 journal articles and contributed to seven book chapters, earning recognition as one of Nigeria's top 100 researchers. His pioneering contributions to COVID-19 research were highlighted in a 2023 bibliometric review, identifying him as Nigeria's leading contributor to COVID-19 publications.`,
      methods: [
        'Bibliometric Analyses',
        'Narrative Reviews',
        'Secondary Data Analysis',
        'Cross-Country Comparative Studies',
        'Qualitative Case Studies',
        'Literature Synthesis',
        'Survey Research',
        'Multi-Country Collaborations'
      ],
      publications: [
        {
          title: 'Left behind no more: ensuring equitable vaccine access to curb mpox in Africa',
          authors: 'Bolarinwa, O., Mohammed, A., Adebisi, Y., & Oyewo, O.',
          year: '2025',
          doi: '10.1093/inthealth/ihaf018'
        },
        {
          title: 'Antibiotic Use and Misuse in Maritime Settings: Challenges and Implications for Global Antimicrobial Resistance Response',
          authors: 'Shao, L., Adebisi, Y., & Adeola, Q.',
          year: '2025',
          doi: '10.1007/s11908-025-00860-4'
        },
        {
          title: 'Determinants of knowledge of risks associated with cigarette smoking among adolescents in Scotland',
          authors: 'Adebisi, Y., Ogunkola, I., Alshahrani, N., Jimoh, N., & Ilesanmi, O.',
          year: '2025',
          doi: '10.1093/eurpub/ckaf024'
        },
        {
          title: 'Measuring and addressing violence against women with disabilities in Africa',
          authors: 'Odimegwu, C., Bolarinwa, O., & Adebisi, Y.',
          year: '2025',
          doi: '10.4102/ajod.v14i0.1576'
        },
        {
          title: 'Understanding Research Gaps and Priorities for Tobacco Harm Reduction in Low-Income and Middle-Income Countries',
          authors: 'Adebisi, Y., Lungu, S., Curado, A., Oke, G., & Yach, D.',
          year: '2025',
          doi: '10.2139/ssrn.5149050'
        }
      ]
    }
  ]);
  
  const searchQuery = ref('');
  const expandedMembers = ref<string[]>([]);
  const activeLetterFilter = ref('');
  const showBackToTop = ref(false);
  const isDarkMode = ref(false);
  const isSearchOpen = ref(false);
  
  // Computed properties
  const alphabetLetters = computed(() => {
    const letters = new Set<string>();
    teamMembers.value.forEach(member => {
      const firstLetter = member.name.charAt(0).toUpperCase();
      letters.add(firstLetter);
    });
    return Array.from(letters).sort();
  });
  
  const filteredTeamMembers = computed(() => {
    if (!searchQuery.value) return teamMembers.value;
    
    const query = searchQuery.value.toLowerCase();
    return teamMembers.value.filter(member => {
      // Search in name, title, bio
      if (
        member.name.toLowerCase().includes(query) ||
        member.title.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query)
      ) {
        return true;
      }
      
      // Search in publications
      return member.publications.some(pub => 
        pub.title.toLowerCase().includes(query) || 
        pub.authors.toLowerCase().includes(query)
      );
    });
  });
  
  const groupedTeamMembers = computed(() => {
    const grouped: Record<string, TeamMember[]> = {};
    
    filteredTeamMembers.value.forEach(member => {
      const firstLetter = member.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(member);
    });
    
    // Sort each group alphabetically
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
    });
    
    // Return sorted by letter
    return Object.keys(grouped)
      .sort()
      .reduce((obj: Record<string, TeamMember[]>, key) => {
        obj[key] = grouped[key];
        return obj;
      }, {});
  });
  
  // Methods
  const togglePublications = (memberId: string) => {
    if (expandedMembers.value.includes(memberId)) {
      expandedMembers.value = expandedMembers.value.filter(id => id !== memberId);
    } else {
      expandedMembers.value.push(memberId);
    }
  };
  
  const scrollToLetter = (letter: string) => {
    activeLetterFilter.value = letter;
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const getProfileButtonClass = (type: string) => {
    switch (type) {
      case 'LinkedIn':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800';
      case 'ResearchGate':
        return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800';
      case 'Google Scholar':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800';
      case 'ORCID':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:hover:bg-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700';
    }
  };
  
  const getProfileIcon = (type: string) => {
    switch (type) {
      case 'LinkedIn':
        return LinkedinIcon;
      case 'ResearchGate':
        return ResearchGateIcon;
      case 'Google Scholar':
        return GoogleScholarIcon;
      case 'ORCID':
        return OrcidIcon;
      default:
        return ExternalLinkIcon;
    }
  };
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Lifecycle hooks
  onMounted(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
      document.documentElement.classList.add('dark');
    }
    
    // Handle scroll events for back-to-top button
    window.addEventListener('scroll', () => {
      showBackToTop.value = window.scrollY > 500;
    });
    
    // Clear active letter filter when scrolling
    window.addEventListener('scroll', () => {
      if (!activeLetterFilter.value) return;
      
      // Check if we're still in the section
      const element = document.getElementById(`letter-${activeLetterFilter.value}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          activeLetterFilter.value = '';
        }
      }
    });
  });
  
  // Reset expanded members when search changes
  watch(searchQuery, () => {
    expandedMembers.value = [];
    activeLetterFilter.value = '';
  });
  </script>
  
  <style>
  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Hide scrollbar but allow scrolling */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
  
  /* Ensure dark mode works properly */
  :root {
    color-scheme: light dark;
  }
  
  .dark {
    color-scheme: dark;
  }
  </style>