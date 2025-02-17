<template>
    <div class="">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 container">
        <!-- Editor Section -->
        <div class="bg-white border-[0.5px] p-3 border-gray-100 rounded-xl shadow-sm">
          <div class="flex justify-between items-center">
            <h1 class="text-sm font-bold">New Message</h1>
            <span class="text-gray-500 text-sm">{{ currentDateTime }}</span>
          </div>
  
          <div class="space-y-6">
            <!-- Title Section -->
            <div class="space-y-2">
              <label class="text-gray-600 text-sm">Title</label>
              <input
                v-model="messageTitle"
                type="text"
                class="w-full p-3 border rounded-lg"
                placeholder="Public"
              />
            </div>
  
            <!-- Content Section -->
            <div class="space-y-2">
              <label class="text-gray-600 text-sm">Content</label>
              <div class="border rounded-lg">
                <!-- Editor Toolbar -->
                <div class="flex items-center gap-2 py-3 border-b">
                  <button
                    v-for="tool in editorTools"
                    :key="tool.command"
                    @click="executeCommand(tool.command)"
                    class="p-2 hover:bg-gray-100 rounded"
                    :class="{ 'bg-gray-100': isActive(tool.command) }"
                  >
                    <component :is="tool.icon" class="w-4 h-4" />
                  </button>
                </div>
                <!-- Editor Content -->
                <div
                  ref="editor"
                  contenteditable="true"
                  class="p-4 min-h-[100px] focus:outline-none"
                  @input="updateContent"
                ></div>
              </div>
            </div>
  
            <!-- Send To Section -->
            <!-- <div class="space-y-2">
              <label class="text-gray-600 text-sm">Send to</label>
              <select class="w-full p-3 border rounded-lg">
                <option>All users</option>
                <option>Selected users</option>
                <option>Groups</option>
              </select>
            </div> -->
  
            <!-- Flash Message Toggle -->
            <!-- <div class="flex items-center gap-2">
              <input type="checkbox" id="flash" class="rounded" />
              <label for="flash" class="text-gray-600">Send as flash message</label>
            </div>
   -->

   <div class="mt-8 p-4 bg-gray-50 rounded-lg border-[0.5px] border-gray-100">
        <h3 class="font-medium text-sm mb-3">Add to list:</h3>
        <div class="text-sm grid grid-cols-3 gap-3">
          <span v-for="(item, idx) in selectedRecipients" :key="idx" class="rounded-full text-center flex justify-center items-center text-white px-3 py-2 text-sm bg-black">{{ item }}</span>
          <span v-for="(itm, idx) in selectedDates" :key="idx" class="rounded-full text-center flex justify-center items-center text-white px-3 py-2 text-sm bg-black">{{ itm }}</span>
        </div>
      </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 mt-8">
              <button class="px-6 w-full py-2 text-base border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button class="px-6 w-full py-2 text-base bg-[#0BA9B9] text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>

       <div class="bg-white rounded-xl border-[0.5px] p-3 border-gray-100 shadow-sm">
        <NotificationsFilterSection @filter-change="handleFilterChange" />
       </div>

        <!-- Preview Section -->
        <div class="bg-white rounded-xl border-[0.5px] p-3 border-gray-100 shadow-sm">
          <div class="">
            <!-- Device Selector -->
            <div class="flex justify-center items-center p-3">
              <!-- <h2 class="text-sm font-semibold">Preview</h2> -->
              <select
                v-model="selectedDevice"
                class="border rounded-lg px-3 text-sm py-2"
              >
                <option v-for="device in devices" :key="device.id" :value="device.id">
                  {{ device.name }}
                </option>
              </select>
            </div>
  
            <!-- Phone Mockup -->
            <div class="flex justify-center item-center">
              <div
                class="border-8 border-gray-800 rounded-[3rem] p-2 bg-white"
                :style="{
                  width: devices.find(d => d.id === selectedDevice)?.width + 'px',
                  height: devices.find(d => d.id === selectedDevice)?.height + 'px'
                }"
              >
                <div class="h-full bg-white m rounded-[2.5rem] overflow-hidden">
                  <!-- Preview Content -->
                  <div class="p-4">
                    <h3 class="font-bold mb-2">{{ messageTitle || 'Untitled' }}</h3>
                    <div v-html="messageContent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    Bold,
    Italic,
    Underline,
    Link,
    Image,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Smile,
  } from 'lucide-vue-next'
  
  const editor = ref<HTMLElement | null>(null)
  const messageTitle = ref('')
  const messageContent = ref('')
  const selectedDevice = ref('iphone13')
  
  const currentDateTime = ref(new Date().toLocaleString())
  
  // Update datetime every minute
  setInterval(() => {
    currentDateTime.value = new Date().toLocaleString()
  }, 60000)
  
  const devices = [
    // { id: 'iphone13', name: 'iPhone 13', width: 390, height: 844 },
    // { id: 'pixel6', name: 'Pixel 6', width: 412, height: 915 },
    // { id: 'samsungs21', name: 'Samsung S21', width: 360, height: 800 },
    // { id: 'iphone8', name: 'iPhone 8', width: 375, height: 667 },
    { id: 'iphone13', name: 'iPhone 13', width: 290, height: 500 },
    { id: 'pixel6', name: 'Pixel 6', width: 312, height: 500 },
    { id: 'samsungs21', name: 'Samsung S21', width: 260, height: 500 },
    { id: 'iphone8', name: 'iPhone 8', width: 275, height: 500 }
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
    { command: 'insertEmoji', icon: Smile },
  ]
  
  const executeCommand = (command: string) => {
    document.execCommand(command, false)
    editor.value?.focus()
  }
  
  const isActive = (command: string) => {
    return document.queryCommandState(command)
  }
  
  const updateContent = () => {
    if (editor.value) {
      messageContent.value = editor.value.innerHTML
    }
  }
  
  onMounted(() => {
    // Enable editing
    if (editor.value) {
      editor.value.focus()
    }
  })
const selectedRecipients = ref([]) as any
const selectedDates = ref([]) as any
  const handleFilterChange = (filters: { recipients: string[], dates: string[] }) => {
    selectedRecipients.value = filters.recipients
    selectedDates.value = filters.dates
  // Handle the filter changes here

  console.log('Selected filters:', filters)
}


  </script>
  
  <style>
  [contenteditable]:focus {
    outline: none;
  }
  </style>