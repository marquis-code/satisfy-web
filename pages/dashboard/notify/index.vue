<!-- <template>
  <main>
    <section>
      <div class="">
        <h3 class="text-base font-semibold text-gray-900">Last 30 days</h3>
        <dl
          class="mt-5 grid grid-cols-1 overflow-hidden gap-6 md:grid-cols-4 my-6"
        >
          <div
            v-for="item in selectedRow?.stats"
            :key="item"
            class="px-4 py-5 sm:p-6 border-[0.5px] border-gray-100 rounded-xl"
          >
            <dt class="text-base font-normal text-gray-900">
              {{ item?.title ?? 'Nil' }}
            </dt>
            <dd
              class="mt-1 flex items-baseline justify-between md:block lg:flex"
            >
              <div
                class="flex items-baseline text-2xl font-semibold text-black"
              >
                {{ item?.count ?? 'Nil' }}
                <span class="ml-2 text-sm font-medium text-gray-500"
                  >from 70,946</span
                >
              </div>

              <div
                class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0"
              >
                <svg
                  class="-ml-1 mr-0.5 size-5 shrink-0 self-center text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only"> Increased by </span>
                {{item?.percentage ?? '0'}}%
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </section>
    <section>
      <div class="">
        <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-right pr-10 text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Report
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in stats" :key="idx">
                <td class="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                 {{ item.name ?? 'Nil' }}
                </td>
                <td
                  class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                >
                  {{ item.type ?? 'Nil' }}
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <span
                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >{{ item.status ?? 'Nil'  }}</span
                  >
                </td>
                <td class="px-3 py-3.5 text-sm text-gray-500">{{  item.created ?? 'MNil' }}</td>
                <td
                  class="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                >
                  <button
                   @click="handleSelected(item)"
                    type="button"
                    class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    View Report
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
const stats = ref([
  {
    name: "Storipod is growing",
    type: "Push",
    status: "Published",
    created: "2024-56-12",
    stats: [
      {
        title: "Sent",
        count: "0",
       percentage: "",
      },
      {
        title: "Delievered",
        count: "0",
       percentage: "",
      },
      {
        title: "Opened",
        count: "0",
       percentage: "",
      },
      {
        title: "Not Opened",
        count: "0",
       percentage: "",
      },
      {
        title: "Clicked",
        count: "0",
       percentage: "",
      },
      {
        title: "Bounced",
        count: "0",
       percentage: "",
      },
      {
        title: "Un-Subscribed",
        count: "0",
       percentage: "",
      },
      {
        title: "Bounced",
        count: "0",
       percentage: "",
      },
    ],
  },
  {
    name: "Earn and Share",
    type: "Email",
    status: "Published",
    created: "2024-56-12",
    stats: [
      {
        title: "Sent",
        count: "50",
       percentage: "",
      },
      {
        title: "Delievered",
        count: "30",
       percentage: "",
      },
      {
        title: "Opened",
        count: "70",
       percentage: "",
      },
      {
        title: "Not Opened",
        count: "90",
       percentage: "",
      },
      {
        title: "Clicked",
        count: "20",
       percentage: "",
      },
      {
        title: "Bounced",
        count: "80",
       percentage: "",
      },
      {
        title: "Un-Subscribed",
        count: "20",
       percentage: "",
      },
      {
        title: "Bounced",
        count: "80",
       percentage: "",
      },
    ],
  },
]);

const selectedRow = ref({})

const handleSelected = (item: any) => {
   selectedRow.value = item
} 

onMounted(() => {
    if(stats.value.length) {
        selectedRow.value = stats.value[0]
    }
})

definePageMeta({
  layout: "dashboard",
});
</script> -->


