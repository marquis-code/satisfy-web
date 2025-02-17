<template>
    <div class="">
      <div class="max-w-7xl mx-auto grid grid-cols-1 items-start lg:grid-cols-3 gap-6">
        <!-- Email Editor Section -->
        <!-- <div class="lg:col-span-6 space-y-6"> -->
          <div class="bg-white border-[0.5px] border-gray-100 rounded-xl p-3">
            <h2 class="text-sm font-semibold mb-4">Email Notification</h2>
  
            <!-- Subject -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Subject</label>
              <input
                v-model="emailData.subject"
                type="text"
                class="w-full p-3 border rounded-lg"
              />
            </div>
  
            <!-- Rich Text Editor -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Body</label>
              <div class="border rounded-lg">
                <!-- Editor Toolbar -->
                <div class="flex flex-wrap items-center gap-2 p-2 border-b">
                  <button
                    v-for="tool in editorTools"
                    :key="tool.command"
                    @click="executeCommand(tool.command)"
                    class="p-2 hover:bg-gray-100 rounded"
                  >
                    <component :is="tool.icon" class="w-4 h-4" />
                  </button>
                </div>
                <!-- Editor Content -->
                <div
                  ref="editor"
                  contenteditable="true"
                  class="p-4 min-h-[200px] focus:outline-none"
                  @input="updateContent"
                ></div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 border-[0.5px] border-gray-100">
            <h2 class="text-sm font-semibold mb-4">Selected Recipients</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in allSelectedItems"
                :key="item"
                class="px-2 py-1 text-xs bg-gray-100 rounded-full text-sm"
              >
                {{ item }}
              </span>
            </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center">
              <button
                @click="sendTestEmail"
                class="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Send Test
              </button>
              <button
                @click="sendEmail"
                class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Send
              </button>
            </div>
          </div>
          </div>
  
          <!-- Recipients and Filters -->
          <!-- <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Select Recipients</h2>
  
      
            <div class="mb-6">
              <h3 class="text-sm font-medium mb-3">Recipient Type</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="type in recipientTypes"
                  :key="type.id"
                  @click="toggleRecipient(type.id)"
                  class="px-4 py-2 rounded-full border transition-colors duration-200"
                  :class="isSelected(type.id, selectedRecipients)"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>
  

            <div class="mb-6">
              <h3 class="text-sm font-medium mb-3">Date Joined</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="date in dateOptions"
                  :key="date.id"
                  @click="toggleDate(date.id)"
                  class="px-4 py-2 rounded-full border transition-colors duration-200"
                  :class="isSelected(date.id, selectedDates)"
                >
                  {{ date.label }}
                </button>
              </div>
            </div>
  

            <div class="mb-6">
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-sm font-medium">Custom Groups</h3>
                <button
                  @click="showCustomGroupModal = true"
                  class="px-3 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Add Custom Group
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="group in customGroups"
                  :key="group.id"
                  @click="toggleCustomGroup(group.id)"
                  class="px-4 py-2 rounded-full border transition-colors duration-200 flex items-center gap-2"
                  :class="isSelected(group.id, selectedCustomGroups)"
                >
                  {{ group.label }}
                  <span v-if="group.count" class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {{ group.count }}
                  </span>
                </button>
              </div>
            </div>
  

            <div class="mb-6">
              <h3 class="text-sm font-medium mb-3">Import from CSV</h3>
              <div class="flex gap-2">
                <input
                  type="file"
                  accept=".csv"
                  @change="handleCsvUpload"
                  class="hidden"
                  ref="fileInput"
                />
                <button
                  @click="$refs.fileInput.click()"
                  class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Upload CSV
                </button>
                <span v-if="csvFileName" class="text-sm text-gray-600 my-auto">
                  {{ csvFileName }}
                </span>
              </div>
            </div>
          </div> -->
        <!-- </div> -->

        <div class="bg-white border-[0.5px] border-gray-100 rounded-xl p-3">
            <h2 class="text-sm font-semibold mb-4">Select Recipients</h2>
  
            <!-- Recipient Types -->
            <div class="mb-6">
              <h3 class="text-xs font-medium mb-3">Recipient Type</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="type in recipientTypes"
                  :key="type.id"
                  @click="toggleRecipient(type.id)"
                  class="px-4 py-1 text-xs rounded-full border transition-colors duration-200"
                  :class="isSelected(type.id, selectedRecipients)"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>
  
            <!-- Date Joined -->
            <div class="mb-6">
              <h3 class="text-xs font-medium mb-3">Date Joined</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="date in dateOptions"
                  :key="date.id"
                  @click="toggleDate(date.id)"
                  class="px-4 py-1 text-xs rounded-full border transition-colors duration-200"
                  :class="isSelected(date.id, selectedDates)"
                >
                  {{ date.label }}
                </button>
              </div>
            </div>
  
            <!-- Custom Groups -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-sm font-medium">Custom Groups</h3>
                <button
                  @click="showCustomGroupModal = true"
                  class="px-3 py-2.5 text-sm text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Add Custom Group
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="group in customGroups"
                  :key="group.id"
                  @click="toggleCustomGroup(group.id)"
                  class="px-4 py-2 rounded-full border transition-colors duration-200 flex items-center gap-2"
                  :class="isSelected(group.id, selectedCustomGroups)"
                >
                  {{ group.label }}
                  <span v-if="group.count" class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {{ group.count }}
                  </span>
                </button>
              </div>
            </div>
  
            <!-- CSV Upload -->
            <div class="mb-6">
              <h3 class="text-sm font-medium mb-3">Import from CSV</h3>
              <div class="flex gap-2">
                <input
                  type="file"
                  accept=".csv"
                  @change="handleCsvUpload"
                  class="hidden"
                  ref="fileInput"
                />
                <button
                  @click="$refs.fileInput.click()"
                  class="px-4 py-2 text-sm flex items-center gap-x-2 border-[0.5px] border-gray-500 font-semibold bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Upload CSV
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M178.34,165.66,160,147.31V208a8,8,0,0,1-16,0V147.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32ZM160,40A88.08,88.08,0,0,0,81.29,88.68,64,64,0,1,0,72,216h40a8,8,0,0,0,0-16H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.12A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,100.8,66,8,8,0,0,0,3.2,15.34,7.9,7.9,0,0,0,3.2-.68A88,88,0,0,0,160,40Z"></path></svg>
                </button>
                <span v-if="csvFileName" class="text-sm text-gray-600 my-auto">
                  {{ csvFileName }}
                </span>
              </div>
            </div>
          </div>
  
        <!-- Preview Section -->
        <div class="bg-white border-[0.5px] border-gray-100 rounded-xl p-3">
          <div class="bg-white rounded-lg">
            <div class="flex justify-center items-center mb-4">
              <!-- <h2 class="text-sm font-semibold">Preview</h2> -->
              <select
                v-model="previewMode"
                class="border rounded-lg text-sm px-6 py-2"
              >
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="both">Both</option>
              </select>
            </div>
  
            <div class="grid gap-6" :class="previewGridClass">
              <!-- Mobile Preview -->
              <div v-if="showMobilePreview" class="flex justify-center">
                <div class="border-8 border-gray-800 rounded-[3rem] p-2">
                  <div class="h-[600px] w-[300px] bg-white rounded-[2.5rem] overflow-y-auto p-4">
                    <h3 class="font-bold mb-2">{{ emailData.subject }}</h3>
                    <div v-html="emailData.content"></div>
                  </div>
                </div>
              </div>
  
              <!-- Desktop Preview -->
              <div v-if="showDesktopPreview" class="flex justify-center">
                <div class="macbook-mockup">
                  <div class="macbook-screen">
                    <div class="macbook-content">
                      <h3 class="font-bold mb-2">{{ emailData.subject }}</h3>
                      <div v-html="emailData.content"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Selected Recipients -->
          <!-- <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-sm font-semibold mb-4">Selected Recipients</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in allSelectedItems"
                :key="item"
                class="px-2 py-1 text-xs bg-gray-100 rounded-full text-sm"
              >
                {{ item }}
              </span>
            </div>
          </div> -->
  
          <!-- Send Controls -->
          <!-- <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center">
              <button
                @click="sendTestEmail"
                class="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Send Test
              </button>
              <button
                @click="sendEmail"
                class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Send
              </button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    Bold, Italic, Underline, Link, Image,
    List, ListOrdered, AlignLeft, AlignCenter,
    AlignRight, Smile
  } from 'lucide-vue-next'
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'
  
  // Types
  interface EmailData {
    subject: string
    content: string
  }
  
  interface RecipientType {
    id: string
    label: string
  }
  
  interface CustomGroup {
    id: string
    label: string
    count?: number
    recipients?: string[]
  }
  
  // State
  const editor = ref<HTMLElement | null>(null)
  const fileInput = ref<HTMLInputElement | null>(null)
  const csvFileName = ref('')
  const previewMode = ref('mobile')
  const showCustomGroupModal = ref(false)
  const newGroupName = ref('')
  const customGroupCsvFileName = ref('')
  const customGroupCsvData = ref<string[]>([])
  
  const emailData = ref<EmailData>({
    subject: '',
    content: ''
  })
  
  const selectedRecipients = ref<string[]>([])
  const selectedDates = ref<string[]>([])
  const selectedCustomGroups = ref<string[]>([])
  const customCsvData = ref<string[]>([])
  const customGroups = ref<CustomGroup[]>([])
  
  // Data
  const recipientTypes: RecipientType[] = [
    { id: 'all', label: 'All Contact' },
    { id: 'active', label: 'Active' },
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'test', label: 'Test' }
  ]
  
  const dateOptions: RecipientType[] = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: '30-days', label: '30 Days' },
    { id: '60-days', label: '60 Days' },
    { id: '90-days', label: '90 Days' },
    { id: 'this-year', label: 'This Year' },
    { id: 'last-year', label: 'Last Year' }
  ]
  
  
  const editorTools = [
    { command: 'bold', icon: Bold },
    { command: 'italic', icon: Italic },
    { command: 'underline', icon: Underline },
    { command: 'justifyLeft', icon: AlignLeft },
    { command: 'justifyCenter', icon: AlignCenter },
    { command: 'justifyRight', icon: AlignRight },
    { command: 'insertUnorderedList', icon: List },
    { command: 'insertOrderedList', icon: ListOrdered },
    { command: 'createLink', icon: Link },
    { command: 'insertImage', icon: Image },
    { command: 'insertEmoji', icon: Smile }
  ]
  
  // Computed
  const showMobilePreview = computed(() =>
    ['mobile', 'both'].includes(previewMode.value)
  )
  
  const showDesktopPreview = computed(() =>
    ['desktop', 'both'].includes(previewMode.value)
  )
  
  const previewGridClass = computed(() => ({
    'grid-cols-1': previewMode.value !== 'both',
    'grid-cols-2': previewMode.value === 'both'
  }))
  
  const allSelectedItems = computed(() => [
    ...selectedRecipients.value,
    ...selectedDates.value,
    ...selectedCustomGroups.value,
    ...customCsvData.value
  ])
  
  // Methods
  const executeCommand = (command: string) => {
    document.execCommand(command, false)
    editor.value?.focus()
  }
  
  const updateContent = () => {
    if (editor.value) {
      emailData.value.content = editor.value.innerHTML
    }
  }
  
  const isSelected = (id: string, selectedArray: string[]) => ({
    'bg-black text-white': selectedArray.includes(id),
    'hover:bg-gray-100': !selectedArray.includes(id)
  })
  
  const toggleRecipient = (id: string) => {
    const index = selectedRecipients.value.indexOf(id)
    if (index === -1) {
      selectedRecipients.value.push(id)
    } else {
      selectedRecipients.value.splice(index, 1)
    }
  }
  
  const toggleDate = (id: string) => {
    const index = selectedDates.value.indexOf(id)
    if (index === -1) {
      selectedDates.value.push(id)
    } else {
      selectedDates.value.splice(index, 1)
    }
  }
  
  const toggleCustomGroup = (id: string) => {
    const index = selectedCustomGroups.value.indexOf(id)
    if (index === -1) {
      selectedCustomGroups.value.push(id)
    } else {
      selectedCustomGroups.value.splice(index, 1)
    }
  }
  
  const handleCsvUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      csvFileName.value = file.name
      const text = await file.text()
      const rows = text.split('\n').map(row => row.trim()).filter(Boolean)
      customCsvData.value = rows
    }
  }
  
  const handleCustomGroupCsvUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      customGroupCsvFileName.value = file.name
      const text = await file.text()
      const rows = text.split('\n').map(row => row.trim()).filter(Boolean)
      customGroupCsvData.value = rows
    }
  }
  
  const createCustomGroup = () => {
    const newGroup: CustomGroup = {
      id: `custom-${Date.now()}`,
      label: newGroupName.value,
      count: customGroupCsvData.value.length,
      recipients: customGroupCsvData.value
    }
  
    customGroups.value.push(newGroup)
  
    // Reset form
    newGroupName.value = ''
    customGroupCsvFileName.value = ''
    customGroupCsvData.value = []
    showCustomGroupModal.value = false
  }
  
  const sendTestEmail = () => {
    // Implement test email logic
    console.log('Sending test email:', emailData.value)
  }
  
  const sendEmail = () => {
    // Implement email sending logic
    console.log('Sending email:', {
      ...emailData.value,
      recipients: allSelectedItems.value
    })
  }
  </script>
  
  <style>
  [contenteditable]:focus {
    outline: none;
  }
  .macbook-mockup {
    @apply relative;
    width: 800px;
    padding: 20px 20px 40px;
    background: #c1c1c1;
    border-radius: 20px;
    border-bottom: 20px solid #b1b1b1;
  }
  
  .macbook-mockup::before {
    content: '';
    @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full;
    width: 140px;
    height: 10px;
    background: #b1b1b1;
    border-radius: 0 0 10px 10px;
  }
  
  .macbook-screen {
    @apply bg-white rounded-lg overflow-hidden;
    height: 500px;
    border: 2px solid #666;
  }
  
  .macbook-content {
    @apply p-6 h-full overflow-y-auto;
    width: 100%;
    max-width: 100%;
  }
  
  .macbook-content > div {
    @apply break-words whitespace-pre-wrap;
  }
  </style>