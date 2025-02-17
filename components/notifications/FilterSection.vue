<template>
    <div class="">
      <!-- Select Recipient Section -->
      <div class="mb-8">
        <h2 class="text-sm font-semibold mb-4">Select Recipient</h2>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="recipient in recipients"
            :key="recipient.id"
            @click="toggleRecipient(recipient.id)"
            class="px-2.5 py-1 text-sm rounded-full border border-gray-300 transition-colors duration-200"
            :class="{
              'bg-black text-white': selectedRecipients.includes(recipient.id),
              'hover:bg-gray-100': !selectedRecipients.includes(recipient.id)
            }"
          >
            {{ recipient.label }}
          </button>
        </div>
      </div>
  
      <!-- Date Joined Section -->
      <div>
        <h2 class="text-sm font-semibold mb-4">Date Joined</h2>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="date in dateOptions"
            :key="date.id"
            @click="toggleDate(date.id)"
            class="px-2.5 py-1 text-sm rounded-full border border-gray-300 transition-colors duration-200"
            :class="{
              'bg-black text-white': selectedDates.includes(date.id),
              'hover:bg-gray-100': !selectedDates.includes(date.id)
            }"
          >
            {{ date.label }}
          </button>
        </div>
      </div>
  
      <!-- Debug Information -->
      <!-- <div class="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 class="font-medium text-sm mb-2">Selected Filters:</h3>
        <div class="space-y-2 text-sm">
          <p>Recipients: {{ selectedRecipients.join(', ') }}</p>
          <p>Dates: {{ selectedDates.join(', ') }}</p>
        </div>
      </div> -->
    </div>
  </template>
  
  <script setup lang="ts">
  interface Recipient {
    id: string;
    label: string;
  }
  
  interface DateOption {
    id: string;
    label: string;
  }
  
  // Define recipients data
  const recipients: Recipient[] = [
    { id: 'all-created', label: 'All Contacts' },
    { id: 'active', label: 'Active' },
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'original-author', label: 'Original Author' },
    { id: 'test', label: 'Test' },
  ]
  
  // Define date options data
  const dateOptions: DateOption[] = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'last-month', label: 'Last Month' },
    { id: '30-days', label: '30 days' },
    { id: '60-days', label: '60 days' },
    { id: '90-days', label: '90 days' },
    { id: 'this-year', label: 'This year' },
    { id: 'last-year', label: 'Last year' },
  ]
  
  // State management using refs
  const selectedRecipients = ref<string[]>([])
  const selectedDates = ref<string[]>([])
  
  // Toggle functions for multi-select
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
  
  // Watch for changes in selections
  watch([selectedRecipients, selectedDates], ([newRecipients, newDates]) => {
    // Emit event with selected values or handle the changes
    emit('filter-change', {
      recipients: newRecipients,
      dates: newDates
    })
  }, { deep: true })
  
  // Define emits
  const emit = defineEmits<{
    (e: 'filter-change', payload: { recipients: string[], dates: string[] }): void
  }>()
  </script>