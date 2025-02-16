<template>
    <button @click="showLockModal=true" class="flex gap-1 items-center border py-1 px-2 rounded-md">
        <span class="text-sm font-semibold">Lock Pod</span>
        <img src="../../assets/icons/dashboard/lock.svg" alt="">
    </button>

    <CoreBaseModal :show="showLockModal" @update:show="showLockModal = !showLockModal">
        <section class="bg-white p-6 space-y-2 max-w-screen-lg rounded-md">
            <div class="w-full flex justify-center">
                <img src="../../assets/icons/dashboard/lock.svg" alt="" class="h-20 w-20">
            </div>
            <h2 class=" text-center font-semibold">Lock this Pod?</h2>
            <p class="text-center text-sm">I believe <span class="font-semibold">₦{{ podPrice }}</span> is a fair price to lock this pod.</p>
            <div>
                <input v-model="podPrice" type="range" min="0" max="5000" step="50" class="w-full cursor-pointer">
            </div>
            <button @click="lockPod" class="bg-[#0BA9B9] text-white rounded-full py-3 text-sm scro font-semibold w-full">Lock Pod</button>
        </section>
    </CoreBaseModal>
</template>

<script setup lang="ts">
const showLockModal = ref(false);
const podPrice = ref(0);
const emit = defineEmits(['amount'])
const lockPod = () => {
    emit('amount', podPrice.value);
    showLockModal.value = false;
}
</script>
