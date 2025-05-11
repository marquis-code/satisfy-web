<template>
  <div class="min-h-screen bg-gradient-to-br pt-20 from-light-green-50 to-light-green-100 dark:from-blue-950 dark:to-blue-900 dark:text-white">
    <!-- Header -->
    <header class="py-8 px-4 md:px-8 text-center">
      <h1 class="text-3xl md:text-5xl font-bold mb-2 text-blue-700 dark:text-cream-300 animate-fade-in">
        Meet Our Team
      </h1>
      <p class="text-lg md:text-xl font-medium text-blue-600 dark:text-cream-400 mb-6 animate-slide-up">
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
          <h2 class="text-lg font-semibold text-blue-700 dark:text-cream-400">Team Members</h2>
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
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery && sortedTeamMembers.length === 0" class="px-4 py-8 text-center animate-fade-in">
      <search-x-icon class="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <p class="text-gray-600 dark:text-gray-400">No results found for "{{ searchQuery }}"</p>
    </div>

    <!-- Team Members List -->
    <div class="max-w-7xl mx-auto px-4 pb-20">
      <div class="space-y-12">
        <div 
          v-for="member in sortedTeamMembers" 
          :key="member.id" 
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg animate-fade-in"
        >
          <div class="p-6 md:p-8">
            <div class="md:flex md:items-start">
              <div class="md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-light-green-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-cream-200 text-2xl font-bold border-4 border-blue-500 dark:border-cream-600">
                  {{ member.initials }}
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ member.name }}</h3>
                <p class="text-blue-600 dark:text-cream-400 font-medium mb-3">{{ member.title }}</p>
                
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
                
                <div class="prose dark:prose-invert prose-blue max-w-none mb-6" v-html="member.bio"></div>
                
                <div class="mb-4" v-if="member.methods && member.methods.length > 0">
                  <h4 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Methods:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(method, index) in member.methods"
                      :key="index"
                      class="inline-block px-3 py-1 rounded-full text-sm bg-light-green-100 dark:bg-blue-900 text-blue-800 dark:text-cream-200"
                    >
                      {{ method }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6" v-if="member.publications && member.publications.length > 0">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Research Publications</h4>
                <button 
                  @click="togglePublications(member.id)"
                  class="text-blue-600 dark:text-cream-400 hover:text-blue-800 dark:hover:text-cream-300 flex items-center text-sm font-medium"
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
                  class="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-cream-700 transition-colors"
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
                      class="text-xs text-blue-600 dark:text-cream-400 hover:underline flex items-center"
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

    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
  journal: string;
}

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  title: string;
  position: number; // Position field for sorting
  profiles: Profile[];
  bio: string;
  methods: string[];
  publications: Publication[];
}