<!-- <template>

    <main>
      <div v-if="showOverlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" @click="handleOverlayClick"></div>
      
      <section v-if="showOverlay" class="fixed inset-x-0 top-10 z-50 mx-auto max-w-7xl px-4">
        <div class="bg-white rounded-xl shadow-2xl p-6">
          <h3 class="text-base font-semibold text-gray-900">Last 30 days - {{ selectedRow?.name }}</h3>
          <dl class="mt-5 grid grid-cols-1 overflow-hidden gap-6 md:grid-cols-4 my-6">
            <div
              v-for="item in selectedRow?.stats"
              :key="item.title"
              class="px-4 py-5 sm:p-6 border-[0.5px] border-gray-100 rounded-xl bg-white/80 backdrop-blur-sm"
            >
              <dt class="text-base font-normal text-gray-900">
                {{ item?.title ?? 'Nil' }}
              </dt>
              <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div class="flex items-baseline text-2xl font-semibold text-black">
                  {{ item?.count ?? 'Nil' }}
                  <span class="ml-2 text-sm font-medium text-gray-500">from 70,946</span>
                </div>
  
                <div class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
                  <svg
                    class="-ml-1 mr-0.5 size-5 shrink-0 self-center text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Increased by</span>
                  {{item?.percentage ?? '0'}}%
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </section>
  
      <section>
        <div class="">
          <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Type
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Created
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-right pr-10 text-sm font-semibold text-gray-900 lg:table-cell">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, idx) in stats" 
                  :key="idx"
                  :class="[
                    selectedRow?.name === item.name ? 'bg-indigo-50 ring-2 ring-indigo-600' : 'hover:bg-gray-50',
                    'transition-all duration-200'
                  ]"
                >
                  <td class="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                    {{ item.name ?? 'Nil' }}
                  </td>
                  <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                    {{ item.type ?? 'Nil' }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {{ item.status ?? 'Nil' }}
                    </span>
                  </td>
                  <td class="px-3 py-3.5 text-sm text-gray-500">{{ item.created ?? 'Nil' }}</td>
                  <td class="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="handleSelected(item)"
                      type="button"
                      class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  const stats = ref([
    {
      name: "Storipod is growing",
      type: "Push",
      status: "Published",
      created: "2024-56-12",
      stats: [
        {
          title: "Sent",
          count: "0",
          percentage: "",
        },
        {
          title: "Delievered",
          count: "0",
          percentage: "",
        },
        {
          title: "Opened",
          count: "0",
          percentage: "",
        },
        {
          title: "Not Opened",
          count: "0",
          percentage: "",
        },
        {
          title: "Clicked",
          count: "0",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "0",
          percentage: "",
        },
        {
          title: "Un-Subscribed",
          count: "0",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "0",
          percentage: "",
        },
      ],
    },
    {
      name: "Earn and Share",
      type: "Email",
      status: "Published",
      created: "2024-56-12",
      stats: [
        {
          title: "Sent",
          count: "50",
          percentage: "",
        },
        {
          title: "Delievered",
          count: "30",
          percentage: "",
        },
        {
          title: "Opened",
          count: "70",
          percentage: "",
        },
        {
          title: "Not Opened",
          count: "90",
          percentage: "",
        },
        {
          title: "Clicked",
          count: "20",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "80",
          percentage: "",
        },
        {
          title: "Un-Subscribed",
          count: "20",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "80",
          percentage: "",
        },
      ],
    },
  ]);
  
  const selectedRow = ref<any>(null);
  const showOverlay = ref(false);
  
  const handleSelected = (item: any) => {
    selectedRow.value = item;
    showOverlay.value = true;
  };
  
  const handleOverlayClick = (event: Event) => {
    if (event.target === event.currentTarget) {
      showOverlay.value = false;
      selectedRow.value = null;
    }
  };
  
  onMounted(() => {
    if (stats.value.length) {
      selectedRow.value = stats.value[0];
    }
  });
  
  definePageMeta({
    layout: "dashboard",
  });
  </script> -->


  <template>
    <main class="relative">
      <!-- Top overlay -->
      <div 
        v-if="showOverlay" 
        class="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-30"
        :style="{ height: `${topOverlayHeight}px` }"
        @click="handleOverlayClick"
      ></div>
  
      <!-- Stats Section -->
      <section ref="statsSection">
        <div class="relative z-40">
          <h3 class="text-base font-semibold text-gray-900">{{ selectedRow?.name || 'All Notifications' }}</h3>
          <dl class="mt-5 grid grid-cols-1 overflow-hidden gap-6 md:grid-cols-4 my-6">
            <div
              v-for="item in selectedRow?.stats"
              :key="item.title"
              class="px-4 py-5 sm:p-6 border-[0.5px] border-gray-100 rounded-xl bg-white shadow-lg"
            >
              <dt class="text-base font-normal text-gray-900">
                {{ item?.title ?? 'Nil' }}
              </dt>
              <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div class="flex items-baseline text-2xl font-semibold text-black">
                  {{ item?.count ?? 'Nil' }}
                  <span class="ml-2 text-sm font-medium text-gray-500">from 70,946</span>
                </div>
  
                <div class="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
                  <svg
                    class="-ml-1 mr-0.5 size-5 shrink-0 self-center text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Increased by</span>
                  {{item?.percentage ?? '0'}}%
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </section>
  
      <!-- Middle overlay -->
      <div 
        v-if="showOverlay" 
        class="fixed left-0 right-0 bg-black/50 backdrop-blur-sm z-30"
        :style="{ 
          top: `${middleOverlayTop}px`, 
          height: `${middleOverlayHeight}px` 
        }"
        @click="handleOverlayClick"
      ></div>
  
      <!-- Table Section -->
      <section ref="tableSection">
        <div class="relative z-40">
          <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Type
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Created
                  </th>
                  <th scope="col" class="hidden px-3 py-3.5 text-right pr-10 text-sm font-semibold text-gray-900 lg:table-cell">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, idx) in stats" 
                  :key="idx"
                  :ref="el => { if(selectedRow?.name === item.name) selectedTableRow = el }"
                  :class="[
                    selectedRow?.name === item.name ? 'bg-indigo-50 ring-2 ring-indigo-600 relative z-40' : 'hover:bg-gray-50',
                    'transition-all duration-200'
                  ]"
                >
                  <td class="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                    {{ item.name ?? 'Nil' }}
                  </td>
                  <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                    {{ item.type ?? 'Nil' }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {{ item.status ?? 'Nil' }}
                    </span>
                  </td>
                  <td class="px-3 py-3.5 text-sm text-gray-500">{{ item.created ?? 'Nil' }}</td>
                  <td class="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      @click="handleSelected(item)"
                      type="button"
                      class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
  
      <!-- Bottom overlay -->
      <div 
        v-if="showOverlay" 
        class="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-30"
        :style="{ top: `${bottomOverlayTop}px` }"
        @click="handleOverlayClick"
      ></div>
    </main>
  </template>
  
  <script setup lang="ts">
   const stats = ref([
    {
      name: "Storipod is growing",
      type: "Push",
      status: "Published",
      created: "2024-56-12",
      stats: [
        {
          title: "Sent",
          count: "0",
          percentage: "",
        },
        {
          title: "Delievered",
          count: "0",
          percentage: "",
        },
        {
          title: "Opened",
          count: "0",
          percentage: "",
        },
        {
          title: "Not Opened",
          count: "0",
          percentage: "",
        },
        {
          title: "Clicked",
          count: "0",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "0",
          percentage: "",
        },
        {
          title: "Un-Subscribed",
          count: "0",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "0",
          percentage: "",
        },
      ],
    },
    {
      name: "Earn and Share",
      type: "Email",
      status: "Published",
      created: "2024-56-12",
      stats: [
        {
          title: "Sent",
          count: "50",
          percentage: "",
        },
        {
          title: "Delievered",
          count: "30",
          percentage: "",
        },
        {
          title: "Opened",
          count: "70",
          percentage: "",
        },
        {
          title: "Not Opened",
          count: "90",
          percentage: "",
        },
        {
          title: "Clicked",
          count: "20",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "80",
          percentage: "",
        },
        {
          title: "Un-Subscribed",
          count: "20",
          percentage: "",
        },
        {
          title: "Bounced",
          count: "80",
          percentage: "",
        },
      ],
    },
  ]);
  
  const statsSection = ref<HTMLElement | null>(null);
  const tableSection = ref<HTMLElement | null>(null);
  const selectedTableRow = ref<HTMLElement | null>(null);
  const selectedRow = ref<any>(null);
  const showOverlay = ref(false);
  
  const topOverlayHeight = ref(0);
  const middleOverlayTop = ref(0);
  const middleOverlayHeight = ref(0);
  const bottomOverlayTop = ref(0);
  
  const updateOverlayPositions = () => {
    if (!statsSection.value || !tableSection.value || !selectedTableRow.value) return;
  
    const statsRect = statsSection.value.getBoundingClientRect();
    const tableRect = tableSection.value.getBoundingClientRect();
    const selectedRowRect = selectedTableRow.value.getBoundingClientRect();
  
    // Top overlay: from top of page to top of stats section
    topOverlayHeight.value = statsRect.top;
  
    // Middle overlay: from bottom of stats to top of selected row
    middleOverlayTop.value = statsRect.bottom;
    middleOverlayHeight.value = selectedRowRect.top - statsRect.bottom;
  
    // Bottom overlay: from bottom of selected row to bottom of page
    bottomOverlayTop.value = selectedRowRect.bottom;
  };
  
  const handleSelected = (item: any) => {
    selectedRow.value = item;
    showOverlay.value = true;
    nextTick(() => {
      updateOverlayPositions();
    });
  };
  
  const handleOverlayClick = () => {
    showOverlay.value = false;
    selectedRow.value = null;
  };
  
  onMounted(() => {
    if (stats.value.length) {
      selectedRow.value = stats.value[0];
    }
    
    window.addEventListener('resize', updateOverlayPositions);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateOverlayPositions);
  });
  
  definePageMeta({
    layout: "dashboard",
  });
  </script>