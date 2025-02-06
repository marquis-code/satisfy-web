<template>
    <div class="border border-gray-100 shadow-sm rounded-xl p-5">
        <h1 class="font-bold font-mono text-gray-900 text-lg mb-3">MY TAG CLOUD WIDGET</h1>
        <div v-if="tags.length" class="flex gap-1.5 flex-wrap">
            <span v-for="item in tags" :key="item.name"
                class="font-semibold text-[13px] p-2.5 text-center rounded  border">
                {{ item?.name }} ({{ item?.count }})
            </span>
        </div>
        <div v-else>Nil</div>
        
    </div>
</template>

<script setup lang="ts">
import { useGetTagCloud } from '@/composables/story/getTagCloud';

const {loading, tags, fetchTagCloud} = useGetTagCloud();
onMounted(() => {
    fetchTagCloud()
})
</script>

<style scoped></style>