// State
const teamMembers = ref<TeamMember[]>([
  {
  "id": "gabriel-oke",
  "name": "Gabriel Oke",
  "initials": "GO",
  "title": "Director and CEO OLGnova",
  "position": 1,
  "profiles": [
    { "type": "LinkedIn", "url": "https://www.linkedin.com/in/gabriel-oke/" },
    { "type": "ResearchGate", "url": "https://www.researchgate.net/profile/Gabriel-Oke" },
    { "type": "Google Scholar", "url": "https://scholar.google.com/citations?user=gabriel-oke" },
    { "type": "ORCID", "url": "https://orcid.org/gabriel-oke" }
  ],
  "bio": "Gabriel Oke is a public health researcher who combines his passion for evidence-based research and global health equity to empower organizations in creating lasting, sustainable impact. He holds a Master of Science in Healthcare Management from the University of Global Health Equity in Rwanda and is currently pursuing an MBA at Chester Business School, UK.\n\nWith over six years of experience leading health initiatives, managing grant portfolios, and turning complex data into actionable strategies, Gabriel embodies OLGnova's mission to drive systemic change through innovation and collaboration.",
  "methods": [
    "Systematic Reviews & Meta-Analyses",
    "Mixed-Methods Research",
    "Cross-Sectional Surveys",
    "Policy Analysis"
  ],
  "publications": [
    {
      "title": "Prevalence of post‐caesarean section surgical site infections in Rwanda: A systematic review and meta‐analysis",
      "authors": "Sibomana, O., Bugenimana, A., Oke, G., & Ndayambaje, E.",
      "year": "2024",
      "journal": "International Wound Journal, 21",
      "doi": "10.1111/iwj.14929"
    },
    {
      "title": "Navigating the digital frontier during the COVID-19 pandemic and EVALI epidemic: The impact of social media on public health",
      "authors": "Ngoma, C., Matatiyo, A., Oke, G., Adebisi, Y., & Shomuyiwa, D.",
      "year": "2024",
      "journal": "Public Health Challenges, 3",
      "doi": "10.1002/puh2.173"
    },
    {
      "title": "Experience of people living with leprosy at leprosy settlements in Nigeria",
      "authors": "Oke, G., Nsofor, I., Abubakar, B., Lucero‐Prisno, D., Sunday, A., Dibia, E., Okpokpo, O., Obeta, O. K., Babatunde, A., Adeyemi, A., Adeoye, P., & Utaka, E.",
      "year": "2024",
      "journal": "Public Health Challenges, 3",
      "doi": "10.1002/puh2.171"
    },
    {
      "title": "Knowledge, perception, and willingness of emerging Public Health Advocates to effectively communicate about smoking cessation and Tobacco Harm Reduction in Africa",
      "authors": "Oke, G., Ademola, P., Utaka, E., John, E., Adam, M., Okereke, B., Onyia, I., & Adebisi, Y.",
      "year": "2024",
      "journal": "Discover Psychology, 4",
      "doi": "10.1007/s44202-023-00102-5"
    },
    {
      "title": "Portrayal of electronic cigarettes in the news",
      "authors": "Ngoma, C., Alhaj, S., Imo, U., Oke, G., & Adebisi, Y.",
      "year": "2023",
      "journal": "Public Health Challenges, 2",
      "doi": "10.1002/puh2.84"
    },
    {
      "title": "Knowledge, Attitude, And Practices (KAP) Of Malaria Prevention Amongst Medical Students of Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria",
      "authors": "Matthew, T., Komolafe, D. O., Nasir, A., Eleje, C., Obaji, P., Ekpenyong, M., Igharo, A., & Oke, G.",
      "year": "2022",
      "journal": "Razi International Medical Journal, 2, 28-40",
      "doi": "10.56101/rimj.v2i2.47"
    },
    {
      "title": "Understanding female condom use, acceptance, accessibility, awareness and knowledge among female public health students in a Nigerian university: A cross-sectional study",
      "authors": "Oke, G., Adebisi, Y., Olarewaju, O., Agboola, P., Ilesanmi, E., Micheal, A., Ahmadi, A., & III, D.",
      "year": "2021",
      "journal": "Razi International Medical Journal, 1",
      "doi": "10.56101/rimj.v1i2.16"
    },
    {
      "title": "Nigeria's Polio Elimination Playbook: Lessons To Strengthening Health Systems For Other Eradicable Diseases",
      "authors": "Effiong, F., Akanno, I., Anosike, U., Kayode, A., Okon, A., Dada, G., Oke, G., Nwobodo, M., & Uzairue, L.",
      "year": "2021",
      "journal": "Global Biosecurity, 3",
      "doi": "10.31646/gbio.127"
    },
    {
      "title": "Knowledge, Attitude, Practice and Predictors of Preventive Practices Toward COVID-19 among Healthcare Workers in Ogbomoso, Nigeria: A Cross-Sectional Study",
      "authors": "Adeoye, P., Oke, G., Fadele, K., & Awotunde, A.",
      "year": "2021",
      "journal": "Nigerian Journal of Medicine: Journal of the National Association of Resident Doctors of Nigeria, 30, 452",
      "doi": "10.4103/NJM.NJM_"
    },
    {
      "title": "COVID-19 calls for health systems strengthening in Africa: A case of Nigeria",
      "authors": "Oke, G., Adebisi, Y., & Nsofor, I.",
      "year": "2021",
      "journal": "International Journal of Health Planning and Management, 36, 1–9",
      "doi": "10.1002/hpm.3296"
    },
    {
      "title": "COVID-19 and Antimicrobial Resistance: A Review",
      "authors": "Adebisi, Y., Alaran, A., Okereke, M., Oke, G., Abimbola, A., Olaoye, O., Oladunjoye, I., Azeez, Y., Ukor, N., & III, D.",
      "year": "2021",
      "journal": "Infectious Diseases: Research and Treatment, 14, 1–9",
      "doi": "10.1177/11786337211033870"
    },
    {
      "title": "Transmission, entry and pattern of infection of severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)",
      "authors": "Oke, G., Bassey, A., Fadele, K., Okereke, M., & Omoniyi, W.",
      "year": "2021",
      "journal": "Journal of Public Health and Diseases, 4, 330354–330355",
      "doi": "10.31248/JPHD2020.081"
    },
    {
      "title": "Impact of the COVID-19 Pandemic on Maternal and Child Health",
      "authors": "Oke, G., & Ihekweazu, V.",
      "year": "2020",
      "journal": "Modern Care Journal, 17, 110808",
      "doi": "10.5812/modernc.110808"
    },
    {
      "title": "Exploring the Knowledge, Attitude and Practice Regarding Hepatitis B Infection among Ogbomosho LGA Dwellers A Cross-Sectional Study",
      "authors": "Olaniyan, A., Oke, G., Folaranmi, P., & Adetunji, B.",
      "year": "2020",
      "journal": "Journal of Hepatology Research, 5(1), 1039",
      "doi": ""
    },
    {
      "title": "Prospects of BNAbs in Management of HIV/AIDS",
      "authors": "Oke, G., Fadele, K., Adebisi, Y., Okereke, M., & Bassey, A.",
      "year": "2020",
      "journal": "International Journal of Health Research",
      "doi": "10.5812/ijhls.106098"
    },
    {
      "title": "COVID-19 in the Elderly and the Immunocompromised",
      "authors": "Oke, G., Fajobi, T., Akpan, S., & Adebisi, Y.",
      "year": "2020",
      "journal": "International Journal of Health Sciences",
      "doi": "10.5812/ijhls.105955"
    },
    {
      "title": "SARS-CoV-2 diagnostic testing in Africa: needs and challenges",
      "authors": "Adebisi, Y., Oke, G., Ademola, P., Dada, G., Ogunkola, I., & Lucero-Prisno, D.",
      "year": "2020",
      "journal": "Pan African Medical Journal, 35",
      "doi": "10.11604/pamj.supp.2020.35.2.22703"
    }
  ]
},
{
  "id": "uzairue-leonard",
  "name": "Uzairue Leonard Ighodalo",
  "initials": "UL",
  "title": "Director of Operations",
  "position": 2,
  "profiles": [
    { "type": "LinkedIn", "url": "https://www.linkedin.com/in/uzairue-leonard-ighodalo/" },
    { "type": "ResearchGate", "url": "https://www.researchgate.net/profile/Uzairue-Leonard-Ighodalo" },
    { "type": "Google Scholar", "url": "https://scholar.google.com/citations?user=uzairue-leonard-ighodalo" },
    { "type": "ORCID", "url": "https://orcid.org/uzairue-leonard-ighodalo" }
  ],
  "bio": "Uzairue Leonard Ighodalo is a distinguished academic and researcher specializing in medical microbiology, antimicrobial resistance (AMR), and infectious disease epidemiology. With a PhD in Medical Microbiology and Public Health at the Federal University of Agriculture, Abeokuta, Leonard is a recipient of the prestigious NIHR & RSTMH grant for his groundbreaking research on COVID-19's impact on AMR in Nigeria.\n<br><br>\nLeonard's extensive research portfolio includes publications on Salmonella transmission dynamics, colistin resistance in Klebsiella pneumoniae, and surveillance systems for AMR in Africa.",
  "methods": [
    "Molecular Studies",
    "Systematic Reviews/Meta-Analyses",
    "Retrospective Cohort Studies",
    "Surveillance Data Analysis"
  ],
  "publications": [
    {
      "title": "Systematic Review Seroprevalence, Risk Factors and Maternal-Fetal Outcomes of Toxoplasma gondii in Pregnant Women from WHO Eastern Mediterranean Region: Systematic Review and Meta-Analysis",
      "authors": "Rabaan, A., Uzairue, L., Alfaraj, A., Halwani, M., Muzaheed, A., Alawfi, A., Alshengeti, A., Alkaabi, N., Alawad, E., Alhajri, M., Alwarthan, S., Alshukairi, A., Almuthree, S., Alsubki, R., Alshehri, N., Alissa, M., Albayat, H., Zaidan, T., Alagoul, H., & Alestad, J.",
      "year": "2023",
      "journal": "Pathogens, 12",
      "doi": "10.3390/pathogens12091157"
    },
    {
      "title": "Detection of Multidrug resistant cariogenic bacteria among Diabetic Patients attending a Tertiary Hospital in Ado Ekiti, South-Western, Nigeria",
      "authors": "Adewumi, F., Adegoke, A., Ojerinde, O., Uzairue, L., Okiki, A., & Ibeh, I.",
      "year": "2023",
      "journal": "ABUAD International Journal of Natural and Applied Sciences, 3, 61–69",
      "doi": "10.53982/aijnas.2023.0302.09-j"
    },
    {
      "title": "Antimicrobial resistance and virulence genes of invasive Salmonella enterica from children with bacteremia in north-central Nigeria",
      "authors": "Uzairue, L., Shittu, O., Ojo, O., Obuotor, T., Olanipekun, G., Ajose, T., Arogbonlo, R., Medugu, N., Ebruke, B., & Obaro, S.",
      "year": "2023",
      "journal": "SAGE Open Medicine, 11",
      "doi": "10.1177/20503121231175322"
    },
    {
      "title": "HIV Patients' Satisfaction with Pharmaceutical Care at a Nigerian Tertiary Healthcare Facility During the Covid-19 Pandemic",
      "authors": "Dalhatu Muhammad, A., Emmanuel, A., Ugwuonah, J., Okon, P., Aliyu, S., Uzairue, L., & Lucero-Prisno, D.",
      "year": "2023",
      "journal": "Journal of the International Association of Providers of AIDS Care, 22",
      "doi": "10.1177/23259582231159093"
    },
    {
      "title": "The potential impact of the COVID-19 pandemic on global antimicrobial and biocide resistance: an AMR Insights global perspective",
      "authors": "Hays, J., Kemp, A., Okechukwu, R., Murugaiyan, J., Ekwanzala, M., Alvarez, M., Paul Satyaseela, M., Iwu, C., Ballesté-Delpierre, C., Septimus, E., Mugisha, L., Fadare, J., Chaudhuri, S., Chibabhai, V., Rohini, J., Wadanamby, W., Daoud, Z., Xiao, Y., & Uzairue, L.",
      "year": "2023",
      "journal": "",
      "doi": ""
    },
    {
      "title": "Salmonella enterica Transmission and Antimicrobial Resistance Dynamics across One-Health Sector",
      "authors": "Uzairue, L., & Shittu, O.",
      "year": "2023",
      "journal": "",
      "doi": "10.5772/intechopen.109229"
    },
    {
      "title": "COVID-19 Laboratory Testing Capacity in 13 African Countries",
      "authors": "Adebisi, Y., Rabe, A., Alaran, A., Babatunde, A., Uzairue, L., & Lucero, E.",
      "year": "2023",
      "journal": "5",
      "doi": "10.23880/EIJ-16000214"
    },
    {
      "title": "Systematic review of surveillance systems for AMR in Africa",
      "authors": "Okolie, O., Igwe, U., Ismail, S., Uzairue, L., & Adukwu, E.",
      "year": "2022",
      "journal": "Journal of Antimicrobial Chemotherapy, 78",
      "doi": "10.1093/jac/dkac342"
    },
    {
      "title": "Global Prevalence of Colistin Resistance in Klebsiella pneumoniae from Bloodstream Infection: A Systematic Review and Meta-Analysis",
      "authors": "Uzairue, L., Rabaan, A., Adewumi, F., Okolie, O., Folorunso, J., Bakhrebah, M., Garout, M., Alfouzan, W., Halwani, M., Alamri, A., Halawani, S., Alshahrani, F., Hasan, A., Al Mutair, A., Alhumaid, S., Etafo, J., Utip, I., Odoh, I., & Uwaezuoke, N.",
      "year": "2022",
      "journal": "Pathogens, 11",
      "doi": "10.3390/pathogens11101092"
    },
    {
      "title": "Sex inequality in early initiation of breastfeeding in 24 sub-Saharan African countries: A multi-country analysis of Demographic and Health Surveys",
      "authors": "Bolarinwa, O., Ahinkorah, B., Arthur-Holmes, F., Aboagye, R., Ameyaw, E., Budu, E., Seidu, A.-A., Uzairue, L., & Yaya, S.",
      "year": "2022",
      "journal": "PLOS ONE, 17, 1–14",
      "doi": "10.1371/journal.pone.0267703"
    },
    {
      "title": "Antimicrobial resistance and virulence genes in Salmonella enterica serovars isolated from droppings of layer chicken in two farms in Nigeria",
      "authors": "Shittu, O., Uzairue, L., Ojo, O., Obuotor, T., Folorunso, J., Raheem‐Ademola, R., Olanipekun, G., Ajose, T., Medugu, N., Ebruke, B., & Obaro, S.",
      "year": "2022",
      "journal": "Journal of Applied Microbiology, 132",
      "doi": "10.1111/jam.15477"
    },
    {
      "title": "Nigeria's Polio Elimination Playbook: Lessons To Strengthening Health Systems For Other Eradicable Diseases",
      "authors": "Effiong, F., Akanno, I., Anosike, U., Kayode, A., Okon, A., Dada, G., Oke, G., Nwobodo, M., & Uzairue, L.",
      "year": "2021",
      "journal": "Global Biosecurity, 3",
      "doi": "10.31646/gbio.127"
    },
    {
      "title": "Prevalence, risk factors and impact of cellular immunity on intestinal parasitosis among people living with HIV at Auchi, Edo State, Nigeria",
      "authors": "Uzairue, L., Ogbena, M., Ikede, R., Aguda, O., Adebisi, Y., & Lucero-Prisno, D.",
      "year": "2021",
      "journal": "International Journal of STD & AIDS, 32",
      "doi": "10.1177/09564624211020984"
    },
    {
      "title": "The interplay between environmental factors, Vector Competence and vaccine immunodynamics as possible explanation of the 2019 Yellow fever Re-emergence in Nigeria",
      "authors": "Abdullahi, I., Abubakar, A., Emeribe, A., Umar, K., Adekola, H., Uzairue, L., Ghmaba, P., & Okwume, C.",
      "year": "2021",
      "journal": "New Microbes and New Infections, 41",
      "doi": ""
    },
    {
      "title": "Humoral immunological kinetics of severe acute respiratory syndrome coronavirus 2 infection and diagnostic performance of serological assays for coronavirus disease 2019: an analysis of global reports",
      "authors": "Emeribe, A., Abdullahi, I. N., Shuwa, H., Uzairue, L., Musa, S., Abubakar, A., Adekola, H., Bello, Z. M., Aliyu, D., Haruna, S., Usman, Y., Muhammad, Y., Gwarzo, A., Nwofe, J., Chiwar, H., Okwume, C., Sunday, A., Fasogbon, S., Olayemi, L., & Rogo, L.",
      "year": "2021",
      "journal": "International Health, 13, 1–35",
      "doi": "10.1093/inthealth/ihab005"
    },
    {
      "title": "Sero-survey of measles virus antibodies among symptomatic children attending Abuja Teaching Hospital, Nigeria",
      "authors": "Adekola, H., Abdullahi, I. N., Emeribe, A., Nafiu, F., Uzairue, L., Billyrose, O., & Shuwa, H.",
      "year": "2021",
      "journal": "16",
      "doi": ""
    },
    {
      "title": "Clinical characteristics of 4499 COVID-19 patients in Africa: A meta-analysis",
      "authors": "Olumade, T., & Uzairue, L.",
      "year": "2021",
      "journal": "Journal of Medical Virology, 93",
      "doi": "10.1002/jmv.26848"
    },
    {
      "title": "Ensuring Access to COVID-19 Vaccine among the Marginalized Populations in Africa",
      "authors": "Lucero-Prisno, D., Adebisi, Y., Uzairue, L., Yinka, A., Alaran, A., Izukanne, E., Jamgbadi, O., & Bolarinwa, O.",
      "year": "2021",
      "journal": "Public Health, 197",
      "doi": "10.1016/j.puhe.2021.01.008"
    },
    {
      "title": "Clinical characteristics of 4490 COVID-19 patients in Africa: A meta-analysis",
      "authors": "Olumade, T., & Uzairue, L.",
      "year": "2020",
      "journal": "",
      "doi": "10.1101/2020.10.20.20215905"
    },
    {
      "title": "The Interplay Between Epigenetics, Vector Competence and Vaccine Immunodynamics as a Possible Explanation for Recent Yellow Fever Resurgence in Nigeria Summary BACKGROUND",
      "authors": "Umar, K., Abubakar, A., Nasir, I., Emeribe, A., Babayo, A., Adekola, H., Mukhtar Danmusa, U., & Uzairue, L.",
      "year": "2020",
      "journal": "African Journal of Health Sciences, 32, 38-52",
      "doi": ""
    },
    {
      "title": "The Interplay Between Epigenetics, Vector Competence, and Vaccine Immunodynamics as a Possible Explanation for Recent Yellow Fever Resurgence in Nigeria",
      "authors": "Umar, K., Abubakar, A., Abdullahi, I. N., Emeribe, A., Babayo, A., Adekola, H., Mukhtar Danmusa, U., & Uzairue, L.",
      "year": "2020",
      "journal": "African Journal of Health Sciences, 32, 38–52",
      "doi": ""
    },
    {
      "title": "Transcriptomic dysregulations associated with SARS-CoV-2 infection in human nasopharyngeal and peripheral blood mononuclear cells",
      "authors": "Vilas Boas de Melo, C., Bhuiyan, M., Gatua, W., Kanyerezi, S., Uzairue, L., Abechi, P., Kumar, K., Rahmat, J., Giwa, A., Mwandira, G., Abisogun, M., George, E., Oluwapelumi, J., Ibironke, A., Olayemi, D., Rotimi, A., Aly, D., Abo-Elenein, M., Abubakar, R., & Carl, S.",
      "year": "2020",
      "journal": "",
      "doi": "10.1101/2020.09.09.289850"
    },
    {
      "title": "Tracking the epidemiology of epidemic meningitis in Nigeria, initial findings in the 2018 epidemic",
      "authors": "Medugu, N., Olanipekun, G., Okorie, C., Uzairue, L., Maishanu, S., Dogondaaj, A., Haliru Tambuwal, S., Ajose, T., Idiong, D., Ebruke, B., Haidar, N., Ojeifor, R., & Obaro, S.",
      "year": "2018",
      "journal": "",
      "doi": ""
    },
    {
      "title": "IMPACT OF GLOBALIZATION ON INFECTIOUS DISEASES AMONG FEMALES IN NIGERIA (Presented at WORDOC (Institute of Africa Studies)",
      "authors": "Uzairue, L., & Adewale, B.",
      "year": "2018",
      "journal": "",
      "doi": ""
    },
    {
      "title": "Prophylactic Activity and Haematological Changes in Swiss Albino Rats Treated with Diodia scandens and Phyllanthus amarus Crude Extracts",
      "authors": "Ojo, K. S., Adeoye, A., & Uzairue, L.",
      "year": "2018",
      "journal": "",
      "doi": ""
    },
    {
      "title": "Emerging Antibiotic Resistant Nosocomial Infection – Coagulase Negative Staphylococci Isolated From Patients in General Hospitals Within Suburban Areas of Delta State, Nigeria",
      "authors": "Ojo, K. S., Esumeh, F. I., Osanyinlusi, S. A., Ojerinde, O., & Uzairue, L.",
      "year": "2017",
      "journal": "Nigerian Journal of Microbiology, 37, 3676-3688",
      "doi": ""
    },
    {
      "title": "Determination of Human Parasitic Infestation on Fruits and Vegetables Sold in Ekpoma Markets, Edo State, Nigeria",
      "authors": "Okpala, H. O., Uzairue, L., Akhile, A., Aghatise, K., & Digban, K.",
      "year": "2016",
      "journal": "Asian Journal of Medical Sciences, 8, 10-14",
      "doi": "10.19026/ajms.8.2987"
    },
    {
      "title": "Comparative Study of Research Publication among Professionals in Nigeria: A Study of Engineers and Medical Laboratory Scientists in Edo Central, Edo State, Nigeria",
      "authors": "Uzairue, L.",
      "year": "2014",
      "journal": "Early Years: An International Journal of Research and Development, 3, 247-250",
      "doi": ""
    },
    {
      "title": "THE RELEVANCE OF INFORMATION AND COMMUNICATION TECHNOLOGIES IN LIBRARIES SERVICES AND LIBRARIANSHIP PROFESSION IN THE 21TH CENTURY",
      "authors": "Osawele, R.E., & Uzairue, L.I.",
      "year": "2013",
      "journal": "International Journal of Basic, Applied and Innovative Research, 2, 10-14",
      "doi": ""
    },
    {
      "title": "GASTRODISCOIDES HOMINIS INFESTATION ON VEGETABLES (CABBAGES) SOLD IN EKPOMA MARKETS, EDO STATE, SOUTHERN NIGERIA- A CASE REPORT",
      "authors": "Uzairue, Leonard",
      "year": "2013",
      "journal": "International Journal of Basic, Applied and Innovative Research, 2, 37-39",
      "doi": ""
    }
  ]
},
  // {
  //   id: 'uzairue-leonard',
  //   name: 'Uzairue Leonard Ighodalo',
  //   initials: 'UL',
  //   title: 'Director of Operations',
  //   position: 2, // Manager level
  //   profiles: [
  //     { type: 'LinkedIn', url: 'https://www.linkedin.com/in/uzairue-leonard-ighodalo/' },
  //     { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Uzairue-Leonard-Ighodalo' },
  //     { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=uzairue-leonard-ighodalo' },
  //     { type: 'ORCID', url: 'https://orcid.org/uzairue-leonard-ighodalo' }
  //   ],
  //   bio: `Uzairue Leonard Ighodalo is a distinguished academic and researcher specializing in medical microbiology, antimicrobial resistance (AMR), and infectious disease epidemiology. With a PhD in Medical Microbiology and Public Health at the Federal University of Agriculture, Abeokuta, Leonard is a recipient of the prestigious NIHR & RSTMH grant for his groundbreaking research on COVID-19's impact on AMR in Nigeria.
  //   <br><br>
  //   Leonard's extensive research portfolio includes publications on Salmonella transmission dynamics, colistin resistance in Klebsiella pneumoniae, and surveillance systems for AMR in Africa.`,
  //   methods: [
  //     'Molecular Studies',
  //     'Systematic Reviews/Meta-Analyses',
  //     'Retrospective Cohort Studies',
  //     'Surveillance Data Analysis'
  //   ],
  //   publications: [
  //     {
  //       title: 'Systematic Review Seroprevalence, Risk Factors and Maternal-Fetal Outcomes of Toxoplasma gondii in Pregnant Women from WHO Eastern Mediterranean Region: Systematic Review and Meta-Analysis',
  //       authors: 'Rabaan, A., Uzairue, L., Alfaraj, A., Halwani, M., Muzaheed, A., Alawfi, A., et al.',
  //       year: '2023',
  //       doi: '10.3390/pathogens12091157'
  //     },
  //     {
  //       title: 'Detection of Multidrug resistant cariogenic bacteria among Diabetic Patients attending a Tertiary Hospital in Ado Ekiti, South-Western, Nigeria',
  //       authors: 'Adewumi, F., Adegoke, A., Ojerinde, O., Uzairue, L., Okiki, A., & Ibeh, I.',
  //       year: '2023',
  //       doi: '10.53982/aijnas.2023.0302.09-j'
  //     },
  //     {
  //       title: 'Antimicrobial resistance and virulence genes of invasive Salmonella enterica from children with bacteremia in north-central Nigeria',
  //       authors: 'Uzairue, L., Shittu, O., Ojo, O., Obuotor, T., Olanipekun, G., Ajose, T., et al.',
  //       year: '2023',
  //       doi: '10.1177/20503121231175322'
  //     },
  //     {
  //       title: 'HIV Patients\' Satisfaction with Pharmaceutical Care at a Nigerian Tertiary Healthcare Facility During the Covid-19 Pandemic',
  //       authors: 'Dalhatu Muhammad, A., Emmanuel, A., Ugwuonah, J., Okon, P., Aliyu, S., Uzairue, L., & Lucero-Prisno, D.',
  //       year: '2023',
  //       doi: '10.1177/23259582231159093'
  //     },
  //     {
  //       title: 'The potential impact of the COVID-19 pandemic on global antimicrobial and biocide resistance: an AMR Insights global perspective',
  //       authors: 'Hays, J., Kemp, A., Okechukwu, R., Murugaiyan, J., Ekwanzala, M., Alvarez, M., et al.',
  //       year: '2023'
  //     }
  //   ]
  // },
  // {
  //   id: 'goodness-odey',
  //   name: 'Goodness Odey',
  //   initials: 'GO',
  //   title: 'Director of Research and Director (Global Health Portfolio)',
  //   position: 3, // Director level
  //   profiles: [
  //     { type: 'LinkedIn', url: 'https://www.linkedin.com/in/goodness-ogeyi-odey/' },
  //     { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Goodness-Ogeyi-Odey' },
  //     { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=goodness-ogeyi-odey' },
  //     { type: 'ORCID', url: 'https://orcid.org/goodness-ogeyi-odey' }
  //   ],
  //   bio: `Goodness Ogeyi Odey is a Global Public Health Practitioner committed to strengthening health systems and promoting equitable engagement to achieve sustainable development and universal health coverage, particularly in resource-constrained settings. She holds an MSc in Health Policy, Planning, and Financing from the London School of Hygiene and Tropical Medicine (LSHTM) and the London School of Economics and Political Science (LSE).
  //   <br><br>
  //   At the age of 24, Goodness was honored with the prestigious 2022 Princesa Diana Award, the highest accolade for young people's social action, recognizing her significant contributions to health equity in Africa.`,
  //   methods: [
  //     'Cross-Country Comparative Studies',
  //     'Qualitative Case Studies',
  //     'Literature Synthesis',
  //     'Survey Research'
  //   ],
  //   publications: [
  //     {
  //       title: 'Top 10 Public Health Challenges for 2024: Charting a New Direction for Global Health Security',
  //       authors: 'III, D., Shomuyiwa, D., Kouwenhoven, M. B. N., Dorji, T., Adebisi, Y., Odey, G., et al.',
  //       year: '2024',
  //       doi: '10.1002/puh2.70022'
  //     },
  //     {
  //       title: 'Public Health Word of the Year 2023 — Conflict',
  //       authors: 'Lucero-Prisno, D., Ogaya, J., Shomuyiwa, D., Adebisi, Y., Kouwenhoven, M. B. N., Ogunkola, I., Odey, G., et al.',
  //       year: '2024',
  //       doi: '10.1002/puh2.220'
  //     },
  //     {
  //       title: 'Transforming adolescent menstrual health through policy: the role of value added tax exemptions in improving access to sanitary products',
  //       authors: 'Shomuyiwa, D., Odey, G., Ndep, A., Ekerin, O., Amesho, J., Luvindao, E., Manirambona, E., & III, D.',
  //       year: '2024',
  //       doi: '10.1186/s41256-024-00358-x'
  //     },
  //     {
  //       title: 'Reusable Pads: A Sustainable and Affordable Solution to Addressing Period Poverty in Nigeria',
  //       authors: 'Kuponiyi, S., Egwu, K., Ezema, M., Amusile, O., Victor, C., Ogochukwu Onukansi, F., Sunday, B., & Odey, G.',
  //       year: '2024',
  //       doi: '10.22541/au.171051556.60017362/v1'
  //     },
  //     {
  //       title: 'Gender Dimension of Disasters in Africa',
  //       authors: 'Odey, G., Sarah, O., Alhaj, S., & Lucero-Prisno, D.',
  //       year: '2023',
  //       doi: '10.4324/9781003140245-10'
  //     }
  //   ]
  // },
  {
    id: 'sherifat-oriza',
    name: 'Sherifat Oriza',
    initials: 'SO',
    title: 'Director of Communications',
    position: 4, // Director level
    profiles: [
      { type: 'LinkedIn', url: 'https://www.linkedin.com/in/sherifat-oriza/' }
    ],
    bio: `Sherifat Oriza is a Communications expert and dedicated Medical Laboratory Scientist, a graduate of Kwara State University, Malete, who seamlessly blends her scientific expertise with a passion for impactful communication. Initially torn between her love for life-saving science and the art of communication, she discovered the powerful intersection of these fields in health communications.
    <br><br>
    Her interests extend beyond the lab, encompassing global health, with a focus on research into infectious diseases and antimicrobial resistance, alongside molecular biology, health system strengthening, and infection prevention and control (IPC).`,
    methods: [],
    publications: []
  },
  // {
  //   id: 'olivier-sibomana',
  //   name: 'Olivier Sibomana',
  //   initials: 'OS',
  //   title: 'Research and Publications Manager',
  //   position: 5, // Manager level
  //   profiles: [
  //     { type: 'LinkedIn', url: 'https://www.linkedin.com/in/olivier-sibomana/' },
  //     { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Olivier-Sibomana' },
  //     { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=olivier-sibomana' },
  //     { type: 'ORCID', url: 'https://orcid.org/olivier-sibomana' }
  //   ],
  //   bio: `Olivier Sibomana is a medical doctor candidate at the University of Rwanda, with a burgeoning career as a researcher in the fields of public health, health technology, molecular medicine, and translational research. He possesses strong leadership and research skills, demonstrated through his leadership roles such as serving as the Student Executive Committee Leader at the Foresight Institute of Research and Translation (FIRAT Rwanda), and as the Director of Research and Medical Content for both Meditechy Rwanda and the AMR Initiative Rwanda.
  //   <br><br>
  //   Sibomana has contributed to major research projects, including his roles as a research assistant and collaborator in initiatives such as the Assessing Genomic Diversity in Africa (AgenDA) project and Newborn Hearing Screening and Genetic Screening in Rwanda (NBHS-Rwanda).`,
  //   methods: [
  //     'Diagnostic Accuracy Studies',
  //     'Scoping Reviews',
  //     'Retrospective Hospital-Based Studies',
  //     'Perspective/Policy Papers'
  //   ],
  //   publications: [
  //     {
  //       title: 'Understanding Health Inequality, Disparity and Inequity in Africa: A Rapid Review of Concepts, Root Causes, and Strategic Solutions',
  //       authors: 'Oke, G., & Sibomana, O.',
  //       year: '2025',
  //       doi: '10.1002/puh2.70040'
  //     },
  //     {
  //       title: 'Adoption of Digital Health Technology in Nigeria: A Scoping Review of Current Trends and Future Directions',
  //       authors: 'Oke, G., & Sibomana, O.',
  //       year: '2025',
  //       doi: '10.1155/adph/4246285'
  //     },
  //     {
  //       title: 'Diagnostic accuracy of ECG smart chest patches versus PPG smartwatches for atrial fibrillation detection: a systematic review and meta-analysis',
  //       authors: 'Sibomana, O., Hakayuwa, C. M., Gahire, H., Munyantore, J., & Chilala, M.',
  //       year: '2025',
  //       doi: '10.1186/s12872-025-04582-2'
  //     },
  //     {
  //       title: 'The Prevalence and Management of Aerodigestive Foreign Bodies at Rwanda Military Hospital: A Six-years Retrospective Study',
  //       authors: 'Bukuru, J., Ngirinshuti, A., Kamanda, P., Kananga, W., Mukomeza, C., & Sibomana, O.',
  //       year: '2025',
  //       doi: '10.2147/OAEM.S493458'
  //     },
  //     {
  //       title: 'Assessing the knowledge, attitudes, and perceptions toward smoking cessation among medical students in Rwanda',
  //       authors: 'Oke, G., Sibomana, O., Ainebyona, A., Utaka, E., & Adebisi, Y.',
  //       year: '2025',
  //       doi: '10.21203/rs.3.rs-5891044/v1'
  //     }
  //   ]
  // },
  {
  "id": "olivier-sibomana",
  "name": "Olivier Sibomana",
  "initials": "OS",
  "title": "Research and Publications Manager",
  "position": 5,
  "profiles": [
    { "type": "LinkedIn", "url": "https://www.linkedin.com/in/olivier-sibomana/" },
    { "type": "ResearchGate", "url": "https://www.researchgate.net/profile/Olivier-Sibomana" },
    { "type": "Google Scholar", "url": "https://scholar.google.com/citations?user=olivier-sibomana" },
    { "type": "ORCID", "url": "https://orcid.org/olivier-sibomana" }
  ],
  "bio": `
     Olivier Sibomana is a doctor of medicine with a burgeoning career as a researcher in public health, health technology, molecular medicine, and translational research. He has authored several peer-reviewed articles in reputable journals across these fields. In addition to his academic contributions, he possesses strong leadership and communication skills, and is well-versed in various research methodologies and data analytics, engaging in multidisciplinary research with both rigor and relevance.

     Sibomana also serves as a peer reviewer for several reputable journals published by leading academic publishers such as Elsevier, Wiley, MDPI, and the Public Library of Science (PLOS). He firmly believes that through research, existing gaps can be identified and meaningfully addressed—paving the way for creativity, innovation, and sustainable solutions.
  `,
  "methods": [
    "Diagnostic Accuracy Studies",
    "Scoping Reviews",
    "Retrospective Hospital-Based Studies",
    "Perspective/Policy Papers"
  ],
  "publications": [
    {
      "title": "Understanding Health Inequality, Disparity and Inequity in Africa: A Rapid Review of Concepts, Root Causes, and Strategic Solutions",
      "authors": "Oke, G., & Sibomana, O.",
      "year": "2025",
      "journal": "Public Health Challenges, 4",
      "doi": "10.1002/puh2.70040"
    },
    {
      "title": "Adoption of Digital Health Technology in Nigeria: A Scoping Review of Current Trends and Future Directions",
      "authors": "Oke, G., & Sibomana, O.",
      "year": "2025",
      "journal": "Advances in Public Health, 2025",
      "doi": "10.1155/adph/4246285"
    },
    {
      "title": "Diagnostic accuracy of ECG smart chest patches versus PPG smartwatches for atrial fibrillation detection: a systematic review and meta-analysis",
      "authors": "Sibomana, O., Hakayuwa, C. M., Gahire, H., Munyantore, J., & Chilala, M.",
      "year": "2025",
      "journal": "BMC Cardiovascular Disorders, 25, 132",
      "doi": "10.1186/s12872-025-04582-2"
    },
    {
      "title": "The Prevalence and Management of Aerodigestive Foreign Bodies at Rwanda Military Hospital: A Six-years Retrospective Study",
      "authors": "Bukuru, J., Ngirinshuti, A., Kamanda, P., Kananga, W., Mukomeza, C., & Sibomana, O.",
      "year": "2025",
      "journal": "Open Access Emergency Medicine, 17, 137-147",
      "doi": "10.2147/OAEM.S493458"
    },
    {
      "title": "Assessing the knowledge, attitudes, and perceptions toward smoking cessation among medical students in Rwanda",
      "authors": "Oke, G., Sibomana, O., Ainebyona, A., Utaka, E., & Adebisi, Y.",
      "year": "2025",
      "journal": "",
      "doi": "10.21203/rs.3.rs-5891044/v1"
    },
    {
      "title": "Routine malaria vaccination in Africa: a step toward malaria eradication?",
      "authors": "Sibomana, O., Bukuru, J., Saka, S., Mwangi, A., Oluwo, D., Bueh, L., Agbelemoge, B., & Oveh, R.",
      "year": "2025",
      "journal": "Malaria Journal, 24",
      "doi": "10.1186/s12936-024-05235-z"
    },
    {
      "title": "Knowledge, Attitude, and Practices of Antibiotic Usage and Resistance among People Attending Primary Healthcare in Rwanda",
      "authors": "Ndayisenga, J., Tuyishime, O., Sibomana, O., Kwizera, P., Niyompano, H., Hakizayezu, F., & Fitch, M.",
      "year": "2024",
      "journal": "Rwanda Journal of Medicine and Health Sciences, 7, 454-470",
      "doi": "10.4314/rjmhs.v7i3.7"
    },
    {
      "title": "Genetic Diversity Landscape in African Population: A Review of Implications for Personalized and Precision Medicine",
      "authors": "Sibomana, O.",
      "year": "2024",
      "journal": "Pharmacogenomics and Personalized Medicine, 17, 487-496",
      "doi": "10.2147/PGPM.S485452/"
    },
    {
      "title": "Could virtual reality be a solution in surgical trainings in resource-restricted settings? A perspective",
      "authors": "Sibomana, O.",
      "year": "2024",
      "journal": "Surgery Open Science, 21, 14-16",
      "doi": "10.1016/j.sopen.2024.08.004"
    },
    {
      "title": "Artificial intelligence in medicine: advantages and disadvantages for today and the future",
      "authors": "Salomon, I., & Sibomana, O.",
      "year": "2024",
      "journal": "International Journal of Surgery Open, 62",
      "doi": "10.1097/IO9.0000000000000133"
    },
    {
      "title": "Advancing Hepatitis C Elimination in Africa: Insights from Egypt",
      "authors": "Salomon, I., Sibomana, O., & Ndayambaje, E.",
      "year": "2024",
      "journal": "Hepatic Medicine Evidence and Research, 2024, 37-44",
      "doi": "10.2147/HMER.S470344"
    },
    {
      "title": "Prevalence of post‐caesarean section surgical site infections in Rwanda: A systematic review and meta‐analysis",
      "authors": "Sibomana, O., Bugenimana, A., Oke, G., & Ndayambaje, E.",
      "year": "2024",
      "journal": "International Wound Journal, 21",
      "doi": "10.1111/iwj.14929"
    },
    {
      "title": "Advancing Hepatitis C Elimination in Africa: Insights from Egypt",
      "authors": "Salomon, I., & Sibomana, O.",
      "year": "2024",
      "journal": "",
      "doi": "10.20944/preprints202403.0935.v1"
    },
    {
      "title": "Addressing the evolving outbreak of Mpox disease in the Democratic Republic of Congo: Risk factors, challenges, and recommendations",
      "authors": "Sibomana, O., & Ndayambaje, E.",
      "year": "2024",
      "journal": "",
      "doi": "10.22541/au.171002795.59908317/v1"
    },
    {
      "title": "The meningitis outbreak returns to Niger: Concern, efforts, challenges and recommendations",
      "authors": "Sibomana, O., Hakayuwa, C., & Hakayuwa, C. M.",
      "year": "2024",
      "journal": "",
      "doi": "10.22541/au.170663699.98484836/v1"
    }
  ]
},
  {
    id: 'fadele-precious',
    name: 'Fadele Precious Kehinde',
    initials: 'FP',
    title: 'Research Manager',
    position: 6, // Manager level
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
    "publications": [
    {
      "title": "Revolutionizing aneurysm risk prediction: artificial intelligence's promise and challenges",
      "authors": "Okon, I., Fadele, K., Chaurasia, B., Mbong, E., John, O. O., Kankam, S., Akpan, U., & III, D.",
      "year": "2025",
      "journal": "Annals of Medicine and Surgery, 87",
      "doi": "10.1097/MS9.0000000000002917"
    },
    {
      "title": "Neurotrauma in sports: concussion and chronic traumatic encephalopathy (CTE)",
      "authors": "Fadele, K., Igwe, S., Egbo, K., Ernest, A., Somto, O., III, D., & Chaurasia, B.",
      "year": "2025",
      "journal": "Discover, 2",
      "doi": "10.1007/s44337-025-00206-y"
    },
    {
      "title": "December Editor's choice article \"The Evolving Role of Palliative Care in Older People with Glioblastoma\"",
      "authors": "Okon, I., Osama, M., Akpan, A., Paleare, L. F., Ferreira, M. Y., Shafqat, M. D., Razouqi, Y., James, E., Omer, M., Ja'afar, I., Chaurasia, B., Iqbal, M., Balogun, S., Maidan, A., Jakhar, M., Fadele, K., Gbayisomore, T., & III, D.",
      "year": "2024",
      "journal": "World Neurosurgery",
      "doi": "10.1016/S1878-8750(24)01857-6"
    },
    {
      "title": "Addressing Mental Health in Africa: Integrating Mental Health First Aid Initiatives",
      "authors": "Fadele, K., Ayuba, D., Igwe, S., Kolawole, E., Bianca, N., Owhor, G., Ogaya, J., & Lucero-Prisno, D. E.",
      "year": "2024",
      "journal": "",
      "doi": "10.22541/au.173217242.26089066/v1"
    },
    {
      "title": "The Current State of Spina Bifida in Low- and Middle-Income Countries: Where Does Africa Stand?",
      "authors": "Okon, I., Temitope, A., Ogundele, I., Akpan, U., Mbong, E., Kasimieh, O., Chaurasia, B., James, E., Gbadebo, E., Fadele, K., Jader, A., John, O. O., Karmani, V., Erhayanmen, M., & III, D.",
      "year": "2024",
      "journal": "Neurochirurgie, 71",
      "doi": "10.1016/j.neuchi.2024.101616"
    },
    {
      "title": "Exploring Immunotherapeutic Strategies For Bacterial And Viral Diseases: Recent Advances, Challenges And Future Perspectives",
      "authors": "Adedokun, A., Adigun, O., Muhammad Ibrahim, A., Idris, I., Ntasin, P. Y., Olowu, B., Ikele, C., & Fadele, K.",
      "year": "2024",
      "journal": "",
      "doi": "10.20944/preprints202411.0105.v1"
    },
    {
      "title": "Neurosurgical interventions in epilepsy management",
      "authors": "Fadele, K., Egbo, K., III, D., & Chaurasia, B.",
      "year": "2024",
      "journal": "Neurosurgical Review, 47",
      "doi": "10.1007/s10143-024-03036-1"
    },
    {
      "title": "The Evolving Role of Palliative Care in Older People with Glioblastoma",
      "authors": "Okon, I., Osama, M., Akpan, A., Paleare, L. F., Ferreira, M. Y., Shafqat, M. D., Razouqi, Y., James, E., Omer, M., Ja'afar, I., Chaurasia, B., Iqbal, M., Balogun, S., Maidan, A., Jakhar, M., Fadele, K., Gbayisomore, T., & Lucero-Prisno, D.",
      "year": "2024",
      "journal": "World Neurosurgery",
      "doi": "10.1016/j.wneu.2024.09.125"
    },
    {
      "title": "Obstacle to Neurosurgery residency: Research perspective in early age of career",
      "authors": "Fadele, K., & Chaurasia, B.",
      "year": "2024",
      "journal": "Neurosurgical Review, 47",
      "doi": "10.1007/s10143-024-02895-y"
    },
    {
      "title": "Reducing the burden of repeated ventriculo-peritoneal shunt surgery and infection in low and middle income country",
      "authors": "Fadele, K., & Chaurasia, B.",
      "year": "2024",
      "journal": "Neurosurgical Review, 47",
      "doi": "10.1007/s10143-024-02712-6"
    },
    {
      "title": "Influence of Social Media in Attracting Future Neurosurgeons to Neurosurgery",
      "authors": "Fadele, K., Marappan, K., & Chaurasia, B.",
      "year": "2024",
      "journal": "Annals of Medicine and Surgery, 86",
      "doi": "10.1097/MS9.0000000000002405"
    },
    {
      "title": "Strengthening neurosurgical training programs in Sub-saharan Africa: a medical student's perspective",
      "authors": "Okon, I., Akilimali, A., Chisvo, N., Al-Lami, B., Sebopelo, L., Gbayisomore, T., Masunga, D., Edet, E., John, O. O., Ewelike, S., III, D., Elijah Temitope, A., Nkansah-Poku, K., Bello, M., Fadele, K., & Erhayanmen, M.",
      "year": "2024",
      "journal": "Neurosurgical Review, 47",
      "doi": "10.1007/s10143-024-02469-y"
    },
    {
      "title": "Understanding the root of healing and beyond: Exploring the way forward for Alternative Medicine in Nigeria",
      "authors": "Ayuba, D., Fadele, K., Ogaya, J., Kolawole, E., Sharma, S., Lucero-Prisno, E., & Iii,.",
      "year": "2024",
      "journal": "Bhutan Sorig Journal, 1",
      "doi": "10.47811/bsj.0004050304"
    },
    {
      "title": "Global Neurosurgical Challenges: A Focus on Central Asia",
      "authors": "Okon, I., Akpan, U., III, D., Bankole, N., Shafqat, M. D., Rehman, I., Shafqat, M., Gbayisomore, T., Atallah, O., Maidan, A., Fadele, K., Musa, M., Ibrahim, M., Omer, M., Dzhusupov, K., Ermakhanfm, Z., Tygotov, T., Otaki, A., Toguzbaeva, K., & Chaurasia, B.",
      "year": "2024",
      "journal": "World Neurosurgery",
      "doi": "10.1016/j.wneu.2024.05.067"
    },
    {
      "title": "Mental health challenges in Nigeria: Bridging the gap between demand and resources",
      "authors": "Fadele, K., Igwe, S., Toluwalogo, N.-O., Udokang, E., Ogaya, J., & Lucero-Prisno, D.",
      "year": "2024",
      "journal": "Cambridge Prisms: Global Mental Health, 11",
      "doi": "10.1017/gmh.2024.19"
    }
  ]
  },
  {
  "id": "esther-bassey",
  "name": "Esther Bassey",
  "initials": "EB",
  "title": "Research Associate",
  "position": 7,
  "profiles": [
    { "type": "LinkedIn", "url": "https://www.linkedin.com/in/esther-bassey/" },
    { "type": "ResearchGate", "url": "https://www.researchgate.net/profile/Esther-Basseyi" },
    { "type": "Google Scholar", "url": "https://scholar.google.com/citations?user=esther-bassey" },
    { "type": "ORCID", "url": "https://orcid.org/esther-bassey" }
  ],
  "bio": "Esther Bassey is an aspiring neuroscientist with interests in neuropharmacology, neuropsychiatry, digital health, and public health. She holds a Bachelor of Science in Medical Physiology from the University of Uyo, Nigeria, and has co-authored over ten peer-reviewed publications, contributing to neuroscience and global health. As a student editor for the International Journal of Medical Students (IJMS) and a reviewer for international journals, she actively advances medical research. She has interned at the Donders Institute for Brain, Cognition, and Behaviour, Radboud University, Netherlands, further deepening her expertise in neurobiology.\n<br><br>\nEsther has earned recognition as a two-time finalist in the iPitch Competition (Portugal) and secured second place at the Young European Scientist (YES) Meeting's Breakthrough Competition by Novartis. Her work in mental health awareness and public health aligns with her commitment to Sustainable Development Goal 3 (Good Health and Well-being). She has also participated in the British Medical Journal (BMJ) Summer Work Experience and interned with the West African Institute of Public Health, reinforcing her dedication to medical research and advocacy.",
  "methods": [
    "Systematic Reviews",
    "Bibliometric Analyses",
    "Narrative Reviews",
    "Secondary Data Analysis",
    "Survey Research",
    "Epidemiological Studies"
  ],
  "publications": [
    {
      "title": "The role of membrane trafficking and retromer complex in Parkinson's and Alzheimer's disease",
      "authors": "Abdul-Rahman, T., Ghosh, S., Kalmanovich, J., Wireko, A. A., Zivcevska, M., Khalifa, S., Bassey, E., Ali, N., Ferreira, M., Umar, T. P., Garg, N., Nweze, V., Inturu, V., Abdelwahab, M., Kurian, S., Alexiou, A., Alfaleh, M., Alqurashi, T., & Ashraf, G.",
      "year": "2023",
      "journal": "Journal of Neuroscience Research, 102",
      "doi": "10.1002/jnr.25261"
    },
    {
      "title": "The current state, advancements and challenges of neurosurgical care in Rwanda - a short report",
      "authors": "Okon, I., Rehman, I., Oduoye, M., Akilimali, A., Byiringiro, E., Akpan, U., Bassey, E., Vérité Cyubahiro, Florence Umutoni, & Nkeshimana, M.",
      "year": "2024",
      "journal": "Neurosurgical Review, 47",
      "doi": "10.1007/s10143-024-02453-6"
    },
    {
      "title": "Awareness, Coverage, and Barriers to COVID-19 Vaccination Among Undergraduate Students in Nigeria",
      "authors": "Effiong, F., Hassan, I., Olawuyi, D., Prosper, C., Araoye, J., Bassey, E., Enwerem, K., & Adebisi, Y.",
      "year": "2023",
      "journal": "International Journal of Medical Students, S106",
      "doi": "10.5195/ijms.2023.2376"
    },
    {
      "title": "Utility of Machine learning in the Management of Normal Pressure Hydrocephalus (NPH): A Systematic Review",
      "authors": "Pahwa, B., Tayal, A., Shukla, A., Soni, U., Gupta, N., Bassey, E., & Sharma, M.",
      "year": "2023",
      "journal": "World Neurosurgery, 177",
      "doi": "10.1016/j.wneu.2023.06.080"
    },
    {
      "title": "Global Needs and Barriers for Medical Research Education: Initiatives to Solve the Physician-Scientist Shortage",
      "authors": "Schneider, M., Elsayid, A., Bassey, E., Găman, M.-A., Egan, C., Puyana, J., & Bonilla Escobar, F.",
      "year": "2023",
      "journal": "The International Journal of Medical Students, 11, 9-12",
      "doi": "10.5195/ijms.2023.2011"
    },
    {
      "title": "Prospects of malaria vaccination in Nigeria: Anticipated challenges and lessons from previous vaccination campaigns",
      "authors": "Effiong, F., Makata, V., Bassey, E., Salachi, K., Sagide, M., Abdulameed, H., & Uwishema, O.",
      "year": "2022",
      "journal": "Annals of Medicine and Surgery",
      "doi": "10.1016/j.amsu.2022.104385"
    },
    {
      "title": "COVID-19 and Poverty in South America: the Mental Health Implications",
      "authors": "Bassey, E., Gupta, A., Kapoor, A., & Bansal, A.",
      "year": "2022",
      "journal": "International Journal of Mental Health and Addiction, 21",
      "doi": "10.1007/s11469-022-00765-6"
    },
    {
      "title": "Typhoid Fever and COVID-19 Pandemic in Nigeria: A Call for Coordinated Action",
      "authors": "Bassey, E., Hasan, M. M., dos Santos Costa, A. C., Τsagkaris, C., Aborode, A., Karra-Aly, A., Essar, M., & Ahmad, S.",
      "year": "2021",
      "journal": "Einstein (São Paulo)",
      "doi": "10.31744/einstein_journal/2021CE6796"
    },
    {
      "title": "Malnutrition and the mental health of children: the sub-Saharan Africa perspective",
      "authors": "Bassey, E., dos Santos Costa, A. C., Adnan, A., Xenophontos, E., Phadke, R., Ahmed, S., Ahmad, S., Essar, M., & Yasmin, F.",
      "year": "2021",
      "journal": "Pan African Medical Journal",
      "doi": "10.11604/pamj-oh.2021.6.7.29586"
    },
    {
      "title": "Floods, landslides and COVID-19 in the Uttarakhand State, India: Impact of Ongoing Crises on Public Health",
      "authors": "Corriero, A., Khan, F., Bassey, E., Bouaddi, O., dos Santos Costa, A. C., Outani, O., Ahmad, S., Essar, M., & Hasan, M. M.",
      "year": "2021",
      "journal": "Disaster Medicine and Public Health Preparedness",
      "doi": "10.1017/dmp.2021.373"
    },
    {
      "title": "Lassa Fever and COVID-19 in Africa: A double crisis on the fragile health system",
      "authors": "Hasan, M. M., dos Santos Costa, A. C., Xenophontos, E., Mohanan, P., Bassey, E., Ahmad, S., & Essar, M.",
      "year": "2021",
      "journal": "Journal of Medical Virology, 93",
      "doi": "10.1002/jmv.27169"
    },
    {
      "title": "Drug Supply Shortage in India during COVID-19 Pandemic: Efforts and Challenges",
      "authors": "Dapke, K., Phadke, R., Rocha, I. C., dos Santos Costa, A. C., Ahmad, S., Essar, M., Menon, V., Bassey, E., Malhotra, K., & Shah, J.",
      "year": "2021",
      "journal": "HPHR Journal, 31",
      "doi": "10.54111/0001/EE7"
    },
    {
      "title": "Pandemic Preparedness Strategies with an Eye on Displaced Populations in Yemen: Efforts and Challenges on Hand",
      "authors": "Miranda, A., Mohan, A., dos Santos Costa, A. C., Hussaini, M., Adnan, A., Dapke, K., Phadke, R., Bassey, E., Ahmed, S., Essar, M., Ahmad, S., Τsagkaris, C., Aborode, A., & Hashim, H.",
      "year": "2021",
      "journal": "31",
      "doi": "10.54111/0001/EE12"
    },
    {
      "title": "COVID-19 and its impacts: The situation in Niger republic",
      "authors": "Emmanuella, N., Udofa, E., Musa, S., Marc, M., David, S., Bassey, E., Essar, M., Adebisi, Y., & Lucero-Prisno, D.",
      "year": "2021",
      "journal": "Clinical Epidemiology and Global Health, 100797",
      "doi": "10.1016/j.cegh.2021.100797"
    },
    {
      "title": "Climate change drives mass migration and threatens migrants' health: Is there a way out?",
      "authors": "Hasan, M. M., Ghosh, S., dos Santos Costa, A. C., Τsagkaris, C., Phadke, R., Bassey, E., Essar, M., Ahmad, S., & Shariful Islam, S. M.",
      "year": "2021",
      "journal": "Ethics, Medicine and Public Health, 18",
      "doi": "10.1016/j.jemep.2021.100671"
    },
    {
      "title": "COVID‐19 and Zika: An emerging dilemma for Brazil",
      "authors": "dos Santos Costa, A. C., Hasan, M. M., Xenophontos, E., Mohanan, P., Bassey, E., Hashim, H., Ahmad, S., & Essar, M.",
      "year": "2021",
      "journal": "Journal of Medical Virology, 93",
      "doi": "10.1002/jmv.27006"
    }
  ]
},
  // {
  //   id: 'adebisi-yusuf',
  //   name: 'Adebisi Yusuf',
  //   initials: 'AY',
  //   title: 'Research Consultant and Publications Manager',
  //   position: 7, // Consultant level
  //   profiles: [
  //     { type: 'LinkedIn', url: 'https://www.linkedin.com/in/yusuff-adebayo-adebisi/' },
  //     { type: 'ResearchGate', url: 'https://www.researchgate.net/profile/Yusuff-Adebayo-Adebisi' },
  //     { type: 'Google Scholar', url: 'https://scholar.google.com/citations?user=yusuff-adebayo-adebisi' },
  //     { type: 'ORCID', url: 'https://orcid.org/yusuff-adebayo-adebisi' }
  //   ],
  //   bio: `Yusuff Adebayo Adebisi is a distinguished global health professional, pharmacist, epidemiologist, and health systems researcher dedicated to advancing public health through research, innovative solutions, and impactful advocacy. He holds a pharmacy degree from the University of Ibadan and an MSc in Global Health Science and Epidemiology from the University of Oxford, where he was a Commonwealth Shared Scholar.
  //   <br><br>
  //   A prolific researcher, Yusuff has authored over 250 journal articles and contributed to seven book chapters, earning recognition as one of Nigeria's top 100 researchers. His pioneering contributions to COVID-19 research were highlighted in a 2023 bibliometric review, identifying him as Nigeria's leading contributor to COVID-19 publications.`,
  //   methods: [
  //     'Bibliometric Analyses',
  //     'Narrative Reviews',
  //     'Secondary Data Analysis',
  //     'Cross-Country Comparative Studies',
  //     'Qualitative Case Studies',
  //     'Literature Synthesis',
  //     'Survey Research',
  //     'Multi-Country Collaborations'
  //   ],
  //   publications: [
  //     {
  //       title: 'Left behind no more: ensuring equitable vaccine access to curb mpox in Africa',
  //       authors: 'Bolarinwa, O., Mohammed, A., Adebisi, Y., & Oyewo, O.',
  //       year: '2025',
  //       doi: '10.1093/inthealth/ihaf018'
  //     },
  //     {
  //       title: 'Antibiotic Use and Misuse in Maritime Settings: Challenges and Implications for Global Antimicrobial Resistance Response',
  //       authors: 'Shao, L., Adebisi, Y., & Adeola, Q.',
  //       year: '2025',
  //       doi: '10.1007/s11908-025-00860-4'
  //     },
  //     {
  //       title: 'Determinants of knowledge of risks associated with cigarette smoking among adolescents in Scotland',
  //       authors: 'Adebisi, Y., Ogunkola, I., Alshahrani, N., Jimoh, N., & Ilesanmi, O.',
  //       year: '2025',
  //       doi: '10.1093/eurpub/ckaf024'
  //     },
  //     {
  //       title: 'Measuring and addressing violence against women with disabilities in Africa',
  //       authors: 'Odimegwu, C., Bolarinwa, O., & Adebisi, Y.',
  //       year: '2025',
  //       doi: '10.4102/ajod.v14i0.1576'
  //     },
  //     {
  //       title: 'Understanding Research Gaps and Priorities for Tobacco Harm Reduction in Low-Income and Middle-Income Countries',
  //       authors: 'Adebisi, Y., Lungu, S., Curado, A., Oke, G., & Yach, D.',
  //       year: '2025',
  //       doi: '10.2139/ssrn.5149050'
  //     }
  //   ]
  // }
]);

