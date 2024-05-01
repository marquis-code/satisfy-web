<template>
  <main>
    <div v-if="usersList.length && !loadingUsers"
      class="inline-block min-w-full py-2 align-middle border-gray-100 sm:px-6 lg:px-8 rounded-lg border bg-white shadow">
      <div class="relative">
        <div v-if="selectedPeople.length > 0"
          class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
          <button type="button"
            class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
            Bulk edit
          </button>
          <button type="button"
            class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
            Delete all
          </button>
        </div>
        <table class="min-w-full table-fixed divide-y divide-gray-300">
          <thead class="">
            <tr>
              <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                <input type="checkbox"
                  class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  :checked="indeterminate || selectedPeople.length === usersList.length
      " :indeterminate="indeterminate" @change="
      selectedPeople = $event.target.checked
        ? usersList.map((p) => p.email)
        : []
      " />
              </th>
              <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                Avatar
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Username
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                First name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Last name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Interest(s)
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone no.
              </th>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                No. of Stori(s)
              </th>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr class="odd:bg-gray-50" v-for="(person, index) in usersList" :key="index"
              :class="[selectedPeople.includes(person.email) && 'bg-gray-50']">
              <td class="relative px-7 sm:w-12 sm:px-6">
                <div v-if="selectedPeople.includes(person.email)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600">
                </div>
                <input type="checkbox"
                  class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  :value="person.email" v-model="selectedPeople" />
              </td>
              <td :class="[
      'whitespace-nowrap py-4 pr-3 text-sm font-medium',
      selectedPeople.includes(person.email)
        ? 'text-indigo-600'
        : 'text-gray-900',
    ]">
                <DashboardImageZoom v-if="person.profilePicture" class="h-10 w-10" :src="person.profilePicture" />
                <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                  {{ generateInitials(person.fname, person.lname) }}
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <nuxt-link :to="`/dashboard/users/${person.id}`" class="font-medium text-gray-800 no-underline">{{
      person.handle ?? "N/A" }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.fname ??
      "N/A" }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.lname ??
      "N/A" }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-[#6941C6] font-semibold">
                <span class="bg-[#F9F5FF] rounded-full px-3 py-2">{{
      person.interest ?? "N/A"
    }}</span>
                <span v-if="person.interest_count" class="bg-[#EEF4FF] text-[#6941C6] rounded-full px-3 py-2">{{
      person.interest_count ?? "N/A" }}</span>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.phone ??
      "N/A" }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.email ??
      "N/A" }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap px-3 text-center py-4 text-sm text-gray-500">
                <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.stori ??
      "N/A" }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 relative">
                <button @click="toggleDropdown(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
                <div v-if="openDropdownIndex === index"
                  class="absolute mt-1.5 w-32 bg-gray-600 -left-10 rounded-lg shadow-xl z-10">
                  <div>
                    <a href="#" @click.prevent="toggleDropdown(index)"
                      class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                          fill="currentColor"></path>
                        <path
                          d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                          fill="currentColor"></path>
                      </svg>

                      <span class="mx-1">
                        Edit
                      </span>
                    </a>

                    <a href="#" @click.prevent="removeUser(person)"
                      class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z"
                          fill="currentColor"></path>
                      </svg>

                      <span class="mx-1">
                        Remove
                      </span>
                    </a>

                    <a href="#" @click.prevent="toggleUserStatus(person)"
                      class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                      <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 19H3C1.89543 19 1 18.1046 1 17V16H3V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V16H23V17C23 18.1046 22.1046 19 21 19ZM5 7V16H19V7H5Z"
                          fill="currentColor"></path>
                      </svg>

                      <span class="mx-1">
                        {{ person.isActive ? "Suspend" : "Unsuspend" }}
                      </span>
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CoreBaseModal :show="openRemoveUserModal" @update:show="false">
      <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
        <div>
          <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
        </div>
        <div>
          <h1 class="font-semibold text-xl">Remove user</h1>
          <p class="text-gray-500">
            Are you sure you want to remove this user? This action cannot be
            undone.
          </p>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="openRemoveUserModal = false"
            class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
            Cancel
          </button>
          <button :disabled="processingDelete || processingDelete" @click="handleRemoveUser"
            class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
            {{ processingDelete ? "processing..." : "Remove" }}
          </button>
        </div>
      </section>
    </CoreBaseModal>

    <CoreBaseModal :show="updateUserStatusModal" @update:show="false">
      <section v-if="selectedStatus === 'suspend'" class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
        <h1 class="font-semibold text-xl text-gray-900 py-1">Suspend</h1>
        <div class="space-y-6">
          <div class="space-y-2 z-0">
            <label class="font-medium text-gray-800 text-sm">Suspension Category</label>
            <select class="bg-gray-50 rounded-md w-full outline-none py-3 text-sm border-gray-300 border pl-3"
              v-model="form.category">
              <option value="" disabled>Select suspension category</option>
              <option value="male">Bribery</option>
              <option value="female">Corruption</option>
            </select>
          </div>
          <div>
            <label for="Indefinately">
              <input v-model="form.indefinately" name="Indefinately" id="Indefinately" type="checkbox" />
              Indefinitely
            </label>
          </div>
          <div class="space-y-2 z-0" v-if="!form.indefinately">
            <div class="font-medium text-gray-800 text-sm">Until:</div>
            <date-picker style="width: 100%" v-model="form.date" valueType="format"></date-picker>
          </div>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="updateUserStatusModal = false" type="button"
            class="text-[#0BA9B9] text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
            Cancel
          </button>
          <button :disabled="!isFormEmpty" @click="handleConfirmSuspension" type="button"
            class="bg-[#0BA9B9] text-sm w-full disabled:cursor-not-allowed disabled:opacity-25 text-white font-medium px-6 py-3 rounded-lg">
            Continue
          </button>
        </div>
      </section>
      <section v-if="selectedStatus === 'reactivate'" class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
        <div>
          <img src="@/assets/icons/warning.svg" class="h-20 w-20" alt="warning" />
        </div>
        <div>
          <h1 class="font-semibold text-xl">Confirm</h1>
          <p class="text-gray-700">
            Are you sure you want to deactivate this user?
          </p>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="updateUserStatusModal = false"
            class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
            Cancel
          </button>
          <button :disabled="processingSuspension" @click="proceedToSuspendUser"
            class="bg-[#0BA9B9] disabled:opacity-25 disabled:cursor-not-allowed text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
            {{ processingSuspension ? "processing..." : "Proceed" }}
          </button>
        </div>
      </section>
    </CoreBaseModal>
  </main>
</template>

<script setup lang="ts">
const selectedPeople = ref([]);
const selectedOption = ref('');
const props = defineProps({
  usersList: {
    type: Array,
    default: () => [],
  },
  loadingUsers: {
    type: Boolean,
    default: false,
  },
});

const selectedStatus = ref('')

const openRemoveUserModal = ref(false)
const updateUserStatusModal = ref(false)

const openDropdownIndex = ref(null);

function toggleDropdown(index: any) {
  console.log(index)
  console.log(openDropdownIndex)
  openDropdownIndex.value = openDropdownIndex.value === index ? null : index;
}


const indeterminate = computed(() => {
  return (
    selectedPeople.value.length > 0 &&
    selectedPeople.value.length < props.usersList.length
  );
});

const removeUser = (user: string) => {
  openRemoveUserModal.value = true
};

const toggleUserStatus = (user: any) => {
  updateUserStatusModal.value = true
  if(user.isActive){
    selectedStatus.value = 'suspend'
  }

  if(!user.isActive){
    selectedStatus.value = 'reactivate'
  }
};

const generateInitials = (fname: string, lname: string) => {
  return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};
</script>

<style></style>
