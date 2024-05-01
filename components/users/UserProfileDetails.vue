<template>
  <div class="flow-root lg:w-6/12 p-4 lg:p-6  bg-white">
    <div class="space-y-6 pb-3">
      <div class="flex items-center gap-x-6">
        <p class="text-sm font-semibold text-lg">{{ user ? `${user.fname} ${user.lname}` : 'N/A' }}</p>
        <div class="mb-3">
          <span class="text-[#175CD3] bg-blue-50 rounded-full text-xs px-3 py-2">@{{ user.handle ?? 'N/A' }}</span>
        </div>
      </div>
      <p class="text-gray-500 font-semibold text-sm">
        Account created | {{ $moment.utc(user.createdAt).format('LL') }} | {{ $moment.utc(user.createdAt).format(' h:mm A') }}
      </p>
    </div>
    <dl class="-my-3 divide-y divide-gray-100 text-sm p-3">
      <div class="flex justify-between items-center py-2">
        <dt class="font-medium text-gray-900 text-[14px]">
          Email address
        </dt>
        <dd class="font-medium text-gray-900 text-[14px]">
          {{ user.email ?? 'N/A' }}
        </dd>
      </div>

      <div class="flex justify-between items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px]">
          Phone number
        </dt>
        <dd class="font-medium text-gray-900 text-[14px]">
          {{ user.phone ?? 'N/A' }}
        </dd>
      </div>

      <div class="flex justify-between items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px]">Password</dt>
        <dd class="font-medium text-gray-900 text-[14px]">
          <div class="flex items-center gap-x-2">
            <p class="text-gray-400 font-semibold pt-3">********</p>
            <img src="@/assets/icons/eye-open.svg" alt="" />
          </div>
        </dd>
      </div>

      <div class="flex justify-between space-x-6 items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px] ">Interests</dt>
        <dd class="text-gray-700 sm:col-span-2 ">
          <div v-if="user.categories" class="grid grid-cols-2 gap-3">
            <div v-for="(itm, idx) in user.categories" :key="idx" class="text-xs">
              <div>
                <label for="ColorRed"
                  class="flex text-[#6941C6] rounded-full px-2 font-semibold bg-[#EEF4FF] cursor-pointer py-1.5 text-xs items-center justify-center border border-gray-100 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white">
                  <input type="radio" name="ColorOption" value="ColorRed" id="ColorRed" class="sr-only" />

                  <p class="text-xs font-medium flex justify-center items-center pb-0 mb-0">{{ itm.name }}</p>
                </label>
              </div>
              <!-- <p class="text-[#6941C6] font-semibold bg-[#EEF4FF] text-xs rounded-full px-3 py-2.5">
                  {{ itm.name }}</p> -->
            </div>
          </div>
          <div v-else>N/A</div>
        </dd>
      </div>

      <div class="flex justify-between items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px]">
          Date of birth
        </dt>
        <dd class="font-medium text-gray-900 text-[14px]">
          {{ user.dateOfBirth ? $moment.utc(user.dateOfBirth).format('LL') : 'N/A' }}
        </dd>
      </div>

      <div class="flex justify-between items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px]">Gender</dt>
        <dd class="font-medium text-gray-900 text-[14px]">{{ user.gender ?? 'N/A' }}</dd>
      </div>

      <div class="flex justify-between items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px]">Status</dt>
        <dd v-if="user.isActive" class="font-medium text-green-900 text-[14px] flex items-center gap-x-3">
          <span class="h-3 w-3 bg-green-600 rounded-full p-1.5"></span>Active
        </dd>
        <dd v-else class="font-medium text-gray-900 text-[14px] flex items-center gap-x-3">
          <img src="@/assets/icons/dashboard/suspended.svg" alt="" />Suspended
        </dd>
      </div>

      <div class="flex justify-between items-center py-3.5">
        <dt class="font-medium text-gray-900 text-[14px]">
          Last Session
        </dt>
        <dd class="font-medium text-gray-900 text-[14px]">
          1 h 37 mins
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => { }
    },
    loadingUser: {
      type: Boolean,

      required: false,
      default: false
    }
  }
}
</script>

<style></style>