const searchQuery = ref('');
const expandedMembers = ref<string[]>([]);
const showBackToTop = ref(false);
const isDarkMode = ref(false);
const isSearchOpen = ref(false);

// Computed properties - SIMPLIFIED to just sort by position
const sortedTeamMembers = computed(() => {
  let result = [...teamMembers.value];
  
  // Apply search filter if there's a query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(member => {
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
  }
  
  // Always sort by position (role)
  return result.sort((a, b) => a.position - b.position);
});

// Methods
const togglePublications = (memberId: string) => {
  if (expandedMembers.value.includes(memberId)) {
    expandedMembers.value = expandedMembers.value.filter(id => id !== memberId);
  } else {
    expandedMembers.value.push(memberId);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const getProfileButtonClass = (type: string) => {
  switch (type) {
    case 'LinkedIn':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-cream-200 dark:hover:bg-blue-800';
    case 'ResearchGate':
      return 'bg-light-green-100 text-blue-800 hover:bg-light-green-200 dark:bg-blue-900 dark:text-cream-200 dark:hover:bg-blue-800';
    case 'Google Scholar':
      return 'bg-cream-100 text-blue-800 hover:bg-cream-200 dark:bg-blue-900 dark:text-cream-200 dark:hover:bg-blue-800';
    case 'ORCID':
      return 'bg-light-green-100 text-blue-800 hover:bg-light-green-200 dark:bg-blue-900 dark:text-cream-200 dark:hover:bg-blue-800';
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
});

// Reset expanded members when search changes
watch(searchQuery, () => {
  expandedMembers.value = [];
});
</script>

<style>
/* Brand Colors */
:root {
  --color-light-green: #B5D89B;
  --color-blue: #3A6E9F;
  --color-cream: #F0E6C9;
}

/* Tailwind CSS Custom Colors */
.bg-light-green-50 { background-color: #f2f8ed; }
.bg-light-green-100 { background-color: #e5f1db; }
.bg-light-green-200 { background-color: #cce3b7; }
.bg-light-green-300 { background-color: #b5d89b; } /* Main brand green */
.bg-light-green-400 { background-color: #9ecb7b; }
.bg-light-green-500 { background-color: #87be5b; }
.bg-light-green-600 { background-color: #6ca347; }
.bg-light-green-700 { background-color: #578339; }
.bg-light-green-800 { background-color: #42632b; }
.bg-light-green-900 { background-color: #2d421d; }

.bg-blue-50 { background-color: #f0f4f8; }
.bg-blue-100 { background-color: #d9e2ec; }
.bg-blue-200 { background-color: #bcccdc; }
.bg-blue-300 { background-color: #9fb3c8; }
.bg-blue-400 { background-color: #829ab1; }
.bg-blue-500 { background-color: #627d98; }
.bg-blue-600 { background-color: #486581; }
.bg-blue-700 { background-color: #3A6E9F; } /* Main brand blue */
.bg-blue-800 { background-color: #2d3748; }
.bg-blue-900 { background-color: #1a202c; }

.bg-cream-50 { background-color: #fdfbf6; }
.bg-cream-100 { background-color: #f8f4e8; }
.bg-cream-200 { background-color: #f3edd9; }
.bg-cream-300 { background-color: #F0E6C9; } /* Main brand cream */
.bg-cream-400 { background-color: #e8dab0; }
.bg-cream-500 { background-color: #e0ce97; }
.bg-cream-600 { background-color: #d8c27e; }
.bg-cream-700 { background-color: #c9b05c; }
.bg-cream-800 { background-color: #b99e3b; }
.bg-cream-900 { background-color: #8c7730; }

.text-light-green-50 { color: #f2f8ed; }
.text-light-green-100 { color: #e5f1db; }
.text-light-green-200 { color: #cce3b7; }
.text-light-green-300 { color: #b5d89b; } /* Main brand green */
.text-light-green-400 { color: #9ecb7b; }
.text-light-green-500 { color: #87be5b; }
.text-light-green-600 { color: #6ca347; }
.text-light-green-700 { color: #578339; }
.text-light-green-800 { color: #42632b; }
.text-light-green-900 { color: #2d421d; }

.text-blue-50 { color: #f0f4f8; }
.text-blue-100 { color: #d9e2ec; }
.text-blue-200 { color: #bcccdc; }
.text-blue-300 { color: #9fb3c8; }
.text-blue-400 { color: #829ab1; }
.text-blue-500 { color: #627d98; }
.text-blue-600 { color: #486581; }
.text-blue-700 { color: #3A6E9F; } /* Main brand blue */
.text-blue-800 { color: #2d3748; }
.text-blue-900 { color: #1a202c; }

.text-cream-50 { color: #fdfbf6; }
.text-cream-100 { color: #f8f4e8; }
.text-cream-200 { color: #f3edd9; }
.text-cream-300 { color: #F0E6C9; } /* Main brand cream */
.text-cream-400 { color: #e8dab0; }
.text-cream-500 { color: #e0ce97; }
.text-cream-600 { color: #d8c27e; }
.text-cream-700 { color: #c9b05c; }
.text-cream-800 { color: #b99e3b; }
.text-cream-900 { color: #8c7730; }

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